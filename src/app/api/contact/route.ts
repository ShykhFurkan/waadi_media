import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { contactFormSchema } from '@/lib/validations/contact';

export const runtime = 'nodejs';

// In-memory rate limiting map (IP -> { count, resetTime })
// Limits to 5 submissions per IP per hour
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 15;

function checkRateLimit(ip: string): boolean {
  if (ip === '127.0.0.1' || ip === '::1' || process.env.NODE_ENV !== 'production') {
    return true;
  }

  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(request: Request) {
  try {
    // 1. Rate limiting by IP
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          ok: false,
          error:
            'Too many requests. Please try again later or message us directly on WhatsApp.',
        },
        { status: 429 }
      );
    }

    // 2. Validate request body with shared Zod schema
    const body = await request.json().catch(() => ({}));
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      const firstError = Object.values(result.error.flatten().fieldErrors)[0]?.[0];
      return NextResponse.json(
        {
          ok: false,
          error:
            firstError ||
            "Your message didn't send. Check your connection and try again, or message us on WhatsApp.",
          fieldErrors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = result.data;

    // 3. Reject if honeypot is filled
    if (data.honeypot && data.honeypot.trim().length > 0) {
      return NextResponse.json(
        { ok: false, error: 'Spam detected' },
        { status: 400 }
      );
    }

    // 5. Check SMTP variables
    const smtpHost = process.env.SMTP_HOST;
    const smtpPortRaw = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    const toEmail = process.env.CONTACT_TO_EMAIL || 'contact@waadimedia.com';

    if (!smtpHost || !smtpUser || !smtpPass) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('[Dev Contact Form Submission (SMTP unconfigured)]:', {
          name: data.name,
          phone: data.phone,
          email: data.email,
          services: data.services,
          budget: data.budget,
          sourcePage: data.sourcePage,
          message: data.message,
        });
        return NextResponse.json({ ok: true });
      } else {
        // In production, never log personal data; return clear user-facing error
        return NextResponse.json(
          {
            ok: false,
            error:
              "Your message didn't send. Check your connection and try again, or message us on WhatsApp.",
          },
          { status: 500 }
        );
      }
    }

    const smtpPort = smtpPortRaw ? parseInt(smtpPortRaw, 10) : 587;
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL || `Waadi Media <${smtpUser}>`;

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });

    // Send notification email to Waadi Media
    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      replyTo: data.email || undefined,
      subject: `New enquiry from ${data.name}${
        data.services?.length ? ` - ${data.services.join(', ')}` : ''
      }`,
      text: [
        `Name: ${data.name}`,
        `Phone: ${data.phone}`,
        `Email: ${data.email || 'Not provided'}`,
        `Services: ${
          data.services && data.services.length > 0
            ? data.services.join(', ')
            : 'Not specified'
        }`,
        `Budget: ${data.budget || 'Not specified'}`,
        `Source Page: ${data.sourcePage || '/contact'}`,
        '',
        'Message:',
        data.message,
      ].join('\n'),
    });

    // Optional confirmation email to visitor (off by default)
    if (process.env.ENABLE_VISITOR_CONFIRMATION_EMAIL === 'true' && data.email) {
      await transporter.sendMail({
        from: fromEmail,
        to: data.email,
        subject: 'We got your message - Waadi Media',
        text: [
          `Hi ${data.name},`,
          '',
          'Thanks for reaching out to Waadi Media. We have received your project details and will review them carefully.',
          '',
          "We reply within one business day on WhatsApp or by email. If it's urgent, feel free to call us at +91 77809 40317.",
          '',
          'Warm regards,',
          'Furkan Mushtaq',
          'Waadi Media | Anantnag, Jammu & Kashmir',
        ].join('\n'),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[Contact API Error]:', error);
    }
    return NextResponse.json(
      {
        ok: false,
        error:
          "Your message didn't send. Check your connection and try again, or message us on WhatsApp.",
      },
      { status: 500 }
    );
  }
}

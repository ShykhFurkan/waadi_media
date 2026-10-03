import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactFormSchema } from '@/lib/validations/contact';

// In-memory rate limiting map (IP -> { count, resetTime })
// Limits to 5 submissions per IP per hour
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 5;

function checkRateLimit(ip: string): boolean {
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
            "Too many requests. Please try again later or message us directly on WhatsApp.",
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
          error: firstError || "Your message didn't send. Check your connection and try again, or message us on WhatsApp.",
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

    // 4. Time-based spam check: submitted under 3 seconds after page load
    if (data.loadTimestamp && Date.now() - data.loadTimestamp < 3000) {
      return NextResponse.json(
        { ok: false, error: 'Submission was too fast. Please take a moment to review your message.' },
        { status: 400 }
      );
    }

    // 5. Email delivery via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || 'contact@waadimedia.com';
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'Waadi Media <no-reply@waadimedia.com>';

    if (!resendApiKey) {
      if (process.env.NODE_ENV !== 'production') {
        // Safe logging in development without leaking sensitive secrets
        console.log('[Dev Contact Submission]', {
          services: data.services,
          budget: data.budget,
          sourcePage: data.sourcePage || '/contact',
          hasEmail: Boolean(data.email),
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

    const resend = new Resend(resendApiKey);

    // Email to owner
    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: data.email || undefined,
      subject: `New enquiry from ${data.name}${data.services?.length ? ` - ${data.services.join(', ')}` : ''}`,
      text: [
        `Name: ${data.name}`,
        `Phone: ${data.phone}`,
        `Email: ${data.email || 'Not provided'}`,
        `Services: ${data.services && data.services.length > 0 ? data.services.join(', ') : 'Not specified'}`,
        `Budget: ${data.budget || 'Not specified'}`,
        `Source Page: ${data.sourcePage || '/contact'}`,
        '',
        'Message:',
        data.message,
      ].join('\n'),
    });

    // Confirmation email to visitor if they provided an email address
    if (data.email) {
      await resend.emails.send({
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

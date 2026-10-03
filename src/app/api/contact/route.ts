import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

// Indian phone number regex: optional +91, followed by 6,7,8,9 and 9 more digits
const indianPhoneRegex = /^(?:\+91|91)?[6-9]\d{9}$/;

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Enter your name'),
  phone: z.string().regex(indianPhoneRegex, 'Enter a 10-digit phone number'),
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
  services: z.array(z.string()).default([]),
  budget: z.string().optional(),
  message: z
    .string()
    .min(10, 'Tell us a little about your business (at least 10 characters)')
    .max(2000, 'Message cannot exceed 2000 characters'),
  honeypot: z.string().max(0, 'Bot detected'),
  loadTimestamp: z.number().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { ok: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = result.data;

    // Check honeypot
    if (data.honeypot && data.honeypot.length > 0) {
      return NextResponse.json({ ok: false, error: 'Spam detected' }, { status: 400 });
    }

    // Time-based spam check: submitted under 3 seconds after load
    if (data.loadTimestamp && Date.now() - data.loadTimestamp < 3000) {
      return NextResponse.json({ ok: false, error: 'Submission was too fast' }, { status: 400 });
    }

    // Resend email integration
    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || 'contact@waadimedia.com';
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'Waadi Media <no-reply@waadimedia.com>';

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);

      // Email to owner
      await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        subject: `New Enquiry from ${data.name} (${data.phone})`,
        text: `Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email || 'Not provided'}
Services: ${data.services.join(', ') || 'Not specified'}
Budget: ${data.budget || 'Not specified'}

Message:
${data.message}`,
      });

      // Confirmation email to customer if email provided
      if (data.email) {
        await resend.emails.send({
          from: fromEmail,
          to: data.email,
          subject: 'We got your message - Waadi Media',
          text: `Hi ${data.name},

Thanks for reaching out to Waadi Media. We have received your project details and will review them carefully.

We reply within one business day on WhatsApp or by email. If your enquiry is urgent, feel free to call us at +91 77809 40317.

Warm regards,
Furkan Mushtaq
Waadi Media | Anantnag, Jammu & Kashmir`,
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Your message could not be sent. Please try again or WhatsApp us.' },
      { status: 500 }
    );
  }
}

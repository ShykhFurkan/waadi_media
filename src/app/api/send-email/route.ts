
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    const smtpHost = process.env.SMTP_HOST || 'smtpout.secureserver.net';
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpUser = process.env.SMTP_USER || 'contact@waadimedia.com';
    const smtpPass = process.env.SMTP_PASS || 'Anantnag@12';

    // Create a transporter using Secureserver / GoDaddy SMTP details
    const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465, // true for 465
        auth: {
            user: smtpUser,
            pass: smtpPass,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    try {
        const body = await request.json();
        const { type, data } = body;

        if (!type || !data) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        let subject = '';
        let htmlContent = '';

        if (type === 'inquiry') {
            subject = `New Project Inquiry from ${data.name || 'Website Visitor'} (${data.service || 'Service'})`;
            htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
            <div style="background: #1e3a8a; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
                <h1 style="color: #ffffff; margin: 0; font-size: 20px;">New Project Discovery Inquiry</h1>
                <p style="color: #bfdbfe; margin: 4px 0 0 0; font-size: 13px;">Waadi Media Client Lead</p>
            </div>
            <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 10px; font-weight: bold; width: 140px; color: #475569; border-bottom: 1px solid #f1f5f9;">Client Name:</td><td style="padding: 10px; color: #0f172a; border-bottom: 1px solid #f1f5f9; font-weight: bold;">${data.name}</td></tr>
                <tr><td style="padding: 10px; font-weight: bold; color: #475569; border-bottom: 1px solid #f1f5f9;">Email:</td><td style="padding: 10px; color: #0f172a; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${data.email}" style="color: #2563eb;">${data.email}</a></td></tr>
                <tr><td style="padding: 10px; font-weight: bold; color: #475569; border-bottom: 1px solid #f1f5f9;">Phone / WhatsApp:</td><td style="padding: 10px; color: #0f172a; border-bottom: 1px solid #f1f5f9;"><a href="tel:${data.phone}" style="color: #2563eb;">${data.phone}</a></td></tr>
                <tr><td style="padding: 10px; font-weight: bold; color: #475569; border-bottom: 1px solid #f1f5f9;">Service Requested:</td><td style="padding: 10px; color: #1d4ed8; font-weight: bold; border-bottom: 1px solid #f1f5f9;">${data.service}</td></tr>
                <tr><td style="padding: 10px; font-weight: bold; color: #475569; border-bottom: 1px solid #f1f5f9;">Target Budget:</td><td style="padding: 10px; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${data.budget}</td></tr>
                <tr><td style="padding: 10px; font-weight: bold; color: #475569; vertical-align: top;">Project Goals:</td><td style="padding: 10px; color: #0f172a; white-space: pre-wrap;">${data.message || 'No additional details provided.'}</td></tr>
            </table>
            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center;">
                Delivered by Waadi Media Digital Engine • Anantnag &amp; Srinagar, Jammu &amp; Kashmir
            </div>
        </div>
      `;
        } else if (type === 'contact') {
            subject = `New Contact Form Submission from ${data.name}`;
            htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
            <h2 style="color: #1e3a8a; border-bottom: 2px solid #2563eb; padding-bottom: 8px;">New Contact Request</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Role / Business:</strong> ${data.role || 'N/A'}</p>
            <p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            <p><strong>Message:</strong></p>
            <div style="background: #f8fafc; padding: 12px; border-radius: 6px; border-left: 3px solid #2563eb;">${data.message}</div>
        </div>
      `;
        } else if (type === 'lets-talk') {
            subject = `New Project Inquiry from ${data.fullName}`;
            htmlContent = `
        <h1>New Project Inquiry</h1>
        <h2>Basic Info</h2>
        <p><strong>Name:</strong> ${data.fullName}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        
        <h2>Business Info</h2>
        <p><strong>Business Name:</strong> ${data.businessName}</p>
        <p><strong>Type:</strong> ${data.businessType}</p>
        <p><strong>Years in Operation:</strong> ${data.yearsInOperation}</p>
        
        <h2>Project Details</h2>
        <p><strong>Goal:</strong> ${data.goal}</p>
        <p><strong>Has Website:</strong> ${data.hasWebsite} ${data.websiteUrl ? `(${data.websiteUrl})` : ''}</p>
        <p><strong>Services:</strong> ${data.services?.join(', ')}</p>
        
        <h2>Budget & Timeline</h2>
        <p><strong>Budget:</strong> ${data.budget}</p>
        <p><strong>Start Date:</strong> ${data.startDate}</p>
        
        <h2>Other</h2>
        <p><strong>Requirement:</strong> ${data.requirement}</p>
        <p><strong>Source:</strong> ${data.source}</p>
        
        <h2>Contact Preference</h2>
        <p><strong>Method:</strong> ${data.prefMethod}</p>
        <p><strong>Time:</strong> ${data.prefTime}</p>
      `;
        } else {
            return NextResponse.json({ error: 'Invalid submission type' }, { status: 400 });
        }

        // Send email using Nodemailer
        const info = await transporter.sendMail({
            from: `"Waadi Media" <${process.env.SMTP_USER}>`, // sender address
            to: process.env.SMTP_USER, // list of receivers (sending to self)
            subject: subject, // Subject line
            html: htmlContent, // html body
        });

        // console.log("Message sent: %s", info.messageId);

        return NextResponse.json({ success: true, data: info });
    } catch (error) {
        console.error('Email send error:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}

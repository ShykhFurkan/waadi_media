
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    // Create a transporter using GoDaddy / Office 365 SMTP details
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        tls: {
            ciphers: 'SSLv3', // Sometimes needed for legacy connections, harmless otherwise
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

        if (type === 'contact') {
            subject = `New Contact Form Submission from ${data.name}`;
            htmlContent = `
        <h1>New Contact Request</h1>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Role:</strong> ${data.role}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
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

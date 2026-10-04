import fs from 'fs';
import nodemailer from 'nodemailer';

// Load .env.local if present
if (fs.existsSync('.env.local')) {
  const envContent = fs.readFileSync('.env.local', 'utf8');
  for (const line of envContent.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

const smtpHost = process.env.SMTP_HOST;
const smtpPortRaw = process.env.SMTP_PORT;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;

if (!smtpHost || !smtpUser || !smtpPass) {
  console.error('Error: Missing SMTP configuration in .env.local (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS)');
  process.exit(1);
}

const smtpPort = smtpPortRaw ? parseInt(smtpPortRaw, 10) : 587;
const toEmail = process.env.CONTACT_TO_EMAIL || 'contact@waadimedia.com';
const fromEmail = process.env.CONTACT_FROM_EMAIL || `Waadi Media <${smtpUser}>`;

async function main() {
  console.log(`Testing SMTP connection to ${smtpHost}:${smtpPort}...`);

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  try {
    await transporter.verify();
    console.log('✓ SMTP connection and authentication verified successfully.');

    console.log(`Sending test email to ${toEmail}...`);
    const info = await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      subject: 'Waadi Media - SMTP Setup Test',
      text: 'This is a test email sent from scripts/test-mail.mjs to verify that Nodemailer SMTP transport is working correctly.',
    });

    console.log(`✓ Test email delivered successfully! Message ID: ${info.messageId}`);
  } catch (err) {
    console.error('✗ Failed to send test email:', err.message || err);
    process.exit(1);
  }
}

main();

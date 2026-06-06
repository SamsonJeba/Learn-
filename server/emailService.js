const nodemailer = require('nodemailer');

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.office365.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      ciphers: 'SSLv3',
      // Required for some institutional SMTP servers (like college emails)
      // that use self-signed or outdated SSL certificates.
      // Remove this in production if using a proper mail service.
      rejectUnauthorized: false
    }
  });

  return transporter;
}

async function sendTrialBookingNotification(data) {
  const to = process.env.EMAIL_TO || process.env.EMAIL_USER;
  
  const subjectsStr = Array.isArray(data.subjects) ? data.subjects.join(', ') : data.subjects || 'Not specified';
  const curriculum = data.curriculum || 'Not specified';

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: 'Segoe UI', Arial, sans-serif; background: #f5f7fa; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 20px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(135deg, #1a365d, #2d5a8e); padding: 30px; text-align: center;">
      <div style="background: linear-gradient(135deg, #d4a843, #e8c36a); width: 60px; height: 60px; border-radius: 16px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 12px;">
        <span style="font-size: 28px; color: #1a365d; font-weight: 900;">+</span>
      </div>
      <h1 style="color: white; margin: 0; font-size: 24px;">New Trial Booking!</h1>
      <p style="color: rgba(255,255,255,0.7); margin: 8px 0 0;">Learn+ Tuition Centre</p>
    </div>
    <div style="height: 4px; background: linear-gradient(90deg, #d4a843, #e8c36a, #d4a843);"></div>
    <div style="padding: 30px;">
      <p style="color: #64748b; margin: 0 0 24px;">A new trial booking has been submitted:</p>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 12px 16px; background: #f8fafc; border-radius: 8px 8px 0 0; font-weight: 700; color: #1a365d; font-size: 14px;">Student Name</td><td style="padding: 12px 16px; background: #f8fafc; border-radius: 8px 8px 0 0; color: #1e293b;">${data.studentName || 'N/A'}</td></tr>
        <tr><td style="padding: 12px 16px; border-top: 1px solid #e2e8f0; font-weight: 700; color: #1a365d; font-size: 14px;">Parent Name</td><td style="padding: 12px 16px; border-top: 1px solid #e2e8f0; color: #1e293b;">${data.parentName || 'N/A'}</td></tr>
        <tr><td style="padding: 12px 16px; border-top: 1px solid #e2e8f0; font-weight: 700; color: #1a365d; font-size: 14px;">Email</td><td style="padding: 12px 16px; border-top: 1px solid #e2e8f0; color: #1e293b;"><a href="mailto:${data.email}" style="color: #1a365d;">${data.email}</a></td></tr>
        <tr><td style="padding: 12px 16px; border-top: 1px solid #e2e8f0; font-weight: 700; color: #1a365d; font-size: 14px;">Phone</td><td style="padding: 12px 16px; border-top: 1px solid #e2e8f0; color: #1e293b;"><a href="tel:${data.phone}" style="color: #1a365d;">${data.phone}</a></td></tr>
        <tr><td style="padding: 12px 16px; border-top: 1px solid #e2e8f0; font-weight: 700; color: #1a365d; font-size: 14px;">Grade / Class</td><td style="padding: 12px 16px; border-top: 1px solid #e2e8f0; color: #1e293b;">${data.grade || 'N/A'}</td></tr>
        <tr><td style="padding: 12px 16px; border-top: 1px solid #e2e8f0; font-weight: 700; color: #1a365d; font-size: 14px;">Curriculum</td><td style="padding: 12px 16px; border-top: 1px solid #e2e8f0; color: #1e293b;">${curriculum}</td></tr>
        <tr><td style="padding: 12px 16px; border-top: 1px solid #e2e8f0; font-weight: 700; color: #1a365d; font-size: 14px;">Subjects</td><td style="padding: 12px 16px; border-top: 1px solid #e2e8f0; color: #1e293b;">${subjectsStr}</td></tr>
        <tr><td style="padding: 12px 16px; border-top: 1px solid #e2e8f0; font-weight: 700; color: #1a365d; font-size: 14px;">Preferred Time</td><td style="padding: 12px 16px; border-top: 1px solid #e2e8f0; color: #1e293b;">${data.preferredTime || 'Not specified'}</td></tr>
        <tr><td style="padding: 12px 16px; border-top: 1px solid #e2e8f0; border-radius: 0 0 8px 8px; font-weight: 700; color: #1a365d; font-size: 14px;">Message</td><td style="padding: 12px 16px; border-top: 1px solid #e2e8f0; border-radius: 0 0 8px 8px; color: #1e293b;">${data.message || 'No message'}</td></tr>
      </table>
      <div style="margin-top: 24px; padding: 16px; background: #fefce8; border: 1px solid #fde68a; border-radius: 8px;">
        <p style="margin: 0; color: #92400e; font-size: 13px;"><strong>Tip:</strong> Contact this lead within the first hour to maximize conversion.</p>
      </div>
    </div>
    <div style="background: #f8fafc; padding: 20px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
      <p style="margin: 0; color: #94a3b8; font-size: 12px;">Learn+ Maths &amp; Science Academy | Chennai</p>
    </div>
  </div>
</body>
</html>`;

  const mailOptions = {
    from: `"Learn+ Tuition Centre" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
    to: to,
    subject: `New Trial Booking - ${data.studentName || 'Unknown'} (${data.grade || 'N/A'})`,
    html: html
  };

  try {
    const transporter = getTransporter();
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending failed:', error.message);
    return { success: false, error: error.message };
  }
}

async function sendContactNotification(data) {
  const to = process.env.EMAIL_TO || process.env.EMAIL_USER;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: 'Segoe UI', Arial, sans-serif; background: #f5f7fa; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 20px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(135deg, #1a365d, #2d5a8e); padding: 24px; text-align: center;">
      <h2 style="color: white; margin: 0;">New Contact Message</h2>
    </div>
    <div style="height: 4px; background: linear-gradient(90deg, #d4a843, #e8c36a, #d4a843);"></div>
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 12px; font-weight: 700; color: #1a365d;">Name</td><td style="padding: 8px 12px;">${data.name}</td></tr>
        <tr><td style="padding: 8px 12px; font-weight: 700; color: #1a365d;">Email</td><td style="padding: 8px 12px;"><a href="mailto:${data.email}" style="color: #1a365d;">${data.email}</a></td></tr>
        <tr><td style="padding: 8px 12px; font-weight: 700; color: #1a365d;">Phone</td><td style="padding: 8px 12px;">${data.phone || 'N/A'}</td></tr>
        <tr><td style="padding: 8px 12px; font-weight: 700; color: #1a365d;">Subject</td><td style="padding: 8px 12px;">${data.subject || 'N/A'}</td></tr>
      </table>
      <div style="margin-top: 16px; padding: 16px; background: #f8fafc; border-radius: 8px;">
        <p style="margin: 0 0 4px; font-weight: 600; color: #1a365d;">Message:</p>
        <p style="margin: 0; color: #475569;">${data.message}</p>
      </div>
    </div>
  </div>
</body>
</html>`;

  try {
    const transporter = getTransporter();
    const info = await transporter.sendMail({
      from: `"Learn+ Website" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: to,
      subject: `New Contact Message from ${data.name}`,
      html: html
    });
    console.log('Contact email sent:', info.messageId);
    return { success: true };
  } catch (error) {
    console.error('Contact email failed:', error.message);
    return { success: false, error: error.message };
  }
}

// Verify email config on startup (non-blocking)
function verifyEmailConfig() {
  try {
    const t = getTransporter();
    t.verify()
      .then(() => console.log('Email SMTP: Connected successfully'))
      .catch(err => console.warn('Email SMTP: Could not connect -', err.message));
  } catch (err) {
    console.warn('Email SMTP: Config error -', err.message);
  }
}

module.exports = { sendTrialBookingNotification, sendContactNotification, verifyEmailConfig };

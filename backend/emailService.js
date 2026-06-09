import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const adminEmail = process.env.ADMIN_EMAIL || "freezingtheframes@gmail.com";
const smtpUser = process.env.SMTP_USER || "freezingtheframes@gmail.com";
const smtpPass = process.env.SMTP_PASS || "dsvk yhah kyrt aioc";

let transporter = null;
if (smtpUser && smtpPass) {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
} else {
  console.warn("SMTP_USER or SMTP_PASS not set. Nodemailer is not configured.");
}

/**
 * Sends both the admin notification email and the client confirmation email
 */
export async function sendEnquiryEmails({ name, email, phone, project_type, budget_range, preferred_date, message }) {
  if (!transporter) {
    console.warn("SMTP credentials not configured. Email notifications skipped.");
    return;
  }

  // 1. Send Admin Notification Email
  const adminMailPromise = transporter.sendMail({
    from: `"Freezing The Frames" <${smtpUser}>`,
    to: adminEmail,
    subject: `✨ New Creative Enquiry - ${name}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #050505; padding: 40px 20px; color: #e5e5e7; max-width: 600px; margin: 0 auto; border-radius: 20px; border: 1px solid #1a1a1a;">
        <!-- Header -->
        <div style="text-align: center; border-bottom: 1px solid #1a1a1a; padding-bottom: 24px; margin-bottom: 32px;">
          <div style="font-size: 24px; font-weight: 700; letter-spacing: 3px; color: #ffffff; text-transform: uppercase;">
            Freezing The Frames
          </div>
          <div style="font-size: 11px; color: #e5b869; margin: 8px 0 0 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">
            New Project Inquiry
          </div>
        </div>

        <!-- Client Info Card -->
        <div style="background: linear-gradient(145deg, #0e0e0e, #121212); border: 1px solid #222222; border-radius: 16px; padding: 28px; margin-bottom: 28px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
          <h3 style="margin: 0 0 20px 0; font-size: 15px; color: #ffffff; text-transform: uppercase; letter-spacing: 1.5px; border-bottom: 1px solid #222222; padding-bottom: 12px; font-weight: 600;">
            Client Details
          </h3>
          
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 24px;">
            <tr>
              <td style="padding: 6px 0; color: #86868b; width: 35%; font-weight: 500;">Client Name</td>
              <td style="padding: 6px 0; color: #ffffff; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #86868b; font-weight: 500;">Email Address</td>
              <td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #e5b869; text-decoration: none; font-weight: 600;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #86868b; font-weight: 500;">Phone Number</td>
              <td style="padding: 6px 0; color: #ffffff; font-weight: 600;">${phone || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #86868b; font-weight: 500;">Project Type</td>
              <td style="padding: 6px 0;"><span style="background-color: rgba(229, 184, 105, 0.1); color: #e5b869; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; border: 1px solid rgba(229,184,105,0.2);">${project_type || "Not specified"}</span></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #86868b; font-weight: 500;">Budget Range</td>
              <td style="padding: 6px 0; color: #e5b869; font-weight: 600;">${budget_range || "Not specified"}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #86868b; font-weight: 500;">Preferred Date</td>
              <td style="padding: 6px 0; color: #ffffff; font-weight: 600;">${preferred_date || "Not specified"}</td>
            </tr>
          </table>
        </div>

        <!-- Project Vision -->
        <div style="background: linear-gradient(145deg, #0e0e0e, #121212); border: 1px solid #222222; border-radius: 16px; padding: 28px; margin-bottom: 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
          <h3 style="margin: 0 0 16px 0; font-size: 15px; color: #ffffff; text-transform: uppercase; letter-spacing: 1.5px; border-bottom: 1px solid #222222; padding-bottom: 12px; font-weight: 600;">
            Project Vision
          </h3>
          <div style="white-space: pre-wrap; color: #d2d2d7; font-size: 14px; line-height: 1.6; background: rgba(255,255,255,0.02); padding: 18px; border-radius: 10px; border: 1px solid #222222;">${message || "No project message provided by client."}</div>
        </div>

        <!-- Quick Action Buttons -->
        <div style="text-align: center; margin-bottom: 24px; padding-top: 10px;">
          <a href="mailto:${email}" style="display: inline-block; background-color: #e5b869; color: #000000; text-decoration: none; padding: 12px 28px; font-weight: 600; font-size: 14px; border-radius: 30px; box-shadow: 0 4px 15px rgba(229,184,105,0.25);">
            Reply via Email
          </a>
          ${phone ? `
          <a href="https://wa.me/${phone.replace(/\D/g, '')}" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 12px 28px; font-weight: 600; font-size: 14px; border-radius: 30px; box-shadow: 0 4px 15px rgba(37,211,102,0.25); margin-left: 12px;">
            Chat on WhatsApp
          </a>
          ` : ''}
        </div>

        <!-- Footer -->
        <div style="text-align: center; font-size: 11px; color: #86868b; border-top: 1px solid #1a1a1a; padding-top: 24px;">
          <p style="margin: 0 0 6px 0;">This is an automated notification from your portfolio backend.</p>
          <p style="margin: 0;">&copy; ${new Date().getFullYear()} Freezing The Frames. All rights reserved.</p>
        </div>
      </div>
    `,
  });

  // 2. Send Client Confirmation Email
  const clientMailPromise = transporter.sendMail({
    from: `"Freezing The Frames" <${smtpUser}>`,
    to: email,
    subject: `✨ We've received your enquiry - Freezing The Frames`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #050505; padding: 40px 20px; color: #e5e5e7; max-width: 600px; margin: 0 auto; border-radius: 20px; border: 1px solid #1a1a1a;">
        <!-- Header -->
        <div style="text-align: center; border-bottom: 1px solid #1a1a1a; padding-bottom: 24px; margin-bottom: 32px;">
          <div style="font-size: 24px; font-weight: 700; letter-spacing: 3px; color: #ffffff; text-transform: uppercase;">
            Freezing The Frames
          </div>
          <div style="font-size: 11px; color: #e5b869; margin: 8px 0 0 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">
            Enquiry Received
          </div>
        </div>

        <!-- Message -->
        <div style="padding: 0 10px; line-height: 1.6; font-size: 15px;">
          <p>Hello ${name},</p>
          <p>Thank you for reaching out to <strong>Freezing The Frames</strong>. We have successfully received your project enquiry!</p>
          <p>I am thrilled about the opportunity to collaborate and bring your vision to life. I am currently reviewing the details you shared and will get back to you shortly (usually within 24-48 hours) to discuss the next steps.</p>
          
          <div style="background: rgba(255,255,255,0.02); border: 1px solid #222222; border-radius: 12px; padding: 20px; margin: 28px 0;">
            <p style="margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #e5b869; font-weight: 600;">Your Enquiry Details:</p>
            <ul style="margin: 0; padding-left: 20px; color: #d2d2d7; font-size: 14px; list-style-type: square; line-height: 22px;">
              <li><strong>Project Type:</strong> ${project_type || "Not specified"}</li>
              <li><strong>Preferred Date:</strong> ${preferred_date || "Not specified"}</li>
              <li><strong>Budget Range:</strong> ${budget_range || "Not specified"}</li>
            </ul>
          </div>

          <p>In the meantime, feel free to explore more of my work on Instagram <a href="https://instagram.com/freezingtheframes" style="color: #e5b869; text-decoration: none; font-weight: 500;">@freezingtheframes</a>.</p>
          
          <p style="margin-top: 40px; line-height: 20px;">
            Warm regards,<br>
            <strong style="color: #ffffff;">Veer Gohel</strong><br>
            <span style="font-size: 12px; color: #86868b;">Founder, Freezing The Frames</span>
          </p>
        </div>

        <!-- Footer -->
        <div style="text-align: center; font-size: 11px; color: #86868b; border-top: 1px solid #1a1a1a; padding-top: 24px; margin-top: 40px;">
          <p style="margin: 0;">&copy; ${new Date().getFullYear()} Freezing The Frames. All rights reserved.</p>
        </div>
      </div>
    `,
  });

  // Run them concurrently
  await Promise.all([adminMailPromise, clientMailPromise]);
}

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Supabase Admin client
const supabaseUrl = process.env.SUPABASE_URL || "https://mhncmxpmldzrmheeurkf.supabase.co";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "sb_secret_8hfDMoHxCq-7G0P4WOsweA_mDOxPF0z";

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase configuration variables.");
}

const supabaseAdmin = createClient(supabaseUrl || "", supabaseServiceKey || "", {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

// SMTP Nodemailer Transporter Configuration (Google SMTP)
const adminEmail = process.env.ADMIN_EMAIL || "freezingtheframes@gmail.com";
const smtpUser = process.env.SMTP_USER || "freezingtheframes@gmail.com"; // Your Gmail address
const smtpPass = process.env.SMTP_PASS || "dsvk yhah kyrt aioc"; // Your Google App Password

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

// Health Check Endpoint
app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

// Enquiry Submission Endpoint
app.post("/api/enquiries", async (req, res) => {
  try {
    const { name, email, phone, project_type, budget_range, preferred_date, message, website } = req.body;

    // Honeypot spam check
    if (website && website.length > 0) {
      return res.status(200).json({ success: true, message: "Spam block" });
    }

    if (!name || !email) {
      return res.status(400).json({ error: "Name and Email are required." });
    }

    // Insert to Supabase DB
    const { error } = await supabaseAdmin.from("enquiries").insert({
      name,
      email,
      phone: phone || null,
      project_type: project_type || null,
      budget_range: budget_range || null,
      preferred_date: preferred_date || null,
      message: message || null,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(500).json({ error: "Failed to store enquiry in database." });
    }

    // Trigger Admin Email Alert via Nodemailer (Google SMTP)
    if (transporter) {
      try {
        await transporter.sendMail({
          from: `"freezingtheframes" <${smtpUser}>`,
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
      } catch (emailErr) {
        console.error("SMTP email notification sending failed:", emailErr);
      }
    } else {
      console.warn("SMTP credentials not configured. Email notification skipped.");
    }

    return res.status(201).json({ success: true, message: "Enquiry submitted successfully." });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

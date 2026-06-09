import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { sendEnquiryEmails } from "./emailService.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Supabase Admin client
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "https://mhncmxpmldzrmheeurkf.supabase.co";
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

    // Trigger emails (both admin and client confirmation)
    await sendEnquiryEmails({ name, email, phone, project_type, budget_range, preferred_date, message });

    return res.status(201).json({ success: true, message: "Enquiry submitted successfully." });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

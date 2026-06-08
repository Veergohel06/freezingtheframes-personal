"use server";

import { z } from "zod";

const EnquirySchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(4).max(40).optional().or(z.literal("")),
  project_type: z.string().trim().max(80).optional().or(z.literal("")),
  budget_range: z.string().trim().max(80).optional().or(z.literal("")),
  preferred_date: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  website: z.string().max(0).optional(), // honeypot
});

export type EnquiryInput = z.infer<typeof EnquirySchema>;

export async function submitEnquiry(data: EnquiryInput) {
  const parsed = EnquirySchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid input data.");
  }
  
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
    const res = await fetch(`${backendUrl}/api/enquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsed.data),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || "Could not save your enquiry.");
    }
    
    return { ok: true };
  } catch (err: any) {
    console.error("[frontend-action] POST to backend API failed", err);
    throw new Error(err.message || "Failed to submit enquiry.");
  }
}

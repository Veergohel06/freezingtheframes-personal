import { createServerFn } from "@tanstack/react-start";
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

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => EnquirySchema.parse(data))
  .handler(async ({ data }) => {
    if (data.website && data.website.length > 0) {
      return { ok: true };
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("enquiries").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      project_type: data.project_type || null,
      budget_range: data.budget_range || null,
      preferred_date: data.preferred_date ? data.preferred_date : null,
      message: data.message || null,
    });
    if (error) {
      console.error("[enquiry] insert failed", error);
      throw new Error("Could not save your enquiry. Please try again.");
    }
    return { ok: true };
  });
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2.47.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface FormSubmission {
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
  vehicle_type?: string;
  preferred_date?: string;
  how_heard_about_us?: string;
  other_source?: string;
  selected_services?: string;
  estimated_total?: string;
}

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Get request body
    const contentType = req.headers.get("content-type");
    let formData: FormSubmission = {
      name: "",
      email: "",
      phone: "",
      address: "",
      message: "",
    };

    if (contentType?.includes("application/x-www-form-urlencoded")) {
      const text = await req.text();
      const params = new URLSearchParams(text);
      formData = {
        name: params.get("name") || "",
        email: params.get("email") || "",
        phone: params.get("phone") || "",
        address: params.get("address") || "",
        message: params.get("message") || "",
        vehicle_type: params.get("vehicle_type") || "",
        preferred_date: params.get("preferred_date") || "",
        how_heard_about_us: params.get("how_heard_about_us") || "",
        other_source: params.get("other_source") || "",
        selected_services: params.get("selected_services") || "[]",
        estimated_total: params.get("estimated_total") || "0",
      };
    } else if (contentType?.includes("multipart/form-data")) {
      const form = await req.formData();
      formData = {
        name: form.get("name")?.toString() || "",
        email: form.get("email")?.toString() || "",
        phone: form.get("phone")?.toString() || "",
        address: form.get("address")?.toString() || "",
        message: form.get("message")?.toString() || "",
        vehicle_type: form.get("vehicle_type")?.toString() || "",
        preferred_date: form.get("preferred_date")?.toString() || "",
        how_heard_about_us: form.get("how_heard_about_us")?.toString() || "",
        other_source: form.get("other_source")?.toString() || "",
        selected_services: form.get("selected_services")?.toString() || "[]",
        estimated_total: form.get("estimated_total")?.toString() || "0",
      };
    }

    // Validate required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.message
    ) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseKey) {
      return new Response(
        JSON.stringify({ error: "Missing Supabase credentials" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Insert form submission into database
    const { data: submission, error: dbError } = await supabase
      .from("form_submissions")
      .insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        message: formData.message,
        vehicle_type: formData.vehicle_type || null,
        preferred_date: formData.preferred_date || null,
        how_heard_about_us: formData.how_heard_about_us || null,
        other_source: formData.other_source || null,
        selected_services: formData.selected_services || null,
        estimated_total: formData.estimated_total
          ? parseFloat(formData.estimated_total)
          : null,
      })
      .select();

    if (dbError) {
      console.error("Database error:", dbError);
      return new Response(JSON.stringify({ error: "Failed to save submission" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Send email notification using Resend
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (resendApiKey) {
      try {
        let servicesHtml = "";
        try {
          const selectedServices = JSON.parse(formData.selected_services || "[]");
          if (selectedServices.length > 0) {
            servicesHtml = `
              <h3>Selected Services:</h3>
              <ul>
                ${selectedServices
                  .map(
                    (s: { name: string; price: number }) =>
                      `<li>${s.name} - $${s.price.toFixed(2)}</li>`
                  )
                  .join("")}
              </ul>
              <p><strong>Estimated Total: $${(formData.estimated_total || "0").toString()}</strong></p>
            `;
          }
        } catch {
          // Services parsing failed, continue without them
        }

        const emailHtml = `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          <p><strong>Address:</strong> ${formData.address}</p>
          ${formData.vehicle_type ? `<p><strong>Vehicle Type:</strong> ${formData.vehicle_type}</p>` : ""}
          ${
            formData.preferred_date
              ? `<p><strong>Preferred Date:</strong> ${formData.preferred_date}</p>`
              : ""
          }
          ${
            formData.how_heard_about_us
              ? `<p><strong>How they heard about us:</strong> ${formData.how_heard_about_us}</p>`
              : ""
          }
          ${
            formData.other_source
              ? `<p><strong>Other Source:</strong> ${formData.other_source}</p>`
              : ""
          }
          ${servicesHtml}
          <p><strong>Message:</strong></p>
          <p>${formData.message}</p>
        `;

        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "onboarding@resend.dev",
            to: formData.email,
            subject: "Thank you for contacting us!",
            html: `
              <p>Hi ${formData.name},</p>
              <p>Thank you for reaching out to us. We've received your message and will get back to you soon.</p>
              ${servicesHtml}
              <p>Best regards,<br>Mobile Mechanic Service Team</p>
            `,
          }),
        });

        // Send notification email to admin
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "onboarding@resend.dev",
            to: "contact@mobilemechanicservice.com",
            subject: `New Contact Form Submission from ${formData.name}`,
            html: emailHtml,
          }),
        });
      } catch (emailError) {
        console.error("Email sending error:", emailError);
        // Don't fail the request if email fails
      }
    }

    return new Response(JSON.stringify({ success: true, data: submission }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

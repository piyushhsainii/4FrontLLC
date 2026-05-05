"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactFormData = {
  name: string;
  phone: string;
  address: string;
  issue: string;
};

export type ActionResult =
  | { success: true }
  | { success: false; error: string };

export async function submitInspectionRequest(
  data: ContactFormData,
): Promise<ActionResult> {
  const { name, phone, address, issue } = data;

  if (!name || !phone || !address || !issue) {
    return { success: false, error: "All fields are required." };
  }

  try {
    const { error } = await resend.emails.send({
      from: "FourFront LLC <info@fourfrontllc.com>",
      to: ["info@fourfrontllc.com"],
      subject: `New Roof Inspection Request from ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>New Inspection Request</title>
          </head>
          <body style="margin:0;padding:0;background:#f4f4f5;font-family:'Segoe UI',sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
                    
                    <!-- Header -->
                    <tr>
                      <td style="background:#1a3a5c;padding:36px 40px;">
                        <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">
                          FourFront LLC
                        </h1>
                        <p style="margin:6px 0 0;color:rgba(255,255,255,0.65);font-size:13px;">
                          New Roof Inspection Request
                        </p>
                      </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                      <td style="padding:40px;">
                        <p style="margin:0 0 28px;color:#374151;font-size:15px;line-height:1.6;">
                          A new inspection request has been submitted. Here are the details:
                        </p>

                        <!-- Detail rows -->
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="padding:14px 0;border-bottom:1px solid #e5e7eb;">
                              <span style="display:block;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:#9ca3af;margin-bottom:4px;">Full Name</span>
                              <span style="font-size:15px;color:#111827;font-weight:500;">${name}</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:14px 0;border-bottom:1px solid #e5e7eb;">
                              <span style="display:block;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:#9ca3af;margin-bottom:4px;">Phone Number</span>
                              <span style="font-size:15px;color:#111827;font-weight:500;">
                                <a href="tel:${phone}" style="color:#1a3a5c;text-decoration:none;">${phone}</a>
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:14px 0;border-bottom:1px solid #e5e7eb;">
                              <span style="display:block;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:#9ca3af;margin-bottom:4px;">Property Address</span>
                              <span style="font-size:15px;color:#111827;font-weight:500;">${address}</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:14px 0;">
                              <span style="display:block;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:#9ca3af;margin-bottom:4px;">Issue Description</span>
                              <span style="font-size:15px;color:#111827;line-height:1.6;">${issue}</span>
                            </td>
                          </tr>
                        </table>

                        <!-- CTA -->
                        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
                          <tr>
                            <td>
                              <a href="tel:${phone}"
                                style="display:inline-block;background:#1a3a5c;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:8px;font-size:14px;font-weight:600;letter-spacing:0.2px;">
                                Call ${name}
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:20px 40px;">
                        <p style="margin:0;font-size:12px;color:#9ca3af;">
                          This email was sent automatically from the FourFront LLC website contact form.
                        </p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return {
        success: false,
        error: "Failed to send email. Please try again.",
      };
    }

    return { success: true };
  } catch (err) {
    console.error("Unexpected error:", err);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}

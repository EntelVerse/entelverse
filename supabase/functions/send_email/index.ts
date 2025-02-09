import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY");
const FROM_EMAIL = "verifyemail@entelverse.com";
const APP_NAME = "Enterverse";

// Function to send email using SendGrid
async function sendEmail(to: string, subject: string, body: string) {
  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${SENDGRID_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: FROM_EMAIL, name: APP_NAME },
      subject: subject,
      content: [{ type: "text/html", value: body }]
    }),
  });

  return response.ok;
}

// Function to handle incoming HTTP requests
serve(async (req) => {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return new Response("Missing email or code", { status: 400 });
    }

    const verificationUrl = `https://entelverse.com/verify?token=${code}`;

    const subject = `Verify Your Email for ${APP_NAME}`;
    const body = `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
        <h2 style="color: #333;">Welcome to Enterverse! 🌟</h2>
        <p style="font-size: 16px; color: #666;">
            Thank you for signing up! To complete your registration, please verify your email address.
        </p>
        
        <h3 style="color: #444;">Your Verification Code:</h3>
        <p style="font-size: 24px; font-weight: bold; color: #007bff;">
            ${code}
        </p>
        
        <p style="margin-top: 10px; font-size: 14px; color: #777;">
            Or click the button below to verify your account:
        </p>

        <a href="${verificationUrl}" 
           style="display: inline-block; padding: 12px 24px; font-size: 18px; 
           color: #fff; background-color: #007bff; text-decoration: none; 
           border-radius: 5px; margin-top: 20px;">
           Verify My Email
        </a>

        <p style="margin-top: 20px; font-size: 14px; color: #888;">
            If the button doesn’t work, copy and paste this link into your browser:
        </p>
        
        <p style="word-break: break-word;">
            <a href="${verificationUrl}" style="color: #007bff;">${verificationUrl}</a>
        </p>

        <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;">

        <p style="font-size: 12px; color: #999;">
            If you didn't sign up for Enterverse Hub, you can safely ignore this email.
        </p>
      </div>
    `;

    const success = await sendEmail(email, subject, body);

    return success
      ? new Response("Email sent successfully!", { status: 200 })
      : new Response("Failed to send email", { status: 500 });

  } catch (error) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
});

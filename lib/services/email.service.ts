// src/lib/services/email.service.ts

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

class EmailService {
  private getFromEmail(): string {
    return process.env.EMAIL_FROM || "Admin <onboarding@resend.dev>";
  }

  private getAdminEmail(): string {
    return (
      process.env.ADMIN_EMAIL ||
      process.env.ALLOWED_ADMIN_EMAILS?.split(",")[0] ||
      ""
    );
  }

  async sendLoginPin(email: string, pin: string): Promise<boolean> {
    try {
      const { error } = await resend.emails.send({
        from: this.getFromEmail(),
        to: email,
        subject: "Your Login PIN",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; padding: 40px 20px;">
                <tr>
                  <td align="center">
                    <table width="480" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1)); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 40px;">
                      <tr>
                        <td align="center">
                          <h1 style="color: #ffffff; font-size: 24px; font-weight: bold; margin: 0 0 8px 0;">
                            Admin<span style="color: #8b5cf6;">.</span>
                          </h1>
                          <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin: 0 0 32px 0;">
                            Portfolio Admin Panel
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td align="center">
                          <p style="color: rgba(255,255,255,0.8); font-size: 16px; margin: 0 0 24px 0;">
                            Your login PIN is:
                          </p>
                          <div style="background: rgba(139, 92, 246, 0.2); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 16px; padding: 24px 48px; display: inline-block;">
                            <span style="color: #ffffff; font-size: 36px; font-weight: bold; letter-spacing: 8px; font-family: monospace;">
                              ${pin}
                            </span>
                          </div>
                          <p style="color: rgba(255,255,255,0.5); font-size: 14px; margin: 24px 0 0 0;">
                            This PIN expires in 10 minutes.
                          </p>
                          <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 16px 0 0 0;">
                            If you didn't request this, please ignore this email.
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
        text: `Your login PIN is: ${pin}\n\nThis PIN expires in 10 minutes.\n\nIf you didn't request this, please ignore this email.`,
      });

      if (error) {
        console.error("Resend error:", error);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Failed to send email:", error);
      return false;
    }
  }

  // Send notification to admin when someone submits contact form
  async sendContactNotification(contact: {
    name: string;
    email: string;
    company?: string | null;
    subject: string;
    message: string;
  }): Promise<boolean> {
    const adminEmail = this.getAdminEmail();

    if (!adminEmail) {
      console.warn("No admin email configured for contact notifications");
      return false;
    }

    try {
      const { error } = await resend.emails.send({
        from: this.getFromEmail(),
        to: adminEmail,
        subject: `New Contact: ${contact.subject}`,
        replyTo: contact.email,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; padding: 40px 20px;">
                <tr>
                  <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.1)); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 40px;">
                      <tr>
                        <td>
                          <h1 style="color: #ffffff; font-size: 24px; font-weight: bold; margin: 0 0 8px 0;">
                            New Contact Message<span style="color: #8b5cf6;">.</span>
                          </h1>
                          <p style="color: rgba(255,255,255,0.5); font-size: 14px; margin: 0 0 32px 0;">
                            Someone reached out through your portfolio
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <!-- Sender Info -->
                          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                            <tr>
                              <td style="padding: 16px; background: rgba(255,255,255,0.05); border-radius: 12px; margin-bottom: 12px;">
                                <table width="100%" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td width="50%" style="padding-right: 12px;">
                                      <p style="color: rgba(255,255,255,0.5); font-size: 12px; margin: 0 0 4px 0; text-transform: uppercase;">From</p>
                                      <p style="color: #ffffff; font-size: 16px; font-weight: 600; margin: 0;">${
                                        contact.name
                                      }</p>
                                    </td>
                                    <td width="50%" style="padding-left: 12px;">
                                      <p style="color: rgba(255,255,255,0.5); font-size: 12px; margin: 0 0 4px 0; text-transform: uppercase;">Email</p>
                                      <a href="mailto:${
                                        contact.email
                                      }" style="color: #8b5cf6; font-size: 16px; text-decoration: none;">${
          contact.email
        }</a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            ${
                              contact.company
                                ? `
                            <tr>
                              <td style="padding: 16px; background: rgba(255,255,255,0.05); border-radius: 12px; margin-top: 12px;">
                                <p style="color: rgba(255,255,255,0.5); font-size: 12px; margin: 0 0 4px 0; text-transform: uppercase;">Company</p>
                                <p style="color: #ffffff; font-size: 16px; margin: 0;">${contact.company}</p>
                              </td>
                            </tr>
                            `
                                : ""
                            }
                          </table>
                          
                          <!-- Subject -->
                          <div style="margin-bottom: 24px;">
                            <p style="color: rgba(255,255,255,0.5); font-size: 12px; margin: 0 0 8px 0; text-transform: uppercase;">Subject</p>
                            <p style="color: #ffffff; font-size: 18px; font-weight: 600; margin: 0;">${
                              contact.subject
                            }</p>
                          </div>
                          
                          <!-- Message -->
                          <div style="background: rgba(255,255,255,0.05); border-radius: 16px; padding: 24px;">
                            <p style="color: rgba(255,255,255,0.5); font-size: 12px; margin: 0 0 12px 0; text-transform: uppercase;">Message</p>
                            <p style="color: rgba(255,255,255,0.9); font-size: 15px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${
                              contact.message
                            }</p>
                          </div>
                          
                          <!-- Reply Button -->
                          <div style="margin-top: 32px; text-align: center;">
                            <a href="mailto:${
                              contact.email
                            }?subject=Re: ${encodeURIComponent(
          contact.subject
        )}" 
                               style="display: inline-block; padding: 16px 32px; background: #ffffff; color: #0f172a; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 12px;">
                              Reply to ${contact.name}
                            </a>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
          </html>
        `,
        text: `
New Contact Message

From: ${contact.name}
Email: ${contact.email}
${contact.company ? `Company: ${contact.company}` : ""}

Subject: ${contact.subject}

Message:
${contact.message}

---
Reply to this email to respond directly to ${contact.name}.
        `.trim(),
      });

      if (error) {
        console.error("Resend error (contact notification):", error);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Failed to send contact notification:", error);
      return false;
    }
  }

  // Send confirmation to the person who submitted the contact form
  async sendContactConfirmation(contact: {
    name: string;
    email: string;
    subject: string;
  }): Promise<boolean> {
    try {
      const { error } = await resend.emails.send({
        from: this.getFromEmail(),
        to: contact.email,
        subject: `Thanks for reaching out!`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; padding: 40px 20px;">
                <tr>
                  <td align="center">
                    <table width="500" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1)); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 40px;">
                      <tr>
                        <td align="center">
                          <h1 style="color: #ffffff; font-size: 24px; font-weight: bold; margin: 0 0 8px 0;">
                            Thanks for reaching out<span style="color: #8b5cf6;">!</span>
                          </h1>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top: 24px;">
                          <p style="color: rgba(255,255,255,0.8); font-size: 16px; line-height: 1.7; margin: 0 0 16px 0;">
                            Hi ${contact.name},
                          </p>
                          <p style="color: rgba(255,255,255,0.7); font-size: 15px; line-height: 1.7; margin: 0 0 16px 0;">
                            Thank you for your message regarding "<strong style="color: #ffffff;">${contact.subject}</strong>". I've received it and will get back to you as soon as possible, usually within 24 hours.
                          </p>
                          <p style="color: rgba(255,255,255,0.7); font-size: 15px; line-height: 1.7; margin: 0 0 24px 0;">
                            In the meantime, feel free to check out my latest projects on my portfolio.
                          </p>
                          <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin: 0;">
                            Best regards,<br>
                            <span style="color: #ffffff; font-weight: 600;">Tommy</span>
                          </p>
                        </td>
                      </tr>
                    </table>
                    <p style="color: rgba(255,255,255,0.3); font-size: 12px; margin-top: 24px;">
                      This is an automated confirmation. Please don't reply to this email.
                    </p>
                  </td>
                </tr>
              </table>
            </body>
          </html>
        `,
        text: `
            Hi ${contact.name},

            Thank you for your message regarding "${contact.subject}". I've received it and will get back to you as soon as possible, usually within 24 hours.

            In the meantime, feel free to check out my latest projects on my portfolio.

            Best regards,
            Tommy

            ---
            This is an automated confirmation. Please don't reply to this email.
        `.trim(),
      });

      if (error) {
        console.error("Resend error (contact confirmation):", error);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Failed to send contact confirmation:", error);
      return false;
    }
  }
}

export const emailService = new EmailService();
export default emailService;

export const createWelcomeEmail=(name)=>{
    return`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Our Community</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
    <!-- Main Background Table -->
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f6f8; padding: 40px 0;">
        <tr>
            <td align="center">
                <!-- Container Table (600px) -->
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
                    
                    <!-- Header / Logo -->
                    <tr>
                        <td align="center" style="padding: 40px 0 20px 0; background-color: #4F46E5;">
                            <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0; letter-spacing: -0.5px;">BrandName</h1>
                        </td>
                    </tr>

                    <!-- Body Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="color: #111827; font-size: 22px; font-weight: 600; margin-top: 0; margin-bottom: 16px;">Welcome aboard, ${name} 👋</h2>
                            
                            <p style="color: #4B5563; font-size: 16px; line-height: 1.6; margin-top: 0; margin-bottom: 24px;">
                                We're thrilled to have you here. You've just unlocked access to our entire platform, resources, and community. Here are three quick steps to get you started:
                            </p>

                            <!-- Getting Started List -->
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 32px;">
                                <tr>
                                    <td width="36" valign="top" style="padding-bottom: 16px;">
                                        <span style="background-color: #EEF2FF; color: #4F46E5; font-weight: 700; border-radius: 50%; display: inline-block; width: 28px; height: 28px; text-align: center; line-height: 28px; font-size: 14px;">1</span>
                                    </td>
                                    <td style="padding-left: 12px; padding-bottom: 16px; color: #374151; font-size: 15px; line-height: 1.5;">
                                        <strong>Complete your profile:</strong> Add your details to help us personalize your experience.
                                    </td>
                                </tr>
                                <tr>
                                    <td width="36" valign="top" style="padding-bottom: 16px;">
                                        <span style="background-color: #EEF2FF; color: #4F46E5; font-weight: 700; border-radius: 50%; display: inline-block; width: 28px; height: 28px; text-align: center; line-height: 28px; font-size: 14px;">2</span>
                                    </td>
                                    <td style="padding-left: 12px; padding-bottom: 16px; color: #374151; font-size: 15px; line-height: 1.5;">
                                        <strong>Explore features:</strong> Take a quick 2-minute product tour to learn the layout.
                                    </td>
                                </tr>
                                <tr>
                                    <td width="36" valign="top">
                                        <span style="background-color: #EEF2FF; color: #4F46E5; font-weight: 700; border-radius: 50%; display: inline-block; width: 28px; height: 28px; text-align: center; line-height: 28px; font-size: 14px;">3</span>
                                    </td>
                                    <td style="padding-left: 12px; color: #374151; font-size: 15px; line-height: 1.5;">
                                        <strong>Join the community:</strong> Connect with thousands of creators in our official forum.
                                    </td>
                                </tr>
                            </table>

                            <!-- Call To Action Button -->
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="center" style="padding: 10px 0 20px 0;">
                                        <a href="https://example.com/dashboard" target="_blank" style="background-color: #4F46E5; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; padding: 14px 32px; border-radius: 6px; display: inline-block; box-shadow: 0 2px 4px rgba(79, 70, 229, 0.25);">Get Started Now</a>
                                    </td>
                                </tr>
                            </table>

                            <p style="color: #6B7280; font-size: 14px; line-height: 1.5; margin-top: 24px; margin-bottom: 0;">
                                If you have any questions, just reply directly to this email—our support team is always ready to help.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #F9FAFB; padding: 24px 30px; text-align: center; border-top: 1px solid #E5E7EB;">
                            <p style="color: #9CA3AF; font-size: 12px; margin: 0 0 8px 0;">
                                © 2026 BrandName Inc., 123 Tech Street, Suite 400, San Francisco, CA 94107
                            </p>
                            <p style="color: #9CA3AF; font-size: 12px; margin: 0;">
                                You received this because you registered for BrandName. <a href="https://example.com/unsubscribe" style="color: #6B7280; text-decoration: underline;">Unsubscribe</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`
}
export const verificationCodeEmail = (name, verificationCode) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verification Code</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0f172a; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #f8fafc;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
    <tr>
      <td align="center" style="padding: 40px 10px;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 520px; background-color: #1e293b; border-radius: 16px; border: 1px solid #334155; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.3);">
          
          <!-- Header -->
          <tr>
            <td align="center" style="padding: 30px; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: 1px;">
                Your App
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 35px 30px;">
              <h2 style="margin: 0 0 16px; color: #f8fafc; font-size: 20px; font-weight: 600;">
                Hello, ${name || 'User'}!
              </h2>
              <p style="margin: 0 0 24px; color: #94a3b8; font-size: 15px; line-height: 1.6;">
                Thank you for joining us. Please use the verification code below to verify your email address and complete your setup:
              </p>

              <!-- Verification Code Box -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 28px 0;">
                <tr>
                  <td align="center">
                    <div style="display: inline-block; background-color: #0f172a; border: 1px border-orange-500/30; border-radius: 12px; padding: 16px 32px; border: 1px solid #f97316;">
                      <span style="font-family: monospace; font-size: 32px; font-weight: 700; letter-spacing: 10px; color: #f97316;">
                        ${verificationCode}
                      </span>
                    </div>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 12px; color: #94a3b8; font-size: 14px; line-height: 1.5;">
                This code is valid for <strong>10 minutes</strong>. If you did not request this email, you can safely ignore it.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 20px 30px; background-color: #0f172a; border-top: 1px solid #334155;">
              <p style="margin: 0; color: #64748b; font-size: 12px;">
                &copy; ${new Date().getFullYear()} Your App Name. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};
import { ENV } from "../lib/env.js";
import { mg, sender } from "../lib/resend.js";
import { createWelcomeEmail, verificationCodeEmail } from "./emailTemplate.js";

export const sendWelcomeEmail = async (email, name, url) => {
  const html = createWelcomeEmail(name, url);
  try {
    const result = await mg.messages.create(ENV.MAILGUN_DOMAIN, {
      from: `${sender.name} <${sender.email}>`,
      to: email,
      subject: "Welcome to Flick",
      html,
    });

    console.log("Email sent:", result);
  } catch (error) {
    console.error("Mailgun email error:", error.message);
  }
};

export const sendVerifcationCode = async (email, name, code) => {
  const html = verificationCodeEmail(name, code);
  try {
    const result = await mg.messages.create(ENV.MAILGUN_DOMAIN, {
      from: `${sender.name} <${sender.email}>`,
      to: email,
      subject: "Your Echo verification code",
      html,
    });

    console.log("Email sent:", result);
  } catch (error) {
    console.error("Mailgun email error:", error.message);
  }
};

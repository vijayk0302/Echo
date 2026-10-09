import Mailgun from "mailgun.js";
import formData from "form-data";
import { ENV } from "./env.js";

const mailgun = new Mailgun(formData);

export const mg = mailgun.client({
  username: "api",
  key: ENV.MAILGUN_API_KEY,
});

export const sender = {
  name: ENV.EMAIL_FROM_NAME,
  email: `postmaster@${ENV.MAILGUN_DOMAIN}`,
};

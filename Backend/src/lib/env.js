import "dotenv/config";

export const ENV = {
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
  ARCJET_ENV: process.env.ARCJET_ENV,
  ARCJET_KEY: process.env.ARCJET_KEY,
  IMAGE_KIT_KEY:process.env.IMAGE_KIT_KEY,
  FRONT_END:process.env.FRONT_END,
  MAILGUN_API_KEY:process.env.MAILGUN_API_KEY,
  MAILGUN_DOMAIN:process.env.MAILGUN_DOMAIN
};

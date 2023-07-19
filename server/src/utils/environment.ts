import { cleanEnv, port, str, url, num } from 'envalid';

// Read more about envalid here: https://www.npmjs.com/package/envalid

/**
 * This file is used to validate the environment variables.
 */
const env = cleanEnv(process.env, {
  PORT: port(),
  LOG_LEVEL: str({ default: 'info' }),
  MONGO_URI: url(),
  NODE_ENV: str({ default: 'development' }),
  JWT_SECRET: str(),
  JWT_EXPIRE: str({ default: '30d' }),
  JWT_COOKIE_EXPIRE: num({ default: 30 }),
  STRIPE_SECRET_KEY: str(),
  STRIPE_WEBHOOK_SECRET: str(),
  MAPQUEST_API_KEY: str(),
  SMTP_HOST: str({ default: 'smtp.gmail.com' }),
  SMTP_PORT: num({ default: 587 }),
  SMTP_USER: str({ default: 'aseteam40' }),
  SMTP_PASSWORD: str({ default: 'ibvgrokidsuartuh' }),
  FROM_EMAIL: str({ default: 'aseteam40@gmail.com' }),
});

export default env;

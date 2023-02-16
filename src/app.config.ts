import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

export const AppConfigs = {
  title: 'Ecommerce',
  isProd: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development',
  healthUrl: process.env.HEALTH_URL,
  port: parseInt(process.env.HOST_PORT, 10) || 8889,
  db: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 27017,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  email: {
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASS,
  },
};

import dotenv from 'dotenv';

dotenv.config();

const { env } = process;

export default {
  port: env.PORT || 3000,
  database: {
    name: env.DB_NAME || 'squad',
    host: env.DB_HOST || 'localhost',
    port: env.DB_PORT || '3306',
    username: env.DB_USERNAME || 'root',
    password: env.DB_PASSWORD || 'root',
  },
  jwtSecret: env.JWT_SECRET || 'jsonwebtokensecret',
  tokenExpiresTime: 1000 * 60 * 60 * 24 * 30,
};

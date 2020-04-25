export const { ENV, VUE_APP_HOST } = process.env;
export const ENV_PRODUCTION = ENV === 'production';
export const HOST = VUE_APP_HOST || 'localhost';
export const API_ROOT = `http://${HOST}:3000/api/v1`;

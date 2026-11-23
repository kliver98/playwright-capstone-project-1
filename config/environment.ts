export interface EnvironmentConfig {
  baseUrl: string;
  apiTimeout: number;
  actionTimeout: number;
  navigationTimeout: number;
}

export const config: EnvironmentConfig = {
  baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
  apiTimeout: 30000,
  actionTimeout: 15000,
  navigationTimeout: 30000,
};

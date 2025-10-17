declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      DATABASE_URL: string;
      DB_CLIENT: string;
      DB_HOST: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      DB_PORT: string;
      ACESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
      ACESS_TOKEN_EXPIRE_TIME: string;
      REFRESH_TOKEN_EXPIRE_TIME: string;
    }
  }
}

export {};

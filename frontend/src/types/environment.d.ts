export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_PORT: number;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_ADDRESS: string;
      DB_TLS_CERT: string;
      REACT_APP_API_URL: string;
    }
  }
}

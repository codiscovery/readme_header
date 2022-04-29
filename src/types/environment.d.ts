declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PWD: string;
      PORT?: number;
      GITHUB_AUTH_TOKEN: string;
      NODE_ENV: "development" | "production";
      CLOUDINARY_APP_NAME: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;
      CLOUDINARY_BASE_URL: string;
      IMAGE_WIDTH: number;
      IMAGE_HEIGHT: number;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};

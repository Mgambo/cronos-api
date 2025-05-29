import dotenv from "dotenv";
dotenv.config();

const AppConfig = {
  PORT: process.env.PORT || 3000,
  API_KEY: process.env.API_KEY || "",
  RATE_LIMIT_MAX_REQUEST: process.env.RATE_LIMIT_MAX_REQUEST || 0,
};

export default AppConfig;

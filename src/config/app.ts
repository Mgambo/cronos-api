import dotenv from "dotenv";
dotenv.config();

const AppConfig = {
  PORT: process.env.PORT || 3000,
  API_KEY: process.env.API_KEY || "",
  RATE_LIMIT_MAX_REQUEST: Number(process.env.RATE_LIMIT_MAX_REQUEST) || 100,
  RATE_LIMIT_DURATION: Number(process.env.RATE_LIMIT_DURATION) || 1,
};

export default AppConfig;

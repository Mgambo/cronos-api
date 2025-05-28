import dotenv from "dotenv";
dotenv.config();

const AppConfig = {
  PORT: process.env.PORT || 3000,
};

export default AppConfig;

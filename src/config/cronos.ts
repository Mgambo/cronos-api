import dotenv from "dotenv";
dotenv.config();

const CronosConfig = {
  API_KEY: process.env.CRONOS_API_KEY || "",
};

export default CronosConfig;

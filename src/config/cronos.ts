import dotenv from "dotenv";

dotenv.config();
const CRONOS = {
  API_KEY: process.env.CRONOS_API_KEY || "",
};

export default CRONOS;

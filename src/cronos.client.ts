import { Client, CronosEvm } from "@crypto.com/developer-platform-client";
import { CronosConfig } from "./config";

export const initCronos = () => {
  Client.init({
    chain:
      process.env.NODE_ENV === "production"
        ? CronosEvm.Mainnet
        : CronosEvm.Testnet,
    apiKey: CronosConfig.API_KEY, // Explorer API,
  });

  console.info(`Initialized Cronos with chainId: ${Client.getChainId()}`);
};

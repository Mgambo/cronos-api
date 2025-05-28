import { Client, CronosEvm } from "@crypto.com/developer-platform-client";
import { CronosConfig } from "../config";

export const initCronos = () => {
  console.log(process.env.NODE_ENV);
  Client.init({
    chain: !process.env.IS_TESTNET ? CronosEvm.Mainnet : CronosEvm.Testnet,
    apiKey: CronosConfig.API_KEY, // Explorer API,
  });

  console.info(
    `Initialized Cronos with apiKey: ${Client.getApiKey()} and chainId: ${Client.getChainId()}`
  );
};

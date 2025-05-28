import { Client, CronosEvm } from "@crypto.com/developer-platform-client";
import { CRONOS } from "../config";

export const initCronos = () => {
  Client.init({
    chain:
      process.env.NODE_ENV === "production"
        ? CronosEvm.Mainnet
        : CronosEvm.Testnet,
    apiKey: CRONOS.API_KEY, // Explorer API,
    provider: "https://evm-t3.cronos.org",
  });

  console.info(
    `Initialized Cronos with apiKey: ${Client.getApiKey()} and chainId: ${Client.getChainId()}`
  );
};

import pino from "pino";

export const pinoConfig = {
  formatters: {
    level: (label: string) => {
      return { Level: label.toUpperCase() };
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
};

export const logger = pino({
  ...pinoConfig,
});

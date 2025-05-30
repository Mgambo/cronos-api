import { StatusCodes } from "http-status-codes";
import { analyticsService } from "../services/analytics.service";

export const getAnalytics = async (req, res) => {
  const apiKey = req.header("x-app-key");

  if (apiKey) {
    const stats = analyticsService.getUsageStats(apiKey);
    if (stats) {
      res.json(stats);
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No stats found for this API key" });
    }
  } else {
    // Admin endpoint - return all stats
    // TODO: Add proper admin authentication
    const allStats = analyticsService.getAllStats();
    res.json(Object.fromEntries(allStats));
  }
};

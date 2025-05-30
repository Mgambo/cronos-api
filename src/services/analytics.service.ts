import { RateLimiterMemory } from "rate-limiter-flexible";

interface ApiUsageStats {
  apiKey: string;
  totalRequests: number;
  lastUsed: Date;
  endpoints: Map<string, number>;
}

class AnalyticsService {
  private apiUsage: Map<string, ApiUsageStats>;

  constructor() {
    this.apiUsage = new Map();
  }

  trackRequest(apiKey: string, endpoint: string): void {
    const stats = this.apiUsage.get(apiKey) || {
      apiKey,
      totalRequests: 0,
      lastUsed: new Date(),
      endpoints: new Map(),
    };

    stats.apiKey = apiKey;
    stats.totalRequests++;
    stats.lastUsed = new Date();
    stats.endpoints.set(endpoint, (stats.endpoints.get(endpoint) || 0) + 1);

    this.apiUsage.set(apiKey, stats);
  }

  getUsageStats(apiKey: string): ApiUsageStats | undefined {
    return this.apiUsage.get(apiKey);
  }

  getAllStats(): Map<string, ApiUsageStats> {
    return this.apiUsage;
  }
}

export const analyticsService = new AnalyticsService();

import { searchCache } from './cache';
import { DataFetcher } from './dataFetcher';
import { config } from '../config/config';

export class SearchOptimizer {
  static async search(query: string) {
    if (query.length < config.search.minQueryLength) {
      throw new Error('Query too short');
    }

    const cacheKey = `search:${query}`;
    const cachedResults = searchCache.get(cacheKey);
    if (cachedResults) return cachedResults;

    const results = await this.fetchResults(query);
    const optimizedResults = this.rankResults(results);
    
    searchCache.set(cacheKey, optimizedResults);
    return optimizedResults;
  }

  private static async fetchResults(query: string) {
    const results = [];
    
    if (config.sources.nasa) {
      const nasaData = await DataFetcher.fetchNasaData(query);
      results.push(...nasaData);
    }

    return results.slice(0, config.search.maxResults);
  }

  private static rankResults(results: any[]) {
    return results.sort((a, b) => {
      // Add ranking logic here
      return b.relevance - a.relevance;
    });
  }
}

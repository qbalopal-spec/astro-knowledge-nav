import NodeCache from 'node-cache';
import { config } from '../config/config';

class SearchCache {
  private cache: NodeCache;

  constructor() {
    this.cache = new NodeCache({
      stdTTL: config.search.cacheExpiry,
      checkperiod: 120,
    });
  }

  get(key: string) {
    return this.cache.get(key);
  }

  set(key: string, value: any) {
    return this.cache.set(key, value);
  }

  delete(key: string) {
    return this.cache.del(key);
  }
}

export const searchCache = new SearchCache();

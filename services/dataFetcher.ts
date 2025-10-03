import axios from 'axios';
import { config } from '../config/config';

export class DataFetcher {
  private static async fetchWithRetry(url: string, retries = 3) {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        if (i === retries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
  }

  static async fetchNasaData(query: string) {
    const url = `${config.nasa.baseUrl}/search?q=${encodeURIComponent(query)}`;
    return this.fetchWithRetry(url);
  }
}

export const config = {
  nasa: {
    baseUrl: 'https://www.nasa.gov/osdr-api',
    apiKey: process.env.NASA_API_KEY || '',
    cacheTimeout: 3600, // 1 hour
  },
  search: {
    maxResults: 20,
    cacheExpiry: 1800, // 30 minutes
    minQueryLength: 3,
  },
  sources: {
    nasa: true,
    oxford: true,
    cache: true,
  }
};

import axios from 'axios';

const NASA_API_URL = 'https://osdr.nasa.gov/api/search';
const OXFORD_ARTICLE = {
  url: 'https://academic.oup.com/nar/article/49/D1/D1515/5932845?login=false',
  title: 'The NASA Open Science Data Repository',
  authors: ['John H. Smith', 'Jane Doe', '...'],
  abstract: 'The NASA Open Science Data Repository (OSDR) provides ...',
  // Add more metadata as needed
};

async function searchNasaOsdr(query: string) {
  const response = await axios.get(NASA_API_URL, {
    params: { q: query, limit: 10 }
  });
  return response.data.results.map((item: any) => ({
    source: 'NASA OSDR',
    title: item.title,
    url: item.url,
    snippet: item.summary || '',
  }));
}

function searchOxfordArticle(query: string) {
  // Simple keyword match in title/abstract
  const q = query.toLowerCase();
  const matches =
    OXFORD_ARTICLE.title.toLowerCase().includes(q) ||
    OXFORD_ARTICLE.abstract.toLowerCase().includes(q);
  return matches
    ? [{
        source: 'Oxford Academic',
        title: OXFORD_ARTICLE.title,
        url: OXFORD_ARTICLE.url,
        snippet: OXFORD_ARTICLE.abstract,
      }]
    : [];
}

export async function optimizedSearch(query: string) {
  const [nasaResults] = await Promise.all([
    searchNasaOsdr(query),
    // Could add more async sources here
  ]);
  const oxfordResults = searchOxfordArticle(query);

  // Merge and rank (simple: NASA first, then Oxford)
  return [...nasaResults, ...oxfordResults];
}
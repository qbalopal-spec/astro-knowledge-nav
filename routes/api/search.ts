import type { NextApiRequest, NextApiResponse } from 'next';
import { optimizedSearch } from '../../services/searchService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q } = req.query;
  if (!q || typeof q !== 'string') {
    res.status(400).json({ error: 'Missing query parameter' });
    return;
  }
  try {
    const results = await optimizedSearch(q);
    res.status(200).json({ results });
  } catch (error) {
    res.status(500).json({ error: 'Search failed' });
  }
}
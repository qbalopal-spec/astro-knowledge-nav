import { NextApiRequest, NextApiResponse } from 'next';
import { SearchOptimizer } from '../services/searchOptimizer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { q } = req.query;
    if (!q || typeof q !== 'string') {
      return res.status(400).json({ error: 'Invalid query parameter' });
    }

    const results = await SearchOptimizer.search(q);
    return res.status(200).json({ results });
  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

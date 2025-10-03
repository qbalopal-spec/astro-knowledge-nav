import { NextApiRequest, NextApiResponse } from 'next';
import { OsdrApiService } from '../../services/osdrApi';

const osdrApi = new OsdrApiService();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { path, ...query } = req.query;
  const pathArray = path as string[];

  try {
    switch (pathArray[0]) {
      case 'metadata':
        const metadataResult = await osdrApi.searchMetadata(query);
        return res.status(200).json(metadataResult);

      case 'dataset':
        const accession = pathArray[1];
        const datasetResult = await osdrApi.fetchDataset(accession);
        return res.status(200).json(datasetResult);

      case 'data':
        const dataResult = await osdrApi.queryData(query);
        return res.status(200).json(dataResult);

      default:
        return res.status(404).json({ error: 'Invalid endpoint' });
    }
  } catch (error) {
    console.error('OSDR API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

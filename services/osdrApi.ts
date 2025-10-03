import axios from 'axios';
import { OsdrQueryParams, OsdrResponse } from '../types/osdr';

export class OsdrApiService {
  private baseUrl = 'https://www.nasa.gov/osdr-api/v2';

  private buildQueryString(params: OsdrQueryParams): string {
    const queryParts: string[] = [];
    
    if (params.accession) {
      queryParts.push(`id.accession=${encodeURIComponent(params.accession)}`);
    }
    
    if (params.dataType) {
      queryParts.push(`file.data%20type=${encodeURIComponent(params.dataType)}`);
    }

    if (params.columns?.length) {
      queryParts.push(...params.columns.map(col => `column.${encodeURIComponent(col)}`));
    }

    return queryParts.join('&');
  }

  async searchMetadata(params: OsdrQueryParams): Promise<OsdrResponse> {
    const queryString = this.buildQueryString(params);
    const response = await axios.get(`${this.baseUrl}/query/metadata/?${queryString}`);
    return response.data;
  }

  async fetchDataset(accession: string): Promise<OsdrResponse> {
    const response = await axios.get(`${this.baseUrl}/dataset/${accession}/`);
    return response.data;
  }

  async queryData(params: OsdrQueryParams): Promise<OsdrResponse> {
    const queryString = this.buildQueryString(params);
    const response = await axios.get(`${this.baseUrl}/query/data/?${queryString}`);
    return response.data;
  }
}

export interface OsdrMetadata {
  id: {
    accession: string;
    assayName?: string;
    sampleName?: string;
  };
  investigation?: Record<string, any>;
  study?: {
    characteristics?: Record<string, any>;
    factorValue?: Record<string, any>;
    parameterValue?: Record<string, any>;
  };
  file?: {
    dataType?: string;
    fileName?: string;
  };
}

export interface OsdrQueryParams {
  accession?: string;
  dataType?: string;
  characteristics?: Record<string, string>;
  factorValue?: Record<string, string>;
  columns?: string[];
  format?: 'json' | 'csv' | 'browser' | 'raw';
}

export interface OsdrResponse<T = any> {
  data: T;
  metadata?: OsdrMetadata;
}

import { useState, useEffect } from 'react';
import { OsdrQueryParams, OsdrResponse } from '../types/osdr';

export function useOsdrQuery(params: OsdrQueryParams) {
  const [data, setData] = useState<OsdrResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const queryString = new URLSearchParams(params as any).toString();
    
    fetch(`/api/osdr/metadata?${queryString}`)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [params]);

  return { data, loading, error };
}

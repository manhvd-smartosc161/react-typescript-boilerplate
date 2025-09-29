import { useState, useEffect, useRef } from 'react';

interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  enabled?: boolean;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

/**
 * Custom hook for API response caching
 * Reduces redundant API calls and improves performance
 */
export function useApiCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: CacheOptions = {},
) {
  const { ttl = 5 * 60 * 1000, enabled = true } = options; // Default 5 minutes
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const cacheRef = useRef<Map<string, CacheEntry<T>>>(new Map());

  const fetchData = async (forceRefresh = false) => {
    if (!enabled) {
      setLoading(true);
      try {
        const result = await fetcher();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
      return;
    }

    const cache = cacheRef.current;
    const cached = cache.get(key);
    const now = Date.now();

    // Check if cached data is still valid
    if (!forceRefresh && cached && now - cached.timestamp < ttl) {
      setData(cached.data);
      return;
    }

    setLoading(true);
    try {
      const result = await fetcher();

      // Cache the result
      cache.set(key, {
        data: result,
        timestamp: now,
      });

      setData(result);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [key]);

  const refetch = () => fetchData(true);
  const clearCache = () => cacheRef.current.delete(key);

  return {
    data,
    loading,
    error,
    refetch,
    clearCache,
  };
}

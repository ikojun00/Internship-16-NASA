import { useState, useEffect } from "react";

export type ApiResponse<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

const getApiKey = (): string => {
  return import.meta.env.VITE_NASA_API_KEY as string;
};

const fetchFromNasa = async <T,>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `NASA API error: ${response.status} ${response.statusText}`
    );
  }

  return (await response.json()) as T;
};

export const useNasaApi = <T,>(
  endpoint: string,
  params: Record<string, string> = {},
  shouldFetch: boolean = true
): ApiResponse<T> => {
  const [state, setState] = useState<ApiResponse<T>>({
    data: null,
    loading: shouldFetch,
    error: null,
  });

  useEffect(() => {
    if (!shouldFetch) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    const fetchData = async () => {
      setState((prev) => ({ ...prev, loading: true }));

      try {
        const queryParams = new URLSearchParams({
          ...params,
          api_key: getApiKey(),
        }).toString();

        const baseUrl = "https://api.nasa.gov";
        const url = `${baseUrl}${endpoint}?${queryParams}`;

        const data = await fetchFromNasa<T>(url);
        setState({ data, loading: false, error: null });
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error : new Error("Unknown error"),
        });
      }
    };

    fetchData();
  }, [endpoint, JSON.stringify(params), shouldFetch]);

  return state;
};

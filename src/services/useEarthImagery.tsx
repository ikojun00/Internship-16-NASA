import { useNasaApi } from "./useNasaApi";

export type EarthImageryResponse = {
  date: string;
  id: string;
  resource: {
    dataset: string;
    planet: string;
  };
  url: string;
};

export const useEarthImagery = (
  lat: number | null,
  lon: number | null,
  date: string | null
) => {
  const params: Record<string, string> = {};
  
  if (lat !== null) params.lat = lat.toString();
  if (lon !== null) params.lon = lon.toString();
  if (date !== null) params.date = date;
  if (lat !== null && lon !== null) params.dim = "0.15";

  const shouldFetch = lat !== null && lon !== null && date !== null;
  
  return useNasaApi<EarthImageryResponse>(
    "/planetary/earth/assets",
    shouldFetch ? params : { skip: "true" }
  );
};
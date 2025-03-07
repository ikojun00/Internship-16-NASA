import { useState, useEffect } from "react";
import { MarsPhoto, UseMarsRoverPhotosProps } from "../types/MarsRoverTypes";
import { useNasaApi } from "./useNasaApi";

export const useMarsRoverPhotos = ({
  rover,
  earth_date,
  camera,
  page = 1,
}: UseMarsRoverPhotosProps) => {
  const [photos, setPhotos] = useState<MarsPhoto[]>([]);

  const endpoint = `/mars-photos/api/v1/rovers/${rover}/photos`;
  const params: Record<string, string> = { page: page.toString() };

  if (earth_date) params.earth_date = earth_date;
  if (camera) params.camera = camera;

  const { data, loading, error } = useNasaApi<{ photos: MarsPhoto[] }>(
    endpoint,
    params,
    true
  );

  useEffect(() => {
    if (data?.photos) {
      setPhotos(data.photos);
    }
  }, [data]);

  return { photos, loading, error };
};

export const useMarsPhoto = (id: string) => {
  const { data, loading, error } = useNasaApi<{ photo: MarsPhoto }>(
    `/mars-photos/api/v1/photos/${id}`,
    {},
    true
  );

  return {
    photo: data?.photo || null,
    loading,
    error,
  };
};

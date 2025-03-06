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
  const [hasMore, setHasMore] = useState(true);

  const endpoint = `/mars-photos/api/v1/rovers/${rover}/photos`;
  const params: Record<string, string> = { page: page.toString() };

  if (earth_date) params.earth_date = earth_date;
  if (camera) params.camera = camera;

  const { data, loading, error } = useNasaApi<{ photos: MarsPhoto[] }>(
    endpoint,
    params
  );

  useEffect(() => {
    if (data?.photos) {
      setPhotos((prev) =>
        page === 1 ? data.photos : [...prev, ...data.photos]
      );
      setHasMore(data.photos.length > 0);
    }
  }, [data, page]);

  return { photos, loading, error, hasMore };
};

export const useMarsPhoto = (id: string) => {
  const { data, loading, error } = useNasaApi<{ photo: MarsPhoto }>(
    `/mars-photos/api/v1/photos/${id}`
  );

  return {
    photo: data?.photo || null,
    loading,
    error,
  };
};
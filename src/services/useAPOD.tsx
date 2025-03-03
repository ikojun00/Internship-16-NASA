import { useState } from "react";
import { useNasaApi } from "./useNasaApi";
import { APODItem } from "../types/APODItem";

export const useAPODGallery = (count: number = 20) => {
  const [page, setPage] = useState(1);
  const [allItems, setAllItems] = useState<APODItem[]>([]);

  const today = new Date();
  const endDate = today.toISOString().split("T")[0];

  const startDate = new Date(today);
  startDate.setDate(today.getDate() - count * page + count);
  const start = startDate.toISOString().split("T")[0];

  const { data, loading, error } = useNasaApi<APODItem[]>("/planetary/apod", {
    start_date: start,
    end_date: endDate,
    thumbs: "true",
  });

  if (data && !loading && !allItems.some((item) => data.includes(item))) {
    setAllItems((prevItems) => {
      const combinedItems = [...prevItems, ...data];
      return Array.from(
        new Map(combinedItems.map((item) => [item.date, item])).values()
      ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
  }

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return {
    items: allItems,
    loading,
    error,
    loadMore,
    hasMore: page < 10,
  };
};

export const useAPODByDate = (date: string) => {
  return useNasaApi<APODItem>("/planetary/apod", { date });
};

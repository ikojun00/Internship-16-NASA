import { NEOResponse } from "../types/NEOTrackerTypes";
import { useNasaApi } from "./useNasaApi";

export const useNEOTracker = (startDate: string, endDate: string) => {
  const params = {
    start_date: startDate,
    end_date: endDate,
  };

  return useNasaApi<NEOResponse>("/neo/rest/v1/feed", params, true);
};

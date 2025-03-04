import React, { useRef, useCallback, useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import withLoading from "../../hoc/withLoading";
import { useAPODGallery } from "../../services/useAPOD";
import APODCard from "../../components/APOD/APODCard";
import NoAPODCards from "../../components/APOD/NoAPODCards";

const APOD: React.FC = () => {
  const { theme } = useTheme();
  const { items, loading, error, loadMore, hasMore } = useAPODGallery();

  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMore]
  );

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const filteredItems = items.filter((item) => {
    const itemDate = item.date;
    const afterStart = !startDate || itemDate >= startDate;
    const beforeEnd = !endDate || itemDate <= endDate;
    return afterStart && beforeEnd;
  });

  const themeClasses = {
    container: theme === "dark" ? "bg-gray-900" : "bg-white",
    text: theme === "dark" ? "text-white" : "text-gray-800",
    label: theme === "dark" ? "text-gray-300" : "text-gray-700",
    input:
      theme === "dark"
        ? "bg-gray-800 border-gray-600 text-white"
        : "bg-white border-gray-300 text-gray-800",
  };

  const APODWithLoading = withLoading(() => (
    <div className={`min-h-screen ${themeClasses.container}`}>
      <h1
        className={`text-3xl font-bold mb-8 text-center ${themeClasses.text}`}
      >
        Astronomy Picture of the Day
      </h1>

      <div className="max-w-md mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="start-date"
              className={`block mb-2 text-sm font-medium ${themeClasses.label}`}
            >
              Start Date:
            </label>
            <input
              id="start-date"
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className={`w-full p-2 rounded-md border ${themeClasses.input}`}
            />
          </div>
          <div>
            <label
              htmlFor="end-date"
              className={`block mb-2 text-sm font-medium ${themeClasses.label}`}
            >
              End Date:
            </label>
            <input
              id="end-date"
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              className={`w-full p-2 rounded-md border ${themeClasses.input}`}
            />
          </div>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="max-w-2xl mx-auto">
          <NoAPODCards />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredItems.map((item, index) => {
            if (index === filteredItems.length - 1) {
              return (
                <div ref={lastItemRef} key={item.date}>
                  <APODCard item={item} theme={theme} />
                </div>
              );
            } else {
              return <APODCard key={item.date} item={item} theme={theme} />;
            }
          })}
        </div>
      )}
    </div>
  ));

  return (
    <APODWithLoading loading={loading && items.length === 0} error={error} />
  );
};

export default APOD;

import React, { useRef, useCallback, useState } from "react";
import { useAPODGallery } from "../../services/useAPOD";
import APODCard from "../../components/APOD/APODCard";
import withLoading from "../../hoc/withLoading";
import { useTheme } from "../../contexts/ThemeContext";
import {
  PageContainer,
  PageHeader,
  FilterSection,
  FormInput,
  EmptyState,
} from "../../components/UI";

const APOD: React.FC = () => {
  const { items, loading, error, loadMore, hasMore } = useAPODGallery();
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const { theme } = useTheme();

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

  const APODWithLoading = withLoading(() => (
    <PageContainer>
      <PageHeader title="Astronomy Picture of the Day" />

      <FilterSection>
        <FormInput
          id="start-date"
          type="date"
          label="Start Date"
          value={startDate}
          onChange={handleStartDateChange}
        />
        <FormInput
          id="end-date"
          type="date"
          label="End Date"
          value={endDate}
          onChange={handleEndDateChange}
        />
      </FilterSection>

      {filteredItems.length === 0 ? (
        <EmptyState
          message="No astronomy pictures found for the selected date range."
          icon="🔭"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredItems.map((item, index) => {
            if (index === filteredItems.length - 1) {
              return (
                <div
                  className={`rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl ${
                    theme === "dark"
                      ? "bg-gray-800 text-white"
                      : "bg-white text-gray-800"
                  }`}
                  ref={lastItemRef}
                  key={item.date}
                >
                  <APODCard item={item} theme={theme} />
                </div>
              );
            } else {
              return <APODCard key={item.date} item={item} theme={theme} />;
            }
          })}
        </div>
      )}
    </PageContainer>
  ));

  return (
    <APODWithLoading loading={loading && items.length === 0} error={error} />
  );
};

export default APOD;

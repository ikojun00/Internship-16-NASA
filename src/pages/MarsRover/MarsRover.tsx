import React, { useState } from "react";
import MarsRoverCard from "../../components/MarsRover/MarsRoverCard";
import { useMarsRoverPhotos } from "../../services/useMarsRover";
import withLoading from "../../hoc/withLoading";
import {
  PageContainer,
  PageHeader,
  FilterSection,
  FormSelect,
  FormInput,
  EmptyState,
  LoadMoreButton,
} from "../../components/UI";
import { useTheme } from "../../contexts/ThemeContext";

const rovers = ["Curiosity", "Opportunity", "Spirit"];
const cameras = ["FHAZ", "RHAZ", "NAVCAM"];

const MarsRover: React.FC = () => {
  const [selectedRover, setSelectedRover] = useState(rovers[0]);
  const [selectedCamera, setSelectedCamera] = useState("");
  const [selectedDate, setSelectedDate] = useState("2015-06-03");
  const [page, setPage] = useState(1);
  const { theme } = useTheme();

  const { photos, loading, error, hasMore } = useMarsRoverPhotos({
    rover: selectedRover.toLowerCase(),
    earth_date: selectedDate,
    camera: selectedCamera,
    page,
  });

  const handleLoadMore = () => setPage((prev) => prev + 1);

  const roverOptions = rovers.map((rover) => ({ value: rover, label: rover }));
  const cameraOptions = [
    { value: "", label: "All Cameras" },
    ...cameras.map((camera) => ({ value: camera, label: camera })),
  ];

  const MarsRoverWithLoading = withLoading(() => (
    <PageContainer>
      <PageHeader title="Mars Rover Photos" />

      <FilterSection>
        <FormSelect
          id="rover-select"
          label="Rover"
          value={selectedRover}
          onChange={(e) => {
            setSelectedRover(e.target.value);
            setPage(1);
          }}
          options={roverOptions}
        />

        <FormSelect
          id="camera-select"
          label="Camera"
          value={selectedCamera}
          onChange={(e) => {
            setSelectedCamera(e.target.value);
            setPage(1);
          }}
          options={cameraOptions}
        />

        <FormInput
          id="date-select"
          type="date"
          label="Date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </FilterSection>

      {photos.length === 0 ? (
        <EmptyState
          message="No rover photos found for the selected filters."
          icon="🤖"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {photos.map((photo) => (
            <MarsRoverCard key={photo.id} photo={photo} theme={theme} />
          ))}
        </div>
      )}

      {hasMore && <LoadMoreButton onClick={handleLoadMore} loading={loading} />}
    </PageContainer>
  ));

  return (
    <MarsRoverWithLoading
      loading={loading && photos.length === 0}
      error={error}
    />
  );
};

export default MarsRover;

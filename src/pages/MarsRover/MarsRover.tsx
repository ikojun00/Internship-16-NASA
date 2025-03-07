import React, { useState, useEffect } from "react";
import MarsRoverCard from "../../components/UI/Card/MarsRoverCard";
import { useMarsRoverPhotos } from "../../services/useMarsRover";
import withLoading from "../../hoc/withLoading";
import { useTheme } from "../../contexts/ThemeContext";
import PageContainer from "../../components/UI/Page/PageContainer";
import PageHeader from "../../components/UI/Page/PageHeader";
import FilterSection from "../../components/UI/FilterSection";
import FormSelect from "../../components/UI/Form/FormSelect";
import FormInput from "../../components/UI/Form/FormInput";
import EmptyState from "../../components/UI/EmptyState";
import Pagination from "../../components/UI/Pagination";

const rovers = ["Curiosity", "Opportunity", "Spirit"];
const cameras = ["FHAZ", "RHAZ", "NAVCAM"];

const MarsRover: React.FC = () => {
  const [selectedRover, setSelectedRover] = useState(rovers[0]);
  const [selectedCamera, setSelectedCamera] = useState("");
  const [selectedDate, setSelectedDate] = useState("2015-06-03");
  const [page, setPage] = useState(1);
  const [disableNext, setDisableNext] = useState(false);
  const { theme } = useTheme();

  const { photos, loading, error } = useMarsRoverPhotos({
    rover: selectedRover.toLowerCase(),
    earth_date: selectedDate,
    camera: selectedCamera.toLowerCase() || undefined,
    page,
  });

  const { photos: nextPagePhotos, loading: nextPageLoading } = useMarsRoverPhotos({
    rover: selectedRover.toLowerCase(),
    earth_date: selectedDate,
    camera: selectedCamera.toLowerCase() || undefined,
    page: page + 1,
  });

  useEffect(() => {
    if (!nextPageLoading) {
      setDisableNext(nextPagePhotos.length === 0);
    }
  }, [nextPagePhotos, nextPageLoading]);

  useEffect(() => {
    setPage(1);
    setDisableNext(false);
  }, [selectedRover, selectedCamera, selectedDate]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
          }}
          options={roverOptions}
        />

        <FormSelect
          id="camera-select"
          label="Camera"
          value={selectedCamera}
          onChange={(e) => {
            setSelectedCamera(e.target.value);
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

      {photos.length === 0 && !loading ? (
        <EmptyState
          message="No rover photos found for the selected filters."
          icon="🤖"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {photos.map((photo) => (
            <MarsRoverCard
              key={photo.id}
              photo={photo}
              theme={theme}
            />
          ))}
        </div>
      )}

      {photos.length > 0 && (
        <div className="mt-8">
          <Pagination 
            currentPage={page}
            onPageChange={handlePageChange}
            disableNext={disableNext}
            loading={loading}
          />
        </div>
      )}
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
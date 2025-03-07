import { useState } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useEarthImagery } from "../services/useEarthImagery";
import { useLocalStorage } from "../services/useLocalStorage";
import withLoading from "../hoc/withLoading";
import {
  PageContainer,
  PageHeader,
  FormInput,
  Button,
  SavedLocationItem,
  FilterSection,
} from "../components/UI";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapClickHandler = ({ onClick }: { onClick: (e: any) => void }) => {
  useMapEvents({ click: onClick });
  return null;
};

const EarthImagery = () => {
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const { data, loading, error } = useEarthImagery(
    selectedLocation?.lat || null,
    selectedLocation?.lon || null,
    selectedDate
  );

  const [favorites, setFavorites] = useLocalStorage<
    Array<{ lat: number; lon: number; name: string }>
  >("earthImageryFavorites", []);

  const handleMapClick = (e: any) => {
    setSelectedLocation({ lat: e.latlng.lat, lon: e.latlng.lng });
  };

  const handleAddFavorite = () => {
    if (!selectedLocation) return;
    const name = prompt("Enter a name for this location:");
    if (name) setFavorites([...favorites, { ...selectedLocation, name }]);
  };

  const handleDeleteFavorite = (index: number) => {
    const updatedFavorites = favorites.filter((_, i) => i !== index);
    setFavorites(updatedFavorites);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const EarthImageryContent = () => (
    <PageContainer>
      <PageHeader title="Earth Imagery" />

      <FilterSection>
        <FormInput
          id="earth-date"
          type="date"
          label="Date"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </FilterSection>

      <div className="h-96 flex flex-col md:flex-row gap-4 mb-6">
        <div
          className={`flex flex-col items-center ${
            data?.url ? "flex-grow" : "w-full"
          }`}
        >
          <MapContainer
            center={[50, 20]}
            zoom={3}
            className="h-full w-full rounded-lg shadow-lg z-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapClickHandler onClick={handleMapClick} />
            {selectedLocation && (
              <Marker position={[selectedLocation.lat, selectedLocation.lon]} />
            )}
          </MapContainer>
        </div>

        {data?.url && (
          <div className="flex flex-col">
            <img
              src={data.url}
              alt="Satellite"
              className="rounded-lg shadow-lg w-full max-h-96 object-contain"
            />
          </div>
        )}
      </div>

      <div className="flex justify-center mt-4 mb-8">
        <Button onClick={handleAddFavorite} disabled={!selectedLocation}>
          Add to Favorites
        </Button>
      </div>

      <div>
        <h2 className="text-xl font-bold my-4">Saved Locations</h2>
        {favorites.length === 0 ? (
          <p>No saved locations yet. Click on the map to select a location.</p>
        ) : (
          <ul>
            {favorites.map((fav, index) => (
              <SavedLocationItem
                key={index}
                name={fav.name}
                onView={() => setSelectedLocation(fav)}
                onDelete={() => handleDeleteFavorite(index)}
              />
            ))}
          </ul>
        )}
      </div>
    </PageContainer>
  );

  const EarthImageryWithLoading = withLoading(EarthImageryContent);
  
  return (
    <EarthImageryWithLoading 
      loading={loading && !data} 
      error={error} 
    />
  );
};

export default EarthImagery;
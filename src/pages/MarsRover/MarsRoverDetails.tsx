import React from "react";
import { useParams, Link } from "react-router-dom";
import withLoading from "../../hoc/withLoading";
import { useMarsPhoto } from "../../services/useMarsRover";
import PageContainer from "../../components/UI/Page/PageContainer";
import LeftArrow from "../../components/UI/LeftArrow";
import PageHeader from "../../components/UI/Page/PageHeader";
import Card from "../../components/UI/Card/Card";

const MarsRoverDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { photo, loading, error } = useMarsPhoto(id || "");

  const DetailsContent = () => {
    if (!photo) return null;

    return (
      <PageContainer>
        <Link
          to="/mars-rover"
          className="flex items-center font-medium mb-4 text-blue-500"
        >
          <LeftArrow />
          Back to Gallery
        </Link>

        <PageHeader title={`Mars Photo: ${photo.id}`} />

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-2/3">
            <img
              src={photo.img_src}
              alt={`Mars photo ${photo.id}`}
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          <div className="grid grid-rows-1 md:grid-rows-2 gap-4 md:w-1/3">
            <Card>
              <h2 className="text-2xl font-bold mb-4">Photo Details</h2>
              <p>
                <strong>Rover:</strong> {photo.rover.name}
              </p>
              <p>
                <strong>Camera:</strong> {photo.camera.full_name}
              </p>
              <p>
                <strong>Earth Date:</strong>{" "}
                {new Date(photo.earth_date).toLocaleDateString()}
              </p>
              <p>
                <strong>Sol:</strong> {photo.sol}
              </p>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold mb-4">Rover Info</h2>
              <p>
                <strong>Launch Date:</strong>{" "}
                {new Date(photo.rover.launch_date).toLocaleDateString()}
              </p>
              <p>
                <strong>Landing Date:</strong>{" "}
                {new Date(photo.rover.landing_date).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong> {photo.rover.status}
              </p>
            </Card>
          </div>
        </div>
      </PageContainer>
    );
  };

  const DetailsWithLoading = withLoading(DetailsContent);
  return <DetailsWithLoading loading={loading} error={error} />;
};

export default MarsRoverDetails;

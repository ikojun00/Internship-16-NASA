import React from "react";
import { useParams, Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import withLoading from "../../hoc/withLoading";
import { useAPODByDate } from "../../services/useAPOD";
import {
  PageContainer,
  PageHeader,
  Card,
  LeftArrow,
} from "../../components/UI";

const APODDetails: React.FC = () => {
  const { date } = useParams<{ date: string }>();
  const { themeClasses } = useTheme();
  const { data, loading, error } = useAPODByDate(date || "");

  const DetailContent = () => {
    if (!data) return null;

    return (
      <PageContainer>
        <Link
          to="/apod"
          className="flex items-center font-medium mb-4 text-blue-500"
        >
          <LeftArrow />
          Back to Gallery
        </Link>

        <PageHeader title={data.title} />

        <div className="flex flex-col gap-4 max-w-4xl mx-auto">
          <div className={`${themeClasses.secondaryText}`}>
            <span className="font-medium">Date:</span>{" "}
            {new Date(data.date).toLocaleDateString()}
            {data.copyright && (
              <span className="ml-4">
                <span className="font-medium">Credit:</span> {data.copyright}
              </span>
            )}
          </div>

          <div className="mb-2">
            {data.media_type === "image" ? (
              <div className="relative">
                <img
                  src={data.hdurl || data.url}
                  alt={data.title}
                  className="w-full rounded-lg shadow-lg"
                />
                {data.hdurl && (
                  <a
                    href={data.hdurl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-md"
                  >
                    View HD Image
                  </a>
                )}
              </div>
            ) : (
              <div className="aspect-video">
                <iframe
                  src={data.url}
                  title={data.title}
                  className="w-full h-full rounded-lg shadow-lg"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>

          <Card>
            <div className={themeClasses.text}>
              <p>{data.explanation}</p>
            </div>
          </Card>
        </div>
      </PageContainer>
    );
  };

  const DetailsWithLoading = withLoading(DetailContent);
  return <DetailsWithLoading loading={loading} error={error} />;
};

export default APODDetails;

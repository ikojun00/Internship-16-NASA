import React from "react";
import { useParams, Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import withLoading from "../../hoc/withLoading";
import { useAPODByDate } from "../../services/useAPOD";

const APODDetails: React.FC = () => {
  const { date } = useParams<{ date: string }>();
  const { theme } = useTheme();
  const { data, loading, error } = useAPODByDate(date || "");

  const themeClasses = {
    container: theme === "dark" ? "bg-gray-900" : "bg-white",
    text: theme === "dark" ? "text-white" : "text-gray-800",
    secondaryText: theme === "dark" ? "text-gray-300" : "text-gray-600",
    link:
      theme === "dark"
        ? "text-blue-400 hover:text-blue-300"
        : "text-blue-600 hover:text-blue-800",
  };

  const DetailContent = () => {
    if (!data) return null;

    return (
      <div className={`min-h-screen mb-16 ${themeClasses.container}`}>
        <div className="flex flex-col gap-4 max-w-4xl mx-auto">
          <Link
            to="/apod"
            className={`inline-flex items-center font-medium ${themeClasses.link}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Gallery
          </Link>

          <h1 className={`text-3xl font-bold ${themeClasses.text}`}>
            {data.title}
          </h1>

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

          <div className={themeClasses.text}>
            <p>{data.explanation}</p>
          </div>
        </div>
      </div>
    );
  };

  const DetailsWithLoading = withLoading(DetailContent);

  return <DetailsWithLoading loading={loading} error={error} />;
};

export default APODDetails;

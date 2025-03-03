import { Link } from "react-router-dom";

const APODCard: React.FC<{ item: any; theme: "light" | "dark" }> = ({
  item,
  theme,
}) => {
  return (
    <Link
      to={`/apod/${item.date}`}
      className={`rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div className="relative aspect-video overflow-hidden">
        {item.media_type === "image" ? (
          <img
            src={item.url}
            alt={item.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-black">
            <span className="text-white">Video Content</span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 text-sm">
          {new Date(item.date).toLocaleDateString()}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{item.title}</h3>
        <p
          className={`text-sm line-clamp-3 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {item.explanation}
        </p>
      </div>
    </Link>
  );
};

export default APODCard;

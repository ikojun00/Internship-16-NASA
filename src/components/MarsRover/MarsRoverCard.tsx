import { Link } from "react-router-dom";

interface MarsRoverCardProps {
  photo: {
    id: number;
    img_src: string;
    earth_date: string;
    camera: { full_name: string };
    rover: { name: string };
  };
  theme: "light" | "dark";
}

const MarsRoverCard: React.FC<MarsRoverCardProps> = ({ photo, theme }) => {
  return (
    <Link
      to={`/mars-rover/${photo.id}`}
      className={`rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      <img
        src={photo.img_src}
        alt={`Mars photo from ${photo.rover.name}`}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{photo.rover.name}</h3>
        <p
          className={`text-sm ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {photo.camera.full_name}
        </p>
        <p
          className={`text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {new Date(photo.earth_date).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
};

export default MarsRoverCard;

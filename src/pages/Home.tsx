import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import satellite from "../assets/satellite.svg";

const Home: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="mx-auto max-w-7xl flex flex-col items-center gap-16 mb-16">
      <div className="max-w-2xl text-center flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold">Welcome to NASA Explorer</h1>
        <div className="relative w-64 h-64 animate-orbit">
          <img
            src={satellite}
            alt="Satellite floating in space"
            className="w-full h-full"
          />
        </div>
        <p className="text-lg">
          Explore the wonders of space with data from NASA's APIs. View stunning
          astronomy pictures, check out Mars rover photos, track near-Earth
          objects, and explore satellite imagery of Earth.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        <Link
          to="/apod"
          className={`p-6 rounded-lg ${
            theme === "dark"
              ? "bg-gray-800 hover:bg-gray-700"
              : "bg-blue-700 hover:bg-blue-800 text-white"
          } flex flex-col items-center text-center gap-4`}
        >
          <span className="text-4xl">🔭</span>
          <h2 className="text-xl font-semibold">
            Astronomy Picture of the Day
          </h2>
          <p className="text-sm">
            Discover the cosmos with NASA's featured astronomy images
          </p>
        </Link>

        <Link
          to="/mars-rover"
          className={`p-6 rounded-lg ${
            theme === "dark"
              ? "bg-gray-800 hover:bg-gray-700"
              : "bg-blue-700 hover:bg-blue-800 text-white"
          } flex flex-col items-center text-center gap-4`}
        >
          <span className="text-4xl">🤖</span>
          <h2 className="text-xl font-semibold">Mars Rover Photos</h2>
          <p className="text-sm">View images captured by NASA's Mars rovers</p>
        </Link>

        <Link
          to="/neo-tracker"
          className={`p-6 rounded-lg ${
            theme === "dark"
              ? "bg-gray-800 hover:bg-gray-700"
              : "bg-blue-700 hover:bg-blue-800 text-white"
          } flex flex-col items-center text-center gap-4`}
        >
          <span className="text-4xl">☄️</span>
          <h2 className="text-xl font-semibold">Near Earth Objects</h2>
          <p className="text-sm">
            Track asteroids and other objects passing near Earth
          </p>
        </Link>

        <Link
          to="/earth-imagery"
          className={`p-6 rounded-lg ${
            theme === "dark"
              ? "bg-gray-800 hover:bg-gray-700"
              : "bg-blue-700 hover:bg-blue-800 text-white"
          } flex flex-col items-center text-center gap-4`}
        >
          <span className="text-4xl">🌎</span>
          <h2 className="text-xl font-semibold">Earth Imagery</h2>
          <p className="text-sm">
            Explore satellite images of various locations on Earth
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Home;

import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import satellite from "../assets/satellite.svg";

const Home: React.FC = () => {
  const { theme } = useTheme();

  const themeClasses = {
    container:
      theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800",
    cardBase:
      theme === "dark"
        ? "bg-gray-800 hover:bg-gray-700 text-white"
        : "bg-blue-700 hover:bg-blue-800 text-white",
    text: theme === "dark" ? "text-gray-300" : "text-gray-100",
    title: theme === "dark" ? "text-white" : "text-gray-800",
  };

  return (
    <div
      className={`mx-auto max-w-7xl flex flex-col items-center gap-16 mb-16 ${themeClasses.container}`}
    >
      <div className="max-w-2xl text-center flex flex-col items-center gap-4">
        <h1 className={`text-4xl font-bold ${themeClasses.title}`}>
          Welcome to NASA Explorer
        </h1>
        <div className="relative w-64 h-64 animate-orbit">
          <img
            src={satellite}
            alt="Satellite floating in space"
            className="w-full h-full"
          />
        </div>
        <p
          className={`text-lg ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Explore the wonders of space with data from NASA's APIs. View stunning
          astronomy pictures, check out Mars rover photos, track near-Earth
          objects, and explore satellite imagery of Earth.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {[
          {
            to: "/apod",
            emoji: "🔭",
            title: "Astronomy Picture of the Day",
            description:
              "Discover the cosmos with NASA's featured astronomy images",
          },
          {
            to: "/mars-rover",
            emoji: "🤖",
            title: "Mars Rover Photos",
            description: "View images captured by NASA's Mars rovers",
          },
          {
            to: "/neo-tracker",
            emoji: "☄️",
            title: "Near Earth Objects",
            description: "Track asteroids and other objects passing near Earth",
          },
          {
            to: "/earth-imagery",
            emoji: "🌎",
            title: "Earth Imagery",
            description:
              "Explore satellite images of various locations on Earth",
          },
        ].map(({ to, emoji, title, description }) => (
          <Link
            key={to}
            to={to}
            className={`p-6 rounded-lg ${themeClasses.cardBase} flex flex-col items-center text-center gap-4 transition-colors duration-200`}
          >
            <span className="text-4xl">{emoji}</span>
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className={`text-sm ${themeClasses.text}`}>{description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;

import { useTheme } from "../contexts/ThemeContext";
import { PageHeader } from "../components/UI";
import satellite from "../assets/satellite.svg";

const Home: React.FC = () => {
  const { themeClasses } = useTheme();

  return (
    <div
      className={`mx-auto max-w-7xl flex flex-col items-center gap-16 mb-16 ${themeClasses.container}`}
    >
      <div className="max-w-2xl text-center flex flex-col items-center gap-4">
        <PageHeader title="Welcome to NASA Explorer" />
        <div className="relative w-64 h-64 animate-orbit">
          <img
            src={satellite}
            alt="Satellite floating in space"
            className="w-full h-full"
          />
        </div>
        <p className={`text-lg ${themeClasses.secondaryText}`}>
          Explore the wonders of space with data from NASA's APIs. View stunning
          astronomy pictures, check out Mars rover photos, track near-Earth
          objects, and explore satellite imagery of Earth.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {[
          {
            emoji: "🔭",
            title: "Astronomy Picture of the Day",
            description:
              "Discover the cosmos with NASA's featured astronomy images",
          },
          {
            emoji: "🤖",
            title: "Mars Rover Photos",
            description: "View images captured by NASA's Mars rovers",
          },
          {
            emoji: "☄️",
            title: "Near Earth Objects",
            description: "Track asteroids and other objects passing near Earth",
          },
          {
            emoji: "🌎",
            title: "Earth Imagery",
            description:
              "Explore satellite images of various locations on Earth",
          },
        ].map(({ emoji, title, description }) => (
          <div
            className={`p-6 rounded-lg ${themeClasses.card} flex flex-col items-center text-center gap-4 transition-colors duration-200`}
          >
            <span className="text-4xl">{emoji}</span>
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className={`text-sm ${themeClasses.text}`}>{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const NotFound: React.FC = () => {
  const { themeClasses } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center text-center gap-8">
      <div className="text-9xl">🪐</div>
      <h1 className="text-5xl font-bold">404</h1>
      <h2 className="text-2xl">Houston, we have a problem!</h2>
      <p className="max-w-lg">
        It seems like the page you're looking for has drifted off into deep
        space. Our astronauts couldn't locate it in this part of the universe.
      </p>
      <Link
        to="/"
        className={`px-6 py-3 rounded-full text-white font-medium ${themeClasses.button}`}
      >
        Return to Mission Control
      </Link>
    </div>
  );
};

export default NotFound;

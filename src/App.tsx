import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import APOD from "./pages/APOD/APOD";
import APODDetails from "./pages/APOD/APODDetails";
import MarsRover from "./pages/MarsRover";
import NEOTracker from "./pages/NEOTracker";
import EarthImagery from "./pages/EarthImagery";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="apod">
              <Route index element={<APOD />} />
              <Route path=":date" element={<APODDetails />} />
            </Route>
            <Route path="mars-rover" element={<MarsRover />} />
            <Route path="neo-tracker" element={<NEOTracker />} />
            <Route path="earth-imagery" element={<EarthImagery />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

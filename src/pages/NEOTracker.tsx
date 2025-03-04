import React, { useState, useMemo } from "react";
import { format, addDays } from "date-fns";
import { useNEOTracker } from "../services/useNEOTracker";
import withLoading from "../hoc/withLoading";
import { useTheme } from "../contexts/ThemeContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const NEOTracker: React.FC = () => {
  const { theme } = useTheme();
  const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const endDate = useMemo(
    () => format(addDays(new Date(startDate), 7), "yyyy-MM-dd"),
    [startDate]
  );

  const { data } = useNEOTracker(startDate, endDate);

  const processedNEOData = useMemo(() => {
    if (!data) return [];

    const chartData = Object.entries(data.near_earth_objects).map(
      ([date, objects]) => ({
        date,
        totalObjects: objects.length,
        hazardousObjects: objects.filter(
          (obj) => obj.is_potentially_hazardous_asteroid
        ).length,
      })
    );

    return chartData;
  }, [data]);

  const allNEOObjects = useMemo(() => {
    if (!data) return [];
    return Object.values(data.near_earth_objects).flat();
  }, [data]);

  const totalHazardousAsteroids = useMemo(() => {
    if (!data) return 0;

    return Object.values(data.near_earth_objects)
      .flat()
      .filter((obj) => obj.is_potentially_hazardous_asteroid).length;
  }, [data]);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const themeClasses = {
    container:
      theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800",
    card:
      theme === "dark"
        ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
        : "bg-gray-100 hover:bg-gray-200 text-gray-800",
    hazardousCard:
      theme === "dark"
        ? "bg-red-900 hover:bg-red-800 text-red-200"
        : "bg-red-100 hover:bg-red-200 text-red-800",
    text: theme === "dark" ? "text-white" : "text-gray-800",
    secondaryText: theme === "dark" ? "text-gray-300" : "text-gray-700",
    input:
      theme === "dark"
        ? "bg-gray-800 border-gray-600 text-white"
        : "bg-white border-gray-300 text-gray-800",
  };

  return (
    <div
      className={`flex flex-col gap-8 max-w-7xl mx-auto min-h-screen ${themeClasses.container}`}
    >
      <div className="flex flex-col gap-8 items-center">
        <h1 className={`text-3xl font-bold ${themeClasses.text}`}>
          Near Earth Objects (NEO) Tracker
        </h1>
        <div>
          <label
            className={`block mb-2 text-sm font-medium ${themeClasses.secondaryText}`}
          >
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className={`border p-2 rounded w-full ${themeClasses.input}`}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`p-4 rounded ${themeClasses.card}`}>
          <h2 className={`text-xl font-semibold ${themeClasses.text}`}>
            Total NEOs
          </h2>
          <p className={`text-3xl ${themeClasses.text}`}>
            {data?.element_count || 0}
          </p>
        </div>
        <div className={`p-4 rounded ${themeClasses.hazardousCard}`}>
          <h2 className={`text-xl font-semibold`}>Potentially Hazardous</h2>
          <p className="text-3xl">{totalHazardousAsteroids}</p>
        </div>
        <div className={`p-4 rounded ${themeClasses.card}`}>
          <h2 className={`text-xl font-semibold ${themeClasses.text}`}>
            Date Range
          </h2>
          <p className={themeClasses.secondaryText}>
            {startDate} to {endDate}
          </p>
        </div>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={processedNEOData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme === "dark" ? "#444" : "#ccc"}
            />
            <XAxis dataKey="date" stroke={theme === "dark" ? "#fff" : "#000"} />
            <YAxis stroke={theme === "dark" ? "#fff" : "#000"} />
            <Tooltip
              contentStyle={
                theme === "dark"
                  ? { backgroundColor: "#333", color: "#fff" }
                  : {}
              }
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="totalObjects"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="hazardousObjects" stroke="#ff4d4d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="my-8">
        <h2 className={`text-2xl font-bold mb-4 ${themeClasses.text}`}>
          Near Earth Objects List
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr
                className={`border-b ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                }`}
              >
                <th className={`p-2 text-left ${themeClasses.text}`}>Name</th>
                <th className={`p-2 text-left ${themeClasses.text}`}>
                  Magnitude
                </th>
                <th className={`p-2 text-left ${themeClasses.text}`}>
                  Hazardous
                </th>
                <th className={`p-2 text-left ${themeClasses.text}`}>
                  Close Approach
                </th>
                <th className={`p-2 text-left ${themeClasses.text}`}>
                  Velocity (km/s)
                </th>
                <th className={`p-2 text-left ${themeClasses.text}`}>
                  Miss Distance (km)
                </th>
              </tr>
            </thead>
            <tbody>
              {allNEOObjects.map((neo) => (
                <tr
                  key={neo.id}
                  className={`border-b ${
                    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                >
                  <td className={`p-2 ${themeClasses.secondaryText}`}>
                    {neo.name}
                  </td>
                  <td className={`p-2 ${themeClasses.secondaryText}`}>
                    {neo.absolute_magnitude_h.toFixed(2)}
                  </td>
                  <td className="p-2">
                    {neo.is_potentially_hazardous_asteroid ? (
                      <span className="text-red-500">Yes</span>
                    ) : (
                      <span className="text-green-500">No</span>
                    )}
                  </td>
                  <td className={`p-2 ${themeClasses.secondaryText}`}>
                    {neo.close_approach_data?.[0]?.close_approach_date || "N/A"}
                  </td>
                  <td className={`p-2 ${themeClasses.secondaryText}`}>
                    {neo.close_approach_data?.[0]?.relative_velocity?.kilometers_per_second?.toLocaleString() ||
                      "N/A"}
                  </td>
                  <td className={`p-2 ${themeClasses.secondaryText}`}>
                    {neo.close_approach_data?.[0]?.miss_distance?.kilometers?.toLocaleString() ||
                      "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const NEOTrackerWithLoading = withLoading(NEOTracker);

export default NEOTracker;

import React, { useState, useMemo } from "react";
import { format, addDays } from "date-fns";
import { useNEOTracker } from "../services/useNEOTracker";
import withLoading from "../hoc/withLoading";
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
import {
  PageContainer,
  PageHeader,
  FormInput,
  Card,
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  FilterSection,
} from "../components/UI";
import { useTheme } from "../contexts/ThemeContext";

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

    return Object.entries(data.near_earth_objects).map(([date, objects]) => ({
      date,
      totalObjects: objects.length,
      hazardousObjects: objects.filter(
        (obj) => obj.is_potentially_hazardous_asteroid
      ).length,
    }));
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

  return (
    <PageContainer>
      <PageHeader title="Near Earth Objects (NEO) Tracker" />

      <FilterSection>
        <FormInput
          id="neo-start-date"
          type="date"
          label="Start Date"
          value={startDate}
          onChange={handleStartDateChange}
        />
      </FilterSection>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <h2 className="text-xl font-semibold">Total NEOs</h2>
          <p className="text-3xl">{data?.element_count || 0}</p>
        </Card>

        <Card hazardous={true}>
          <h2 className="text-xl font-semibold">Potentially Hazardous</h2>
          <p className="text-3xl">{totalHazardousAsteroids}</p>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold">Date Range</h2>
          <p>
            {startDate} to {endDate}
          </p>
        </Card>
      </div>

      <div className="h-[400px] mb-8">
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
        <h2 className="text-2xl font-bold mb-4">Near Earth Objects List</h2>
        <Table>
          <TableHead>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Magnitude</TableHeadCell>
            <TableHeadCell>Hazardous</TableHeadCell>
            <TableHeadCell>Close Approach</TableHeadCell>
            <TableHeadCell>Velocity (km/s)</TableHeadCell>
            <TableHeadCell>Miss Distance (km)</TableHeadCell>
          </TableHead>
          <TableBody>
            {allNEOObjects.map((neo) => (
              <TableRow key={neo.id}>
                <TableCell>{neo.name}</TableCell>
                <TableCell>{neo.absolute_magnitude_h.toFixed(2)}</TableCell>
                <TableCell>
                  {neo.is_potentially_hazardous_asteroid ? (
                    <span className="text-red-500">Yes</span>
                  ) : (
                    <span className="text-green-500">No</span>
                  )}
                </TableCell>
                <TableCell>
                  {neo.close_approach_data?.[0]?.close_approach_date || "N/A"}
                </TableCell>
                <TableCell>
                  {neo.close_approach_data?.[0]?.relative_velocity?.kilometers_per_second?.toLocaleString() ||
                    "N/A"}
                </TableCell>
                <TableCell>
                  {neo.close_approach_data?.[0]?.miss_distance?.kilometers?.toLocaleString() ||
                    "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </PageContainer>
  );
};

export const NEOTrackerWithLoading = withLoading(NEOTracker);

export default NEOTracker;

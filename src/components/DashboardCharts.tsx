import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

import {
  wasteTrendData,
  departmentWasteData,
  violationData,
} from "../data/mockData";

const COLORS = [
  "#3b82f6",
  "#f59e0b",
  "#10b981",
  "#ef4444",
];

export function DashboardCharts() {
  return (
    <>
      <div className="dashboard-grid">

        <div className="card">
          <h3>Waste Generation Trend</h3>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={wasteTrendData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="waste"
                stroke="#60a5fa"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3>Department Contribution</h3>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={departmentWasteData}
                dataKey="value"
                outerRadius={90}
                label
              >
                {departmentWasteData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      <div className="card">
        <h3>Segregation Violations</h3>

        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={violationData}>
            <XAxis dataKey="department" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="count"
              fill="#f59e0b"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
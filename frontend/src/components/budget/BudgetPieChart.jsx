import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const COLORS = [
  "#d4a373",
  "#b08968",
  "#ddb892",
  "#7f5539",
  "#9c6644",
  "#e6ccb2",
  "#cdb4db",
  "#ffc8dd"
];

const BudgetPieChart = ({ categories }) => {
  const chartData = categories
    .filter((c) => c.categoryTotal > 0)
    .map((c) => ({
      name: c.name,
      value: c.categoryTotal
    }));

  if (chartData.length === 0) return null;

  return (
    <div className="budget-chart-card">
      <h3>Expense distribution</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={110}
            innerRadius={0}        /* FULL PIE (not donut) */
            label={({ name }) => name}   /* CATEGORY NAMES */
            labelLine={false}
          >
            {chartData.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value) => `₹ ${value.toLocaleString()}`}
          />

          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetPieChart;

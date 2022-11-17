import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  function random_rgba() {
    let o = Math.round,
      r = Math.random,
      s = 255;
    return (
      "rgba(" +
      o(r() * s) +
      "," +
      o(r() * s) +
      "," +
      o(r() * s) +
      "," +
      r().toFixed(1) +
      ")"
    );
  }
  const segmentCodeCounts = {
    58: 4,
    49: 30,
    14: 5,
    38: 7,
    57: 18,
    5: 5,
    19: 4,
    9: 6,
    25: 7,
    22: 6,
    67: 16,
    52: 8,
    60: 7,
    37: 2,
    2: 5,
    26: 7,
    24: 8,
    4: 3,
    43: 6,
    41: 8,
    None: 4,
    62: 4,
    45: 2,
    51: 9,
    47: 3,
    36: 1,
    8: 1,
    11: 3,
    1: 6,
    33: 1,
    29: 1,
  };
  const labels = Object.keys(segmentCodeCounts);
  const labelMap = labels.map((label) => "segment" + " " + label);
  const values = Object.values(segmentCodeCounts);

  const data = {
    labels: labelMap,
    datasets: [
      {
        label: "# of Occurance",
        data: values,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Pie
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: true,
        }}
      />
      <small>
        * A significant number of customers of the three stores live within
        Segment 49, Segment 57, and Segment 67.{" "}
      </small>
    </>
  );
};

export default PieChart;

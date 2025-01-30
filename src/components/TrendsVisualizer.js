import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";

const TrendsVisualizer = () => {
  const [siteData, setSiteData] = useState({});

  useEffect(() => {
    chrome.storage.sync.get(["siteData"], (result) => {
      if (result.siteData) {
        setSiteData(result.siteData);
        drawChart(result.siteData);
      }
    });
  }, []);

  const drawChart = (data) => {
    const ctx = document.getElementById("trendChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            label: "Time Spent (min)",
            data: Object.values(data),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
    });
  };

  return (
    <div className="p-4 bg-gray-700 text-white rounded-lg">
      <h2 className="text-lg font-bold mb-2">Productivity Trends</h2>
      <canvas id="trendChart"></canvas>
    </div>
  );
};

export default TrendsVisualizer;

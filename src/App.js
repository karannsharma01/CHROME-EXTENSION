/* global chrome */
import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

const App = () => {
  const [goals, setGoals] = useState("");
  const [websiteData, setWebsiteData] = useState({});

  useEffect(() => {
    chrome.runtime.sendMessage({ action: "getTrackedData" }, (data) => {
      setWebsiteData(data);
    });
  }, []);

  const handleGoalSubmit = (e) => {
    e.preventDefault();
    alert(`Goal "${goals}" set for today!`);
  };

  const renderChart = () => {
    const ctx = document.getElementById("myChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(websiteData),
        datasets: [
          {
            label: "Time Spent (mins)",
            data: Object.values(websiteData),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
    });
  };

  useEffect(() => {
    if (Object.keys(websiteData).length) renderChart();
  }, [websiteData]);

  return (
    <div className="App">
      <h1>Productivity Tracker</h1>
      <form onSubmit={handleGoalSubmit}>
        <input
          type="text"
          placeholder="Set your daily goal"
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
        />
        <button type="submit">Set Goal</button>
      </form>
      <canvas id="myChart" width="400" height="200"></canvas>
    </div>
  );
};

export default App;

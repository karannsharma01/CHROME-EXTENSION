import React, { useState, useEffect } from "react";

const GoalSetter = () => {
  const [goal, setGoal] = useState("");

  // Load saved goal on mount
  useEffect(() => {
    chrome.storage.sync.get(["dailyGoal"], (result) => {
      if (result.dailyGoal) setGoal(result.dailyGoal);
    });
  }, []);

  // Save goal to Chrome storage
  const saveGoal = () => {
    chrome.storage.sync.set({ dailyGoal: goal }, () => {
      alert("Goal saved!");
    });
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg">
      <h2 className="text-lg font-bold mb-2">Set Your Daily Goal</h2>
      <input
        type="text"
        className="w-full p-2 text-black rounded"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Enter your goal..."
      />
      <button className="bg-blue-500 px-4 py-2 mt-2 rounded" onClick={saveGoal}>
        Save Goal
      </button>
    </div>
  );
};

export default GoalSetter;

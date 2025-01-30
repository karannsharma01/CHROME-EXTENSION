import React, { useState, useEffect } from "react";

const WebsiteTracker = () => {
  const [websiteTime, setWebsiteTime] = useState({});

  useEffect(() => {
    chrome.storage.sync.get(["siteData"], (result) => {
      if (result.siteData) setWebsiteTime(result.siteData);
    });

    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === "UPDATE_TIME") {
        setWebsiteTime(message.data);
      }
    });
  }, []);

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg">
      <h2 className="text-lg font-bold mb-2">Website Time Tracker</h2>
      <ul className="list-disc pl-5">
        {Object.entries(websiteTime).map(([site, time]) => (
          <li key={site}>
            <strong>{site}</strong>: {time} min
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WebsiteTracker;

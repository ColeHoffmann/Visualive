import React, { useState } from "react";
import axios from "axios";
import ThreeDScene from "./ThreeDScene";
import "./App.css";

function App() {
  const [streamerName, setStreamerName] = useState("");
  const [status, setStatus] = useState("");
  const [viewerCount, setViewerCount] = useState(null);
  const [error, setError] = useState("");

  // New state variable to toggle 3D space rendering
  const [alwaysRunThreeD, setAlwaysRunThreeD] = useState(false);

  const checkStreamerStatus = async () => {
    setError("");
    try {
      const response = await axios.get(
        `https://api.twitch.tv/helix/streams?user_login=${streamerName}`,
        {
          headers: {
            "Client-ID": process.env.REACT_APP_TWITCH_CLIENT_ID,
            Authorization: `Bearer ${process.env.REACT_APP_TWITCH_ACCESS_TOKEN}`,
          },
        }
      );

      const streamData = response.data.data[0];
      if (streamData) {
        setStatus("live");
        setViewerCount(streamData.viewer_count);
        console.log("Viewer Count is : " + viewerCount);
      } else {
        setStatus("offline");
      }
    } catch (error) {
      console.error("Error fetching streamer status", error);
      setError("Sorry, having trouble finding the streamer.");
    }
  };

  return (
    <div className="app">
      <div className="background"></div> {/* Background animation */}
      <div className="content">
        <h1 className="title">Streamer 3D App</h1>
        <div className="input-container">
          <input
            type="text"
            className="input"
            value={streamerName}
            onChange={(e) => setStreamerName(e.target.value)}
            placeholder="Enter streamer name"
          />
          <button className="button" onClick={checkStreamerStatus}>
            Begin
          </button>
        </div>
        {/* Toggle 3D Scene for testing */}
        <div className="toggle-container">
          <label className="toggle-label">
            Always run 3D space:
            <input
              type="checkbox"
              checked={alwaysRunThreeD}
              onChange={() => setAlwaysRunThreeD(!alwaysRunThreeD)}
            />
          </label>
        </div>
        {error && <p className="error">{error}</p>}{" "}
        {/* Display error message */}
        {/* 3D Scene renders based on success or toggle */}
        {alwaysRunThreeD || status === "live" ? (
          <div>
            {status === "live" && (
              <h2 className="status">
                {streamerName} is live with {viewerCount} viewers
              </h2>
            )}
            <ThreeDScene viewerCount={5} />{" "}
            {/* Pass viewerCount to ThreeDScene */}
          </div>
        ) : status === "offline" ? (
          <h2 className="status">This user is offline</h2>
        ) : null}
      </div>
    </div>
  );
}

export default App;

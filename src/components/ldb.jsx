// src/App.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
import Sky from "../dum";

const ENDPOINT = "http://192.168.1.2:5000";

const App = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on("leaderboard", (data) => {
      setLeaderboard(data);
    });

    fetchLeaderboard();

    return () => socket.disconnect();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get("http://192.168.1.2:5000/leaderboard");
      setLeaderboard(response.data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  return (
    <div>
      <div
        style={{
          border: "1px solid black",
          width: "400px",
          height: "600px",
          marginLeft: "50px",
          marginTop: "10px",
          padding: "20px",
        }}
      >
        <h1>Leaderboard</h1>
        <p onClick={fetchLeaderboard}></p>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {leaderboard.map((player, index) => (
            <li
              key={index}
              style={{
                borderBottom: "1px solid #ccc",
                padding: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
              }}
            >
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: "bold" }}>Server:</span>{" "}
                {player.username}
              </div>
              <div style={{ flex: 1, textAlign: "center" }}>
                <span style={{ fontWeight: "bold" }}>Points:</span>{" "}
                {player.tokens}
              </div>
              <div style={{ flex: 1, textAlign: "right" }}>
                <span style={{ fontWeight: "bold" }}>Level:</span>{" "}
                {player.level}
              </div>
            </li>
          ))}
        </ul>
        <Sky/>
      </div>
    </div>
  );
};

export default App;

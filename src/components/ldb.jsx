// src/App.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
import Sky from "./dum";

const ENDPOINT = "http://192.168.1.5:5000";

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
      const response = await axios.get("http://192.168.1.5:5000/leaderboard");
      setLeaderboard(response.data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  return (
    <div>
      <div
        style={{
          // border: "1px solid black",
          width: "300px",
          height: "600px",
          marginLeft: "50px",
          marginTop: "10px",
          padding: "20px",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Leaderboard</h1>
        <p onClick={fetchLeaderboard}></p>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Server</th>
              <th style={{ textAlign: "center" }}>Points</th>
              <th style={{ textAlign: "right" }}>Level</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((player, index) => (
              <tr
                key={index}
              >
                <td style={{ textAlign: "left" }}>{player.username}</td>
                <td style={{ textAlign: "center" }}>{player.tokens}</td>
                <td style={{ textAlign: "right" }}>{player.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <Sky /> */}
      </div>
    </div>
  );
};

export default App;

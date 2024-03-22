import React, { useState, useEffect } from 'react';
import Level0 from './level0';
import LevelOne from './level1';
import LevelTwo from './level2';
import LevelThree from './level3';
import axios from "axios";
import Steal from './steal';
import { useNavigate } from "react-router-dom";
import { useUser } from "./userContext";


function Final() {
    const [level, setLevel] = useState(0);
    const [stealMode,setStealMode]=useState(false);
    const [tokens,setTokens]=useState(false);
    const { username } = useUser();

    const navigate = useNavigate();
    useEffect(() => {
      // Check if user is not logged in, then redirect to login page
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
      }
    }, [navigate]);

    const fetchPlayerData = async () => {
        try {
            const response = await axios.post('http://192.168.1.2:5000/playerLevel', { username: username });
            const { level } = response.data;
            const { tokens }=response.data;
            setTokens(tokens);
            setLevel(level);
             
        } catch (error) {
            console.error('Error fetching player data:', error.response.data.message);
        }
    };
    useEffect(() => {

        fetchPlayerData(username); 
    },);


    const handleComplete = async () => {
      fetchPlayerData(username);
      try {
          await axios.post('http://192.168.1.2:5000/updatePlayerLevel', { username: username });
          setLevel(level + 1);
          console.log('Congratulations! You have completed the level!');
          setStealMode(!stealMode);
      } catch (error) {
          console.error('Error updating player level:', error.response.data.message);
      }
  };

  const SMode=()=>{
    setStealMode(!stealMode);
  }

  


    return (
        <div >
          <div style={{border:"1px solid black",width:"400px",height:"600px",marginLeft:"50px",marginTop:"10px",padding:"20px"}}>
          <h3>Server name:{username}</h3>
  
            {stealMode ? "": (level !== 4 && <h1>Level: {level}</h1>)}
            {stealMode?<Steal onStealMode={SMode}/>:""}
            {stealMode?"":(level === 0 && <Level0 onComplete={handleComplete} />)}
            {stealMode?"":(level === 1 && <LevelOne onComplete={handleComplete} />)}
            {stealMode?"":(level === 2 && <LevelTwo onComplete={handleComplete} />)}
            {stealMode?"":(level === 3 && <LevelThree onComplete={handleComplete} />)}
            {stealMode?"":(level === 4 && <h1>Game Over</h1>)}
            <br></br>
            <li>Solve each level.</li>
            <li>Use the tools to decrypt the Firewall.</li>
            <li>Retrieve the firewall token.</li>
            <li>The more you use the tools more you will loose.</li>
          </div>
        </div>
    );
}

export default Final;

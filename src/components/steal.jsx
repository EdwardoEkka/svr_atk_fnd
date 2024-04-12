import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "./userContext";
import io from "socket.io-client";

const socket = io('http://192.168.1.5:5000'); 

const Steal = ({ onStealMode }) => {
  

  const puzz = [
    {
      "puzzle_number":0,
      "description": "The firewall passcode is the sum of these binary numbers in decimal 10000 11010 11011 111",
      "answer": 76
    },
    {
      "puzzle_number":1,
      "description": "Firewall  passcode consist of letters 'c','e','r','a' guess the passcode",
      "answer": "acer"
    },
    {
      "puzzle_number":2,
      "description": ".. / .- -- / .- -. / --- -.. -.. / -. ..- -- -... . .-. .-.-.- / - .- -.- . / .- .-- .- -.-- / --- -. . / .-.. . - - . .-. / .- -. -.. / .. / -... . -.-. --- -- . / . ...- . -. .-.-.- / .-- .... .- - / -. ..- -- -... . .-. / .- -- / .. ..--..",
      "answer": 7
    },
    {
      "puzzle_number":3,
      "description": "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I? I am consist of the letters 'o','e','h','c'?",
      "answer": 'echo'
    },
    {
      "puzzle_number":4,
      "description": "Iye uxyg 2 + 2 mywoc dy dro ckwo kc 2 h 2. Xyg psxn k cod yp drboo nsppoboxd gryvo xewlobc gryco cew sc oaekv dy drosb dydkv grox wevdszvson. Psxn dro cew yp drboo xewlobc.",
      "answer": 6
    },
    {
      "puzzle_number":5,
      "description": "/ .-- .... .- - / .. ... / - .... . / ... -- .- .-.. .-.. . ... - / -. ..- -- -... . .-. / - .... .- - / .. -. -.-. .-. . .- ... . ... / -... -.-- / .---- ..--- / .-- .... . -. / .. - / .. ... / ..-. .-.. .. .--. .--. . -.. / .- -. -.. / - ..- .-. -. . -.. / ..- .--. ... .. -.. . -....- -.. --- .-- -. ..--..",
      "answer": 86
    },
    {
      "puzzle_number":6,
      "description": "Zkhq Pljxho zdv 6 bhduv rog, klv olwwoh vlvwhu, Ohlod, zdv kdoi klv djh. Li Pljxho lv 40 bhduv rog wrgdb, krz rog lv Ohlod?",
      "answer": 37
    },
    {
      "puzzle_number":7,
      "description": "I'm not alive, but I can grow; I don't have lungs, but I need air; I don't have a mouth, but water kills me. What am I? I am consist of the letters 'i','r','f','e'?",
      "answer": 'fire'
    },
    {
      "puzzle_number":8,
      "description": "The firewall passcode is the product of the binary numbers 0011*10111*10001 in decimal?",
      "answer": 1173
    },
    {
      "puzzle_number":9,
      "description": ".-- .... .- - / .. ... / - .... . / ... -- .- .-.. .-.. . ... - / .-- .... --- .-.. . / -. ..- -- -... . .-. / - .... .- - / .. ... / . --.- ..- .- .-.. / - --- / ... . ...- . -. / - .. -- . ... / - .... . / ... ..- -- / --- ..-. / .. - ... / -.. .. --. .. - ... ..--..",
      "answer": 21
    },
    {
      "puzzle_number":10,
      "description": "Vul iyvaoly zhfz vm opz fvbunly iyvaoly: “Adv flhyz hnv, P dhz aoyll aptlz hz vsk hz tf iyvaoly dhz. Pu aoyll flhyz aptl, P dpss il adpjl hz vsk hz tf iyvaoly.” Ovd vsk hyl aolf lhjo uvd? Npcl aol zbt vm aolpy jbyylua hnlz.",
      "answer": 24
    }
  ];
  
  
  

  const [player, setPlayer] = useState("");
  const { username } = useUser();
  const [players, setPlayers] = useState([]);
  const [preventRefresh, setPreventRefresh] = useState(true);
  const [answerCorrect, setAnswerCorrect] = useState(false);
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false); // State for loading
  const [verifying, setVerifying] = useState(false); // State for verifying
  const [timerExpired, setTimerExpired] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(240); 
  
 
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    socket.on("leaderboard", () => {
      fetchLeaderboard();
    });
    return () => {
      socket.off("leaderboard");
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("http://192.168.1.5:5000/getPlayers");
        setPlayers(response.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();
  }, []);

  const handleBeforeUnload = (event) => {
    if (preventRefresh) {
      event.preventDefault();
      event.returnValue = "";
    }
  };

  useEffect(() => {
    if (currentPuzzle) {
      const timer = setInterval(() => {
        setTimeRemaining(prevTime => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            setTimerExpired(true);
            clearInterval(timer);
            return 0;
          }
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentPuzzle]);
  
  
  const fetchPlayerLevel = async () => {
    try {
        const response = await axios.post('http://192.168.1.5:5000/playerLevel', { username: username });
        const { level } = response.data;
        console.log(level);
        return level;
    } catch (error) {
        console.error('Error fetching player data:', error.response.data.message);
        return null;
    }
};


const generateRandomPuzzle = async () => {
  try {
      const playerLevel = await fetchPlayerLevel();
      if (playerLevel !== null) {
          setCurrentPuzzle(puzz[playerLevel]);
          setUserAnswer("");
          setAnswerCorrect(false);
          setTimerExpired(false);
          setTimeRemaining(240);
      } else {
          console.error('Error fetching player level.');
      }
  } catch (error) {
      console.error('Error generating random puzzle:', error);
  }
};


  const checkAnswer = () => {
    const isCorrect = userAnswer.trim().toLowerCase() === currentPuzzle.answer.toString();
    if (isCorrect) {
      alert("Correct answer!");
    } else {
      alert("Wrong answer. Try again.");
    }
    return isCorrect;
  };
  

  const isCorrect=()=>{
    return parseInt(userAnswer) === currentPuzzle.answer;
  }
  

  const handleStealTokens = async () => {
    if (isCorrect) {
      try {
        setLoading(true); 
        const response = await axios.post("http://192.168.1.5:5000/steal", {
          username,
          player,
        });
        socket.emit('talk', `${username} has hacked into ${player}`);
        setVerifying(true); // Start verifying
        onStealMode();
        alert(response.data.message);
        setPreventRefresh(false);
      } catch (error) {
        alert(error.response.data.message || "Failed to steal tokens.");
      } finally {
        setLoading(false); // Stop loading
        setVerifying(false); // Stop verifying
      }
    } else {
      alert("Please solve the question first.");
    }
  };

  const fetchLeaderboard = async() => {
    try {
      await axios.get("http://192.168.1.5:5000/leaderboard");
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://192.168.1.5:5000/setAttack', { player:username, set:false });
      console.log(response);
    } catch (error) {
      console.error('Error updating secure field:', error);
    }
  };
  


  useEffect(() => {
    if (timerExpired && currentPuzzle) {
      onStealMode();
    }
  }, [timerExpired, currentPuzzle, onStealMode]);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
    <h2 style={{ marginBottom: '10px' }}>Attack the servers</h2>
    <select
      value={player}
      onChange={(e) => setPlayer(e.target.value)}
      required
      style={{ marginBottom: '10px',marginRight:"20px"}}
    >
      <option value="">Select Server</option>
      {players.map((player) => (
        <option key={player.id} value={player.username}>
          {player.username}
        </option>
      ))}
    </select>
    <br></br>
    <button onClick={generateRandomPuzzle} style={{ marginBottom: '10px' }}>
      Start hacking
    </button>
    <h4>Decrypt and solve the Firewall</h4>
    {currentPuzzle && (
      <>
       <h4>Time remaining: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</h4>
        <p>{currentPuzzle.description}</p>
        <h4>Retrieved Firewall Passcode</h4>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          style={{ width: '300px', marginBottom: '10px' }} // Adjusted width to 300px
        />
        <br />
        <button onClick={() => setAnswerCorrect(checkAnswer())}>
          Check Passcode
        </button>
      </>
    )}
    <br />
    <br></br>
    <button
      disabled={loading || verifying}
      onClick={() => {
        handleStealTokens();
        handleSubmit();
        fetchLeaderboard();
      }}
      style={{ marginBottom: '10px' }}
    >
      {loading ? "Hacking..." : verifying ? "Verifying..." : "Proceed"}
    </button>
  </div>
  

  );
};

export default Steal;

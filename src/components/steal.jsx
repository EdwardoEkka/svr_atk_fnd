import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "./userContext";
import io from "socket.io-client";

const socket = io('http://192.168.1.2:5000'); 

const Steal = ({ onStealMode }) => {
  

  const puzz = [
    {
      "puzzle_number":0,
      "description": "Sp Tyrx rkc 5 kzzvoc kxn ro qsfoc 2 dy rsc pbsoxn, ryg wkxi kzzvoc nyoc ro rkfo vopd?",
      "answer": 3
    },
    {
      "puzzle_number":1,
      "description": "-- .- .-. -.-- / -... --- ..- --. .... - / ...-- / .--. .- -.-. -.- ... / --- ..-. / .--. . -. -.-. .. .-.. ... --..-- / .-- .. - .... / . .- -.-. .... / .--. .- -.-. -.- / -.-. --- -. - .- .. -. .. -. --. / -.... / .--. . -. -.-. .. .-.. ... .-.-.- / .... --- .-- / -- .- -. -.-- / .--. . -. -.-. .. .-.. ... / -.. .. -.. / ... .... . / -... ..- -.-- / .. -. / - --- - .- .-.. ..--..",
      "answer": 18
    },
    {
      "puzzle_number":2,
      "description": "Pm aolyl hyl 10 zabkluaz pu h jshzz huk lhjo zabklua ohz 4 ivvrz, ovd thuf ivvrz hyl aolyl pu avahs?",
      "answer": 40
    },
    {
      "puzzle_number":3,
      "description": "- --- -- / ... .- ...- . -.. / ..... ..--- ----- / . .- -.-. .... / .-- . . -.- / ..-. --- .-. / ....- / .-- . . -.- ... .-.-.- / .... --- .-- / -- ..- -.-. .... / -- --- -. . -.-- / -.. .. -.. / .... . / ... .- ...- . / .. -. / - --- - .- .-.. ..--..",
      "answer": 80
    },
    {
      "puzzle_number":4,
      "description": "... .- .-. .- .... / .... .- -.. / ..--- ....- / -.-. .- -. -.. .. . ... --..-- / .- -. -.. / ... .... . / --. .- ...- . / .... .- .-.. ..-. / --- ..-. / - .... . -- / - --- / .... . .-. / -... .-. --- - .... . .-. .-.-.- / .... --- .-- / -- .- -. -.-- / -.-. .- -. -.. .. . ... / -.. --- . ... / ... .... . / .... .- ...- . / .-.. . ..-. - ..--..",
      "answer": 12
    },
    {
      "puzzle_number":5,
      "description": ".. ..-. / .- / .--. .. --.. --.. .- / .. ... / -.-. ..- - / .. -. - --- / ---.. / ... .-.. .. -.-. . ... / .- -. -.. / ...-- / ... .-.. .. -.-. . ... / .- .-. . / . .- - . -. --..-- / .... --- .-- / -- .- -. -.-- / ... .-.. .. -.-. . ... / .- .-. . / .-.. . ..-. - ..--..",
      "answer": 5
    },
    {
      "puzzle_number":6,
      "description": "M naj oazfmuze 15 otaoaxmfqe. Ur 5 otaoaxmfqe mdq fmwqz agf, tai ymzk otaoaxmfqe mdq xqrf uz ftq naj?",
      "answer": 10
    },
    {
      "puzzle_number":7,
      "description": "Wkhuh duh 6 erwwohv rq wkh wdeoh, dqg 2 erwwohv duh wdnhq dzdb. Krz pdqb erwwohv duh ohiw rq wkh wdeoh?",
      "answer": 4
    },
    {
      "puzzle_number":8,
      "description": ".- / -... .- -.- . .-. / -... .- -.- . -.. / ..--- ....- / -.-. --- --- -.- .. . ... --..-- / .- -. -.. / -.... / --- ..-. / - .... . -- / .-- . .-. . / . .- - . -. .-.-.- / .... --- .-- / -- .- -. -.-- / -.-. --- --- -.- .. . ... / .- .-. . / .-.. . ..-. - ..--..",
      "answer": 18
    },
    {
      "puzzle_number":9,
      "description": "Mj e xvemr xvezipw 50 qmpiw tiv lsyv jsv 3 lsyvw, lsa jev hsiw mx xvezip mr xsxep?",
      "answer": 150
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
  const [message, setMessage] = useState('');
  
  const sendMessage = () => {
    socket.emit('talk', message);
  };

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
        const response = await axios.get("http://192.168.1.2:5000/getPlayers");
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
  
  const generateRandomPuzzle = () => {
    const randomIndex = Math.floor(Math.random() * puzz.length);
    setCurrentPuzzle(puzz[randomIndex]);
    setUserAnswer("");
    setAnswerCorrect(false);
  };

  const checkAnswer = () => {
    const isCorrect = parseInt(userAnswer) === currentPuzzle.answer;
    if (isCorrect) {
      setMessage(`${username} has hacked into ${player}`)
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
        const response = await axios.post("http://192.168.1.2:5000/steal", {
          username,
          player,
        });
        sendMessage();
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

  const fetchLeaderboard = async () => {
    try {
      await axios.get("http://192.168.1.2:5000/leaderboard");
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://192.168.1.2:5000/setAttack', { player:username, set:false });
      console.log(response);
    } catch (error) {
      console.error('Error updating secure field:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
    <h2 style={{ marginBottom: '10px' }}>Attack the servers</h2>
    <select
      value={player}
      onChange={(e) => setPlayer(e.target.value)}
      required
      style={{ marginBottom: '10px' }}
    >
      <option value="">Select Server</option>
      {players.map((player) => (
        <option key={player.id} value={player.username}>
          {player.username}
        </option>
      ))}
    </select>
    <button onClick={generateRandomPuzzle} style={{ marginBottom: '10px' }}>
      Start hacking
    </button>
    <h4>Decrypt and solve the Firewall</h4>
    {currentPuzzle && (
      <>
        <p>{currentPuzzle.description}</p>
        <h4>Firewall token Retrieved</h4>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          style={{ width: '300px', marginBottom: '10px' }} // Adjusted width to 300px
        />
        <br />
        <button onClick={() => setAnswerCorrect(checkAnswer())}>
          Check Answer
        </button>
      </>
    )}
    <br />
    <button
      disabled={loading || verifying}
      onClick={() => {
        handleStealTokens();
        handleSubmit();
        fetchLeaderboard();
      }}
      style={{ marginBottom: '10px' }}
    >
      {loading ? "Hacking..." : verifying ? "Verifying..." : "Steal Resources"}
    </button>
  </div>
  

  );
};

export default Steal;

import React, { useState } from 'react';
import { useUser } from "./userContext";
import axios from "axios";


const Level5 = ({ onComplete }) => {
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const { username } = useUser();

  const handleCheckAnswer = async () => {
    setAttempted(true);
    if (userInput.trim() === 'Ye to Odd hai.') {
      alert("Congratulations for solving the level.");
      setIsCorrect(true);
      try {
        const response = await axios.post('http://192.168.1.5:5000/increasePoints', { username });
        console.log(response.data.points); // This will log the updated points
        onComplete();
      } catch (error) {
        console.error('Error increasing points:', error);
      }
    } else {
      setIsCorrect(false);
    }
  
    try {
      await axios.get("http://192.168.1.5:5000/leaderboard");
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  // const handleSubmit = async () => {
  //   try {
  //     const response = await axios.post('http://192.168.1.5:5000/setAttack', { player:username, set:true });
  //     console.log(response);
  //   } catch (error) {
  //     console.error('Error updating secure field:', error);
  //   }
  // };

  return (
    <div>
      <pre style={{fontSize:"20px"}}>
        {`
hi bhai
bhai ye hai a = 5;
  bhai ye hai b = 4;

  jab tak bhai (b < 9) {
    b += 3;
  }
  b +=a;
    agar bhai (b%2 == 0){
        bol bhai "Are ye to Even hai.";
    } warna bhai {
        bol bhai "Ye to Odd hai.";
    }
bye bhai`}
      </pre>
      <div>
      <textarea
  value={userInput}
  onChange={(e) => setUserInput(e.target.value)}
/>
<br></br>
<button onClick={() => {handleCheckAnswer()}}>Submit Answer</button>
      {attempted && isCorrect && <p>Congratulations! You answered correctly.</p>}
      {attempted && !isCorrect && <p>Incorrect answer. Please try again.</p>}
      </div>
    </div>
  );
};

export default Level5;

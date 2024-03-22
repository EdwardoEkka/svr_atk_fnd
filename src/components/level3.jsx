// LevelOne.js
import React, { useState } from 'react';
import { useUser } from "./userContext";
import axios from "axios";

const LevelThree = ({ onComplete }) => {
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const { username } = useUser();

  const handleCheckAnswer = () => {
    setAttempted(true);
    if (userInput.trim() === '405') {
      setIsCorrect(true);
      onComplete();
      // handleSubmit();
    } else {
      setIsCorrect(false);
    }
  };

  // const handleSubmit = async () => {
  //   try {
  //     const response = await axios.post('http://192.168.1.2:5000/setAttack', { player:username, set:true });
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
bhai ye hai a = 3;
bhai ye hai b = 1;
bhai ye hai result = 1;

jab tak bhai (b <= 5) {
    result *= a * b;
    b += 2;
}
bol bhai result;

bye bhai`}
      </pre>
      <div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button onClick={handleCheckAnswer}>Check Answer</button>
      {attempted && isCorrect && <p>Congratulations! You answered correctly.</p>}
      {attempted && !isCorrect && <p>Incorrect answer. Please try again.</p>}
      </div>
    </div>
  );
};

export default LevelThree;

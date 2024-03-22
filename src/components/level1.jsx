// LevelOne.js
import React, { useState } from 'react';
import { useUser } from "./userContext";


const LevelOne = ({ onComplete }) => {
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempted, setAttempted] = useState(false);

  const handleCheckAnswer = () => {
    setAttempted(true);
    if (userInput.trim() === '30') {
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
  bhai ye hai b = 0;

  jab tak bhai (b < 10) {
    b += 1;
  }
  bol bhai a*b  ;

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

export default LevelOne;

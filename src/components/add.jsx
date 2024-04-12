import React, { useState } from 'react';

const Adder = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(null);

  const handleAddition = () => {
    const result = parseFloat(num1) + parseFloat(num2);
    setResult(result);
  };

  return (
    <div>
      <h2>Add Two Numbers</h2>
      <input
        type="number"
        placeholder="Enter number 1"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter number 2"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
      />
      <button onClick={handleAddition}>Add</button>
      {result !== null && (
        <p>
          Result: {num1} + {num2} = {result}
        </p>
      )}
    </div>
  );
};

export default Adder;

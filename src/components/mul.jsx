import React, { useState } from 'react';

const Multiplier = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(null);

  const handleMultiply = () => {
    const result = parseFloat(num1) * parseFloat(num2);
    setResult(result);
  };

  return (
    <div>
      <h2>Multiply Two Numbers</h2>
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
      <button onClick={handleMultiply}>Multiply</button>
      {result !== null && (
        <p>
          Result: {num1} * {num2} = {result}
        </p>
      )}
    </div>
  );
};

export default Multiplier;

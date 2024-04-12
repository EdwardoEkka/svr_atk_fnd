import React, { useState } from 'react';

function BinaryToDecimalConverter() {
  const [binaryInput, setBinaryInput] = useState('');
  const [decimalOutput, setDecimalOutput] = useState('');

  const handleInputChange = (event) => {
    const { value } = event.target;
    // Validate input to only allow 0s and 1s
    if (/^[01]*$/.test(value)) {
      setBinaryInput(value);
      // Convert binary to decimal
      setDecimalOutput(parseInt(value, 2).toString(10));
    } else {
      // Display error if input contains invalid characters
      setDecimalOutput('Invalid input. Only 0s and 1s are allowed.');
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h2 style={{ marginBottom: '10px' }}>Binary to Decimal Converter</h2>
      <label style={{ textAlign: 'left', display: 'block', marginBottom: '5px' }}>
        Enter Binary Number:
        <input
          type="text"
          value={binaryInput}
          onChange={handleInputChange}
          placeholder="Enter binary number"
          style={{ marginLeft: '10px' }}
        />
      </label>
      <p style={{ textAlign: 'left', marginBottom: '5px' }}>Decimal Output: <span style={{ fontWeight: 'bold' }}>{decimalOutput}</span></p>
    </div>
  );
}

export default BinaryToDecimalConverter;

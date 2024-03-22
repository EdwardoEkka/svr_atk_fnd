import React, { useState } from 'react';

function CaesarCipherDecryptor() {
  const [cipherText, setCipherText] = useState('');
  const [shift, setShift] = useState(0);
  const [decryptedText, setDecryptedText] = useState('');

  // Function to decrypt text using a Caesar cipher
  const caesarCipherDecrypt = (text, shift) => {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      let charCode = text.charCodeAt(i);
      if (charCode >= 65 && charCode <= 90) {
        // Uppercase letters
        result += String.fromCharCode(((charCode - 65 - (shift % 26) + 26) % 26) + 65);
      } else if (charCode >= 97 && charCode <= 122) {
        // Lowercase letters
        result += String.fromCharCode(((charCode - 97 - (shift % 26) + 26) % 26) + 97);
      } else {
        // Non-alphabetic characters remain unchanged
        result += text.charAt(i);
      }
    }
    return result;
  }

  const handleDecrypt = () => {
    setDecryptedText(caesarCipherDecrypt(cipherText, shift));
  };

  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '20px' }}>
  <h1 style={{ marginBottom: '10px' }}>Caesar Cipher Decryptor</h1>
  <label htmlFor="cipherText" style={{ display: 'block', marginBottom: '5px' }}>Enter ciphertext:</label>
  <textarea
    id="cipherText"
    value={cipherText}
    onChange={(e) => setCipherText(e.target.value)}
    rows="4"
    cols="50"
    style={{ marginBottom: '10px' }}
  />
  <label htmlFor="shift" style={{ display: 'block', marginBottom: '5px' }}>Enter shift value:</label>
  <input
    type="number"
    id="shift"
    value={shift}
    onChange={(e) => setShift(parseInt(e.target.value))}
    min="0"
    style={{ marginBottom: '10px' }}
  />
  <button onClick={handleDecrypt} style={{ marginBottom: '10px' }}>Decrypt</button>
  <h2 style={{ marginTop: '20px' }}>Decrypted Text:</h2>
  <div>{decryptedText}</div>
</div>

  );
}

export default CaesarCipherDecryptor;

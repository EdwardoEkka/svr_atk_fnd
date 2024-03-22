import React, { useState } from 'react';

// Morse code dictionary
const morseCodeMap = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
  'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
  'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', '\'': '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
  '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-',
  '@': '.--.-.', ' ': '/'
};

// Reverse the Morse code map to decode Morse code
const reverseMorseCodeMap = {};
for (const key in morseCodeMap) {
  if (morseCodeMap.hasOwnProperty(key)) {
    reverseMorseCodeMap[morseCodeMap[key]] = key;
  }
}

const MorseCodeConverter = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value.toUpperCase());
  };

  const encodeToMorseCode = (text) => {
    let morseCode = '';
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (morseCodeMap[char]) {
        morseCode += morseCodeMap[char] + ' ';
      } else {
        morseCode += '/';
      }
    }
    return morseCode.trim();
  };

  const decodeFromMorseCode = (morseCode) => {
    const words = morseCode.split(' / ');
    let decodedText = '';
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const chars = word.split(' ');
      for (let j = 0; j < chars.length; j++) {
        const char = chars[j];
        if (reverseMorseCodeMap[char]) {
          decodedText += reverseMorseCodeMap[char];
        }
      }
      decodedText += ' ';
    }
    return decodedText.trim();
  };

  const handleEncodeClick = () => {
    setOutputText(encodeToMorseCode(inputText));
  };

  const handleDecodeClick = () => {
    setOutputText(decodeFromMorseCode(inputText));
  };

  return (
    <div>
      <h2>Morse Code Converter</h2>
      <textarea value={inputText} onChange={handleInputChange} placeholder="Enter text or Morse code"   rows="10" cols="50" style={{ padding: '10px', borderRadius: '5px', resize: 'none' }}/>
      <br />
      <br/>
      <button onClick={handleEncodeClick}>Encode to Morse Code</button>
      <button onClick={handleDecodeClick}>Decode from Morse Code</button>
      <br />
      <br/>
      <textarea value={outputText} readOnly placeholder="Output" rows="10" cols="50" style={{ padding: '10px', borderRadius: '5px', resize: 'none' }}/>
    </div>
  );
};

export default MorseCodeConverter;

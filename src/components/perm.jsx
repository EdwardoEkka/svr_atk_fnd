import React, { useState } from 'react';

function PermutationsFinder() {
  const [inputLetters, setInputLetters] = useState('');
  const [permutations, setPermutations] = useState([]);

  const handleInputChange = (event) => {
    setInputLetters(event.target.value);
  };

  const findPermutations = (letters) => {
    const results = [];

    const permute = (arr, m = []) => {
      if (arr.length === 0) {
        results.push(m);
      } else {
        for (let i = 0; i < arr.length; i++) {
          const curr = arr.slice();
          const next = curr.splice(i, 1);
          permute(curr.slice(), m.concat(next));
        }
      }
    };

    permute(letters.split(''));

    return results.map((perm) => perm.join(''));
  };

  const handleFindPermutations = () => {
    const foundPermutations = findPermutations(inputLetters);
    setPermutations(foundPermutations);
  };

  return (
    <div>
      <h2>Permutations Finder</h2>
      <label>
        Enter letters:
        <input type="text" value={inputLetters} onChange={handleInputChange} />
      </label>
      <button onClick={handleFindPermutations}>Find Permutations</button>
      <div>
        <h3>Permutations:</h3>
        <ul>
          {permutations.map((perm, index) => (
            <li key={index}>{perm}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PermutationsFinder;

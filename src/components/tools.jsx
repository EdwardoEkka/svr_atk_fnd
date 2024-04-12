import React, { useState } from "react";
import CaesarCipherDecryptor from "./cipher";
import MorseCodeConverter from "./morse";
import PermutationsFinder from "./perm";
import BinaryToDecimalConverter from "./binary";
import Multiplier from "./mul";
import Adder from "./add";

const Tools = () => {
    const [selectedTool, setSelectedTool] = useState(null);

    const handleToolChange = (event) => {
        setSelectedTool(event.target.value);
    };

    const renderSelectedTool = () => {
        switch (selectedTool) {
            case "caesarCipher":
                return <CaesarCipherDecryptor />;
            case "morseCode":
                return <MorseCodeConverter />;
            case "bin2dec":
                return <BinaryToDecimalConverter/>
            case "perm":
                return <PermutationsFinder/>
            case "mul":
                return <Multiplier/>
            case 'add':
                return <Adder/>
            default:
                return null;
        }
    };

    return (
        <div style={{ border: "1px solid black", width: "400px", height: "600px", marginLeft: "50px", marginTop: "10px", padding: "20px" }}>
            <h1>Tools</h1>
            <select onChange={handleToolChange}>
                <option value="">Select a Tool</option>
                <option value="caesarCipher">Caesar Cipher Decryptor</option>
                <option value="morseCode">Morse Code Converter</option>
                <option value="bin2dec">Binary to Decimal</option>
                <option value="perm">Letter Permutations</option>
                <option value="mul">Multiplier</option>
                <option value="add">Adder</option>
            </select>
            <div style={{ marginTop: "20px" }}>
                {renderSelectedTool()}
            </div>
        </div>
    );
};

export default Tools;

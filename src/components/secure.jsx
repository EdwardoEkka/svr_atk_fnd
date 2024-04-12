import { useState } from "react";
import axios from "axios";

const Secure = () => {
  const [securePlayer, setSecurePlayer] = useState("");

  const handleSecureDb = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("http://192.168.1.5:5000/secure", {
        player: securePlayer,
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message || "Failed to secure database.");
    }
  };

  return (
    <div>
        <h2>Secure</h2>
      <form onSubmit={handleSecureDb}>
        <input
          type="text"
          value={securePlayer}
          onChange={(e) => setSecurePlayer(e.target.value)}
          placeholder="Username"
          required
        />
        <button type="submit">Secure DB</button>
      </form>
    </div>
  );
};

export default Secure;

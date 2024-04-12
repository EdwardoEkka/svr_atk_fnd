import {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp=()=>{
    const [username, setUsername] = useState("");
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleAddPlayer = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("http://192.168.1.5:5000/player-login", {
            username,
            registrationNumber,
            password, // Include the password in the request data
          });
          alert(response.data.message);
        } catch (error) {
          alert(error.response.data.message || "Failed to add player.");
        }
      };
    
    return(
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
          <div style={{marginTop:"100px"}}>

          <h2>Create a server</h2>
            <form onSubmit={handleAddPlayer} style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          style={{width:"300px",height:"30px"}}
        />
        <br></br>
        <input
          type="text"
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
          placeholder="Registration Number"
          required
          style={{width:"300px",height:"30px"}}
        />
        <br></br>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={{width:"300px",height:"30px"}}
        />
        <br></br>
        <button style={{width:"100px",height:"30px"}} type="submit">Add Server</button>
      </form>
      <h3 onClick={()=>{navigate("/")}}>⬅️Back to Log in</h3>
          </div>
        </div>
    )
}

export default SignUp;

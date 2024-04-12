import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from './userContext';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useUser();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://192.168.1.5:5000/players-log", {
        username,
        password,
      });
      updateUser(username);
      console.log(response.data.message);
      localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true);
      navigate("/home");
    } catch (error) {
      alert(error.response.data.message || "Failed to Login.");
    }
  };

  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
      {!isLoggedIn ? (
        <div style={{marginTop:"100px"}}>
          <h2 style={{textAlign:"center"}}>Login to your server</h2>
          <form onSubmit={handleLogin} style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="server name"
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
            <button style={{width:"100px",height:"30px"}} type="submit">Login</button>
          </form>
          <h3 style={{textAlign:"center"}} onClick={() => navigate("/signup")}>Server not created, create➡️</h3>
        </div>
      ) : (
        <div>
        <p>You are already logged in!</p>
        <p onClick={()=>{navigate("/home")}}>Game</p>
        </div>
      )}
    </div>
  );
};

export default Login;

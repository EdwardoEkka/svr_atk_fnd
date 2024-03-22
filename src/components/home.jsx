import Final from "./game";
import Leaderboard from "./ldb";
import Tools from "./tools";
import { useNavigate } from "react-router-dom";

const Home=()=>{

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
      };

    return (
        <div>
                <h1 style={{textAlign:"center"}}>SERVER ATTACK CONSOLE</h1>
            <div style={{display:"flex"}}>
            <Final/>
            <Leaderboard/>
            <Tools/>
            </div>
            <button onClick={handleLogout} style={{position:"absolute",margin:"10px",right:"2px",height:"30px",width:"100px"}}>Server shutdown</button>
        </div>
    )
}

export default Home;
import Final from "./game";
import Leaderboard from "./ldb";
import Tools from "./tools";
import { useNavigate } from "react-router-dom";
import Sky from "./dum";

const Home=()=>{

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
      };

    return (
        <div>
            <button onClick={handleLogout} style={{position:"absolute",margin:"10px",right:"2px",height:"30px",width:"100px"}}>Logout</button>
                <h1 style={{textAlign:"center"}}>SERVER ATTACK CONSOLE</h1>
            <div style={{display:"flex"}}>
            <Final/>
            <Tools/>
            <Leaderboard/>
            <Sky/>
            </div>
        </div>
    )
}

export default Home;
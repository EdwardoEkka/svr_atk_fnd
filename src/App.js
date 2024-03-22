import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatApp from "./components/comp2";
import SignUp from "./components/singup";
import Login from "./components/login";
import Secure from "./components/secure";
import './App.css';
// import Final from "./components/game";
import Home from "./components/home";
import { UserProvider } from "./components/userContext";
import CaesarCipherDecryptor from "./components/cipher";
import Sky from "./dum";

function App() {
  return (
    <div className="App">
      {/* <Steal/>
     <Secure/>
     <SignUp/>
     <Login/> */}
      {/* <ChatApp/> */}
      {/* <Final/> */}
      <Router>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </UserProvider>
      </Router>
      {/* <CaesarCipherDecryptor/> */}
      {/* <Sky/> */}
    </div>
  );
}

export default App;

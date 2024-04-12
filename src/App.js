import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/singup";
import Login from "./components/login";
import './App.css';
import Home from "./components/home";
import { UserProvider } from "./components/userContext";


function App() {
  return (
    <div className="App">
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

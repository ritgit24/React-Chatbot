import React from "react";
import { BrowserRouter , Routes, Route , useNavigate} from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Chatbot from "./Components/Chatbot";
import Sessions from "./Components/Sessions";
import { DiAndroid } from "react-icons/di";
import { TbCloudSearch } from "react-icons/tb";
import './App.css'
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="this">
      <h1><DiAndroid /></h1>
      
      
      <h1 >ASK ME ANYTHING !</h1>
      
      
      <button onClick={() => navigate('/login')}>Login to your account</button>
      <br></br>
      
      <button onClick={() => navigate('/signup')}>Signup</button>
      <br></br>
     
      <button onClick={() => navigate('/chatbot')}>Talk to chatbot</button>
      <br></br>
      
      
      <h1><TbCloudSearch /></h1>
    </div>
  );
};


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sessions" element={<Sessions />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

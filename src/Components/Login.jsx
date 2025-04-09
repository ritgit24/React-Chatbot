import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token); // Store JWT
      console.log(response.data);
        console.log(response.data.name);
        console.log(response.data.token);
        setName(response.data.name);
        // The issue in your code is that the name state is being updated asynchronously using setName, but the navigate function is called immediately after setName. In React, state updates are not synchronous, so the name state will not be updated immediately when navigate is called. This is why the name being passed to the /chatbot route is still the old value (or empty).
      navigate("/chatbot",{ state: { name: response.data.name } }); // Redirect to chatbot page
      console.log('State Passed:', { name }); 
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <h1 classname="u">Welcome Back, Voyager!</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br></br>
      <br></br>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br></br>
      <br></br>
      <button onClick={handleLogin}>Login</button>
      <br></br>
      <br></br>
    <button onClick={() => navigate('/')}>Redirect to Home page</button>
    </div>
  );
};

export default Login;   
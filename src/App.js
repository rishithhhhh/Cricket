import React from "react";
import CricketGPT from "./cricketgpt";
import './cricketgpt.css';

function App() {
  return (
    <div className="App">
      <img 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdMI5G88GxcL0xDZZW83ESjf6N5lpwQY-WsQ&s" 
        style={{ width: "10%", objectFit: "cover", marginBottom: "0px" , marginLeft:"20px",marginTop:"10px"
        }} 
      />
      <CricketGPT />
    </div>
  );
}

export default App;
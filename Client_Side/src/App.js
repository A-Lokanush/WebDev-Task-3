import "./App.css";
import { useState } from "react";
import React from 'react'
import Axios from "axios";
import Login from './components/login';
import Main from "./components/main";

function App() {
 
  const[tokens,setTokens] = useState({at:"",rt:"",name:""});
  const [error,setError] = useState("");
  
  const loginApp = details => {
    // console.log(details);
    Axios.post( "http://localhost:3002/auth/login",{
      username: details.name,
      password: details.password,
    }).then((response)=> {
      // console.log(response.data)
      if(response.data.message!== "INVALID CREDENTIALS"){
        setTokens({
          at:response.data.accessToken,
          rt:response.data.refreshToken,
          name:details.name,
        })
        setError("")
      }else {
        setError("")
        console.log("INVALID CREDENTIALS")
        setError("Invalid Credentials")
      }
    })
  }
  setTimeout(()=>{
    setTokens({at:"",rt:"",name:""});
    setError("Oops, your session ended! Login Again")
  },3600000)

  const logoutApp = () => {
    console.log("logout");
    setTokens({at:"",rt:"",name:""})
  }

  return (
    <div className="App">
      {(tokens.at !=="" && tokens.rt !== "") ? (
        <Main onLogout={logoutApp} tokens={tokens}/> 
       ):( <Login Login={loginApp} error={error}/>)
      }
    </div>
  );
}

export default App;

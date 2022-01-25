import "./App.css";
import { useState } from "react";
import React from 'react'
import Axios from "axios";

import Login from './components/login';
import Main from "./components/main";

function App() {
  const adminUser = { 
    name:"loka",
    password:"123"
  }
 
  const[user,setUser] = useState({name:"",password:""});
  const [error,setError] = useState("");
  
  const loginApp = details => {
    console.log(details);
    Axios.post("http://localhost:3002/auth/login",{
      username: details.name,
      password: details.password,
    }).then((response)=> {
      console.log(response)
      if(response.data.message!== "INVALID CREDENTIALS"){
        adminUser.name = response.data.result[0].username;
        adminUser.password = response.data.result[0].password;
        console.log(adminUser);
      }

      if(details.name === adminUser.name && details.password === adminUser.password){
        setUser({
          name:details.name,
          password:details.password,
        })
        setError("")
      } else {
        setError("")
        console.log("INVALID CREDENTIALS")
        setError("Invalid Credentials")
      }
    })
  }

  const logoutApp = () => {
    console.log("logout");
    setUser({name:"",password:""})
  }

  return (
    <div className="App">
      {(user.name!=="") ? (
        <Main onLogout={logoutApp} name={user.name} password={user.password} /> 
       ):( <Login Login={loginApp} error={error}/>)
      }
    </div>
  );
}

export default App;

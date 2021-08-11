import { useState } from "react";
import Axios from "axios";

import Header from "./header";
import Register from "./register";

const Login = ({Login,error}) => {

    const [details,setDetails] = useState({name:"",password:""});
    const [toggle,setToggle] = useState(true);

    const submitHandler = (e) =>{
      e.preventDefault();
      Login(details)
    }
    return (
    <div>
      {(toggle)? (
        <div><Header />
        <h2 style={{color: "rgb(9, 255, 0)"}}>Login</h2>
        <div className="container">
        {(error!=0)?(<div className="error">{error}</div>):("")}
          <form className="form">
              <div className="username">
                <label>Username</label>
                <input className="loginInput"type="text" placeholder="Enter the Username" onChange={e => setDetails({...details,name:e.target.value})} value={details.name}/>
              </div>
              <div className="password">
                <label>Password</label>
                <input className="loginInput" type="password" placeholder="Enter the Password" onChange={e => setDetails({...details,password:e.target.value})} value={details.password}/>
              </div>
              <div className="login"> 
                <button className="btn" onClick={submitHandler}>Log In</button>
                <a onClick={() => setToggle(!toggle)}>New User? REGISTER</a> 
              </div>
          </form>
        </div></div>
      ):(<Register onToggle={() => setToggle(!toggle)}/>)}
    
        
    </div>    
    )
}

export default Login

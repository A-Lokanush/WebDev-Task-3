import {useState} from 'react';
import Axios from "axios";

const Register = ({onToggle}) => {

    let check = false;
    const [usernameReg,setUsernameReg] = useState("");
    const [passwordReg,setPasswordReg] = useState("");
    const [cpasswordReg,csetPasswordReg] = useState("");
    const [err,setErr] = useState("");

    const register = () => {
        // if(passwordReg === cpasswordReg){
          Axios.post("http://localhost:3002/auth/register",{
          username: usernameReg,
          password: passwordReg,
        }).then((response)=> {
          // if(response.data.message){
          //   setLogin(response.data.message);
          // }
          console.log(response)
        })
        // }
      };
      async function click(){
        check = false;
        if(usernameReg.length > 0){
          if(cpasswordReg===passwordReg){
            if (passwordReg.length > 8) {
              register();
              setErr("");
            } else {
              setErr("Password must be atlest 8 characters")
            }
          } else {
            setErr("Passwords are'nt matching");
          }
        } else {
          setErr("Username can't be empty")
        } 
      }

    return (
      <div id="register">
        <h2 className="reg" style={{ color: "rgb(9, 255, 0)" }}>
          Register
        </h2>
        <div className="container2">
          {usernameReg.length > 0 ? (
            passwordReg !== cpasswordReg && !check ? (
              <div className="error">{err}</div>
            ) : passwordReg.length < 8 && !check ? (
              <div className="error">{err}</div>
            ) : (
              ""
            )
          ) : (
            <div className="error">{err}</div>
          )}

          <form>
            <div className="username">
              <label>Username</label>
              <input
                className="loginInput"
                type="text"
                placeholder="Enter the Username"
                onChange={(e) => {
                  setUsernameReg(e.target.value);
                }}
              />
            </div>
            <div className="password">
              <label>Password</label>
              <input
                className="loginInput"
                type="password"
                placeholder="Enter the Password"
                onChange={(e) => {
                  setPasswordReg(e.target.value);
                }}
              />
            </div>
            <div className="password">
              <label>Confirm Password</label>
              <input
                className="loginInput"
                type="password"
                placeholder="Re-Enter the Password"
                onChange={(e) => {
                  csetPasswordReg(e.target.value);
                }}
              />
            </div>
            <div className="login">
              <div className="btnReg" onClick={click}>
                Register
              </div>
              <a onClick={onToggle}>Existing User? LOG IN</a>
            </div>
          </form>
        </div>
      </div>
    );
}

export default Register

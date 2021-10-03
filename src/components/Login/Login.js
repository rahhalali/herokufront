import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Image from "../Images/ice.png";
import { ToastContainer, toast } from "react-toastify";
import {useAmazonContext} from '../../Context/AmazonContext';
import "react-toastify/dist/ReactToastify.css";
// import {useHistory} from 'react-router-dom'
import "./Login.css";
<meta name="csrf-token" content="{{ csrf_token() }}"></meta>;
function Login() {

  const { setShow } = useAmazonContext();
  
  const history = useHistory();
  //   const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const log = async () => {
   
    let item = { email, password };
   
    let result = await fetch(`https://ancient-savannah-54184.herokuapp.com/login`, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Access: "application/json",
      },
    });
    let result1 = await result.json();
   
    if (result1.status === 201) {
      toast.dark(`Your Welcome Admin ${result1.message["admin"]["Username"]}`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.setItem("login", result1.message["token"]);
      localStorage.setItem("name", result1.message["admin"]["Username"]);
      setShow(true);
      history.push("/search");
    } else {
      toast.dark(`Sorry Your Are not an Admin`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="body" style={{height:"100vh",width:"100%",backgroundImage:`url(${Image})`,backgroundSize:"cover"}}>

     <div className="box" >
            <h2>Login</h2>
            <div className="inputbox">
              <input type="text" name="" onChange={(e) => setEmail(e.target.value)} required/>
              <label>Email</label>
            </div>

            <div className="inputbox">
              <input type="password" name="" onChange={(e) => setPassword(e.target.value)} required/>
              <label>Password</label>
            </div>
            <input type="submit" name="" onClick={log} value="Submit" />
          </div>
         

      </div>
      </>
  )
}

export default Login;

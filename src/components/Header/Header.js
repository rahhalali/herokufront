import React, { useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import "./Header.css";
import {useAmazonContext} from '../../Context/AmazonContext';


export const Header = () => {
  
  const { setShow } = useAmazonContext();

  const history = useHistory();

  useEffect(() => {}, []);
  // function refresh() {
  //   window.location.reload();
  // }
  function logout() {
    localStorage.removeItem("login");
    history.push("/");
    setShow(false);
  }
  function login() {
    history.push("/login");
  }
  return (
    <div className="header-container">
      <h1 className="header-title">
        <p>
          Erp 
          {localStorage.getItem('login') ? <span> Dashboard</span> : <span> Website</span>}
          
        </p>
      </h1>
      {localStorage.getItem("login") ? (
        <button onClick={() => logout()} className="logout-bnt">
          logout
        </button>
      ) : (
        <button onClick={() => login()} className="logout-bnt">
          Login
        </button>
      )}
    </div>
  );
};

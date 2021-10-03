import React, { useState } from "react";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const AddTeam = () => {
  const history = useHistory();
  const [name, setTeam] = useState();
  const [error, setError] = useState([]);

  async function Add() {
    let token = "Bearer " + localStorage.getItem("login");
   
    let items = { name };
    
    let result = await fetch("https://ancient-savannah-54184.herokuapp.com/api/teams", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(items),
    });
    result = await result.json();
   
    if (result.status === 200) {
      toast.dark("Team Added Successfully!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if(result.status === 400){
      setError(result.message.name);
      toast.dark(`${result.message.name}`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }else if(result.status === 401){
      toast.dark(`${result.message}`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  return (
    <div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {localStorage.getItem("login") ? (
        <div className="registrationcontainer">
          <div className="registrationbox regtitle">Add Team</div>
          <div className="registrationbox">
            <label for="teamname">Team Name</label>
            <br />
            <input
              type="text"
              placeholder="Enter team name"
              onChange={(e) => setTeam(e.target.value)}
              name="teamname"
              id="teamname"
            />

            
              <span style={{ marginBottom: "1%", display: "block" }}>
                {" "}
                {error}
              </span>
            
          </div>

          <div className="registrationbox">
            <button type="submit" onClick={() => Add()} className="regsub">
              Submit
            </button>
          </div>
        </div>
      ) : (
        history.push("/")
      )}
    </div>
  );
};

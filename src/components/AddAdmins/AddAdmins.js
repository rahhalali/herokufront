import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const AddAdmins = () => {
  const history = useHistory();

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState([]);

  async function Save() {
    let token = "Bearer " + localStorage.getItem("login");
  
    // Axios.defaults.headers.common['X-CSRF-TOKEN'] = token_var;
    let item = { username, email, password };
  
    let result = await fetch("https://ancient-savannah-54184.herokuapp.com/api/admins", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("login")}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(item),
    });
    result = await result.json();
   
    if (result.status == 201) {
      toast.dark(`${result.message}`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      document.getElementById("Username").value="";
      document.getElementById("email").value="";
      document.getElementById("Password").value="";
    } else {
      setError(result.message);
      toast.dark(`Fill all the filled`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setUsername("");
      setEmail("");
      setPassword("");
    }
  }
  return (
    <>
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
        <div className="addemplyeecontainer">
          <div className="registrationcontainer">
            <div className="registrationbox regtitle">Add Admins</div>

            <div className="registrationbox">
              <label htmlFor="Username">Username</label>
              <br />
              <input
                type="lastname"
                placeholder="Enter your Username"
                onChange={(e) => setUsername(e.target.value)}
                name="Username"
                id="Username"
              />
              <span
                style={{ marginBottom: "1%", display: "block", color: "black" }}
              >
                {error.username}
              </span>
            </div>
            <div className="registrationbox">
              <label htmlFor="email">Email</label>
              <br />
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                name="email"
                id="email"
              />
              <span
                style={{ marginBottom: "1%", display: "block", color: "black" }}
              >
                {error.email}
              </span>
            </div>
            <div className="registrationbox">
              <label htmlFor="Password">Password</label>
              <br />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                name="Password"
                id="Password"
              />
              <span
                style={{ marginBottom: "1%", display: "block", color: "black" }}
              >
                {error.password}
              </span>
            </div>

            <div className="registrationbox">
              <button type="submit" onClick={() => Save()} className="regsub">
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        history.push("/")
      )}
    </>
  );
};

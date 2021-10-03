import React, { useEffect, useState } from "react";
import "./AddEmployee.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useHistory } from "react-router";
export function AddEmployee(props) {
  const history = useHistory();
  const [team, setTeam] = useState([]);
  const [role, setRole] = useState([]);
  const [error, setError] = useState([]);
  const [phone, setPhone] = useState("");
  const [team_id, setTeam_id] = useState("");
  const [role_id, setRole_id] = useState("");
  const [file_path, setFile_path] = useState("");

  // to get the id of the team

  function handleTeam(event) {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");
    setTeam_id(optionElementId);
  }

 
  //to get the id for the role
  function handleRole(event) {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");
    setRole_id(optionElementId);
  }
  const [repeatedemail, setRepeatedEmail] = useState([]);

  //useStates for inputs

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // useEffect to get the teams

  useEffect(async () => {
    let team = await fetch("http://localhost:8000/api/get/teams", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    let project = await fetch("http://localhost:8000/api/get/projects", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    let role = await fetch("http://localhost:8000/api/get/roles", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    role = await role.json();
    setRole(role);

  

    team = await team.json();
    setTeam(team);
  }, []);

  //Submit the inputsss

  const Add = async (e) => {
   
    

    let formData = new FormData();

    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("file_path", file_path);
    formData.append("team_id", team_id);
    formData.append("phone", phone);
    
    formData.append("role_id", role_id);

    let result = await fetch("http://localhost:8000/api/add-employee", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
      body: formData,
    });
    result = await result.json();

    if (result.status === 200) {
      toast.dark(`${result.message}`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (result.status === 400) {
     
      setError(result.message);
      toast.dark(`Fill all fields`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
     
      setRepeatedEmail(result.message);
    }
  };
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
            <div className="registrationbox regtitle">Add Employee</div>
            <div className="registrationbox">
              <label htmlFor="firstname">First Name</label>
              <br />
              <input
                type="text"
                placeholder="Enter your first name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <span
                style={{
                  marginBottom: "1%",
                  color: "black",
                  display: "block",
                  fontWeight: "bold",
                }}
              >
                {error.firstname}
              </span>
            </div>
            <div className="registrationbox">
              <label htmlFor="lastname">Last Name</label>
              <br />
              <input
                type="text"
                placeholder="Enter your last name"
                onChange={(e) => setLastName(e.target.value)}
              />
              <span
                style={{
                  marginBottom: "1%",
                  color: "black",
                  display: "block",
                  fontWeight: "bold",
                }}
              >
                {error.lastname}
              </span>
            </div>
            <div className="registrationbox">
              <label htmlFor="email">Email</label>
              <br />
              <input
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <span
                style={{
                  marginBottom: "1%",
                  display: "block",
                  color: "black",

                  fontWeight: "bold",
                }}
              >
                {error.email}
                {repeatedemail}
              </span>
            </div>
            <div className="registrationbox">
              <label htmlFor="confirmpassword">Phone Number</label>
              <br />
              <input
                type="number"
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
              />
              <span
                style={{
                  marginBottom: "1%",
                  display: "block",
                  color: "black",

                  fontWeight: "bold",
                }}
              >
                {error.phone}
              </span>
            </div>
            <div className="registrationbox">
              <label htmlFor="profile">Profile Picture</label>

              <br />
              <input
                type="file"
                onChange={(e) => setFile_path(e.target.files[0])}
              />
              <span
                style={{
                  marginBottom: "1%",
                  display: "block",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                {error.file_path}
              </span>
              <br />
            </div>
            <div
              className="registrationbox"
              style={{
                width: "60%",
                border: "1ps solid black",
                margin: "0 auto 2% auto",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
             
              <div>
                <div style={{ textAlign: "center" }}>
                  <label>Team Name:</label>
                </div>
                <select onChange={handleTeam} className="regsub team_id">
                  <option selected>---</option>
                  {team.map((item) => (
                    <option key={item.id} id={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <span
                  style={{
                    marginTop: "1%",
                    marginBottom: "1%",
                    display: "block",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {error.team_id}
                </span>
              </div>

              <div>
                <div style={{ textAlign: "center" }}>
                  <label>Role Name:</label>
                </div>
                <select onChange={handleRole} className="regsub team_id">
                  <option selected>---</option>
                  {
                   role ? role.map((item) => (
                      <option key={item.id} id={item.id}>
                        {item.role_name}
                      </option>
                    )) : null}
                </select>
                <span
                  style={{
                    marginTop: "1%",
                    marginBottom: "1%",
                    display: "block",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {error.role_id}
                </span>
              </div>
            </div>

            <div className="registrationbox">
              <button
                onClick={Add}
                style={{ border: "none", outline: "none" }}
                className="regsub"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        history.push("/home")
      )}
    </>
  );
}

import React, { useState,useEffect } from "react";
import { Fragment } from "react";
import "./EditEmployee.css";
import { MDBCloseIcon } from "mdbreact";
import OutsideAlerter from "../OutSide.js/Outside";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {useAmazonContext} from '../../Context/AmazonContext';

function EditEmployee({
  trigger,
  valuemployee,
  roles,
  team,
  setEmployee,
  getData
}) {
  const {
    firstname,
    lastname,
    email,
    phone,
    team_id,
    role_id,
    file_path,
    set,
    setLastName,
    setEmail,
    setPhone,
    setTeam_id,
    setRole_id,
    setFile_path,
  } = useAmazonContext();

  const Id=valuemployee.id;


  // to get the id of the team

  function handleTeam(event) {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");
    setTeam_id(optionElementId);
  }


  function handleRole(event) {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");
    setRole_id(optionElementId);
  }

  async function update()
  {
   
    let formData = new FormData();
  
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("file_path", file_path);
    formData.append("team_id", team_id);
    formData.append("phone", phone);
    formData.append("role_id", role_id);

    let result = await fetch(
      `http://localhost:8000/api/update-employee/${Id}?_method=PUT`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("login")}`,
        },
        body: formData,
      }
      
    );
   
   result =await result.json();
   if(result.status === 200){
    toast.dark(`This Employee was edited`, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
   }else{
    toast.dark(result.message, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
   }
   getData();
  }

  return trigger ? (
    <div className="employee">
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
      <OutsideAlerter>
        <div className="employee-inner">
          {
            <Fragment>
              <div className="employee-card ">
                <div className="first-input dev">
                  <label>First Name:</label>
                  <input
                    type="text"
                    className="IN"
                    onChange={(e) => set(e.target.value)}
                    value={firstname}
                    placeholder="Enter Your First Name"
                  ></input>
                 
                </div>

                <div className="second-input dev">
                  <label>Last Name:</label>
                  <input
                    type="text"
                    className="IN"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastname}
                    placeholder="Enter Your Second Name"
                  ></input>
                  
                </div>

                <div className="third-input dev">
                  <label>Email:</label>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="IN"
                    placeholder="Enter Your Email"
                  ></input>
                
                </div>
                <div className="fourth-input dev">
                  <label>Phone:</label>
                  <input
                    type="number"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    className="IN"
                    placeholder="Enter phone"
                  ></input>
                
                </div>
                <div className="seventh-input dev dev1">
                  <label style={{ marginRight: "10%" }}>Role Name:</label>
                  <select onChange={handleRole} defaultValue={role_id} className="regsub team_id">
                    {roles.map((item) => (
                      <option   key={item.id} id={item.id}>
                        {item.role_name}
                      </option>
                    ))}
                  </select>
             
                </div>
                <div className="sixth-input dev dev1">
                  <label style={{ marginRight: "5%" }}>Team Name:</label>
                  <select onChange={handleTeam} defaultValue={team_id} className="regsub team_id">
                    {team.map((item) => (
                      <option  selected key={item.id} id={item.id}>
                        {" "}
                        {item.name}
                      </option>
                    ))}
                  </select>
                 
                </div>
                <div className="fifth-input file">
                  <input
                    type="file"
                    onChange={(e) => setFile_path(e.target.files[0])}
                
                  />
                
                </div>

                

               

                <div className="registrationbox">
                  <button
                    className="regsub"
                    style={{ display: "block", margin: "5% auto 0 auto" , border:"none",outline:"none"}}
                    onClick={() => update()}
                  >
                    Submit
                  </button>
                </div>
                <div
                  style={{
                    position: "absolute",
                    border:"none",outline:"none",
                    top: "10px",
                    right: "16px",
                    zindex: "1",
                  }}
                >
                  <MDBCloseIcon  onClick={() => setEmployee(false)} />
                </div>
              </div>
            </Fragment>
          }
        </div>
      </OutsideAlerter>
    </div>
  ) : (
    ""
  );
}

export default EditEmployee;

import React, { useState } from "react";
import { MDBCloseIcon } from "mdbreact";
import OutsideAlerter from "../OutSide.js/Outside";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const PopupProject = ({ trigger, valueproject, setTrigger, getData }) => {
  const [role_name, setRoleName] = useState(valueproject.project_name);
  const Id=valueproject.id;
  const update = async () => {
    let formData = new FormData();
    formData.append("role_name", role_name);
    let result = await fetch(
      `http://localhost:8000/api/update-project/${Id}?_method=PUT`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("login")}`,
        },
        body: formData,
      }
    );
    result = await result.json();
    if (result.status === 200) {
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
  };
  // const Reload =()=>{
  //     window.location.reload();
  // }
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
          <div className="employee-card ">
            <div className="first-input dev">
              <label>Project Name:</label>
              <input
                type="text"
                className="IN"
                onChange={(e) => setRoleName(e.target.value)}
                defaultValue={valueproject.project_name}
                placeholder="Enter Your Project Name"
              ></input>
            </div>
            <div className="registrationbox">
              <button
                className="regsub"
                style={{
                  display: "block",
                  margin: "5% auto 0 auto",
                  border: "none",
                  outline: "none",
                }}
                onClick={() => update()}
              >
                Submit
              </button>
            </div>
            <div
              style={{
                position: "absolute",
                border: "none",
                outline: "none",
                top: "10px",
                right: "16px",
                zindex: "1",
              }}
            >
              <MDBCloseIcon onClick={() => setTrigger(false)} />
            </div>
          </div>
        </div>
      </OutsideAlerter>
    </div>
  ) : (
    ""
  );
};

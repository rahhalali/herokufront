import React, { useState } from "react";
import { MDBCloseIcon } from "mdbreact";
import OutsideAlerter from "../OutSide.js/Outside";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const PopupTeam = ({ trigger, valueteam, setTrigger, getData }) => {
  const [name, setTeamName] = useState(valueteam.name);
  const Id = valueteam.id;

  const update = async () => {
   
    let formData = new FormData();
    formData.append("name", name);
    let result = await fetch(
      `https://ancient-savannah-54184.herokuapp.com/api/update-team/${Id}?_method=PUT`,
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
              <label>Team Name:</label>
              <input
                type="text"
                className="IN"
                onChange={(e) => setTeamName(e.target.value)}
                defaultValue={valueteam.name}
                placeholder="Enter Your Team Name"
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

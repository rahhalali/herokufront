import React, { useState } from "react";
import { MDBCloseIcon } from "mdbreact";
import OutsideAlerter from "../OutSide.js/Outside";
import { ToastContainer, toast } from "react-toastify";
export const ReportsPopup = ({ trigger, setTrigger, data ,id }) => {
  

  const TeamID = id;



  return trigger ? (
    <div className="Povit">
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
        <div className="Povit-inner">
          <div className="Povit-card ">
            <div className="Povit-in" style={{ padding: "20px" }}>
              <table className="styled-table" width="100%">
                <thead>
                  <tr>
                    <th style={{ textAlign: "center" }}>Project Name</th>
                  </tr>
                </thead>
                <tbody className="high">
                  {data &&
                    data.map((item) => {
                      
                      return (
                        <>
                          {item.project.map((project) => {
                            return (
                              <tr key={project.id}>
                                <td
                                  style={{
                                    textAlign: "center",
                                    fontSize: "25px",
                                  }}
                                >
                                  {project.project_name}
                                </td>
                              </tr>
                            );
                          })}
                        </>
                      );
                    })}
                </tbody>
              </table>
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

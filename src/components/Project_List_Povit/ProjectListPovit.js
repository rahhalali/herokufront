import React, { useState } from "react";
import { MDBCloseIcon } from "mdbreact";
import OutsideAlerter from "../OutSide.js/Outside";
import { ToastContainer, toast } from "react-toastify";

import "./ProjectListPoivt.css";
export const ProjectListPovit = ({ trigger, setTrigger, data, getData ,id }) => {
  

  const TeamID = id;


  const deleteprojectpovit = async (id) => {


    let result = await fetch(
      `https://gentle-fortress-49662.herokuapp.com/api/delete-project-from-team/${TeamID}/project/${id} `,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("login")}`,
        },
      }
    );
    result = await result.json(); 
    setTrigger(false);
    getData();
    if(result.status == 200){
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
  };

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
                    <th style={{ textAlign: "center" }}>Action</th>
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
                                <td style={{ textAlign: "center" }}>
                                  {" "}
                                  <button
                                    onClick={() => deleteprojectpovit(project.id)}
                                    className="delete"
                                    name="delete"
                                  >
                                    Delete
                                  </button>
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

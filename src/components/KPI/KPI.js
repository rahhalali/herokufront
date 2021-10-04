import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const KPI = () => {
    const [name, setName] = useState("");
    const [error,setError]=useState("");


  const Add = async (e) => {

    let formData = new FormData();

    formData.append("kpi_name", name);

    let result = await fetch("https://gentle-fortress-49662.herokuapp.com/api/kpis", {
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
        toast.dark(`This KPI already exist`, {
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
  return true ? (
    <div className="addemplyeecontainer">
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
      <div className="registrationcontainer">
        <div className="registrationbox regtitle">Add KPI</div>
        <div className="registrationbox">
          <label htmlFor="firstname">KPI Name</label>
          <br />
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter KPI please...."
          />
           <span
                style={{
                  marginBottom: "1%",
                  color: "black",
                  display: "block",
                  fontWeight: "bold",
                }}
              >
                {error.kpi_name}
              </span>
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
    ""
  );
};

import React ,{useState} from "react";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";

export const AddProject = () => {
  const history=useHistory();
  const [project_name, setProject] = useState();
  const [error, setError] = useState([]);

  async function Add() {
    let token = "Bearer " + localStorage.getItem("login");
  
    let items = { project_name };
   
    let result = await fetch("http://localhost:8000/api/projects", {
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
      toast.dark("Project Added Successfully!", {
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
    {
      localStorage.getItem("login") ? (<div>
      <h1>Add Project</h1>
      <div className="addemplyeecontainer">
        <div className="registrationcontainer">
          <div className="registrationbox regtitle">Add Project</div>
          <div className="registrationbox">
            <label for="projectname">Project Name</label>
            <br />
            <input
              type="text"
              placeholder="Enter your Project name"
              onChange={(e) => setProject(e.target.value)}
              name="projectname"
              id="projectname"
            />
             <span style={{ marginBottom: "1%", display: "block" }}>
                {" "}
                {error}
              </span>
          </div>

          <div className="registrationbox">
            <button type="submit" onClick={Add} className="regsub">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>) : (
      history.push('/home')
    )
    }
    
    </>
  );
};

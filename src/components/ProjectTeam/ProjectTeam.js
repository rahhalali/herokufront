import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";

export const ProjectTeam = () => {
  const [project_id, setProject_id] = useState("");
  const [team_id, setTeam_id] = useState("");
  const [project, setProject] = useState([]);
  const [team, setTeam] = useState([]);

  const [error, setError] = useState([]);

  const history = useHistory();

  //to get the id for the Team
  function handleTeam(event) {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");
    setTeam_id(optionElementId);
  }
  //to get the id for the Project
  function handleProject(event) {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");
    setProject_id(optionElementId);
  }

  //use Effect to get the Data for Team and Project
  useEffect(async () => {
    let team = await fetch("https://ancient-savannah-54184.herokuapp.com/api/get/teams", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    let project = await fetch("https://ancient-savannah-54184.herokuapp.com/api/get/projects", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    project = await project.json();
    setProject(project);

    team = await team.json();
    setTeam(team);
  }, []);

  //to submit
  const Add = async () => {
    const formData = new FormData();
    formData.append("project_id", project_id);
    formData.append("team_id", team_id);

    let result = await fetch(`https://ancient-savannah-54184.herokuapp.com/api/proteams`, {
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
    } else if (result.status === 403) {
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
        <div>
          <h1>Add Project - Team</h1>
          <div className="addemplyeecontainer">
            <div className="registrationcontainer">
              <div className="registrationbox regtitle">
                Project - Team <br />
                Relation
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
                    <label>Project Name:</label>
                  </div>
                  <select onChange={handleProject} className="regsub team_id">
                    <option selected>---</option>
                    {project.map((item) => (
                      <option key={item.id} id={item.id}>
                        {item.project_name}
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
                    {error.project_id}
                  </span>
                </div>
              </div>

              <div className="registrationbox">
                <button type="submit" onClick={Add} className="regsub">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        history.push("/")
      )}
    </>
  );
};

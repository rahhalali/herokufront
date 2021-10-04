import { HourglassEmpty } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import "./Search.css";
export const Search = ({ parentCallback }) => {
  const [team, setTeam] = useState("");
  const [project, setProject] = useState("");

  const [searchTeam,setSearchTeam]= useState("");
  const [searchProject,setSearchProject]= useState("");

  const [employee,setEmployee] = useState([]);

  useEffect(async()=>{
    if(searchProject != 0 && searchTeam != 0){
       document.getElementById("BTNSEARCH").disabled=false;
    }else{
       document.getElementById("BTNSEARCH").disabled=true;
    }
   
    let team = await fetch("https://gentle-fortress-49662.herokuapp.com/api/get/teams", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    let project = await fetch("https://gentle-fortress-49662.herokuapp.com/api/get/projects", {
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

  },[searchProject,searchTeam]);

const Filter = async () => {
 
  let result = await fetch(`https://gentle-fortress-49662.herokuapp.com/api/get/filter/${searchTeam}/project/${searchProject}`,{
    method:"GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("login")}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
  result =await result.json();
   setEmployee(result.message);
   parentCallback(result.message); 
}

  function handleProject(event) {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");
 

    setSearchProject(optionElementId);
    
  }
  //handle change for teams
  function handleTeam(event) {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");
       setSearchTeam(optionElementId);
   
  }


  return (
    <div className="Search-Bttns">
     
      <div class="select">
        <div className="search-1 search">
          <label>Select Project</label>
          <select onChange={handleProject}>
          <option selected>---- </option>
            
                    {project && project.map((item) => (
                      <option key={item.id} id={item.id} >
                        {item.project_name}
                      </option>
                    ))}
                  </select>
        </div>
      </div>

      <div className="search-2 search">
        <label>Select Team</label>
        <select onChange={handleTeam} >
        <option selected >---- </option>
             
                    {team && team.map((item) => (
                      <option  key={item.id} id={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
      </div>
      <div className="search-3 search2">
        <button value="Filter"  id="BTNSEARCH" onClick={Filter}>Filter</button>
      </div>
    </div>
  );
};

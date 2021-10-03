import React, { useState } from "react";
import { useAmazonContext } from "../Context/AmazonContext";
import { useHistory } from "react-router-dom";
function SideNavRow(props) {
  let history = useHistory();
  const { setSubContainer, setSubContainerEntries } = useAmazonContext();
  const [sata, setSata] = useState([props.entries]);
  const openRow = () => {
    setSubContainer(true);
    setSubContainerEntries(props.entries);
  };

  const goto = () => {
    switch (props.text) {
      case "Add Employee":
        history.push("/addemployee");
        break;
      case "Add Team":
        history.push("/addteam");
        break;
      case "Add Project":
        history.push("/addproject");
        break;
      case "Edit Team Data":
        history.push("/editteam");
        break;
      case "Employee Search":
        history.push("/search");
        break;
      case "Employee List":
        history.push("/employeelist");
        break;
      case "Team List":
        history.push("/teamlist");
        break;
      case "Add Role":
        history.push("/addrole");
        break;
      case "Add Admins":
        history.push("/addadmins");
        break;
      case "Project List":
        history.push("/projectlist");
        break;
      case "Role List":
        history.push("/rolelist");
        break;
      case "Add Project-Team":
        history.push("/project-team");
        break;
        case "List Project-Team":
        history.push("/project/team/list");
        break;
        case "Add KPI":
          history.push("/kpi");
          break;
          case "Employee KPI":
            history.push("/employee/kpi");
    }
  };

  return (
    <div className="sidenavRow" onClick={() => props.entries && openRow()}>
      <div>
        {props.text}
        <button onClick={() => goto()} className="sidebar_wrap"></button>
      </div>
      <i className="fas fa-chevron-right"></i>
    </div>
  );
}

export default SideNavRow;

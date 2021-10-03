import React, { useEffect } from "react";
import Apptest from "./Apptest";
import { Header } from "./components/Header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { KPI } from "./components/KPI/KPI";
import { AddProject } from "./components/AddProject/AddProject";
import { AddTeam } from "./components/AddTeam/AddTeam";
import { AddEmployee } from "./components/AddEmployee/AddEmployee";
import { ProjectTeamList } from "./components/Project_TeamList/Project_TeamList";
import { EditProject } from "./components/EditProject/EditProject";
import { EditTeam } from "./components/EditTeam/EditTeam";
import { EmployeeList } from "./components/EmployeeList/EmployeeList";
import { TeamList } from "./components/TeamList/TeamList";
import ListRole from "./components/ListRole/ListRole";
import { ProjectList } from "./components/ProjectList/ProjectList";
import Login from "./components/Login/Login";
import { AddAdmins } from "./components/AddAdmins/AddAdmins";
import { AddRole } from "./components/AddRole/AddRole";
import { EmployeeKpi } from "./components/EmployeeKpi/EmployeeKpi";
import Reports from "./components/Reports/Reports";
import { ProjectTeam } from "./components/ProjectTeam/ProjectTeam";
import EmployeeReport from "./components/EmployeeReport/EmployeeReport";
const App = () => {
  useEffect(() => {}, []);
  return (
    <div>
      <Switch>
        <Route exact path="/reports">
          <Header />
          <Reports />
        </Route>
        <Route exact path="/employeereport/:id/kpi/:Id">
          <Header />
          <EmployeeReport />
        </Route>
        <Route exact path="/home">
          <Header />
          <EmployeeList />
        </Route>
        <Route exact path="/employee/kpi">
          <Header />
          <EmployeeKpi />
        </Route>
        <Route exact path="/kpi">
          <Header />
          <KPI />
        </Route>
        <Route exact path="/listrole">
          <Header />
          <ListRole />
        </Route>
        <Route exact path="/project-team">
          <Header />
          <ProjectTeam />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/addproject">
          <Header />
          <AddProject />
        </Route>
        <Route exact path="/addteam">
          <Header />
          <AddTeam />
        </Route>
        <Route exact path="/project/team/list">
          <Header />
          <ProjectTeamList />
        </Route>
        <Route exact path="/addemployee">
          <Header />
          <AddEmployee />
        </Route>
        <Route exact path="/search">
          <Header />
          <EditProject />
        </Route>
        <Route exact path="/addrole">
          <Header />
          <AddRole />
        </Route>
        <Route exact path="/editteam">
          <Header />
          <EditTeam />
        </Route>
        <Route exact path="/employeelist">
          <Header />
          <EmployeeList />
        </Route>
        <Route exact path="/teamlist">
          <Header />
          <TeamList />
        </Route>
        <Route exact path="/projectlist">
          <Header />
          <ProjectList />
        </Route>
        <Route exact path="/rolelist">
          <Header />
          <ListRole />
        </Route>
        <Route exact path="/addadmins">
          <Header />
          <AddAdmins />
        </Route>
      </Switch>
      <Apptest />
    </div>
  );
};
export default App;

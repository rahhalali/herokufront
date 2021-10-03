import React, { useState, useEffect, Fragment, useRef } from "react";
import Popup from "../Popup/Popup";
import Pagination from "react-paginate";
import "./EditProject.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditEmployee from "../EditEmployee/EditEmplyee";
import useFullPageLoader from "../useFullPageLoader/useFullPageLoader";
import { Search } from "../Search/Search";
import { useHistory } from "react-router";
import { PopupKpi } from "../PopupKPI/PopupKpi";

import { useAmazonContext } from "../../Context/AmazonContext";

export const EditProject = () => {
  const {
    set,
    setLastName,
    setEmail,
    setPhone,
    setTeam_id,
    setRole_id,
    setFile_path,
  } = useAmazonContext();

  const history = useHistory();

  const [kpiTrigger, setKpiTrigger] = useState(false);

  const [buttonPopup, setButtonPopup] = useState(false);
  const [employee, setEmployee] = useState(false);

  const [error, setError] = useState("");

  const [buttonkpi, setButtonkpi] = useState(false);

  const [employeeId, setEmployeeId] = useState("");

  const [kpi, setKpi] = useState([]);

  const [team, setTeam] = useState([]);
  const [role, setRole] = useState([]);

  const [data, setData] = useState([]);
  const [profilevalue, setProfile] = useState([]);

  const [edit, setEdit] = useState([]);

  const [pageNumber, setPageNumber] = useState(0);

  const employeePerPage = 4;
  const pagesVisited = pageNumber * employeePerPage;

  const displayEmployees = data.slice(
    pagesVisited,
    pagesVisited + employeePerPage
  );

  const pageCount = Math.ceil(data.length / employeePerPage);

  useEffect(async () => {
  
    getData();
  }, []);

  const [loader, showLoader, hideLoader] = useFullPageLoader();
  async function getData() {
    showLoader();
    let result = await fetch("http://localhost:8000/api/get/employee-list", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    });
    result = await result.json();
    hideLoader();
    setData(result);
  }

  async function deleteemployee(id) {
    let result = await fetch(
      "http://localhost:8000/api/delete-employee/" + id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("login")}`,
        },
      }
    );
    result = await result.json();
    if (result.status === 200) {
      toast.dark("Deleted", {
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
  }

  const Edit = async (id) => {
    let token = "Bearer " + localStorage.getItem("login");
    let result1 = await fetch(
      "http://localhost:8000/api/get/employee-one/" + id,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    );

    let team = await fetch("http://localhost:8000/api/get/teams", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    let project = await fetch("http://localhost:8000/api/get/projects", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    let role = await fetch("http://localhost:8000/api/get/roles", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    role = await role.json();
    setRole(role);

    project = await project.json();

    team = await team.json();
    setTeam(team);

    result1 = await result1.json();
    setEdit(result1);
    set(result1.firstname);
    setEmail(result1.email);
    setLastName(result1.lastname);
    setPhone(result1.phone_number);
    setFile_path(result1.file_path);
    setTeam_id(result1.team_id);
    setRole_id(result1.role_id);
    Appear();
  };
  const profile = async (id) => {
    let token = "Bearer " + localStorage.getItem("login");
    let result1 = await fetch(
      "http://localhost:8000/api/get/employee-one/" + id,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    );
    result1 = await result1.json();
    setProfile(result1);
    Call();
  };
  function Call() {
    setButtonPopup(true);
  }
  function Appear() {
    setEmployee(true);
  }
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  function Callback(value) {
    setData(value);
  }

  async function ShowKpi(value) {
    let result = await fetch(
      `http://localhost:8000/api/get/employee-kpi/${value}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("login")}`,
        },
      }
    );
    result = await result.json();
    setKpi(result);
    setEmployeeId(value);
    setKpiTrigger(true);
  }
  return (
    <div
      className="editproject"
      style={{ marginTop: "100px", width: "80%", margin: "120px auto" }}
    >
      {localStorage.getItem("login") ? (
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
          <Search parentCallback={Callback} />
          <button
            id="BTNADD"
            style={{ position: "absolute", marginTop: "-69px" }}
            onClick={() => history.push("/addemployee")}
          >
            Add Employee
          </button>
          <table class="styled-table TTD" width="100%">
            <thead>
              <tr>
                <th>ID</th>
                <th>face_ID</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Email</th>
                <th>phone_number</th>
                {localStorage.getItem("login") ? (
                  <th style={{ textAlign: "center" }}>Action</th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {displayEmployees &&
                displayEmployees.map((item) => (
                  <Fragment key={item.id}>
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>
                        <img
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            border: "1px solid black",
                          }}
                          src={`http://localhost:8000/` + item.file_path}
                          alt="image"
                        />{" "}
                      </td>
                      <td
                        onClick={() => {
                          setButtonkpi(true);
                          ShowKpi(item.id);
                        }}
                        className="HOVEER"
                      >
                        {item.firstname}
                      </td>
                      <td>{item.lastname}</td>
                      <td>{item.email}</td>
                      <td>{item.phone_number}</td>

                      {localStorage.getItem("login") ? (
                        <td
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <button
                            onClick={() => Edit(item.id)}
                            className="edit"
                            name="edit"
                            style={{ border: "none", outline: "none" }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteemployee(item.id)}
                            className="delete"
                            name="delete"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => {
                              profile(item.id);
                            }}
                            className="view"
                            name="view"
                            style={{ border: "none", outline: "none" }}
                          >
                            View
                          </button>
                        </td>
                      ) : null}
                    </tr>
                  </Fragment>
                ))}
            </tbody>
          </table>
          <Popup
            trigger={buttonPopup}
            setTrigger={setButtonPopup}
            value={profilevalue}
          />

          <EditEmployee
            trigger={employee}
            setEmployee={setEmployee}
            roles={role}
            team={team}
            valuemployee={edit}
            getData={getData}
          />

          <PopupKpi
            kpiTrigger={kpiTrigger}
            setKpiTrigger={setKpiTrigger}
            kpidata={kpi}
            value={employeeId}
          />
          <Pagination
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginatioBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />

          {loader}
        </>
      ) : (
        history.push("/home")
      )}
    </div>
  );
};

import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ProjectListPovit } from "../Project_List_Povit/ProjectListPovit";
import Pagination from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFullPageLoader from "../useFullPageLoader/useFullPageLoader";

export const ProjectTeamList = () => {
  const [data, setData] = useState([]);
  const history = useHistory();

  const [Id,setId]=useState("");
  //to show the project popup
  const [buttonPopup, setButtonPopup] = useState(false);
  const [datas, setDatas] = useState([]);

  const [pageNumber, setPageNumber] = useState(0);

  const employeePerPage = 10;
  const pagesVisited = pageNumber * employeePerPage;

  const displayTeam = data.slice(pagesVisited, pagesVisited + employeePerPage);

  const pageCount = Math.ceil(data.length / employeePerPage);

  useEffect(async () => {
    getData();
  }, []);

  async function Show (id) {
    showLoader();
    let result = await fetch(
      "http://localhost:8000/api/get/project-team-one/" + id,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("login")}`,
        },
      }
    );
    result = await result.json();
    hideLoader(); 
    setDatas(result);
    setId(id);
    setButtonPopup(true);
  }


  const [loader, showLoader, hideLoader] = useFullPageLoader();

  async function getData() {
    showLoader();
    let result = await fetch("http://localhost:8000/api/get/project-teams", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    });
    result = await result.json();
    hideLoader();
    setData(result);
  }
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div style={{ width: "50%", margin: "120px auto 0 auto" }}>
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
        <>
           <button id="BTNADD" onClick={()=>history.push('/project-team')}>Assign Project</button>
          <table className="styled-table" width="100%">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>ID</th>
                <th style={{ textAlign: "center" }}>Team</th>
                <th style={{ textAlign: "center" }}>Date</th>
                <th style={{ textAlign: "center" }}>Projects</th>

             
              </tr>
            </thead>
            <tbody>
              {displayTeam &&
                displayTeam.map((item) => {
                
                    return (
                      <>
                        <tr key={item.id}>
                          <td style={{ textAlign: "center" }}>{item.id}</td>
                          <td style={{ textAlign: "center" }}>{item.name}</td>
                          <td style={{ textAlign: "center" }}>
                            {item.created_at.substr(0, 10)}
                          </td>
                          {/* {item.project.map((items) => {
                      <td>{items}</td>;
                    })} */}
                          <td style={{ textAlign: "center" }}>
                            {item.project.length > 0 ? (
                              // (item.project.map((project)=>{
                              //   return (
                              //     <>
                              //    {project.project_name}
                              //    <br/>
                              //    </>
                              //   )
                              // }
                              // ))
                              <button
                                className="view"
                                name="view"
                                style={{
                                  border: "none",
                                  outline: "none",
                                  fontSize: "15px",
                                  padding: "10px 0px",
                                }}
                                onClick={()=>Show(item.id)}
                              >
                                {" "}
                                Show project{" "}
                              </button>
                            ) : (
                              "------------------"
                            )}
                          </td>

                          {/* <td
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <button
                              onClick={() => deleteprojectteam(item.id)}
                              className="delete"
                              style={{ border: "none", outline: "none" }}
                              name="delete"
                            >
                              Delete
                            </button>
                          </td> */}
                        </tr>
                      </>
                    );
                  
                })}
            </tbody>
          </table>
          <ProjectListPovit
            trigger={buttonPopup}
            setTrigger={setButtonPopup}
            data={datas}
            id={Id}
            getData={getData}
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
        </>
      ) : (
        history.push("/home")
      )}
      {loader}
    </div>
  );
};

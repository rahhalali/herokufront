import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Pagination from "react-paginate";
import "react-toastify/dist/ReactToastify.css";
import "./Project.css";
import useFullPageLoader from "../useFullPageLoader/useFullPageLoader";
import { PopupProject } from "../PopupProject/PopupProject";

export const ProjectList = () => {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState([]);
  const [project,setProject]=useState(false);

  const [pageNumber, setPageNumber] = useState(0);

  const employeePerPage = 5;
  const pagesVisited = pageNumber * employeePerPage;

  const displayEmployees = data.slice(
    pagesVisited,
    pagesVisited + employeePerPage
  );

  const pageCount = Math.ceil(data.length / employeePerPage);

  
  const history = useHistory();
  useEffect(async () => {
    getData();
  }, []);
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  async function deleteproject(id) {
    let result = await fetch("http://localhost:8000/api/delete-project/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    });
    result = await result.json();

   
    if (result.status === 200) {
      toast.dark(result.results, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (result.status === 401) {
      
      toast.dark(`try again`, {
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

  async function getData() {
    showLoader();
    let result = await fetch("http://localhost:8000/api/get/projects", {
      method: "GET",
      headers: {
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

  const Edit = async (id) => {
    let token = "Bearer " + localStorage.getItem("login");
    let result = await fetch(
      "http://localhost:8000/api/get/project-one/" + id,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    );
    result = await result.json();
    setEdit(result);
    setProject(true);
    }
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
        <button id="BTNADD" onClick={()=>history.push('/addproject')}>Add Project</button>
          <table class="styled-table" width="100%">
            <thead>
              <tr>
                <th>ID</th>
                <th>Project</th>
                <th>Date</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayEmployees &&
                displayEmployees.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.project_name}</td>
                    <td>{item.created_at.substr(0, 10)}</td>
                    <td style={{ display: "flex", justifyContent: "center" }}>
                      <button
                        className="edit"
                        name="edit"
                        onClick={() => Edit(item.id)}
                        style={{ border: "none", outline: "none" }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteproject(item.id)}
                        className="delete"
                        name="delete"
                        style={{ border: "none", outline: "none" }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <PopupProject
        trigger={project}
        setTrigger={setProject}
        valueproject={edit}
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

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Pagination from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFullPageLoader from "../useFullPageLoader/useFullPageLoader";
import {PopupRole} from '../PopupRole/PopupRole';
function ListRole() {

  const [edit, setEdit] = useState([]);
  const [role_name,setRole_name]=useState(false);

  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const employeePerPage = 2;
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

  async function deleterole(id) {
    let result = await fetch("http://localhost:8000/api/delete-role/" + id, {
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
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  async function getData() {
    showLoader();

    let result = await fetch("http://localhost:8000/api/get/roles", {
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
      "http://localhost:8000/api/get/role-one/" + id,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    );
    result = await result.json();
    setEdit(result);
    setRole_name(true);
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
        <button id="BTNADD" onClick={()=>history.push('/addrole')}>Add Role</button>
          <table class="styled-table" width="100%">
            <thead>
              <tr>
                <th>ID</th>
                <th>Role</th>
                <th>Date</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayEmployees &&
                displayEmployees.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.role_name}</td>
                    <td>{item.created_at.substr(0, 10)}</td>
                    <td style={{ display: "flex", justifyContent: "center" }}>
                      <button
                        className="edit"
                        style={{ border: "none", outline: "none" }}
                        onClick={() => Edit(item.id)}
                        name="edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleterole(item.id)}
                        className="delete"
                        style={{ border: "none", outline: "none" }}
                        name="delete"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <PopupRole
        trigger={role_name}
        setTrigger={setRole_name}
        valuerole={edit}
        getData={getData}
      />+
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
        history.push("/")
      )}
      {loader}
    </div>
  );
}

export default ListRole;

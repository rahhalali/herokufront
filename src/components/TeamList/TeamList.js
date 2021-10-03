import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { PopupTeam } from "../PopupTeam/PopupTeam";
import Pagination from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFullPageLoader from "../useFullPageLoader/useFullPageLoader";
import "./Team.css"

export const TeamList = () => {
  const [data, setData] = useState([]);
  const history = useHistory();

  const [Team, setTeam] = useState(false);

  const [edit,setEdit]=useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const employeePerPage = 5;
  const pagesVisited = pageNumber * employeePerPage;

  const displayTeam = data.slice(
    pagesVisited,
    pagesVisited + employeePerPage
  );

  const pageCount = Math.ceil(data.length / employeePerPage);

  useEffect(async () => {
    getData();
  },[]);

  async function deleteemployee(id) {
    let result = await fetch("http://localhost:8000/api/delete-team/" + id, {
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
     
      toast.dark(result.results, {
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

    let result = await fetch("http://localhost:8000/api/get/teams", {
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
  
  const Edit = async(id) => {
    
    let result = await fetch ("http://localhost:8000/api/get/team-one/"+id,{
      method:"GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      }
    })
    result = await result.json();
      setEdit(result);
     
      setTeam(true);
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
          <button id="BTNADD" onClick={()=>history.push('/addteam')}>Add Team</button>
          <table className="styled-table" width="100%">
            <thead>
              <tr>
                <th>ID</th>
                <th>Team</th>
                <th>Date</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayTeam &&
                displayTeam.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.created_at.substr(0, 10)}</td>
                    <td style={{ display: "flex", justifyContent: "center" }}>
                      <button
                        className="edit"
                        style={{ border: "none", outline: "none" }}
                        onClick={()=>Edit(item.id)}
                        name="edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteemployee(item.id)}
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
          <PopupTeam
        trigger={Team}
        setTrigger={setTeam}
        valueteam={edit}
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
        history.push("/")
      )}
      {loader}
    </div>
  );
};

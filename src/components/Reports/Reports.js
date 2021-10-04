import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { ReportsPopup } from "../ReportsPopup/ReportsPopup"; 
import Pagination from "react-paginate";
import "react-toastify/dist/ReactToastify.css";
import useFullPageLoader from "../useFullPageLoader/useFullPageLoader";
import './Reports.css';
function Reports() {
  const history = useHistory();
  const [datas, setDatas] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [data, setData] = useState([]);

  const [pageNumber, setPageNumber] = useState(0);

  const employeePerPage = 5;
  const pagesVisited = pageNumber * employeePerPage;

  const displayEmployees = data.slice(
    pagesVisited,
    pagesVisited + employeePerPage
  );

  const pageCount = Math.ceil(data.length / employeePerPage);

  useEffect(() => {
    getData();
  }, []);
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  async function getData() {
    showLoader();
    let result = await fetch("https://gentle-fortress-49662.herokuapp.com/api/get/reports", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    });
    result = await result.json();
    hideLoader();
    setData(result);
  }

  async function Show (id) {
    showLoader();
    

    let result = await fetch(
      "https://gentle-fortress-49662.herokuapp.com/api/get/project-team-one/" + id,
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
    setButtonPopup(true);
  }
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div
      className="editproject "
      style={{ marginTop: "100px", width: "90%", margin: "120px auto" }}
    >
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
        <table class="styled-table tb-tb"  width="100%">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>ID</th>
              <th style={{ textAlign: "center" }}>face_ID</th>
              <th style={{ textAlign: "center" }}>FirstName</th>
              <th style={{ textAlign: "center" }}>LastName</th>
              <th style={{ textAlign: "center" }}>Email</th>
              <th style={{ textAlign: "center" }}>phone_number</th>
              <th style={{ textAlign: "center" }}>Employeed at</th>
              <th style={{ textAlign: "center" }}>Team Name</th>
              <th style={{ textAlign: "center" }}>Project Name</th>
              <th style={{ textAlign: "center" }}>Role Name</th>
            </tr>
          </thead>
          <tbody>
            {displayEmployees &&
              displayEmployees.map((item) => (
                <>
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
                        src={`https://gentle-fortress-49662.herokuapp.com/` + item.file_path}
                        alt="image"
                      />{" "}
                    </td>
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    <td>{item.email}</td>
                    <td>{item.phone_number}</td>
                    <td>{item.created_at.substr(0,10)}</td>
                    <td>{ item.team.name}</td>
                    <td style={{ textAlign: "center" }}>
                            {item.team.project.length > 0 ? (
                              <button
                                className="view"
                                name="view"
                                style={{
                                  border: "none",
                                  outline: "none",
                                  fontSize: "15px",
                                  padding: "10px 0px",
                                }}
                                onClick={()=>Show(item.team.id)}
                              >
                                {" "}
                                Show project{" "}
                              </button>
                            ) : (
                              "------------------"
                            )}
                            
                          </td><td>{item.role.role_name}</td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>
      ) : (
        history.push("/")
      )}
      {loader}
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
      <ReportsPopup
            trigger={buttonPopup}
            setTrigger={setButtonPopup}
            data={datas}
            getData={getData}
          />
    </div>
  );
}

export default Reports;

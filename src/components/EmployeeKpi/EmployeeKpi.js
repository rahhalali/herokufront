import React, { useState,useEffect } from "react";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import useFullPageLoader from "../useFullPageLoader/useFullPageLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value}°C`;
}

export const EmployeeKpi = () => {
  const classes = useStyles();

  //states for the page

  const [employee, setEmployee] = useState([]);
  const [kpi, setKpi] = useState("");
  const [rate, setRate] = useState(0);
  const [error, setError] = useState("");

  const [employee_id,setEmployee_id]=useState("");
  const [kpi_id,setKpi_id]=useState("");

  const history = useHistory();

  function handleEmployee(event) {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");
   
    setEmployee_id(optionElementId);
  }

  function handleKPI(event){
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");
   
    setKpi_id(optionElementId);
  }


    useEffect(() => {
    getData(); 
    }, []);
    const [loader,showLoader,hideLoader]=useFullPageLoader();
    async function getData() {
        showLoader();
        let result = await fetch("https://ancient-savannah-54184.herokuapp.com/api/get/employee-list", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        });

        let result2 = await fetch("https://ancient-savannah-54184.herokuapp.com/api/get/emp_kpi", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        });

        result2 = await result2.json();
        result = await result.json();
        hideLoader();
        setEmployee(result);
        setKpi(result2);
      }

  const handleRate = (event, newValue) => {
    setRate(newValue);  
};

  const Add= async() =>{
      
    const formData =new FormData();

    formData.append("kpi_id",kpi_id);
    formData.append("employee_id",employee_id);
    formData.append('kpi_number',rate);


    let result =await fetch("https://ancient-savannah-54184.herokuapp.com/api/emp_kpi",{
      method:"POST",
      headers:{
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
      body:formData
    });
    result =await result.json();
    if(result.status === 200){
      toast.dark(result.message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }else if(result.status === 400){
        setError(result.message);
      
    }else {
      toast.dark("Required", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

  }
  return (
    <>
      {localStorage.getItem("login") ? (
        
        <div className="addemplyeecontainer">
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
          <div className="registrationcontainer">
            <div className="registrationbox regtitle">Employee KPI</div>
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
                  <label>Employee Name:</label>
                </div>
                <select
                  onChange={handleEmployee}
                  className="regsub team_id"
                >
                  <option selected>---</option>
                  {employee.map((item) => (
                    <option key={item.id} id={item.id}>
                      {item.firstname}-{item.lastname}
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
                  {error.employee_id}
                </span>
              </div>

              <div>
                <div style={{ textAlign: "center" }}>
                  <label>KPI Name:</label>
                </div>
                <select
                  onChange={handleKPI}
                  className="regsub team_id"
                >
                  <option selected>---</option>
                  {kpi
                    ? kpi.map((item) => (
                        <option key={item.id} id={item.id}>
                          {item.kpi_name}
                        </option>
                      ))
                    : null}
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
                  {error.kpi_id}
                </span>
              </div>
            </div>
            <div className="registrationbox" >
              <label htmlFor="lastname">Rating KPI</label>
              <br />
              <Typography id="discrete-slider" gutterBottom>
                for employee 
              </Typography>
              <Slider
                className="thick"
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                onChange={handleRate}
                step={1}
                marks
                min={0}
                max={5}
              />
              <span
                style={{
                  marginBottom: "1%",
                  color: "black",
                  display: "block",
                  fontWeight: "bold",
                }}
              >
                {error.kpi_number}
              </span>
            </div>

            <div className="registrationbox">
              <button
                onClick={Add}
                style={{ border: "none", outline: "none" }}
                className="regsub"
              >
                Submit
              </button>
            </div>
          </div>
          {loader}
        </div>
      ) : (
        history.push("/")
      )}
    </>
  );
};

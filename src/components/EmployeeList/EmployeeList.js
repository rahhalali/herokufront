import React, { useEffect } from "react";
import "./EmployeeList.css";
import { BarChart } from "../Charts/BarChart/BarChart";
import { PieChart } from "../Charts/PieChart/PieChart";
import { LineChart } from "../Charts/LineChart/LineChart";
import { RadarChart } from "../Charts/RadarChart/RadarChart";
import { useHistory } from "react-router";
export const EmployeeList = () => {
  const history = useHistory();

  function employee() {
    history.push("/search");
  }
  function Reports() {
    history.push("/reports");
  }

  return (
    <>
      <div className="heyy">
        {localStorage.getItem("login") ? (
          <div className="employeelist-charts">
            <button
              className="btn-char"
              style={{ border: "none", outline: "none" }}
              onClick={() => employee()}
            >
              Employee
            </button>
            <button
              className="btn-char"
              style={{ border: "none", outline: "none" }}
              onClick={() => Reports()}
            >
              Reports
            </button>
          </div>
        ) : (
          ""
        )}

        <div className="chartContainer">
          <BarChart className="first" />
          <PieChart />
        </div>
      </div>
    </>
  );
};

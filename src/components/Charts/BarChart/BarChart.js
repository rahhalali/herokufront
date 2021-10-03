import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import './BarChart.css'
export const BarChart = () => {

const [Chartdata,setChartData]=useState([]);

const chart =  async () => {
    let project = [];
    let team = [];
  
       let result = await fetch(`http://localhost:8000/api/get/count-projects`,{
         method:"GET",
         headers:{
          Authorization: `Bearer ${localStorage.getItem("login")}`,
        }
       }) 
       result = await result.json();


        for (const dataObj of result) {
          team.push(dataObj.name);
          project.push(parseInt(dataObj.count));
        }
        setChartData({
          labels: team,
          datasets: [
            {
              label: "# of projects",
              data: project,
              backgroundColor: [ "rgba(75, 192, 192, 0.6)",
              "rgba(9, 5, 72, 0.6)",
              "rgba(0, 0, 0, 0.6)",
              "rgba(255, 0, 0,1)"],
              borderWidth: 1
            }
          ]
        });
  };
  useEffect(()=>{
    chart();
  },[])
  return (
    <div className="bar-container">
      <Bar
        data={Chartdata}
        options={{
          responsive: true,
          title: { text: "THICCNESS SCALE", display: true },
          
          scales: {
            yAxes: [
              {
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10,
                  beginAtZero: true
                },
                gridLines: {
                  display: false
                }
              }
            ],
            xAxes: [
              {
                gridLines: {
                  display: false
                }
                
              }
            ]
          }
        }}
      />
    </div>
  );
};

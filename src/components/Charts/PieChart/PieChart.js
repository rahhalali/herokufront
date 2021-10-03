import React ,{useState,useEffect} from "react";
import { Pie } from "react-chartjs-2";
import './PieChart.css'
export const PieChart = () => {
  const [Chartdata,setChartData]=useState([]);
  let project = [];
    let team = [];
  const chart =  async () => {
    
    
  
       let result = await fetch(`https://ancient-savannah-54184.herokuapp.com/api/get/count-employees`,{
         method:"GET",
         headers:{
          Authorization: `Bearer ${localStorage.getItem("login")}`,
        }
       }) 
       result =await result.json();
       for (const dataObj of result) {
         let a = 0;
        team.push(dataObj.project_name);
        for(const ob of dataObj['team']){
               a = a + ob.counts;
        } 
        project.push(a);
      }
       
          // team.push(dataObj.name);
          // project.push(parseInt(dataObj.count));
        
        setChartData({
          labels: team,
          datasets: [
            {
              label: "# of projects",
              data: project,
              backgroundColor: [
              "rgba(75, 192, 192, 0.6)",
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
    <div className="Pie-container">
      <Pie
      data={Chartdata}
        height={400}
        width={600}
        options={{
          maintainAspecrRatio: false,
          scales:{
              yAxes:[
                  {
                      ticks:{
                          beginAtZero: true
                      }
                  }
              ]
          }
        }}
      />
    </div>
  );
};

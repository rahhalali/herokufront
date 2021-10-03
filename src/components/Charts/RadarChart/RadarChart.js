import React from "react";
import { Radar } from "react-chartjs-2";
import './RadarChart.css'
export const RadarChart = () => {
  return (
    <div className="Radar-container">
      <Radar
        data={{
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              label: "# of votes",
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                "gba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
            // {
            //     label: "Quantity",
            //   data: [9, 13, 6, 15, 12, 3],
            //   backgroundColor: [
            //     "gba(255, 99, 132, 0.2)",
            //     "rgba(54, 162, 235, 0.2)",
            //     "rgba(255, 206, 86, 0.2)",
            //     "rgba(75, 192, 192, 0.2)",
            //     "rgba(153, 102, 255, 0.2)",
            //     "rgba(255, 159, 64, 0.2)",
            //   ],
            // }
          ],
        }}
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

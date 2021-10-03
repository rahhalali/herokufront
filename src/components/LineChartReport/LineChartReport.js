import { Style } from "@material-ui/icons";
import React, { useEffect ,useState} from "react";
import {  Line } from "react-chartjs-2";
import {useAmazonContext} from '../../Context/AmazonContext';

export const LineChartReport = ({results}) => {
    const { stat } = useAmazonContext();
    const [chartData, setChartData] = useState([]);
        let kpi = [];
        let created = [];
         useEffect(()=>{

         for (const dataObj of stat) {
            kpi.push(dataObj.kpi_number);
           
            created.push(dataObj.created_at.substr(0,10));
          }
          setChartData({
            labels: created,
            datasets: [
              {
                label: "level of kpi",
                data: kpi,
                backgroundColor: ["rgba(75, 192, 192, 0.6)"],
                borderWidth: 8
              }
            ]
          });
    },[stat])

  return (
    <div className="Line-container">

      <Line
          data={chartData}
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

import React, { Fragment, useEffect, useState } from "react";
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";
import {useAmazonContext} from '../../Context/AmazonContext';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import "./EmployeeReport.css";
import { LineChartReport } from "../LineChartReport/LineChartReport";
function EmployeeReport() {

  const { setStat } = useAmazonContext(); 
  const { id } = useParams();
  const {Id} = useParams();

  const [result, setResult] = useState([]);
  const [result1, setResult1] = useState([]);

  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }
  
  IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
  };
  const customIcons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon />,
      label: 'Very Dissatisfied',
    },
    2: {
      icon: <SentimentDissatisfiedIcon />,
      label: 'Dissatisfied',
    },
    3: {
      icon: <SentimentSatisfiedIcon />,
      label: 'Neutral',
    },
    4: {
      icon: <SentimentSatisfiedAltIcon />,
      label: 'Satisfied',
    },
    5: {
      icon: <SentimentVerySatisfiedIcon />,
      label: 'Very Satisfied',
    },
  };
  
  useEffect(async () => {
    let result = await fetch(
      `http://localhost:8000/api/get/employeeee-kpi-number/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("login")}`,
        },
      }
    );

    let results =await fetch(`http://localhost:8000/api/get/employee-kpi-number/${id}/kpi/${Id}`,{
      method:"GET",
      headers:{
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      }
    })

    results = await results.json();
    setResult1(results);
    setStat(results);


    result = await result.json();
    setResult(result);
   
  }, []);

  return (
    <div className="DIVS" style={{ width: "100%", margin: "120px auto" }}>
      {result &&
        result.map((item) => {
          return (
            <Fragment key={item.id}>
              <div className="item-a" >
                <div className="item-a-inner">
                  <img
                    src={"http://localhost:8000/" + item.file_path}
                    alt="image"
                  />
                  <p className="Paragraph">
                    {item.firstname} {item.lastname}
                  </p>
                  <p className="PARA">
                    <span style={{ marginRight: "20px", color: "darkgreen" }}>
                      <i className="fas fa-phone-alt fa-2x"></i>
                    </span>
                    {item.phone_number}
                  </p>
                  <p className="PARA">
                    <span style={{ marginRight: "20px", color: "darkgreen" }}>
                      <i className="fas fa-envelope fa-2x"></i>
                    </span>
                    {item.email}
                  </p>
                  <p>
                    <span className="SPAN">Employeed since :</span>{" "}
                    {item.created_at.substr(0, 10)}
                  </p>
                </div>
              </div>
              <div className="item-b">
                <div className="item-b-inner">
                  <h2>KPI NAME</h2>
                  <table className="styled-table TTD RR" style={{zIndex:"-10"}} width="100%">
                    <tbody>
                      {item.k_p_i.map((items) => {
                        return (
                          <Fragment key={items.id}>
                            <tr>
                              <td width="50%">{items.kpi_name}</td>
                              <td width="50%" style={{background:"lightyellow"}}>
                                <Box
                              
                                  component="fieldset"
                                  mb={3}
                                  borderColor="transparent"
                                >
                                  <Typography component="legend">
                                   KPI Rate
                                  </Typography>
                                  <Rating
                                    name="customized-icons"
                                    value={items.last_price.kpi_number}
                                    readOnly
                                    IconContainerComponent={IconContainer}
                                  />
                                </Box>
                              </td>
                            </tr>
                          </Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </Fragment>
          );
        })}
      <div className="item-c">
      
        <div className="item-c-inner">
          <LineChartReport 
          results={result1}
           />
          </div>
      </div>
    </div>
  );
}

export default EmployeeReport;

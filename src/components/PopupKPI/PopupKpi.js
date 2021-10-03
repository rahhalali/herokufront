import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { MDBCloseIcon } from "mdbreact";
import OutsideAlerter from "../OutSide.js/Outside";
import "./PopupKpi.css";

export const PopupKpi = ({ kpiTrigger, setKpiTrigger, kpidata, value }) => {

  const Employee_id = value;


  return kpiTrigger ? (
    <div className="Povit">
      <OutsideAlerter>
        <div className="Povit-inner">
          <div className="Povit-card ">
            <div className="Povit-in" style={{ padding: "20px" }}>
              <table className="styled-table" width="100%">
                <thead>
                  <tr>
                    <th style={{ textAlign: "center" }}>KPI Name</th>
                  </tr>
                </thead>
                <tbody className="high">
                  {kpidata &&
                    kpidata.map((item) => {
                      return (
                        <Fragment key={item.id}>
                          <tr >
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: "25px",
                              }}
                              className="high_hover"
                            >
                              <Link
                                className="link-ink"
                                to={{
                                  pathname: `/employeereport/${Employee_id}/kpi/${item.id}`,
                                }}
                              >
                                {item.kpi_name}
                              </Link>
                            </td>
                          </tr>
                        </Fragment>
                      );
                    })}
                </tbody>
              </table>
            </div>

            <div
              style={{
                position: "absolute",
                border: "none",
                outline: "none",
                top: "10px",
                right: "16px",
                zindex: "1",
              }}
            >
              <MDBCloseIcon onClick={() => setKpiTrigger(false)} />
            </div>
          </div>
        </div>
      </OutsideAlerter>
    </div>
  ) : (
    ""
  );
};

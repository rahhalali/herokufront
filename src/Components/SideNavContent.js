import React, { Fragment, useEffect, useState } from "react";
import SideNavRow from "./SideNavRow";
import DropDown from "./DropDowns/DropDown";
import { useAmazonContext } from "../Context/AmazonContext";
import { useHistory } from "react-router-dom";
import { colors } from "@material-ui/core";

function SideNavContent(props) {
  let history = useHistory();
  const Testingz = [
    {
      entries: [
        {
          title: "Employee",
          entries: [
            {
              title: "Manage Employee",
              entries: [
                {
                  id: 1,
                  title: "Employee List",
                },
                {
                  id: 2,
                  title: "Add Employee",
                }
              ],
            },
          ],
        },
        {
          title: "Team",
          entries: [
            {
              title: "Manage Teams",
              entries: [
                {
                  id: 4,
                  title: "Team List",
                },
                {
                  id: 5,
                  title: "Add Team",
                }
              ],
            },
          ],
        },
        {
          title: "Project",
          entries: [
            {
              title: "Manage Projects",
              entries: [
                {
                  id: 7,
                  title: "Add Role",
                },
                {
                  id: 8,
                  title: "Add Project",
                },{
                  id: 9,
                  title: "Project List",
                },{
                  id: 10,
                  title: "Role List",
                },
                {
                  id: 11,
                  title: "Employee Search",
                },
              ],
            },
          ],
        },
        {
          title: "Admins",
          entries: [
            {
              title: "Manage Projects",
              entries: [
                {
                  id: 10,
                  title: "Add Admins",
                },
              ],
            },
          ],
        }, {
          title: "Project-Team",
          entries: [
            {
              title: "Manage Teams",
              entries: [
                {
                  id: 11,
                  title: "Add Project-Team",
                }, {
                  id: 12,
                  title: "List Project-Team",
                },
              ],
            },
          ],
        },
        {
          title: "KPI",
          entries: [
            {
              title: "Manage Teams",
              entries: [
                {
                  id: 13,
                  title: "Add KPI",
                },{
                  id: 14,
                  title: "Employee KPI",
                }
              ],
            },
          ],
        },
      ],
      _id: "60ab69ee0a5705404d68d9fc",
      title: "Digital Content And Devices",
      type: {
        rows: true,
      },
    },
    {
      entries: [
        {
          title: "Your Account",
        },
        {
          title: "Currency Settings",
        },
        {
          title: "Customer Service",
        },
      ],
      _id: "60ab6a570a5705404d68d9ff",
      title: "Help & Settings",
      type: {
        rows: false,
      },
    },
  ];

  return (
    <div
      className="sideNavContainer"
      style={
        props.state === "exiting"
          ? { animation: "moveMainContainer .3s forwards" }
          : props.state === "entering"
          ? { animation: "moveMainContainer .3s reverse backwards" }
          : null
      }
    >
      {Testingz &&
        Testingz.map((entry, index) => {
  
          return (
            <Fragment key={entry.id}>
              <div className="sidenavContentHeader">
                
                {entry.title }</div>
                {entry.entries.map((subEntry, index) => {
                // if (subEntry.type) {
                //   !dropDownEntries && setDropDownEntries(index);
                //   return <DropDown entries={entry.entries.slice(index + 1)} />;
                // if (dropDownEntries && index < dropDownEntries) {

                // }
                
                return !entry.type.rows ? (
                  <a href="#">
                    <div className="sidenavContent" key={index}>
                      {subEntry.title}
                    </div>
                  </a>
                ) : (
                  <SideNavRow
                    text={subEntry.title}
                    entries={subEntry.entries}
                  />
                );
              })}
              {<hr />}
            </Fragment>
          );
        })}
      <div style={{ minHeight: "60px" }}></div>
    </div>
  );
}

export default SideNavContent;

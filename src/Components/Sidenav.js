import React, { useState, useEffect } from "react";
import SideNavContent from "./SideNavContent";
import SubContainer from "./SubContainer";
import { Transition } from "react-transition-group";
import { useAmazonContext } from "../Context/AmazonContext";

function Sidenav(props) {
  const { subContainer, setSubContainer } = useAmazonContext();

  return (
    <div
      className="sidenav"
      style={
        props.state === "entering"
          ? { animation: "moveSideBar .3s forwards" }
          : props.state === "entered"
          ? { transform: "translateX(-0px)" }
          : { animation: "moveSideBar .3s reverse backwards" }
      }
    >
      <div className="sidenavHeader">
        <i className="fas fa-user-circle"></i> Hello,<span style={{color:"white" ,fontWeight:"bold",textTransform:"uppercase",marginLeft:"5px"}}>{localStorage.getItem("name")}</span> 
      </div>
      <Transition in={!subContainer} timeout={1000} unmountOnExit mountOnEnter>
        {(state) => <SideNavContent state={state} />}
      </Transition>
      <Transition in={subContainer} timeout={1000} unmountOnExit mountOnEnter>
        {(state) => (
          <SubContainer state={state} setSubContainer={setSubContainer} />
        )}
      </Transition>
    </div>
  );
}

export default Sidenav;

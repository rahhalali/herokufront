import React, { useState } from "react";
import { Transition } from "react-transition-group";
import "./App.css";

import HamburgerButton from "./Components/HamburgerButton";
import Sidenav from "./Components/Sidenav";
import { useAmazonContext } from "./Context/AmazonContext";

function Apptest() {
  const [navOpen, setNavOpen] = useState(false);
  const { setSubContainer } = useAmazonContext();

  const openNav = () => {
    setNavOpen(true);
  };

  const closeNav = () => {
    setNavOpen(false);
  };

  const { entryStore } = useAmazonContext();

  return (
    <div className="App">
      <HamburgerButton click={openNav} />
      <Transition
        in={navOpen }
        timeout={300}
        mountOnEnter
        unmountOnExit
      >
        {(state) => {
          if (state === "exited") setSubContainer(false);
          return (
            <>
              <Sidenav state={state} />
              <div
                className="overlay"
                style={
                  state === "entering"
                    ? { animation: "show .3s forwards" }
                    : state === "entered"
                    ? { opacity: "1" }
                    : { animation: "show .3s backwards reverse" }
                }
                onClick={closeNav}
              ></div>
            </>
          );
        }}
      </Transition>
    </div>
  );
}

export default Apptest;

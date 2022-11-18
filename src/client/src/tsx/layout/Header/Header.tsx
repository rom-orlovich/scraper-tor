import React from "react";
import NavBar from "./NavBar/NavBar";

import { PropsBasic } from "../../components/baseComponents/baseComponentsTypes";


function Header({ className }: PropsBasic) {
  return (
    <header className={`${className}`}>

      <NavBar />
    </header>
  );
}

export default Header;

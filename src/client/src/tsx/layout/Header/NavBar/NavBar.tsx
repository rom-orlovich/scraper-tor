import React, { ReactNode } from "react";

import { RiAddCircleFill } from "react-icons/ri";
import { IoMdNotifications } from "react-icons/io";
import { APP_ROUTE } from "../../../routes/routesConstants";
import {
  AlertData,
  LinkData,
  PropsBasic,
} from "../../../components/baseComponents/baseComponentsTypes";
import List from "../../../components/baseComponents/List";
import style from "./NavBar.module.scss";
import DropDown from "./DropDown/DropDown";
import { FaUserCircle } from "react-icons/fa";

import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import NavLinkLI from "../../../components/baseComponents/NavLinkLI";
interface NavBarNavLinkLIs<T> {
  id?: string;
  element: ReactNode;
  dataLinks: T[];
}

const navBarLink: NavBarNavLinkLIs<LinkData>[] = [



  {
    id: "hamburgerMenu",
    element: <HamburgerMenu />,
    dataLinks: [],
  },
];

function DropDownNavLinkLI({
  data,
  className,
}: { data: LinkData } & PropsBasic) {
  return <NavLinkLI liProps={{ className: className }} linkData={data} />;
}

function NavBarLi(props: NavBarNavLinkLIs<LinkData>) {
  return props.id !== "hamburgerMenu" ? (
    <DropDown
      liProps={{ id: props.id }}
      Li={DropDownNavLinkLI}
      dataLI={props.dataLinks}
    >
      {props.element}
    </DropDown>
  ) : (
    <>{props.element}</>
  );
}
function DropDownLiAlert(props: { data: AlertData } & PropsBasic) {
  return (
    <li className={props.className}>
      <span>{props.data.topic}</span>
      {props.data.message}
      <span>{props.data.status}</span>
    </li>
  );
}
function NavBar() {
  return (
    <List
      className={style.navBar}
      dataArr={navBarLink}
      LI={NavBarLi}
      insertChildLast={false}
    >
      <DropDown dataLI={[]} Li={DropDownLiAlert}>
        <IoMdNotifications className={style.alert_icon} />
      </DropDown>
    </List>
  );
}

export default NavBar;

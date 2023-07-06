import React from "react";
import { BsFillPersonFill } from "react-icons/bs";
import LogoImg from "../../utils/images/sidebarBiopath2.png";
import "./topbar.scss";

const Topber = (props) => {
  return (
    <div className="topbarWrapper">
      <h3>{props.userName}</h3>
      <div className="TopbarImageWrapper">
        <img src={LogoImg} alt="Logo" />
      </div>
      <BsFillPersonFill className="topbarIcon" />
    </div>
  );
};

export default Topber;

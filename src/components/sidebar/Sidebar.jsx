import React from "react";
import "./sidebar.scss";

import LogoImg from "../../utils/images/sidebarBiopath2.png";
import { BsFillPersonFill } from "react-icons/bs";

import { FiLogOut } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import AlertDialogSlide from "../Dialogue";
import { clientData } from "../../utils/data/sidebarData";
import { IoIosMenu } from "react-icons/io";
import { MdCancel } from "react-icons/md";

const Sidebar = () => {
  const [open, setOpen] = React.useState(false);
  // const loggedInUserRole = props?.loggedInUserRole
  let sidebarInfo = clientData;

  // SIDEBAR STATUS
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // switch (loggedInUserRole) {
  //   case 'receptionist':
  //     sidebarInfo = receptionistData
  //     break
  //   case 'phlebotomist':
  //     sidebarInfo = phlebotomistData

  //     break
  //   case 'labScientist':
  //     sidebarInfo = labScientistData

  //     break
  //   case 'qualityAssurance':
  //     sidebarInfo = qualityAssuranceData

  //     break
  //   case 'reportOfficer':
  //     sidebarInfo = reportOfficerData
  //     break

  //   default:
  //     break
  // }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSidebarToggle = (action) => {
    if (action === "showSidebar") {
      setSidebarOpen(true);
    }
    if (action === "hideSidebar") {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {!sidebarOpen && (
        <div
          className="menuIconWrapper"
          onClick={() => handleSidebarToggle("showSidebar")}
        >
          <IoIosMenu className="menuIcon" />
        </div>
      )}

      <div className={`sidebarWrapper ${sidebarOpen ? "open" : ""}`}>
        <AlertDialogSlide
          open={open}
          handleClose={handleClose}
          message=" Are you sure you want to logout?"
          link="/login"
          title="Logout"
        />
        <div className="sidebarTop">
          <div className="sidebarTopImageWrapper">
            <img src={LogoImg} alt="Logo" /> <span>Biopath MedLab</span>
          </div>
          <div
            className="cancelIconWrapper"
            onClick={() => handleSidebarToggle("hideSidebar")}
          >
            <MdCancel className="cancelIcon" />
          </div>
        </div>
        <div className="sidebarBottom">
          <div className="sidebarBottomTop">
            {sidebarInfo?.map((singleItem, index) => {
              return (
                <ul className="ulTitle" key={index}>
                  {singleItem.ulTitle}
                  {singleItem.listItems.map((listItem, index) => {
                    return (
                      <NavLink
                        to={listItem.link}
                        style={{ textDecoration: "none" }}
                        key={index}
                      >
                        {({ isActive }) => (
                          <li
                            className={
                              isActive
                                ? "activeLink sidebarListItem"
                                : "sidebarListItem"
                            }
                          >
                            {listItem.icon}
                            <span> {listItem.title}</span>
                          </li>
                        )}
                      </NavLink>
                    );
                  })}
                </ul>
              );
            })}
          </div>
          <div className="sidebarBottomBottom">
            <ul className="ulTitle">
              USER
              <NavLink to="/profile" style={{ textDecoration: "none" }}>
                {({ isActive }) => (
                  <li
                    className={
                      isActive
                        ? "activeLink sidebarListItem"
                        : "sidebarListItem"
                    }
                  >
                    <BsFillPersonFill className="sidebarIcon" />
                    <span> Profile</span>
                  </li>
                )}
              </NavLink>
              <li className="sidebarListItem" onClick={handleClickOpen}>
                <FiLogOut className="sidebarIcon" />
                <span> Logout</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

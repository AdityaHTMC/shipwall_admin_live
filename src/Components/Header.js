import React, { useContext, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { LoginContext } from "./ContextProvider/Context";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

import logo from "../assets/img/logo.png";
import logoSmall from "../assets/img/logo-small.png";
import logOut from "../assets/img/icons/log-out.svg";
import avator1 from "../assets/img/profiles/avator1.jpg";
import { useAppContext } from "../contextApi/AppContext";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const { loginData, setLoginData } = useContext(LoginContext);

  const { isLogIn, setIsLogIn , logoutUser} = useAppContext();

  const mobileBTN = () => {};
  let token = localStorage.getItem("usersdatatoken");

  const handelLogOut = () => {
   logoutUser()
  };

  const isLoginPage = location.pathname === "/";

  const loginData = JSON.parse(localStorage.getItem("log2"))
  const userdata = loginData?.data || {}

  return (
    <>
      {/******************* new work start *******************/}
      {isLogIn && !isLoginPage && (
        <>
          <div className="header">
            <div className="header-left active">
              <Link to="/home-page" className="logo">
                <img src={logo} alt=""></img>
              </Link>
              <Link to="#." className="logo-small">
                <img src={logoSmall} alt=""></img>
              </Link>
            </div>
            <a
              id="mobile_btn"
              onClick={mobileBTN}
              className="mobile_btn"
              href="#sidebar"
            >
              <span className="bar-icon">
                <span />
                <span />
                <span />
              </span>
            </a>
            <ul className="nav user-menu">
              <li className="nav-item dropdown has-arrow main-drop">
                <a
                  href="javascript:void(0);"
                  className="dropdown-toggle nav-link userset"
                  data-bs-toggle="dropdown"
                >
                  <span className="user-img">
                    <img src={"https://png.pngtree.com/png-vector/20190116/ourmid/pngtree-vector-avatar-icon-png-image_322275.jpg"} alt=""></img>
                    <span className="status online" />
                  </span>
                </a>

                <div className="dropdown-menu menu-drop-user">
                  <div className="profilename">
                    <div className="profileset">
                      <span className="user-img">
                        <img src={"https://png.pngtree.com/png-vector/20190116/ourmid/pngtree-vector-avatar-icon-png-image_322275.jpg"} alt=""></img>
                        <span className="status online" />
                      </span>
                      <div className="profilesets">
                        <h6>{loginData ? userdata.name :""}</h6>
                        <h5>Admin</h5>
                      </div>
                    </div>
                    <hr className="m-0" />
                    <Link className="dropdown-item" to="/dash">
                      {" "}
                      <i className="me-2" data-feather="user" /> My Profile
                    </Link>
                    <hr className="m-0" />
                    <a
                      className="dropdown-item logout pb-0"
                      onClick={handelLogOut}
                    >
                      <img src={logOut} className="me-2" alt="img"></img>
                      Logout
                    </a>
                  </div>
                </div>
              </li>
            </ul>
            <div className="dropdown mobile-user-menu">
              <a
                href="javascript:void(0);"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa fa-ellipsis-v" />
              </a>

              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="#.">
                  My Profile
                </a>
                <a className="dropdown-item" href="#.">
                  Settings
                </a>
                <a className="dropdown-item" href="#.">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Theme header  */}
      {/* <div className="header">
        <div className="header-left active">
          <a href="#." className="logo"><img src={logo} alt=""></img></a>
          <a href="#." className="logo-small"><img src={logoSmall} alt=""></img></a>
        </div>
        <a id="mobile_btn" className="mobile_btn" href="#sidebar"><span className="bar-icon"><span /><span /><span /></span></a>
        <ul className="nav user-menu">
          <li className="nav-item dropdown has-arrow main-drop">
            <a href="javascript:void(0);" className="dropdown-toggle nav-link userset" data-bs-toggle="dropdown">
              <span className="user-img">
                <img src={avator1} alt="" ></img>
                <span className="status online" />
              </span>
            </a>
            <div className="dropdown-menu menu-drop-user">
              <div className="profilename">
                <div className="profileset">
                  <span className="user-img">
                    <img src={avator1} alt="" ></img>
                    <span className="status online" />
                  </span>
                  <div className="profilesets">
                    <h6>John Doe</h6>
                    <h5>Admin</h5>
                  </div>
                </div>
                <hr className="m-0" />
                <a className="dropdown-item" href="#.">
                  {" "}
                  <i className="me-2" data-feather="user" /> My Profile
                </a>
                <hr className="m-0" />
                <a className="dropdown-item logout pb-0" href="#.">
                  <img src={logOut} className="me-2" alt="img"></img>
                  Logout
                </a>
              </div>
            </div>
          </li>
        </ul>
        <div className="dropdown mobile-user-menu">
          <a href="javascript:void(0);" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="fa fa-ellipsis-v" />
          </a>
         
          <div className="dropdown-menu dropdown-menu-right">
      <a className="dropdown-item" href="#.">My Profile</a>
      <a className="dropdown-item" href="#.">Settings</a>
      <a className="dropdown-item" href="#.">Logout</a>
    </div>
        </div>
      </div> */}
      {/* Theme header  */}

      {/****************** new work end *******************/}

      {/* <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid" style={{ margin: "0 5% 0 5%" }}>
                    <a className="navbar-brand" href="#">
                        <img src="https://htsm.in/img/logo-light.png" alt="Image" style={{height:"40px"}} />
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav d-flex ms-auto">
                            {
                                loginData ? <a className="nav-link active" aria-current="page" href="#">


                                    <Button
                                    className='text-white bg-success'
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    >
                                        {loginData.fname}
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        {
                                            loginData ?
                                                <>
                                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                                    <MenuItem onClick={() => {
                                                        handleClose()
                                                        logoutUser()
                                                    }}>Logout</MenuItem>
                                                </>
                                                :
                                                <>
                                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                                </>
                                        }
                                    </Menu>

                                </a>
                                    :
                                    <a className="nav-link active" aria-current="page" href="#">
                                        <Avatar className='bg-primary'></Avatar>
                                    </a>
                            }



                        </div>
                    </div>
                </div>
            </nav> */}
    </>
  );
};

export default Header;

{
  /* <a className="nav-link active" aria-current="page" href="#">
                                <Avatar className='bg-primary'>Sai</Avatar>
                            </a> */
}

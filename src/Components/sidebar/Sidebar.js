import React, { useContext, useState } from "react";
import { LoginContext } from "../ContextProvider/Context";

import dashboardIcon from "../../assets/img/icons/dashboard.svg";
import productIcon from "../../assets/img/icons/product.svg";
import users1Icon from "../../assets/img/icons/users1.svg";
import timeIcon from "../../assets/img/icons/time.svg";
import settingsIcon from "../../assets/img/icons/time.svg";
import "./sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../../contextApi/AppContext";

const Sidebar = () => {
  const { loginData, setLoginData } = useContext(LoginContext);
  // console.log(loginData._id)
  const [isProductSubMenuOpen, setIsProductSubMenuOpen] = useState(false);
  const [isSalesMenueOpen, setIsSalesMenueOpen] = useState(false);
  const [isCustomerOpen, setIsCustomerOpen] = useState(false);
  const [isReport, setIsRepiort] = useState(false);
  const [isCMS, setIsCMS] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isSetting, setIsSetting] = useState(false);
  const [isCat, setCat] = useState(false);
  const loaction = useLocation();

  const { isLogIn } = useAppContext();

  const isLoginPage = loaction.pathname === "/";

  const toggleProductSubMenu = () => {
    setIsProductSubMenuOpen(!isProductSubMenuOpen);
    setIsSalesMenueOpen(false);
    setIsCustomerOpen(false);
    setIsRepiort(false);
    setIsUser(false);
    setIsSetting(false);
    setCat(false);
  };

  const togglSales = () => {
    setIsSalesMenueOpen(!isSalesMenueOpen);
    setIsProductSubMenuOpen(false);
    setIsCustomerOpen(false);
    setIsRepiort(false);
    setIsUser(false);
    setIsSetting(false);
    setCat(false);
  };

  const togglCustomar = () => {
    setIsCustomerOpen(!isCustomerOpen);

    setIsRepiort(false);
    setIsProductSubMenuOpen(false);
    setIsUser(false);
    setIsSetting(false);
    setIsSalesMenueOpen(false);
    setCat(false);
  };

  const toggleReport = () => {
    setIsRepiort(!isReport);

    setIsUser(false);
    setIsProductSubMenuOpen(false);
    setIsSetting(false);
    setIsSalesMenueOpen(false);
    setIsCustomerOpen(false);
    setCat(false);
  };

  const togglecms = () => {
    setIsCMS(!isCMS);
    setIsRepiort(false);
    setIsUser(false);
    setIsProductSubMenuOpen(false);
    setIsSetting(false);
    setIsSalesMenueOpen(false);
    setIsCustomerOpen(false);
    setCat(false);
  };


  const togglUser = () => {
    setIsUser(!isUser);

    setIsSetting(false);
    setIsProductSubMenuOpen(false);
    setIsSalesMenueOpen(false);
    setIsCustomerOpen(false);
    setIsRepiort(false);
    setCat(false);
  };

  const togglSetting = () => {
    setIsSetting(!isSetting);

    setIsUser(false);
    setIsProductSubMenuOpen(false);
    setIsSalesMenueOpen(false);
    setIsCustomerOpen(false);
    setIsRepiort(false);
    setCat(false);
  };

  const toggleCat = () => {
    setCat(!isCat);

    setIsSetting(false);
    setIsUser(false);
    setIsProductSubMenuOpen(false);
    setIsSalesMenueOpen(false);
    setIsCustomerOpen(false);
    setIsRepiort(false);
  };

  return (
    <>
      {isLogIn && !isLoginPage && (
        <>
          <div className="sidebar showSidebar" id="sidebar">
            <div className="sidebar-inner slimscroll">
              <div id="sidebar-menu" className="sidebar-menu">
                <ul>
                  <li className="active">
                    <Link to="/home-page">
                      <img src={dashboardIcon} alt="img"></img>
                      <span> Dashboard</span>{" "}
                    </Link>
                  </li>
                  <li
                    className={
                      isSalesMenueOpen ? "active submenu" : "inactive submenu"
                    }
                    onClick={togglSales}
                  >
                    {/* <Link to="javascript:void(0);">
                      <img src={users1Icon} alt="img"></img>
                      <span> Sales</span> <span className="menu-arrow" />
                    </Link> */}
                    <ul>
                      {/* <li>
                        <Link to="/sales">Sales List</Link>
                      </li> */}
                      {/* <li>
                        <Link to="/addsale">New Sales</Link>
                      </li> */}
                      {/* <li><Link to="#.">Sales Return List</Link></li>
                                                <li><Link to="#.">New Sales Return</Link></li> */}
                    </ul>
                  </li>
                  <li
                    className={
                      isCustomerOpen ? "active submenu" : "inactive submenu"
                    }
                    onClick={togglCustomar}
                  >
                    <Link to="javascript:void(0);">
                      <img src={users1Icon} alt="img"></img>
                      <span> Customer</span> <span className="menu-arrow" />
                    </Link>
                    <ul>
                      <li>
                        <Link to="/customer-list">Customer List</Link>
                      </li>
                      <li>
                        <Link to="/customer-ulist">Unapproved Customer</Link>
                      </li>
                      <li>
                        <Link to="/customer-vlist">ReVerification Customer</Link>
                      </li>
                    </ul>
                  </li>

                  <li
                    className={isCMS ? "active submenu" : "inactive submenu"}
                    onClick={togglecms}
                  >
                    <Link to="javascript:void(0);">
                      <img src={timeIcon} alt="img"></img>
                      <span> CMS </span> <span className="menu-arrow" />
                    </Link>
                    <ul>
                      <li>
                        <Link to="/add-CMS">Add CMS</Link>
                      </li>
                      <li>
                        <Link to="/add-fleshNews">Flesh News</Link>
                      </li>
                      
                    </ul>
                  </li>



                  <li
                    className={isReport ? "active submenu" : "inactive submenu"}
                    onClick={toggleReport}
                  >
                    <Link to="javascript:void(0);">
                      <img src={timeIcon} alt="img"></img>
                      <span> Products </span> <span className="menu-arrow" />
                    </Link>
                    <ul>
                      <li>
                        <Link to="/product-list">Product List</Link>
                      </li>
                      <li>
                        <Link to="/attribute-mamagement">Attribute Management</Link>
                      </li>
                      <li>
                        <Link to="/add-banner">Banner Management</Link>
                      </li>
                      <li>
                        <Link to="/add-brand">Brand Management</Link>
                      </li>
                      {/* <li>
                        <Link to="/invoice-report">Invoice Report</Link>
                      </li>
                      <li>
                        <Link to="/customer-report">Customer Report</Link>
                      </li> */}
                    </ul>
                  </li>


                  <li
                    className={
                      isCat ? "active submenu" : "inactive submenu"
                    }
                    onClick={toggleCat}
                  >
                    <Link to="javascript:void(0);">
                      <img src={users1Icon} alt="img"></img>
                      <span> Help</span> <span className="menu-arrow" />
                    </Link>
                    <ul>
                      {/* <li>
                        <Link to="/sales">Sales List</Link>
                      </li> */}
                      <li>
                        <Link to="/complaint">Complaint</Link>
                      </li>
                      <li>
                        <Link to="/suggestion">Suggestion</Link>
                      </li>

                      <li>
                        <Link to="/contact-list">Contact List</Link>
                      </li>
                      {/* <li><Link to="#.">Sales Return List</Link></li>
                                                <li><Link to="#.">New Sales Return</Link></li> */}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
      {/* <div className="sidebar" id="sidebar">
                <div className="sidebar-inner slimscroll">
                    <div id="sidebar-menu" className="sidebar-menu">
                        <ul>
                            <li className="active">
                                <Link to="#.">
                                    <img src={dashboardIcon} alt="img" ></img>
                                    <span> Dashboard</span>{" "}
                                </Link>
                            </li>
                            <li className="submenu">
                                <Link to="javascript:void(0);">
                                    <img src={productIcon} alt="img"></img>
                                    <span> Product</span> <span className="menu-arrow" />
                                </Link>
                                <ul>
                                    <li>
                                        <Link to="#.">Product List</Link>
                                    </li>
                                    <li>
                                        <Link to="#.">Brand List</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="submenu">
                                <Link to="javascript:void(0);">
                                    <img src={users1Icon} alt="img"></img>
                                    <span> Sales</span> <span className="menu-arrow" />
                                </Link>
                                <ul>
                                    <li><Link to="#.">Sales List</Link></li>
                                    <li><Link to="#.">New Sales</Link></li>
                                    <li><Link to="#.">Sales Return List</Link></li>
                                    <li><Link to="#.">New Sales Return</Link></li>
                                </ul>
                            </li>
                            <li className="submenu">
                                <Link to="javascript:void(0);">
                                    <img src={users1Icon} alt="img"></img>
                                    <span> Customer</span> <span className="menu-arrow" />
                                </Link>
                                <ul>
                                    <li><Link to="#.">Customer List</Link></li>
                                    <li><Link to="#.">Add Customer</Link></li>
                                </ul>
                            </li>
                            <li className="submenu">
                                <Link to="javascript:void(0);">
                                    <img src={timeIcon} alt="img"></img>
                                    <span> Report</span> <span className="menu-arrow" />
                                </Link>
                                <ul>
                                    <li><Link to="#.">Inventory Report</Link></li>
                                    <li><Link to="#.">Sales Report</Link></li>
                                    <li><Link to="#.">Invoice Report</Link></li>
                                    <li><Link to="#.">Customer Report</Link></li>
                                </ul>
                            </li>
                            <li className="submenu">
                                <Link to="javascript:void(0);">
                                    <img src={users1Icon} alt="img"></img>
                                    <span> Users</span> <span className="menu-arrow" />
                                </Link>
                                <ul>
                                    <li><Link to="#.">New User </Link></li>
                                    <li><Link to="#.">Users List</Link></li>
                                </ul>
                            </li>
                            <li className="submenu">
                                <Link to="javascript:void(0);">
                                    <img src={settingsIcon} alt="img"></img>
                                    <span> Settings</span> <span className="menu-arrow" />
                                </Link>
                                <ul>
                                    <li><Link to="#.">General Settings</Link></li>
                                    <li><Link to="#.">Email Settings</Link></li>
                                    <li><Link to="#.">Payment Settings</Link></li>
                                    <li><Link to="#.">Currency Settings</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div> */}
    </>
  );
};

export default Sidebar;

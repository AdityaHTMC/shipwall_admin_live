import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import "./home.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Table from "../../Components/table/Table";
import Spiner from "../../Components/spiner/Spiner";
import Tables from "../../Components/table/Table";
import Alert from "react-bootstrap/Alert";
import { addData, userDelete } from "../../Components/ContextProvider/Context";

import dash1Icon from "../../assets/img/icons/dash1.svg";
import dash2Icon from "../../assets/img/icons/dash2.svg";
import dash3Icon from "../../assets/img/icons/dash3.svg";
import dash4Icon from "../../assets/img/icons/dash4.svg";
import { useAppContext } from "../../contextApi/AppContext";
import {  FaSync } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const { useradd, setUseradd } = useContext(addData);
  const { userdelete, setUserdelete } = useContext(userDelete);

  // advance searches
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("new");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const handelgotocustomer = () => {
    navigate("/customer-list");
  };

  const handelnavigate = () => {
    navigate("/customer-ulist");
  };

  const sync = () => {
    SyncItem();
  };
  const [showspin, setShowSpin] = useState(true);

  // user get api here
  const [userdata, setUserData] = useState({});

  const { BPdata, getBP, BPudata, SyncItem, syncLoading,BPrdata } = useAppContext();

  let token = localStorage.getItem("usersdatatoken7");

  const getUserData = async () => {
    try {
      const resp = await axios.get(
        `/api/v1/get-my-users?search=${search}&gender=${gender}&status=${status}&sort=${sort}&page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      console.log(resp.data);
      setUserData(resp.data.data);
      setPageCount(resp.data.data.pagination.pageCount);
      // console.log(resp.data.pagination.pageCount)
    } catch (error) {
      console.log(error);
    }
  };
  // delete user

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(`/user/delete/${id}`);
      setUserdelete(res.data);
      const updatedUserData = await axios.get(
        `/users/details?search=${search}&gender=${gender}&status=${status}&sort=${sort}&page=${page}`
      ); // Fetch updated user data
      setUserData(updatedUserData.data); // Update the userdata state
      // console.log(userDelete)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBP(search || "");
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, [search]);

  // Pagination
  const handelsearch = () => {
    getBP(search || "");
  };

  const handlePreview = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleNext = () => {
    setPage((prevPage) => (prevPage < pageCount ? prevPage + 1 : prevPage));
  };

  return (
    <>
      {/* main wrapper start here */}
      <div>
        {useradd ? (
          <Alert variant="success" onClose={() => setUseradd("")} dismissible>
            {" "}
            {useradd.fname} Succesfully Added
          </Alert>
        ) : (
          ""
        )}
        {/* {
        userDelete ? <Alert variant="danger" onClose={() => setUserdelete("")} dismissible> {userDelete.fname} Deleted
        </Alert> : ""
      } */}

        {/************ new work start here ************/}
        <div className="row">
          {/* <div className="col-lg-3 col-sm-6 col-12">
            <div className="dash-widget">
              <div className="dash-widgetimg">
                <span>
                  <img src={dash1Icon} alt="img"></img>
                </span>
              </div>
              <div className="dash-widgetcontent">
                <h5>
                  $
                  <span className="counters" data-count={307144.0}>
                    $307,144.00
                  </span>
                </h5>
                <h6>Total Purchase Due</h6>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 col-12">
            <div className="dash-widget dash1">
              <div className="dash-widgetimg">
                <span>
                  <img src={dash2Icon} alt="img"></img>
                </span>
              </div>
              <div className="dash-widgetcontent">
                <h5>
                  $
                  <span className="counters" data-count={4385.0}>
                    $4,385.00
                  </span>
                </h5>
                <h6>Total Sales Due</h6>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 col-12">
            <div className="dash-widget dash2">
              <div className="dash-widgetimg">
                <span>
                  <img src={dash3Icon} alt="img"></img>
                </span>
              </div>
              <div className="dash-widgetcontent">
                <h5>
                  $
                  <span className="counters" data-count="385656.50">
                    385,656.50
                  </span>
                </h5>
                <h6>Total Sale Amount</h6>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 col-12">
            <div className="dash-widget dash3">
              <div className="dash-widgetimg">
                <span>
                  <img src={dash4Icon} alt="img"></img>
                </span>
              </div>
              <div className="dash-widgetcontent">
                <h5>
                  $
                  <span className="counters" data-count={40000.0}>
                    400.00
                  </span>
                </h5>
                <h6>Total Sale Amount</h6>
              </div>
            </div>
          </div> */}
          <div className="d-flex justify-content-evenly">
            <div
              onClick={handelgotocustomer}
              className="col-lg-3 col-sm-6 col-12 d-flex"
              style={{ cursor: "grab" }}
            >
              <div className="dash-count">
                <div className="dash-counts">
                  <h4>{BPdata ? BPdata.length : ""}</h4>
                  <h5>Approved Customers</h5>
                </div>
                <div class="dash-imgs">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-user"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
              </div>
            </div>
            {/* <div className="col-lg-3 col-sm-6 col-12 d-flex">
            <div className="dash-count das1">
              <div className="dash-counts">
                <h4>100</h4>
                <h5>Suppliers</h5>
              </div>
              <div class="dash-imgs">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-check"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
              </div>
            </div>
          </div> */}
            <div
              onClick={handelnavigate}
              className="col-lg-3 col-sm-6 col-12 d-flex"
              style={{ cursor: "grab" }}
            >
              <div className="dash-count das2">
                <div className="dash-counts">
                  <h4>{BPudata ? BPudata.length : ""}</h4>
                  <h5>Pending For Approval</h5>
                </div>
                <div class="dash-imgs">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-file-text"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12 d-flex">
              <div className="dash-count das3">
                <div className="dash-counts">
                  <h4>{BPrdata ? BPrdata.length :0}</h4>
                  <h5>Rejected Customer</h5>
                </div>
                <div class="dash-imgs">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-file"
                  >
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                    <polyline points="13 2 13 9 20 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/************ new work end here ************/}

        {/************ table part box body start ************/}
        <div class="card mb-0">
          <div class="card-body">
            {/* filter part work start here */}
            <div className="row">
              <div className="col-sm-4 col-xs-12">
                <strong>Customers</strong>
                <div className="search">
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search By CardCode"
                      className="me-2"
                      aria-label="Search"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button
                      onClick={handelsearch}
                      variant="success"
                      className="btn btn-primary"
                    >
                      <i className="fa fa-search"></i>
                    </Button>
                  </Form>
                </div>
              </div>
              <div className="col-sm-8 col-xs-12 text-right">
                <Button
                  variant="success"
                  disabled={syncLoading}
                  onClick={sync}
                >
                  {syncLoading ? (
                    <FaSync
                      style={{
                        animation: `${syncLoading ? 'spin 4s infinite linear' : 'none'}`,
                        marginRight: "5px",
                      }}
                    />
                  ) : (
                    <FaSync
                      style={{
                        marginRight: "5px",
                      }}
                    />
                  )}
                  Sync Item
                </Button>
              </div>
            </div>
            <hr></hr>
            <div className="row mt-3 mb-3">
              <div className="col-md-2 col-sm-6 col-xs-12">
                <Button className="export_btn text-bold">Export To Csv</Button>
              </div>
              {/* <div className='col-md-3 col-sm-6 col-xs-12'>
                <label className='text-blod'>Filter By Gender</label>
                <ul className='list-inline'>
                  <li>
                    <Form.Check
                      type={"radio"}
                      label={`All`}
                      name="gender"
                      value={"All"}
                      onChange={(e) => setGender(e.target.value)}
                      defaultChecked
                    />
                  </li>
                  <li>
                    <Form.Check
                      type={"radio"}
                      label={`Male`}
                      name="gender"
                      value={"Male"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </li>
                  <li>
                    <Form.Check
                      type={"radio"}
                      label={`Female`}
                      name="gender"
                      value={"female"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </li>
                </ul>
              </div> */}
              {/* <div className='col-md-2 col-sm-6 col-xs-12'>
                <Dropdown className='text-center'>
                  <Dropdown.Toggle className='btn btn-primary text-bold' id="dropdown-basic">Short By Value</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setSort("new")}>New</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSort("old")}>Old</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div> */}
              {/* <div className='col-md-4 col-sm-6 col-xs-12'>
                <label className='text-blod'>Filter By Status</label>
                <ul className='list-inline'>
                  <li>
                    <Form.Check
                      type={"radio"}
                      label={`All`}
                      name="status"
                      value={"All"}
                      onChange={(e) => setStatus(e.target.value)}
                      defaultChecked
                    />
                  </li>
                  <li>
                    <Form.Check
                      type={"radio"}
                      label={`Active`}
                      name="status"
                      value={"Active"}
                      onChange={(e) => setStatus(e.target.value)}
                    />
                  </li>
                  <li>
                    <Form.Check
                      type={"radio"}
                      label={`InActive`}
                      name="status"
                      value={"InActive"}
                      onChange={(e) => setStatus(e.target.value)}
                    />
                  </li>
                </ul>
              </div> */}
            </div>
            {showspin ? (
              <Spiner />
            ) : (
              <Tables
                userdata={BPdata}
                deleteUser={deleteUser}
                getUserData={getUserData}
                handlePreview={handlePreview}
                handleNext={handleNext}
                page={page}
                pageCount={pageCount}
                setPage={setPage}
              />
            )}
            {/* filter part work end here */}
          </div>
        </div>
        {/************ table part box body end ************/}
      </div>
      {/* main wrapper end here */}
    </>
  );
};

export default Home;

import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import "./home.css"
import { toast } from 'react-toastify';
import { useNavigate , useLocation } from 'react-router-dom';
import Table from '../../Components/table/Table';
import Spiner from '../../Components/spiner/Spiner';
import Tables from '../../Components/table/Table';
import Alert from 'react-bootstrap/Alert';
import { addData, userDelete } from '../../Components/ContextProvider/Context';

import dash1Icon from "../../assets/img/icons/dash1.svg"
import dash2Icon from "../../assets/img/icons/dash2.svg"
import dash3Icon from "../../assets/img/icons/dash3.svg"
import dash4Icon from "../../assets/img/icons/dash4.svg"
import { useAppContext } from '../../contextApi/AppContext';




const ReVerificationCustomerList = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const { useradd, setUseradd } = useContext(addData);
  const { userdelete, setUserdelete } = useContext(userDelete);
  const {BPdata, getBP, setsingleBPdata, BPVlist, getUnApprovedBP} = useAppContext()

  console.log("BPVlist", BPVlist)

  // advance searches
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("new")
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const isSalespage = location.pathname === '/addsale'
  const isUnaprovedpage = location.pathname === '/customer-vlist'
  const isdraftpage = location.pathname === '/customer-Draft-list'



  const addUser = () => {
    navigate("/register-user")
  };

  const [showspin, setShowSpin] = useState(true);

  // user get api here
  const [userdata, setUserData] = useState({});

  let token = localStorage.getItem("usersdatatoken7");

  const getUserData = async () => {
    try {
      const resp = await axios.get(`/api/v1/get-my-users`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      });
      console.log(resp.data);
      setUserData(resp.data.data);
      // setPageCount(resp.data.pagination.pageCount);
      // console.log(resp.data.pagination.pageCount)
    } catch (error) {
      console.log(error);
    }
  }
  // delete user 

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(`/user/delete/${id}`);
      setUserdelete(res.data);
      const updatedUserData = await axios.get(`/users/details?search=${search}&gender=${gender}&status=${status}&sort=${sort}&page=${page}`); // Fetch updated user data
      setUserData(updatedUserData.data); // Update the userdata state
      // console.log(userDelete)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(isUnaprovedpage){
      getUnApprovedBP(search || '')
    }else{
      getBP(search || '')
    }
    setTimeout(() => {
      setShowSpin(false);
    }, 1200)
  }, [search]);

  // Pagination 

  const handlePreview = () => {
    setPage(prevPage => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleNext = () => {
    setPage(prevPage => (prevPage < pageCount ? prevPage + 1 : prevPage));
  };

 const handelsearch = () =>{
   getBP(search || '')
 }

  return (
    <>
      {/* main wrapper start here */}
      <div>


        {
          useradd ? <Alert variant="success" onClose={() => setUseradd("")} dismissible> {useradd.fname} Succesfully Added
          </Alert> : ""
        }
        {/* {
        userDelete ? <Alert variant="danger" onClose={() => setUserdelete("")} dismissible> {userDelete.fname} Deleted
        </Alert> : ""
      } */}



        {/************ table part box body start ************/}
        <div class="card mb-0">
          <div class="card-body">

            {/* filter part work start here */}
            <div className='row'>
              <div className='col-sm-4 col-xs-12'>
              <p>
                  {
                    !isUnaprovedpage ?(

                      isSalespage ? "Select Customers" : "Customers"
                    ):'ReVerification Customers'
                  }
                  </p>
                  {/* {
                    !isUnaprovedpage &&
                <div className="search">
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search By CardCode"
                      className="me-2"
                      aria-label="Search"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button onClick={handelsearch} variant="success" className='btn btn-primary'><i className='fa fa-search'></i></Button>
                  </Form>
                </div>
                  } */}
                
              </div>
              {!isUnaprovedpage?(

                !isSalespage ?(
                  <></>
              // <div className='col-sm-8 col-xs-12 text-right'>
              //   <Button variant="primary" onClick={addUser}> <i class="fa-solid fa-plus"></i>&nbsp; Add Customer</Button>
              // </div>

                ):null
              ):null
              }
            </div>


            <hr></hr>
            <div className='row mt-3 mb-3'>
              {
              !isSalespage || !isUnaprovedpage?(
              <div className='col-md-2 col-sm-6 col-xs-12'>
                <Button className='export_btn text-bold'>Export To Csv</Button>
              </div>
                
              ):''
            }
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
            {
              showspin ? <Spiner /> : <Tables
                userdata={isUnaprovedpage? BPVlist: BPdata}
                deleteUser={deleteUser}
                getUserData={getUserData}
                handlePreview={handlePreview}
                handleNext={handleNext}
                page={page}
                pageCount={pageCount}
                setPage={setPage}
                isSalespage= {isSalespage}
              />
            }
            {/* filter part work end here */}

          </div>
        </div>
        {/************ table part box body end ************/}




      </div>
      {/* main wrapper end here */}
    </>
  )
}

export default ReVerificationCustomerList

import "./table.css";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import Man from "../../Man.png";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../ContextProvider/Context";
import Pagination from "react-bootstrap/Pagination";
import { useAppContext } from "../../contextApi/AppContext";

const Tables = ({ userdata, deleteUser, getUserData, isSalespage }) => {
  const navigate = useNavigate();
  const { loginData, setLoginData } = useContext(LoginContext);
  let token = localStorage.getItem("usersdatatoken");
  const location = useLocation();
  const {getDoc} = useAppContext()

  const isHomepage = location.pathname === "/home-page";
  const isUnaprovedpage = location.pathname === '/customer-ulist'

  const itemsPerPage = !isHomepage ? 25 : 15;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = userdata.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const handleChange = async (id, status) => {
    try {
      const res = await axios.put(`/user/status/${id}`, { status });
      console.log(res);
      getUserData();
      toast.success("Status Updated Successfully!");
    } catch (error) {
      console.log(error);
    }
    // console.log(id, status)
  };

  const handleSelect = ( cc) => {
    getDoc( cc)
  };

  return (
    <>
      <div>
        <Row>
          <div>
            <Card className="">
              <Table className="align-items-center" responsive="sm">
                <thead className="">
                  <tr>
                    <th>ID</th>
                    <th>FullName</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Group Name</th>
                    <th>Sales Employee</th>
                    {/* <th>&nbsp;&nbsp;&nbsp;Status</th>
                                        <th>Profile</th> */}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userdata.length > 0 ? (
                    currentUsers.map((element, index) => {
                      return (
                        <tr key={index}>
                          <td>{element.cardCode}</td>
                          <td>{element.cardName}</td>
                          <td>{element.e_Mail}</td>
                          <td>{element.cellular}</td>
                          <td>{element.groupName}</td>
                          <td>{element.slpName}</td>
                          {/* <td>
                                                        <Dropdown className='text-center'>
                                                            <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                                                                <Badge bg={element.status === "Active" ? "primary" : "danger"}>
                                                                    {element.status} <i class="fa-solid fa-angle-down"></i>
                                                                </Badge>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item onClick={() => handleChange(element._id, "Active")}>Active</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => handleChange(element._id, "InActive")}>InActive</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </td> */}
                          {/* <td className='img_parent'>
                                                        <img src={`/uploads/${element.profile}`} alt="img" />
                                                        <img src={element.profile} alt="img" />
                                                    </td> */}
                          <td>
                            {!isUnaprovedpage ?(
                              
                              !isSalespage ? (
                                <Dropdown>
                                  <Dropdown.Toggle
                                    variant="light"
                                    className="action"
                                    id="dropdown-basic"
                                  >
                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                    <Dropdown.Item>
                                      <Link
                                        to={`/user-profile/${element.cardCode}`}
                                        onClick={() => handleSelect(element.cardCode)}
                                      >
                                        <i
                                          class="fa-solid fa-eye"
                                          style={{ color: "green" }}
                                        ></i>{" "}
                                        <span>View</span>
                                      </Link>
                                    </Dropdown.Item>
                                    {/* <Dropdown.Item>
                                      <Link to={`/edit-user/${element.cardCode}`}>
                                        {" "}
                                        <i
                                          class="fa-solid fa-pen-to-square"
                                          style={{ color: "blue" }}
                                        ></i>{" "}
                                        <span>Edit</span>{" "}
                                      </Link>
                                    </Dropdown.Item> */}
                                    {/* <Dropdown.Item>
                                      <div>
                                        <Link
                                          onClick={() =>
                                            deleteUser(element.cardCode)
                                          }
                                        >
                                          <i
                                            class="fa-solid fa-trash"
                                            style={{ color: "red" }}
                                          ></i>{" "}
                                          <span>Delete</span>
                                        </Link>
                                      </div>
                                    </Dropdown.Item> */}
                                  </Dropdown.Menu>
                                </Dropdown>
                              ) : (
                                <Link to={`/addsalenext/${element.cardCode}`}>
                                  {" "}
                                  <i
                                    class="fa-regular fa-square-check"
                                    style={{ color: "blue" }}
                                  ></i>{" "}
                                  <span>Select</span>{" "}
                                </Link>
                              )
                            ):(
                              <Link to={`/customer-ulist/${element._id}`}>
                              <i
                                          class="fa-solid fa-eye"
                                          style={{ color: "green" }}
                                        ></i>{" "}
                                        <span>View</span>
                              </Link>
                            )
                            }
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <div>No Data Found</div>
                  )}
                </tbody>
              </Table>
            </Card>
          </div>
          <Row>
            
          </Row>
          <div className="pagination-container">
             <Pagination className="justify-content-center">
              {Array.from({
                length: Math.ceil(userdata.length / itemsPerPage),
              }).map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => paginate(index + 1)}
                  style={{ display: "block" }} 
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
        </Row>
        {/* <ToastContainer position='top-center' /> */}
      </div>
    </>
  );
};

export default Tables;

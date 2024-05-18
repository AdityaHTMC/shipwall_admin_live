import { LoginContext } from "../../Components/ContextProvider/Context";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { toast, ToastContainer } from "react-toastify";
import Spiner from "../../Components/spiner/Spiner";
import Tables from "../../Components/table/Table";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import Paginations from "../../Components/pagination/Paginations";

const Sales = () => {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const navigate = useNavigate();

  const handlePreview = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleNext = () => {
    setPage((prevPage) => (prevPage < pageCount ? prevPage + 1 : prevPage));
  };

  const { loginData, setLoginData } = useContext(LoginContext);
  let token = localStorage.getItem("usersdatatoken");

  // const dashValid = async () => {
  //   await axios.get("/api/v1/valid-seller", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": token
  //     }
  //   })
  //     .then((res) => {
  //       console.log(res.data);
  //       setLoginData(res.data.user);

  //     })
  //     .catch(err => {
  //       console.log(err)
  //       navigate("*")
  //     })
  // }

  // useEffect(() => {
  //   dashValid();
  // }, []);

  return (
    <>
      <div>
        <Row>
          <div>
            <Card className="">
              <Table className="align-items-center" responsive="sm">
                <thead className="">
                  <tr>
                    <th>Order ID</th>
                    <th>Order Value</th>
                    <th>Quantity</th>
                    <th>Order Status</th>
                    <th>payment Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>dhgd</td>
                    <td>djd</td>
                    <td>dcndh</td>
                    <td>dhdhs</td>
                    <td>
                      <Dropdown className="text-center">
                        <Dropdown.Toggle
                          className="dropdown_btn"
                          id="dropdown-basic"
                        >
                          {/* <Badge bg={element.status === "Active" ? "primary" : "danger"}>
                                                                    {element.status} <i class="fa-solid fa-angle-down"></i>
                                                                </Badge> */}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {/* <Dropdown.Item onClick={() => handleChange(element._id, "Active")}>Active</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => handleChange(element._id, "InActive")}>InActive</Dropdown.Item> */}
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                    <td className="img_parent">
                      {/* <img src={`/uploads/${element.profile}`} alt="img" /> */}
                      {/* <img src={element.profile} alt="img" /> */}
                    </td>
                    {/* <td>
                                                        <Dropdown>
                                                            <Dropdown.Toggle variant='light' className='action' id="dropdown-basic">
                                                                <i class="fa-solid fa-ellipsis-vertical"></i>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item >
                                                                    <Link to={`/user-profile/${element._id}`}><i class="fa-solid fa-eye" style={{ color: "green" }} ></i> <span>View</span></Link>
                                                                </Dropdown.Item>
                                                                <Dropdown.Item >
                                                                    <Link to={`/edit-user/${element._id}`}> <i class="fa-solid fa-pen-to-square" style={{ color: "blue" }}></i> <span>Edit</span> </Link>
                                                                </Dropdown.Item>
                                                                <Dropdown.Item >
                                                                    <div>
                                                                        <Link onClick={() => deleteUser(element._id)}><i class="fa-solid fa-trash" style={{ color: "red" }}></i> <span>Delete</span></Link>
                                                                    </div>
                                                                </Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </td> */}
                  </tr>
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
        <ToastContainer position="top-center" />
      </div>

      <Paginations
        handlePreview={handlePreview}
        handleNext={handleNext}
        page={page}
        pageCount={pageCount}
        setPage={setPage}
      />
    </>
  );
};

export default Sales;

import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import { useAppContext } from "../../contextApi/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { FaSync } from "react-icons/fa";

const itemsPerPage = 25;

const Product = () => {
  const { itemdata, tableLoading, SyncItem, syncLoading } = useAppContext();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = itemdata.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNav = (id) => {
    navigate(`/product/${id}`);
  };

  const sync = () => {
    SyncItem();
  };

  return (
    <>
      <div>
        <div className="row">
          <div className="col-sm-12 col-xs-12 text-right">
            <Button variant="success" disabled={syncLoading} onClick={sync}>
              {syncLoading ? (
                <FaSync
                  style={{
                    animation: `${
                      syncLoading ? "spin 4s infinite linear" : "none"
                    }`,
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
        <Row>
          <div>
            <Card className="">
              <Table className="align-items-center" responsive="sm">
                <thead className="">
                  <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>ItemName</th>
                    <th>ItemQty</th>
                    <th>Price</th>
                    <th>Group Name</th>
                    <th>Proprty 1</th>
                    <th>Proprty 2</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((element, index) => (
                      <tr key={index}>
                        <td>{element.itemCode}</td>
                        <td>
                          <img
                            src={element.image1}
                            height={35}
                            width={35}
                            alt=""
                          />
                        </td>
                        <td>{element.itemName.slice(0, 25)}</td>
                        <td>{element.itemQty}</td>
                        <td>{element.itemPrice}</td>
                        <td>{element.itmsGrpNam.slice(0, 25)}</td>
                        <td>{element.u_PROPRT1NAME}</td>
                        <td>{element.u_PROPRT2NAME}</td>
                        <td>
                          <button
                            onClick={() => handleNav(element._id)}
                            className="btn btn-primary"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <div>No Data Found</div>
                  )}
                </tbody>
              </Table>
            </Card>
          </div>
          <Row></Row>
          <div className="pagination-container">
            <Pagination className="justify-content-center">
              {Array.from({
                length: Math.ceil(itemdata.length / itemsPerPage),
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
      </div>
    </>
  );
};

export default Product;

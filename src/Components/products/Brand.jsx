import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import { useAppContext } from "../../contextApi/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import BrandModal from "../modal/BrandModal";
import {FaEdit} from "react-icons/fa"

const itemsPerPage = 25;

const Brand = () => {
  const [modalShow, setModalShow] = useState(false);
  const {
    brandList,
    getBrand,
    addBrand,
    deleteBrand,
  } = useAppContext();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] =useState({})

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    Array.isArray(brandList) &&
    brandList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handelUpdate = (item) => {
    setModalShow(true)
    setItems(item)
  };

  useEffect(() => {
    getBrand();
  }, []);

  const AddBanner = () => {
    setModalShow(true);
  };

  const handledelete = (id) => {
    deleteBrand(id);
  };

  return (
    <>
      <div>
        <div className="row">
          {/* <div className="col-sm-12 col-xs-12 text-right">
            <Button variant="primary" onClick={AddBanner}>
              Add Brand
            </Button>
          </div> */}
        </div>
        <Row>
          <div>
            <Card className="">
              <Table className="align-items-center" responsive="sm">
                <thead className="">
                  <tr>
                    <th>Brand ID</th>
                    <th>Image</th>
                    <th>Brand Name</th>
                    <th>Popular</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((element, index) => (
                      <tr key={index}>
                        <td>{element?.manufacturerId}</td>
                        <td>
                          <img
                            src={element?.image}
                            height={35}
                            width={35}
                            alt=""
                          />
                        </td>
                        {/* <td>{element?.itemName.slice(0, 25)}</td>
                        <td>{element.itemQty}</td>
                        <td>{element.itemPrice}</td>
                        <td>{element?.itmsGrpNam.slice(0, 25)}</td> */}
                        <td>{element?.manufacturerName}</td>
                        <td>{element && element.is_popular ? "True" : "False"}</td>
                        <td>
                          <button
                            onClick={() => handelUpdate(element)}
                            className="btn btn-primary"
                          >
                          <FaEdit/>
                          </button>
                          <button
                            onClick={() => handledelete(element._id)}
                            className="btn btn-danger mx-1"
                          >
                            <MdDeleteForever />
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
                length: Math.ceil(brandList.length / itemsPerPage),
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
        <BrandModal show={modalShow} onHide={() => setModalShow(false)} item={items} />
      </div>
    </>
  );
};

export default Brand;

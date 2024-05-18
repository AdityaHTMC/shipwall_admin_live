import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import { useAppContext } from "../../contextApi/AppContext";
import { Link, useNavigate } from "react-router-dom";
import BannerModal from "../modal/BannerModal";
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const itemsPerPage = 25;

const Banner = () => {
  const [modalShow, setModalShow] = useState(false);
  const { bannerList, tableLoading, addBanner, getBanner, deleteBanner } = useAppContext();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(bannerList)&& bannerList.slice(indexOfFirstItem, indexOfLastItem);
  const [items, setItems] =useState({})
  const [updateModal, setUpdateModal] =useState(false)
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (item) => {
    setUpdateModal(true)
    setModalShow(true)
    setItems(item)
  };

  useEffect(() => {
    getBanner();
  }, []);

  const AddBanner = () => {
    setUpdateModal(false)
    setModalShow(true);
    setItems({})
  };

  const handledelete = (id) =>{
    deleteBanner(id)
  }

  return (
    <>
      <div>
        <div className="row">
          <div className="col-sm-12 col-xs-12 text-right">
            <Button variant="primary" onClick={AddBanner}>
              Add Banner
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
                    <th>Type</th>
                    <th>Position</th>
                    <th>Link</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((element, index) => (
                      <tr key={index}>
                        <td>{element?._id.slice(0,8)}</td>
                        <td>
                          <img
                            src={element?.banner}
                            height={35}
                            width={35}
                            alt=""
                          />
                        </td>
                        {/* <td>{element?.itemName.slice(0, 25)}</td>
                        <td>{element.itemQty}</td>
                        <td>{element.itemPrice}</td>
                        <td>{element?.itmsGrpNam.slice(0, 25)}</td> */}
                        <td>{element?.type}</td>
                        <td> {element?.position} </td>
                        <td>{element?.link}</td>
                        <td>   
                          <button
                            onClick={() => handleEdit(element)}
                            className="btn btn-primary"
                          >
                          <MdEdit/>
                          </button>
                          <button
                            onClick={() => handledelete(element._id)}
                            className="btn btn-danger mx-1"
                          >
                          <MdDeleteForever/>
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
                length: Math.ceil(bannerList.length / itemsPerPage),
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
        <BannerModal show={modalShow} onHide={() => setModalShow(false)} item={items} updateModal={updateModal} />
      </div>
    </>
  );
};

export default Banner;

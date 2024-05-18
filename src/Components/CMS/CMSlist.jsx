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
import CMSModel from "./CMSModel";

const itemsPerPage = 25;

const Banner = () => {
  const [modalShow, setModalShow] = useState(false);
  const { cmslist, tableLoading, addBanner, getCmsList, deleteBanner } = useAppContext();
  const navigate = useNavigate();

  // const [currentPage, setCurrentPage] = useState(1);

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = Array.isArray(cmslist)&& cmslist.slice(indexOfFirstItem, indexOfLastItem);
  const [items, setItems] =useState({})
  const [updateModal, setUpdateModal] =useState(false)
  // const paginate = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  const handleEdit = (item) => {
    setUpdateModal(true)
    setModalShow(true)
    setItems(item)
  };

  useEffect(() => {
    getCmsList();
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
          {/* <div className="col-sm-12 col-xs-12 text-right">
            <Button variant="primary" onClick={AddBanner}>
              Add Page 
            </Button>
          </div> */}
        </div>
        <Row>
          <div>
            <Card className="">
              <Table className="align-items-center" responsive="sm">
                <thead className="">
                  <tr>
                    {/* <th>ID</th> */}
                    <th>Title</th>
                    <th>Slug</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cmslist?.length > 0 ? (
                    cmslist?.map((element, index) => (
                      <tr key={index}>
                        {/* <td>{element?._id.slice(0,8)}</td> */}
                        <td> {element.title}  </td>
                        <td> {element.slug}  </td>
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
          {/* <div className="pagination-container">
            <Pagination className="justify-content-center">
              {Array.from({
                length: Math.ceil(cmslist.length / itemsPerPage),
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
          </div> */}
        </Row>
        <CMSModel show={modalShow} onHide={() => setModalShow(false)} item={items} updateModal={updateModal} />
      </div>
    </>
  );
};

export default Banner;

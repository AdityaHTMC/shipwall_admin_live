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
import FlashModal from "./FlashModal";

const itemsPerPage = 25;

const FlashNewsList = () => {
  const [modalShow, setModalShow] = useState(false);
  const { fleshNewsList, tableLoading, addBanner, getFleshNewsList, deleteBanner } = useAppContext();
  const navigate = useNavigate();


  const [items, setItems] =useState({})
  const [updateModal, setUpdateModal] =useState(false)


  const handleEdit = (item) => {
    setUpdateModal(true)
    setModalShow(true)
    setItems(item)
  };

  useEffect(() => {
    getFleshNewsList();
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {fleshNewsList?.length > 0 ? (
                    fleshNewsList?.map((element, index) => (
                      <tr key={index}>
                        {/* <td>{element?._id.slice(0,8)}</td> */}
                        <td> {element.title}  </td>
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
         
        </Row>
        <FlashModal show={modalShow} onHide={() => setModalShow(false)} item={items} updateModal={updateModal} />
      </div>
    </>
  );
};

export default FlashNewsList;

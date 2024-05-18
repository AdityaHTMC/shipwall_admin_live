import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAppContext } from "../../contextApi/AppContext";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from '../products/EditorToolbar' 
import { Col, Row } from "react-bootstrap";


const CMSModel = (props) => {
  const { item, updateModal } = props;
  const { addBanner, editCMS } = useAppContext();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [link, setLink] = useState("");
  const [fileValidated, setFileValidated] = useState(false);
  const [platformValidated, setPlatformValidated] = useState(false);
  const [linkValidated, setLinkValidated] = useState(false);
  const [preview, setPreview] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState("");
 const  [ pagetitle , setPageTitle ] = useState('')
 const  [ pagedesc , setPagedesc ] = useState('')

  console.log(item, "itemList");

  useEffect(() => {
    if (updateModal && item) {

      setPageTitle(item.title);
      setPagedesc(item.description)

    } else {
      setPageTitle('');
      setPagedesc('');
    }
  }, [updateModal, item]);


  const handleDescriptionChange = (content) => {
    setPagedesc(content);
  
  };


  const handleSubmit = () => {
    const id = item._id;
    editCMS(id, pagetitle , pagedesc );
  };



  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="bg-primary text-white">
          <Modal.Title id="contained-modal-title-vcenter">
            {updateModal ? "Update Banner" : "Add Banner"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formLink">
              <Form.Label className="text text-success">
                <b> Title </b>
              </Form.Label>
              <Form.Control
                placeholder="Enter Title"
                type="text"
                value={pagetitle}
                // onChange={handleLinkChange}
                
              />
            </Form.Group>

            <Row className="mt-1">
                <Col md={12}>
                  <Form.Group controlId="description">
                    <hr />
                    <h4 className="text text-dark text-bold text-center">
                      Description
                    </h4>
                    <EditorToolbar toolbarId={"t1"} />
                    <hr />
                    <div>
                      <ReactQuill
                        value={pagedesc || ""}
                        onChange={handleDescriptionChange}
                        modules={modules("t1")}
                        formats={formats}
                        style={{ height: "200px" }}
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button
            variant="primary"
            className="float-end"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CMSModel;

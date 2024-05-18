import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAppContext } from "../../contextApi/AppContext";

const FlashModal = (props) => {
  const { item, updateModal } = props;
  const { editnews } = useAppContext();
  const [pagetitle, setPageTitle] = useState('');
  const [pagedesc, setPageDesc] = useState('');

  useEffect(() => {
    if (updateModal && item) {
      setPageTitle(item.title);
      setPageDesc(item.description);
    } else {
      setPageTitle('');
      setPageDesc('');
    }
  }, [updateModal, item]);

  const handleTitleChange = (event) => {
    const changeTitle = event.target.value
    console.log(changeTitle,'CT');
    setPageTitle(changeTitle);
  };

  const handleSubmit = () => {
    const id = item._id;
    // Here you can use pagetitle and pagedesc to submit your form data
    editnews(id, pagetitle);
    // Close the modal after submission
    props.onHide();
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
            <Form.Group controlId="formTitle">
              <Form.Label className="text text-success"><b>Title</b></Form.Label>
              <Form.Control
                placeholder="Enter Title"
                type="text"
                value={pagetitle}
                onChange={handleTitleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FlashModal;

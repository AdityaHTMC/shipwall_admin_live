import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAppContext } from "../../contextApi/AppContext";

const BannerModal = (props) => {
  const { item, updateModal } = props;
  const { addBanner, updateBanner } = useAppContext();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [link, setLink] = useState("");
  const [fileValidated, setFileValidated] = useState(false);
  const [platformValidated, setPlatformValidated] = useState(false);
  const [linkValidated, setLinkValidated] = useState(false);
  const [preview, setPreview] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState("");

  console.log(item,'itemList');

  useEffect(() => {
    if (updateModal && item) {
      setSelectedFile(item.banner);
      setSelectedOption(item.type);
      setLink(item.link);
      setSelectedPosition(item.position);
    } else {
      setSelectedFile(null);
      setSelectedOption("");
      setSelectedPosition('')
      setLink("");
    }
  }, [updateModal, item]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileValidated(false);
    // Generate a preview URL for the selected image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
    // Clear the existing image preview
    if (updateModal && item && item.banner) {
      setPreview(null);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setPlatformValidated(false);
  };

  const handleLinkChange = (event) => {
    const inputLink = event.target.value;
    const urlPattern = new RegExp(
      "^(https?://)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    const isValidUrl = urlPattern.test(inputLink);
    setLink(inputLink);
    setLinkValidated(!isValidUrl);
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      setFileValidated(true);
    }
    if (!selectedOption) {
      setPlatformValidated(true);
    }
    if (!link) {
      setLinkValidated(true);
    }
    if (selectedFile && selectedOption && link) {
      if (updateModal && item) {
        const id = item._id
        updateBanner(id, selectedFile, selectedOption, link,selectedPosition);
      } else {
        addBanner(selectedFile, selectedOption, link, selectedPosition);
      }
      setSelectedFile(null);
      setSelectedOption("");
      setLink("");
      setFileValidated(false);
      setPlatformValidated(false);
      setLinkValidated(false);
      setPreview(null); // Clear the image preview
      props.onHide();
    }
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
            <Form.Group controlId="formFile">
              <Form.Label className="text text-success">
                <b>Upload Image:</b>
              </Form.Label>
              <Form.Control
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                isInvalid={fileValidated && !selectedFile}
              />
              <Form.Control.Feedback type="invalid">
                Please select an image
              </Form.Control.Feedback>
            </Form.Group>
            {/* Conditionally render the existing image */}
            {updateModal && item.banner && (
              <div className="existing-image-container">
                <label className="text text-success">
                  <b>Existing Image:</b>
                </label>
                <img
                  src={item.banner}
                  alt="Existing"
                  className="existing-image img-fluid m-3"
                  style={{ marginBottom: "10px" }}
                />
              </div>
            )}
            {/* Render the selected image if available */}
            {preview && (
              <>
                <p className="text text-primary">Latest Image</p>
                <img
                  height={200}
                  width={300}
                  src={preview}
                  alt="Uploaded"
                  className="img-fluid m-3"
                  style={{ marginBottom: "10px" }}
                />{" "}
              </>
            )}
            <Form.Group className="my-2">
              <Form.Label className="text text-success">
                <b>Select Platform:</b>
              </Form.Label>
              <div>
                <Form.Check
                  inline
                  label="Web"
                  type="radio"
                  id="web"
                  name="platform"
                  value="Web"
                  checked={selectedOption === "Web"}
                  onChange={handleOptionChange}
                  isInvalid={platformValidated && !selectedOption}
                />
                <Form.Check
                  inline
                  label="App"
                  type="radio"
                  id="app"
                  name="platform"
                  value="App"
                  checked={selectedOption === "App"}
                  onChange={handleOptionChange}
                  isInvalid={platformValidated && !selectedOption}
                />
              </div>
              <Form.Control.Feedback type="invalid">
                Please select a platform
              </Form.Control.Feedback>
            </Form.Group>


            <Form.Group controlId="formPosition">
              <Form.Label className="text text-success">
                <b>Select Position:</b>
              </Form.Label>
              <Form.Control
                as="select"
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value)}
                
              >
                <option value="">Select Position</option>
                <option value="center1">Center 1</option>
                <option value="center2">Center 2</option>
                <option value="center3">Center 3</option>
                <option value="center4">Center 4</option>
                <option value="Middle1">Middle 1</option>
                <option value="Middle2">Middle 2</option>
                <option value="Middle3">Middle 3</option>
                <option value="Middle4">Middle 4</option>
                <option value="video">Video Banner</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Please select a position
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formLink">
              <Form.Label className="text text-success">
                <b>Add Target Link</b>
              </Form.Label>
              <Form.Control
                placeholder="https://shipwall.au/"
                type="text"
                value={link}
                onChange={handleLinkChange}
                isInvalid={linkValidated && !link}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a link
              </Form.Control.Feedback>
            </Form.Group>
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

export default BannerModal;

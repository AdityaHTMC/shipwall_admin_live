import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAppContext } from "../../contextApi/AppContext";

const BrandModal = (props) => {
  const { item } = props;
  const [selectedFile, setSelectedFile] = useState(item?.image || "");
  const [selectedOption, setSelectedOption] = useState(item?.is_popular || "");
  const [link, setLink] = useState("");
  const [mId, setMId] = useState(item?.manufacturerId || "");
  const [fileValidated, setFileValidated] = useState(false);
  const [platformValidated, setPlatformValidated] = useState(false);
  const [linkValidated, setLinkValidated] = useState(false);
  const { updateBrand } = useAppContext();
  const [preview, setPreview] = useState("");
  const [selectedCatalogFile, setSelectedCatalogFile] = useState(null);
  const [catalogFileValidated, setCatalogFileValidated] = useState(false);

  useEffect(() => {
    setSelectedOption(!item?.is_popular ? "false" : "true");
    setMId(item?.manufacturerId || "");
    setLink(item?.manufacturerName || "");
    setPreview(item?.image);
  }, [item]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileValidated(false);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setPlatformValidated(false);
  };

  const handleLinkChange = (event) => {
    const inputLink = event.target.value;
    setLink(inputLink);
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
    
      updateBrand(mId, link, selectedFile, selectedOption, item?._id , selectedCatalogFile);
      setSelectedFile(null);
      setSelectedOption("");
      setLink("");
      setMId("");
      setFileValidated(false);
      setPlatformValidated(false);
      setLinkValidated(false);
      setCatalogFileValidated(false);
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
            Add Brand
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formmId">
              <Form.Label className="text text-success">
                {" "}
                <b> Brand ID</b>
              </Form.Label>
              <Form.Control
                type="text"
                value={mId}
                onChange={(e) => setMId(e.target.value)}
                isInvalid={linkValidated && !link}
              />
            </Form.Group>
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
            {preview && (
              <>
                {" "}
                <img
                  height={200}
                  width={300}
                  src={preview}
                  alt="Uploaded"
                  className="img-fluid m-3"
                  style={{ marginBottom: "10px" }}
                />
                <p className="text text-primary">Current Image</p>
              </>
            )}
            {selectedFile && (
              <>
                <img
                  height={200}
                  width={300}
                  src={URL.createObjectURL(selectedFile)}
                  alt="Uploaded"
                  className="img-fluid m-3"
                  style={{ marginBottom: "10px" }}
                />{" "}
                <p className="text text-primary">Latest Image</p>
              </>
            )}
            <Form.Group className="my-2">
              <Form.Label className="text text-success">
                <b>Popular</b>
              </Form.Label>
              <div>
                <Form.Check
                  inline
                  label="True"
                  type="radio"
                  id="true"
                  name="platform"
                  value="true"
                  checked={selectedOption === "true"}
                  onChange={handleOptionChange}
                  isInvalid={platformValidated && !selectedOption}
                />
                <Form.Check
                  inline
                  label="False"
                  type="radio"
                  id="false"
                  name="platform"
                  value="false"
                  checked={selectedOption === "false"}
                  onChange={handleOptionChange}
                  isInvalid={platformValidated && !selectedOption}
                />
              </div>
              <Form.Control.Feedback type="invalid">
                Please select a platform
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formCatalogFile">
              <Form.Label className="text text-success">
                <b>Upload Catalog:</b>
              </Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setSelectedCatalogFile(e.target.files[0])}
                accept=".pdf,.doc,.docx"
                isInvalid={catalogFileValidated && !selectedCatalogFile}
              />
              <Form.Control.Feedback type="invalid">
                Please select a catalog file
              </Form.Control.Feedback>
            </Form.Group>

            {selectedCatalogFile && (
              <p className='text text-primary'>Selected Catalog File: {selectedCatalogFile.name}</p>
            )}

            <Form.Group controlId="formLink">
              <Form.Label className="text text-success">
                {" "}
                <b> Brand Name</b>
              </Form.Label>
              <Form.Control
                type="text"
                value={link}
                onChange={handleLinkChange}
                isInvalid={linkValidated && !link}
              />
              <Form.Control.Feedback type="invalid">
                Brand Name
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

export default BrandModal;

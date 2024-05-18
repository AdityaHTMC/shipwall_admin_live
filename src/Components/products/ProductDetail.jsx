import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../contextApi/AppContext";
import { Card, Form, Col, Row, Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "./productDetails.css";
import { FaDownload } from "react-icons/fa6";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
const ProductDetail = () => {
  const { id } = useParams();
  const {
    getItemDetail,
    singleItemdata,
    getAttributeValueList,
    getAttributeList,
    attributeList,
    ItemAttributeValueAdd,
    updateDescription,
    baseURL2,
  } = useAppContext();
  const [attributeValues, setAttributeValues] = useState({});
  const [description1, setDescription] = useState("");
  const [TechDescription, setTechDescription] = useState("");
  const [ShippingInformation, setShippingInformation] = useState("");
  const [isClearance1, setIsClearance1] = useState("No");
  const [isNewLaunch1, setisNewLaunch1] = useState("No");
  const [isBestSeller1, setisBestSeller1] = useState("NO");
  const [isHotProduct1, setisHotProduct1] = useState("NO");

  // const [quillModules, setQuillModules] = useState({
  //   toolbar: [
  //     [{ header: "1" }, { header: "2" }, { font: [] }],
  //     [{ size: [] }],
  //     ["bold", "italic", "underline", "strike", "blockquote"],
  //     [
  //       { list: "ordered" },
  //       { list: "bullet" },
  //       { indent: "-1" },
  //       { indent: "+1" },
  //     ],
  //     ["link", "image", "video"],
  //     ["clean"],
  //   ],
  //   clipboard: {
  //     // toggle to add extra line breaks when pasting HTML:
  //     matchVisual: false,
  //   },
  // });

  const [pdf, setPdf] = useState(null);

  const {
    image1,
    image2,
    image3,
    image4,
    itemCode,
    itemName,
    itemQty,
    itmsGrpCod,
    itmsGrpNam,
    description,
    attribute_value,
    u_PROPRT1,
    u_PROPRT2,
    u_PROPRT3,
    u_PROPRT4,
    u_PROPRT5,
    u_PROPRT1NAME,
    u_PROPRT2NAME,
    u_PROPRT3NAME,
    u_PROPRT4NAME,
    u_PROPRT5NAME,
    technical_information,
    shipping_information,
    brochure,
    isClearance,
    isNewLaunch,
    isBestSeller,
    isHotProduct,
  } = singleItemdata;

  const fetchData = async () => {
    await getItemDetail(id);
    setDescription(description);
    setTechDescription(technical_information);
    setShippingInformation(shipping_information);
  };

  useEffect(() => {
    setIsClearance1(singleItemdata.isClearance);
    setisNewLaunch1(singleItemdata.isNewLaunch);
    setisBestSeller1(singleItemdata.isBestSeller);
    setisHotProduct1(singleItemdata.isHotProduct);
  }, [singleItemdata]);

  const fetchdata1 = async () => {
    if (itemCode) {
      await getAttributeValueList(`${itemCode}` || "");
      await getAttributeList(
        itmsGrpCod,
        u_PROPRT1 || "",
        u_PROPRT2 || "",
        u_PROPRT3 || "",
        u_PROPRT4 || "",
        u_PROPRT5 || ""
      );

      const attributeValuesMap = {};
      attribute_value.forEach((item) => {
        attributeValuesMap[item.attributeId] = item.value;
      });

      setAttributeValues(attributeValuesMap);
      setDescription(description);
      setTechDescription(technical_information);
      setShippingInformation(shipping_information);
      setIsClearance1(isClearance);
      setisNewLaunch1(isNewLaunch);
      setisBestSeller1(isBestSeller);
      setisHotProduct1(isHotProduct);
    }
  };

  useEffect(() => {
    fetchdata1();
  }, [attribute_value]);

  useEffect(() => {
    fetchData();
  }, [id]);

  const images = [image1, image2, image3, image4].filter(Boolean);

  const handleAttributeInputChange = (attributeId, value) => {
    setAttributeValues((prevValues) => ({
      ...prevValues,
      [attributeId]: value,
    }));
  };

  const handleDescriptionChange = (content) => {
    setDescription(content);
    console.log(content);
  };

  const handleDescriptionChange1 = (content) => {
    setTechDescription(content);
  };

  const handleDescriptionChange2 = (content) => {
    setShippingInformation(content);
  };

  const handelAttributeAdd = async (e) => {
    e.preventDefault();
    const valuesArray = Object.entries(attributeValues).map(
      ([attributeId, value]) => ({
        attributeId,
        value,
      })
    );
    await ItemAttributeValueAdd(itemCode, valuesArray);

    await updateDescription(
      itemCode,
      description1,
      pdf,
      isClearance1,
      isNewLaunch1,
      isBestSeller1,
      isHotProduct1,
      TechDescription,
      ShippingInformation
    );
    getItemDetail(id);
  };

  const handledhownloadbrochure = async () => {
    const documentFile = brochure;
    try {
      const downloadURL = `${baseURL2}/uploads/product_brochure/${documentFile}`;
      const response = await fetch(downloadURL);
      if (response.ok) {
        const blob = await response.blob();
        const downloadLink = document.createElement("a");
        const blobURL = URL.createObjectURL(blob);
        downloadLink.href = blobURL;
        downloadLink.download = documentFile;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      } else {
        console.error("Failed to fetch file:", response.statusText);
      }
    } catch (error) {
      console.error("Error during file download:", error);
    }
  };

  return (
    <>
      <div>
        <Card>
          <Card.Body>
            <div className="row">
              {images.map((image, index) => (
                <div key={index} className="col-md-3">
                  <div className="proImgBx">
                    <img src={image} alt={`Image ${index + 1}`} />
                  </div>
                </div>
              ))}
            </div>
            <Form>
              <Row>
                <Col md="12">
                  <Form.Group as={Col} controlId="itemName">
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control type="text" value={itemName} disabled />
                  </Form.Group>

                  <Form.Group as={Col} controlId="itemQty">
                    <Form.Label>Item Quantity</Form.Label>
                    <Form.Control type="number" value={itemQty} disabled />
                  </Form.Group>

                  <Form.Group as={Col} controlId="itmsGrpCod">
                    <Form.Label>Item Group Code</Form.Label>
                    <Form.Control type="text" value={itmsGrpCod} disabled />
                  </Form.Group>

                  <Form.Group as={Col} controlId="itmsGrpNam">
                    <Form.Label>Item Group Name</Form.Label>
                    <Form.Control type="text" value={itmsGrpNam} disabled />
                  </Form.Group>

                  <Form.Group as={Col} controlId="uploadBrochure">
                    <Form.Label className="text text-lg text-primary my-1 border-1">
                      Upload Brochure
                    </Form.Label>
                    <Form.Control
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setPdf(e.target.files[0])}
                    />
                  </Form.Group>
                  {brochure && (
                    <button
                      onClick={handledhownloadbrochure}
                      type="button"
                      className="btn btn-success float-end my-2"
                    >
                      Brochure <FaDownload />
                    </button>
                  )}
                </Col>
              </Row>

              <Row>
                <Col md="12">
                  {u_PROPRT1NAME && (
                    <Form.Group as={Col} controlId="itemName">
                      <Form.Label>Sub Group 1</Form.Label>
                      <Form.Control
                        type="text"
                        value={u_PROPRT1NAME}
                        disabled
                      />
                    </Form.Group>
                  )}

                  {u_PROPRT2NAME && (
                    <Form.Group as={Col} controlId="itemQty">
                      <Form.Label>Sub Group 2</Form.Label>
                      <Form.Control
                        type="text"
                        value={u_PROPRT2NAME}
                        disabled
                      />
                    </Form.Group>
                  )}

                  {u_PROPRT3NAME && (
                    <Form.Group as={Col} controlId="itemQty">
                      <Form.Label>Sub Group 3</Form.Label>
                      <Form.Control
                        type="text"
                        value={u_PROPRT3NAME}
                        disabled
                      />
                    </Form.Group>
                  )}

                  {u_PROPRT4NAME && (
                    <Form.Group as={Col} controlId="itemQty">
                      <Form.Label>Sub Group 4</Form.Label>
                      <Form.Control
                        type="text"
                        value={u_PROPRT4NAME}
                        disabled
                      />
                    </Form.Group>
                  )}

                  {u_PROPRT5NAME && (
                    <Form.Group as={Col} controlId="itemQty">
                      <Form.Label>Sub Group 5</Form.Label>
                      <Form.Control
                        type="text"
                        value={u_PROPRT5NAME}
                        disabled
                      />
                    </Form.Group>
                  )}
                </Col>
              </Row>

              <div className="row" style={{ marginTop: "15px" }}>
                <div className="mt-1">
                  <div className="col-md-12">
                    <Form.Group controlId="clearanceCheckbox">
                      <Form.Check
                        type="checkbox"
                        label="Clearance Sell"
                        checked={isClearance1 === "Yes"}
                        onChange={(e) =>
                          setIsClearance1(e.target.checked ? "Yes" : "No")
                        }
                      />
                    </Form.Group>

                    <Form.Group controlId="NewlaunchCheckbox">
                      <Form.Check
                        type="checkbox"
                        label="New Launch"
                        checked={isNewLaunch1 === "Yes"}
                        onChange={(e) =>
                          setisNewLaunch1(e.target.checked ? "Yes" : "No")
                        }
                      />
                    </Form.Group>

                    <Form.Group controlId="BestSellerCheckbox">
                      <Form.Check
                        type="checkbox"
                        label="Best Seller"
                        checked={isBestSeller1 === "Yes"}
                        onChange={(e) =>
                          setisBestSeller1(e.target.checked ? "Yes" : "No")
                        }
                      />
                    </Form.Group>

                    <Form.Group controlId="HotProductCheckbox">
                      <Form.Check
                        type="checkbox"
                        label="Hot Product"
                        checked={isHotProduct1 === "Yes"}
                        onChange={(e) =>
                          setisHotProduct1(e.target.checked ? "Yes" : "No")
                        }
                      />
                    </Form.Group>
                  </div>
                </div>
              </div>

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
                        value={description1 || ""}
                        onChange={handleDescriptionChange}
                        modules={modules("t1")}
                        formats={formats}
                        style={{ height: "300px" }}
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-1">
                <Col md={12}>
                  <Form.Group controlId="description">
                    <hr />
                    <h4 className="text text-dark text-bold text-center">
                      Technical Description
                    </h4>
                    <EditorToolbar toolbarId={"t2"} />
                    <hr />
                    <div>
                      <ReactQuill
                        value={TechDescription || ""}
                        onChange={handleDescriptionChange1}
                        modules={modules("t2")}
                        formats={formats}
                        style={{ height: "300px" }}
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-1">
                <Col md={12}>
                  <Form.Group controlId="shipping">
                    <hr />
                    <h4 className="text text-dark text-bold text-center">
                      Shipping Information
                    </h4>
                    <EditorToolbar toolbarId={"t3"} />
                    <hr />
                    <div>
                      <ReactQuill
                        value={ShippingInformation || ""}
                        onChange={handleDescriptionChange2}
                        modules={modules("t3")}
                        formats={formats}
                        style={{ height: "300px" }}
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-5">
                <hr />
                <h4 className="text text-dark text-bold text-center">
                  Attribute
                </h4>
                <hr />
                <Col md="12">
                  {Array.isArray(attributeList) &&
                    attributeList.map((item, index) => (
                      <Form.Group
                        key={index}
                        as={Col}
                        controlId={item.attribute}
                      >
                        <Form.Label>{item.attribute}</Form.Label>
                        <Form.Control
                          type="text"
                          name={`${item.attribute}-${index}`}
                          value={attributeValues[item._id] || ""}
                          onChange={(e) =>
                            handleAttributeInputChange(item._id, e.target.value)
                          }
                        />
                      </Form.Group>
                    ))}
                </Col>
              </Row>
            </Form>
          </Card.Body>
          {/* {(attributeList?.length > 0 ||
            Object.keys(description1 || {}).length > 0) && (
            <button
              onClick={(e) => handelAttributeAdd(e)}
              className="btn btn-primary mt-1 w-25 mx-3"
            >
              Submit
            </button>
          )} */}

          <button
            onClick={(e) => handelAttributeAdd(e)}
            className="btn btn-primary mt-1 w-25 mx-3"
          >
            Submit
          </button>
        </Card>
      </div>
    </>
  );
};

export default ProductDetail;

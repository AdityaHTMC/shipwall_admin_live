import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useAppContext } from "../../contextApi/AppContext";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ProgressBar, Collapse } from "react-bootstrap";
import ShowAddress from "./ShowAddress";
import {Table }from "react-bootstrap";
import { toast } from "react-toastify";

// const base_url = "https://shipwall.au/test/API/shipwall";

const ReVerificationCustomer = () => {
  const { BPudata, UpdateLeadTocustomer, createLoading, ApproveandReject, getDoc, docData ,baseURL2 } =
    useAppContext();
  const { id } = useParams();
  const [step, setStep] = useState(1);

  const singleBPudata = BPudata.find((item) => item._id === id) || {};
  const loginData = JSON.parse(localStorage.getItem("log7"));
  const userdata = loginData?.data || {};
  const [billingaddress , setBillingAddress] = useState([{}])
  const [shippingaddress , setShippingAddress] = useState([{}])
  const [items, setItems] = useState([]);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isReasonOpen, setIsReasonOpen] = useState(false); 

  const navigate = useNavigate()

  const incrementStep = () => {
    setStep(step + 1);
  };

  const decrementStep = () => {
    setStep(step - 1);
  };

  const {
    _id,
    cardName,
    cellular,
    e_Mail,
    cardCode,
    groupName,
    addresses,
    slpName,
    abnno,
    acnno,
    top,
    creditlimit,
    dftbplid,
    topGroup,
    branchName
  } = singleBPudata;

  const Addresses = addresses || [];

  console.log(singleBPudata)

  useEffect(() => {
    const filteredBillingAddresses = Addresses.filter(
      (address) => address.adresType === "B"
    );
    setBillingAddress(filteredBillingAddresses);

    // Filter shipping addresses
    const filteredShippingAddresses = Addresses.filter(
      (address) => address.adresType !== "B"
    );
    setShippingAddress(filteredShippingAddresses);
    getDoc(cardCode)
  }, [cardCode]);

  useEffect(()=>{
    setItems(docData)

 },[id, docData])


  const handleSubmit = () => {
    UpdateLeadTocustomer(_id, cardCode, e_Mail,slpName,cardName);
  };

  const handleProgressBarClick = (clickedStep) => {
    if (clickedStep >= 1 && clickedStep <= 4) {
      setStep(clickedStep);
    }
  };

  const handelreject = async () => {
    setIsReasonOpen(!isReasonOpen); 
    // await ApproveandReject(_id, "Reject");
  };

  const handelreject1 = async (e) => {
    e.preventDefault()
    if(!rejectionReason.length >0){
      toast.info(`Write a Resion plz to Reject : ${cardName}`)
      return
    }else{
      await ApproveandReject(_id, "Reject",rejectionReason);
    }
  };

  if (step === 1) {
  } else if (step === 2) {
  }

  const handelDownload = async (file) => {
    try {

      const downloadURL = `${baseURL2}/uploads/kyc_document/${file}`;
      const response = await fetch(downloadURL);
      if (response.ok) {
        const blob = await response.blob();
        const downloadLink = document.createElement('a');
        const blobURL = URL.createObjectURL(blob);
        downloadLink.href = blobURL;
        downloadLink.download = file;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      } else {
        console.error('Failed to fetch file:', response.statusText);
      }
    } catch (error) {
      console.error('Error during file download:', error);
    }
  };

  const navigateToUlist = ()=>{
    navigate('/customer-ulist')
  }
  
  

  return (
    <Card>
      <Card.Body>
        <Card.Title className="mb-4">
          UnApproved Customer Details{" "}
          <span className="float-end">
            Approver :{" "}
            <span className="text-info border-bottom">
              {loginData ? userdata.name : ""}
            </span>
          </span>
        </Card.Title>
        <ProgressBar
          now={(step / 4) * 100}
          animated
          variant="info"
          className="mb-2"
          label={`${step}`}
          onClick={(e) => {
            const clickedStep = Math.ceil(
              (e.nativeEvent.offsetX / e.target.offsetWidth) * 4
            );
            handleProgressBarClick(clickedStep);
          }}
        />
        <form>
          <div className="row g-3">
            {step === 1 && (
              <>
                <div className="row mt-3">
                  <div className="col-md-2">
                    <label htmlFor="cardCode" className="form-label">
                      Customer ID
                    </label>
                    <input
                      type="text"
                      id="cardCode"
                      className="form-control"
                      value={cardCode}
                      disabled
                    />
                  </div>
                  <div className="col-md-5">
                    <label htmlFor="cardName" className="form-label">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      className="form-control"
                      value={cardName}
                      disabled
                    />
                  </div>
                  <div className="col-md-5">
                    <label htmlFor="groupName" className="form-label">
                      Group Name
                    </label>
                    <input
                      type="text"
                      id="groupName"
                      className="form-control"
                      value={groupName}
                      disabled
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-4">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      id="email"
                      className="form-control"
                      value={e_Mail}
                      disabled
                    />
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="cellular" className="form-label">
                      Mobile
                    </label>
                    <input
                      type="text"
                      id="cellular"
                      className="form-control"
                      value={cellular}
                      disabled
                    />
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="email" className="form-label">
                      Branch Name
                    </label>
                    <input
                      type="text"
                      id="email"
                      className="form-control"
                      value={branchName}
                      disabled
                    />
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">
                      ABN Number
                    </label>
                    <input
                      type="text"
                      id="email"
                      className="form-control"
                      value={abnno}
                      disabled
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">
                      ACN Number
                    </label>
                    <input
                      type="text"
                      id="email"
                      className="form-control"
                      value={acnno}
                      disabled
                    />
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-md-4">
                    <label htmlFor="email" className="form-label">
                      Payment Tearms
                    </label>
                    <input
                      type="text"
                      id="email"
                      className="form-control"
                      value={topGroup}
                      disabled
                    />
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="email" className="form-label">
                      Credit limit
                    </label>
                    <input
                      type="text"
                      id="email"
                      className="form-control"
                      value={creditlimit}
                      disabled
                    />
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="email" className="form-label">
                      Sales Employee
                    </label>
                    <input
                      type="text"
                      id="email"
                      className="form-control"
                      value={slpName}
                      disabled
                    />
                  </div>
                </div>

                <div className="row d-flex justify-content-between item-center">
                {/* <div className="col-md-4">
                      <button
                        type="button"
                        className="btn btn-secondary mt-3 w-30 mx-1"
                        onClick={navigateToUlist}
                      >
                        Previous
                      </button>
                    </div> */}
                  {/* <div className="col-md-4">
                    <Button
                      variant="success"
                      onClick={handleSubmit}
                      className="mt-3 w-30 mx-1"
                    >
                      {!createLoading ? "Approve" : "Approving Customer..."}
                    </Button>
                  </div> */}

                  <div className="col-md-4">
                    <button
                      type="button"
                      className="btn btn-primary mt-3 w-30 mx-1"
                      onClick={incrementStep}
                    >
                      Next
                    </button>
                  </div>
              </div>
              </>
            )}

            {step === 2 && (
              <>
              {
                billingaddress.map((item, index)=>(
                  <ShowAddress key={index} Addresses={item} handelreject={handelreject} incrementStep={incrementStep} decrementStep={decrementStep} index={index} />
                ))
              }
              <div className="row d-flex justify-content-between item-center">
              <div className="col-md-4">
                    <button
                      type="button"
                      className="btn btn-secondary mt-3 w-30 mx-1"
                      onClick={decrementStep}
                    >
                      Previous
                    </button>
                  </div>
                  {/* <div className="col-md-4">
                    <Button
                      variant="success"
                      onClick={handleSubmit}
                      className="mt-3 w-30 mx-1"
                    >
                      {!createLoading ? "Approve" : "Approving Customer..."}
                    </Button>
                  </div> */}

                  <div className="col-md-4">
                    <button
                      type="button"
                      className="btn btn-primary mt-3 w-30 mx-1"
                      onClick={incrementStep}
                    >
                      Next
                    </button>
                  </div>
              </div>
                
              </>
            )}

{step === 3 && (
              <>
              {
                shippingaddress.map((item, index)=>(
                  <ShowAddress key={index} Addresses={item} handelreject={handelreject} incrementStep={incrementStep} decrementStep={decrementStep} index={index} />
                ))
              }
              <div className="row d-flex justify-content-between item-center">
              <div className="col-md-4">
                    <button
                      type="button"
                      className="btn btn-secondary mt-3 w-30 mx-1"
                      onClick={decrementStep}
                    >
                      Previous
                    </button>
                  </div>
                  {/* <div className="col-md-4">
                    <Button
                      variant="success"
                      onClick={handleSubmit}
                      className="mt-3 w-30 mx-1"
                    >
                      {!createLoading ? "Approve" : "Approving Customer..."}
                    </Button>
                  </div> */}

                  <div className="col-md-4 flex-end">
                    <button
                      type="button"
                      className="btn btn-primary mt-3 w-30 mx-1"
                      onClick={incrementStep}
                    >
                      Next
                    </button>
                  </div>
              </div>
                
              </>
            )}

{step === 4 && (
          <>
            <Card className="mt-3">
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Serial No</th>
                      <th>Document Name</th>
                      <th>Document No</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
            {Array.isArray(items) ? (
              items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={item.serial_no}
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={item.document_name}
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={item.document_number}
                      disabled
                    />
                  </td>
                  <td>
                    <button 
                      type="button"
                      className="btn btn-success"
                      onClick={() => handelDownload(item.document_file)}
                      download
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No documents available</td>
              </tr>
            )}
          </tbody>
                </Table>
                <div className="d-flex justify-content-between item-center">
                    <button
                      type="button"
                      className="btn btn-secondary mt-3 w-30"
                      onClick={decrementStep}
                    >
                      Previous
                    </button>
                  <button
                    type="button"
                    className="btn btn-danger mt-3 w-30"
                    onClick={handelreject}
                  >
                    Reject
                  </button>
                  <Button
                      variant="success"
                      onClick={handleSubmit}
                      className="mt-3 w-30 mx-1"
                    >
                      {!createLoading ? "Approve" : "Approving Customer..."}
                    </Button>
                </div>
              </Card.Body>
              {
                isReasonOpen === true &&
                <div className="row mt-3 mb-2">
                  <div className="col-md-3">
                <label htmlFor="rejectionReason" className="form-label">
                  <h4 className="text text-dark">Rejection Reason</h4>
                </label>
                  </div>

                  <div className="col-md-6">
                <Collapse in={isReasonOpen} >
                  <input
                    type="text"
                    id="rejectionReason"
                    className="form-control"
                    placeholder="Enter rejection reason"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                  />
                </Collapse>
                  </div>
                  <div className="col-md-3">
                <button onClick={handelreject1} className="btn btn-outline-danger">
                  Submit
                </button>
                  </div>
              </div>
              
              }
            </Card>
          </>
        )}
          </div>
        </form>
      </Card.Body>
    </Card>
  );
};

export default ReVerificationCustomer;

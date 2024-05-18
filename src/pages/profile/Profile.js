import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Card from "react-bootstrap/Card"
import Row from 'react-bootstrap/esm/Row'
import "./profile.css"
import Spiner from '../../Components/spiner/Spiner';
import { addData } from '../../Components/ContextProvider/Context';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../../contextApi/AppContext'
import { ProgressBar } from "react-bootstrap";
// import ShowAddress from "./ShowAddress";
import {Table }from "react-bootstrap";
import ShowAddressAdmin from './ShowAddressAdmin'

// const base_url = "https://shipwall.au/test/API/shipwall";
const Profile = () => {
  const [showspin, setShowSpin] = useState(true);

  const { useradd, setUseradd } = useContext(addData);

  const { baseURL2 } = useAppContext()

  const { id } = useParams();
  //  get single user details api
  const [singleUser, setSingleUser] = useState({});
  const {getBP , singleBPdata, getrejectDoc, docData} = useAppContext()
  const [step, setStep] = useState(1);
  const loginData = JSON.parse(localStorage.getItem("log7"));
  const userdata = loginData?.data || {};
  const [billingaddress , setBillingAddress] = useState([{}])
  const [shippingaddress , setShippingAddress] = useState([{}])
  const [items, setItems] = useState([]);

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
    branchName,
    topname,
    dftbranchname,
  } = singleBPdata[0] || {};

  const Addresses = addresses || [];

  const incrementStep = () => {
    setStep(step + 1);
    setItems(docData)
  };

  const decrementStep = () => {
    setStep(step - 1);
  };

  useEffect(() => {
    getBP(id)
    setTimeout(() => {
      setShowSpin(false);
    }, 1200)
  }, [id])

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
    // getDoc(cardCode)
  }, [cardCode]);

  useEffect(()=>{
    getrejectDoc(id)
 },[id])

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

  return (
    <>
      {
        showspin ? <Spiner /> : <div className="container">
          <Card>
      <Card.Body>
        {/* <Card.Title className="mb-4">
          UnApproved Customer Details{" "}
          <span className="float-end">
            Approver :{" "}
            <span className="text-info border-bottom">
              {singleBPdata ? singleBPdata.cardName : ""}
            </span>
          </span>
        </Card.Title> */}
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
            // handleProgressBarClick(clickedStep);
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
                      value={dftbranchname}
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
                      value={topname}
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

                <div className="w-50 ">
                <button
                  type="button"
                  className="btn btn-primary mt-3 w-40 "
                  onClick={incrementStep}
                >
                  Next 
                </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
              {
                billingaddress.map((item, index)=>(
                  <ShowAddressAdmin key={index} Addresses={item} incrementStep={incrementStep} decrementStep={decrementStep} index={index} />
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
                  <ShowAddressAdmin key={index} Addresses={item} incrementStep={incrementStep} decrementStep={decrementStep} index={index} />
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
              </Card.Body>
            </Card>
          </>
        )}
          </div>
        </form>
      </Card.Body>
    </Card>
        </div>
      }

    </>
  )
}

export default Profile

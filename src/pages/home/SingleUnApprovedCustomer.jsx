import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useAppContext } from '../../contextApi/AppContext';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { ProgressBar } from "react-bootstrap";

const SingleUnApprovedCustomer = () => {
  const { BPudata, UpdateLeadTocustomer,createLoading, getDoc } = useAppContext();
  const { id } = useParams();
  const [step, setStep] = useState(1);

  const singleBPudata = BPudata.find(item => item.CardCode === id) || {};
  const loginData = JSON.parse(localStorage.getItem("log7"))
  const userdata = loginData?.data || {}

  const {
    CardName,
    Cellular,
    E_Mail,
    CardCode,
    GroupName,
    Addresses,
    SlpName
  } = singleBPudata;


  const incrementStep = () => {
    setStep(step + 1);
    getDoc(CardCode)
  };

  const decrementStep = () => {
    setStep(step - 1);
  };


  const addresses = Addresses || {};

  const {
    Address,
    Address2,
    Address3,
    AdresType,
    Block,
    Building,
    City,
    CountryCode,
    County,
    StateCode,
    StateName,
    Street,
    StreetNo,
    ZipCode
  } = addresses[0] || {};

  const handleSubmit = () => {
    UpdateLeadTocustomer(id,E_Mail);
  };

  const handleProgressBarClick = (clickedStep) => {
    if (clickedStep >= 1 && clickedStep <= 2) {
      setStep(clickedStep);
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title className="mb-4">UnApproved Customer Details <span className='float-end'>Approver : <span className='text-info border-bottom'>{loginData ? userdata.name :""}</span></span></Card.Title>
        <ProgressBar
          now={(step / 2) * 100}
          animated
          variant="info"
          className='mb-2'
          label={`${step}`}
          onClick={(e) => {
            const clickedStep = Math.ceil(
              (e.nativeEvent.offsetX / e.target.offsetWidth) * 2
            );
            handleProgressBarClick(clickedStep);
          }}
        />
        <form>
          <div className="row g-3">
            {step === 1 &&(
              <>
            <div className="col-md-6">
              <label htmlFor="cardCode" className="form-label">
                Customer ID
              </label>
              <input
                type="text"
                id="cardCode"
                className="form-control"
                value={CardCode}
                disabled
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="cardName" className="form-label">
                Card Name
              </label>
              <input
                type="text"
                id="cardName"
                className="form-control"
                value={CardName}
                disabled
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="groupName" className="form-label">
                Group Name
              </label>
              <input
                type="text"
                id="groupName"
                className="form-control"
                value={GroupName}
                disabled
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="cellular" className="form-label">
                Mobile
              </label>
              <input
                type="text"
                id="cellular"
                className="form-control"
                value={Cellular}
                disabled
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                id="email"
                className="form-control"
                value={E_Mail}
                disabled
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">
                Sales Employee
              </label>
              <input
                type="text"
                id="email"
                className="form-control"
                value={SlpName}
                disabled
              />
            </div>
            <button
              type="button"
              className="btn btn-primary mt-3"
              onClick={incrementStep}
            >
              Next
            </button>
              </>
            )}

            {step ===2 && (
              <>
            <div className="col-md-6">
              <label htmlFor="adresType" className="form-label">
              Address
              </label>
              <input
                type="text"
                id="adresType"
                className="form-control"
                value={Address}
                disabled
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="adresType" className="form-label">
                Address Type
              </label>
              <input
                type="text"
                id="adresType"
                className="form-control"
                value={AdresType}
                disabled
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="adresType" className="form-label">
                Address Type
              </label>
              <input
                type="text"
                id="adresType"
                className="form-control"
                value={AdresType}
                disabled
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="address2" className="form-label">
                Address 1
              </label>
              <input
                type="text"
                id="address2"
                className="form-control"
                value={Address2}
                disabled
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="address3" className="form-label">
                Address 2
              </label>
              <input
                type="text"
                id="address3"
                className="form-control"
                value={Address3}
                disabled
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="block" className="form-label">
                Block
              </label>
              <input
                type="text"
                id="block"
                className="form-control"
                value={Block}
                disabled
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                type="text"
                id="city"
                className="form-control"
                value={City}
                disabled
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="zipCode" className="form-label">
                ZIP
              </label>
              <input
                type="text"
                id="zipCode"
                className="form-control"
                value={ZipCode}
                disabled
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="stateName" className="form-label">
                State
              </label>
              <input
                type="text"
                id="stateName"
                className="form-control"
                value={StateName}
                disabled
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="county" className="form-label">
                County
              </label>
              <input
                type="text"
                id="county"
                className="form-control"
                value={County}
                disabled
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="building" className="form-label">
                Building
              </label>
              <input
                type="text"
                id="building"
                className="form-control"
                value={Building}
                disabled
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="countryCode" className="form-label">
                Country Code
              </label>
              <input
                type="text"
                id="countryCode"
                className="form-control"
                value={CountryCode}
                disabled
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="stateCode" className="form-label">
                State Code
              </label>
              <input
                type="text"
                id="stateCode"
                className="form-control"
                value={StateCode}
                disabled
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="street" className="form-label">
                Street
              </label>
              <input
                type="text"
                id="street"
                className="form-control"
                value={Street}
                disabled
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="streetNo" className="form-label">
                Street No
              </label>
              <input
                type="text"
                id="streetNo"
                className="form-control"
                value={StreetNo}
                disabled
              />
            </div>
            <button
              type="button"
              className="btn btn-secondary mt-3"
              onClick={decrementStep}
            >
              Previous
            </button>
            <Button variant="success" onClick={handleSubmit} className="mt-3">
             {!createLoading ? "Approve" : "Approving Customer..."}
          </Button>
              </>
            )}

          </div>
        </form>
      </Card.Body>
    </Card>
  );
};

export default SingleUnApprovedCustomer;

import React from "react";

const ShowAddress = ({
  Addresses,
  handelreject,
  incrementStep,
  decrementStep,
  index,
}) => {
  const {
    address,
    adresType,
    address2,
    address3,
    street,
    block,
    city,
    zipCode,
    stateCode,
    stateName,
    countryCode,
    county,
    streetNo,
    building,
  } = Addresses || [];

  return (
    <>
      <hr />
      <h4 className="text text-primary text-center my-1">
        {adresType === "B"
          ? `Billing  Address ${index + 1}`
          : `Shipping  Address ${index + 1}`}
      </h4>

      <div className="row">
        <div className="col-md-6">
          <label htmlFor="adresType" className="form-label">
            Address ID
          </label>
          <input
            type="text"
            id="adresType"
            className="form-control"
            value={address}
            disabled
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <label htmlFor="block" className="form-label">
            Street / PO Box
          </label>
          <input
            type="text"
            id="block"
            className="form-control"
            value={street}
            disabled
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="city" className="form-label">
            Block
          </label>
          <input
            type="text"
            id="city"
            className="form-control"
            value={block}
            disabled
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <label htmlFor="zipCode" className="form-label">
            City
          </label>
          <input
            type="text"
            id="zipCode"
            className="form-control"
            value={city}
            disabled
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="stateName" className="form-label">
            County
          </label>
          <input
            type="text"
            id="stateName"
            className="form-control"
            value={county}
            disabled
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <label htmlFor="county" className="form-label">
            ZIP Code
          </label>
          <input
            type="text"
            id="county"
            className="form-control"
            value={zipCode}
            disabled
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="building" className="form-label">
            Country / Region
          </label>
          <input
            type="text"
            id="building"
            className="form-control"
            value={countryCode}
            disabled
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="countryCode" className="form-label">
            State
          </label>
          <input
            type="text"
            id="countryCode"
            className="form-control"
            value={stateCode}
            disabled
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <label htmlFor="stateCode" className="form-label">
            Street Number
          </label>
          <input
            type="text"
            id="stateCode"
            className="form-control"
            value={streetNo}
            disabled
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="street" className="form-label">
            Building
          </label>
          <input
            type="text"
            id="street"
            className="form-control"
            value={building}
            disabled
          />
        </div>
      </div>
    </>
  );
};

export default ShowAddress;

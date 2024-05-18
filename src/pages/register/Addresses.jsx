import React from 'react';
import Select from 'react-select';

const Addresses = ({ setInputValue, inputdata, index, }) => {
  
  return (
    <div className="address-form">
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor={`address1-${index}`}>Address Line 1</label>
            <input
              type="text"
              className="form-control"
              id={`address1-${index}`}
              name="address1"
              onChange={setInputValue}
              value={inputdata.address1}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor={`address2-${index}`}>Address Line 2</label>
            <input
              type="text"
              className="form-control"
              id={`address2-${index}`}
              name="address2"
              onChange={setInputValue}
              value={inputdata.address2}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor={`block-${index}`}>Block</label>
            <input
              type="text"
              className="form-control"
              id={`block-${index}`}
              name="block"
              onChange={setInputValue}
              value={inputdata.block}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor={`city-${index}`}>City</label>
            <input
              type="text"
              className="form-control"
              id={`city-${index}`}
              name="city"
              onChange={setInputValue}
              value={inputdata.city}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor={`zip-${index}`}>ZIP Code</label>
            <input
              type="number"
              className="form-control"
              id={`zip-${index}`}
              name="zip"
              onChange={setInputValue}
              value={inputdata.zip}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor={`state-${index}`}>State</label>
            <input
              type="text"
              className="form-control"
              id={`state-${index}`}
              name="state"
              onChange={setInputValue}
              value={inputdata.state}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor={`country-${index}`}>Country</label>
            <input
              type="text"
              className="form-control"
              id={`country-${index}`}
              name="country"
              onChange={setInputValue}
              value={inputdata.country}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor={`building-${index}`}>Building</label>
            <input
              type="text"
              className="form-control"
              id={`building-${index}`}
              name="building"
              onChange={setInputValue}
              value={inputdata.building}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor={`countryCode-${index}`}>Country Code</label>
            <input
              type="text"
              className="form-control"
              id={`countryCode-${index}`}
              name="countryCode"
              onChange={setInputValue}
              value={inputdata.countryCode}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor={`stateCode-${index}`}>State Code</label>
            <input
              type="text"
              className="form-control"
              id={`stateCode-${index}`}
              name="stateCode"
              onChange={setInputValue}
              value={inputdata.stateCode}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor={`street-${index}`}>Street</label>
            <input
              type="text"
              className="form-control"
              id={`street-${index}`}
              name="street"
              onChange={setInputValue}
              value={inputdata.street}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor={`streetNo-${index}`}>Street Number</label>
            <input
              type="text"
              className="form-control"
              id={`streetNo-${index}`}
              name="streetNo"
              onChange={setInputValue}
              value={inputdata.streetNo}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addresses;

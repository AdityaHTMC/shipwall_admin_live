import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import Man from "../../Man.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  LoginContext,
  addData,
} from "../../Components/ContextProvider/Context";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contextApi/AppContext";
import { Card, ProgressBar } from "react-bootstrap";
import Addresses from "./Addresses";

const RegisterUser = () => {
  const { useradd, setUseradd } = useContext(addData);
  const navigate = useNavigate();
  const { BPPost, createLoading, bpGroupList } = useAppContext();
  const [selectedAddress, setSelectedAddress] = useState([]);
  const [addresses, setAddresses] = useState([{}]);
  const [groupCodeOptions, setGroupCodeOptions] = useState([]);
  const [step, setStep] = useState(1);
  const [inputdata, setInputData] = useState({
    CardName: "",
    GroupCode: "",
    mobile: "",
    email: "",
    address1: "",
    address2: "",
    block: "",
    city: "",
    zip: "",
    state: "",
    cuntry: "",
    building: "",
    CountryCode: "",
    StateCode: "",
    Street: "",
    StreetNo: "",
  });

  const [preview, setPreview] = useState("");

  const incrementStep = () => {
    setStep(step + 1);
  };

  const decrementStep = () => {
    setStep(step - 1);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const submitUserData = async (e) => {
    e.preventDefault();

    if (step === 1) {
      const { CardName, GroupCode, mobile, email } = inputdata;
      if (!CardName || !GroupCode || !mobile || !email) {
        toast.error("All fields are required in Step 1");
        return;
      }

      if (!isValidEmail(email)) {
        toast.error("Invalid email address");
        return;
      }

      incrementStep();
    } else if (step === 2) {
      const { CardName, GroupCode, mobile, email } = inputdata;

      const newAddresses = addresses.map((address, index) => ({
        Address: address.address1,
        Address2: address.address2,
        AdresType: selectedAddress[index]?.value === "Sgh" ? "S" : "B",
        Block: address.block,
        Building: address.building,
        City: address.city,
        CountryCode: address.CountryCode,
        County: address.cuntry,
        StateCode: address.StateCode,
        StateName: address.state,
        Street: address.Street,
        StreetNo: address.StreetNo,
        ZipCode: address.zip,
        lbFound: false,
      }));
      const billToDef = selectedAddress.find((item) => item.value === "BILL")
        ? "BILL"
        : "";
      const shipToDef = selectedAddress.find((item) => item.value === "Sgh");

      try {
        await BPPost(
          CardName,
          GroupCode,
          mobile,
          email,
          newAddresses,
          selectedAddress,
          billToDef,
          shipToDef
        );
      } catch (error) {}
    }
  };

  useEffect(() => {
    setGroupCodeOptions(
      bpGroupList.map((item) => ({
        value: item.GroupCode,
        label: item.GroupName,
      }))
    );
  }, [bpGroupList]);

  const setInputValue = (e, index) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value });

    const updatedAddresses = [...addresses];
    updatedAddresses[index] = {
      ...updatedAddresses[index],
      [name]: value,
    };

    setAddresses(updatedAddresses);
  };

  const handleProgressBarClick = (clickedStep) => {
    if (clickedStep >= 1 && clickedStep <= 2) {
      setStep(clickedStep);
    }
  };

  const multipulAddress = () => {
    const lastAddress = addresses[addresses.length - 1];
    // if (lastAddress && Object.keys(lastAddress).length !== 0) {
      setAddresses([...addresses, {}]);
    // } else {
    //   toast.error(
    //     "Please fill in the current address before adding a new one."
    //   );
    // }
  };

  const removeAddress = (index) => {
    const updatedAddresses = [...addresses];
    updatedAddresses.splice(index, 1);
    setAddresses(updatedAddresses);
  };

  console.log("address", addresses);

  console.log(selectedAddress);

  return (
    <>
      <div className="container mt-1">
        <h4 className="text-center mb-2">Registration Form</h4>
        <ProgressBar
          now={(step / 2) * 100}
          animated
          variant="info"
          label={`${step}`}
          onClick={(e) => {
            const clickedStep = Math.ceil(
              (e.nativeEvent.offsetX / e.target.offsetWidth) * 2
            );
            handleProgressBarClick(clickedStep);
          }}
        />

        <div className="text-center my-2">
          <img
            src={preview ? preview : Man}
            style={{ height: "86px", borderRadius: "50px", width: "86px" }}
            alt="Img"
          />
        </div>

        {step === 1 && (
          <form className="row">
            {/* Step 1 Fields */}
            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Customer Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                name="CardName"
                onChange={setInputValue}
                value={inputdata.CardName}
              />
            </div>

            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Group Name
              </label>
              <Select
                options={groupCodeOptions}
                value={groupCodeOptions.find(
                  (option) => option.value === inputdata.GroupCode
                )}
                onChange={(selectedOption) =>
                  setInputData({
                    ...inputdata,
                    GroupCode: selectedOption.value,
                  })
                }
              />
            </div>

            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Mobile
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleInputPassword1"
                name="mobile"
                onChange={setInputValue}
                value={inputdata.mobile}
              />
            </div>

            <div className="mb-4 col-md-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                onChange={setInputValue}
                value={inputdata.email}
              />
            </div>

            <button
              type="button"
              className="btn btn-primary mt-3"
              onClick={incrementStep}
            >
              Next
            </button>
          </form>
        )}

        {step === 2 && (
          <form className="row">
            <div className="row">
              {addresses.map((address, index) => (
                <div key={index} className="col-12 mb-3">
                  <Card>
                    <Card.Body>
                      <button
                        type="button"
                        className="close btn btn-outline-danger mb-5 mx-2 float-end"
                        aria-label="Close"
                        onClick={() => removeAddress(index)}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                      <div className="form-group col-6 mx-auto">
                        <label htmlFor={`selectedAddress-${index}`}>
                          Select Address
                        </label>
                        <Select
                          id={`selectedAddress-${index}`}
                          options={[
                            { value: "BILL", label: "Billing Address" },
                            { value: "Sgh", label: "Shipping Address" },
                          ]}
                          value={selectedAddress[index] || null}
                          onChange={(selectedOption) => {
                            const updatedAddresses = [...selectedAddress];
                            updatedAddresses[index] = selectedOption;
                            setSelectedAddress(updatedAddresses);
                          }}
                        />
                      </div>
                      <Addresses
                        setInputValue={(e) => setInputValue(e, index)}
                        inputdata={address}
                        index={index}
                      />
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
        <button
          type="button"
          className="btn btn-success mt-3"
          onClick={multipulAddress}
        >
          Add Multiplue address
        </button>
            <button
              type="button"
              className="btn btn-secondary mt-3"
              onClick={decrementStep}
            >
              Previous
            </button>
            <button className="btn btn-primary mt-3" onClick={submitUserData}>
              {!createLoading ? "Submit" : "Creating..."}
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default RegisterUser;

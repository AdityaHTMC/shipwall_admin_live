import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import Man from "../../Man.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  LoginContext,
  addData,
} from "../../Components/ContextProvider/Context";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../contextApi/AppContext";
import { ProgressBar } from "react-bootstrap";

const BPUpdate = () => {
  const { BpUpdate, createLoading, bpGroupList, getBP, singleBPdata } =
    useAppContext();
  const [selectedAddress, setSelectedAddress] = useState(singleBPdata[0]?.Addresses[0]?.Address || "");
  const { id } = useParams();
  const [groupCodeOptions, setGroupCodeOptions] = useState([]);
  const [selecedGroup , setSelecedGroup] = useState(null)
  const [step, setStep] = useState(1);
  const [inputdata, setInputData] = useState({
    CardCode: singleBPdata[0]?.CardCode || "",
        CardName: singleBPdata[0]?.CardName || "",
        mobile: singleBPdata[0]?.Cellular || "",
        email: singleBPdata[0]?.E_Mail || "",
        address1: singleBPdata[0]?.Addresses[0]?.Address2 || "",
        address2: singleBPdata[0]?.Addresses[0]?.Address3 || "",
        block: singleBPdata[0]?.Addresses[0]?.Block || "",
        city: singleBPdata[0]?.Addresses[0]?.City || "",
        zip: singleBPdata[0]?.Addresses[0]?.ZipCode || "",
        state: singleBPdata[0]?.Addresses[0]?.StateName || "",
        cuntry: singleBPdata[0]?.Addresses[0]?.County || "",
        building: singleBPdata[0]?.Addresses[0]?.Building || "",
        CountryCode: singleBPdata[0]?.Addresses[0]?.CountryCode || "",
        StateCode: singleBPdata[0]?.Addresses[0]?.StateCode || "",
        Street: singleBPdata[0]?.Addresses[0]?.Street || "",
        StreetNo: singleBPdata[0]?.Addresses[0]?.StreetNo || "",
  });

  useEffect(() => {
    if (bpGroupList) {
      setGroupCodeOptions(
        bpGroupList.map((item) => ({
          value: item.GroupCode,
          label: item.GroupName,
        }))
      );
    }

    const fetchData = async () => {
      try {
        await getBP(id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      if (singleBPdata && singleBPdata[0]) {
        await setInputData({
          CardCode: singleBPdata[0]?.CardCode || "",
          CardName: singleBPdata[0]?.CardName || "",
          mobile: singleBPdata[0]?.Cellular || "",
          email: singleBPdata[0]?.E_Mail || "",
          address1: singleBPdata[0]?.Addresses[0]?.Address2 || "",
          address2: singleBPdata[0]?.Addresses[0]?.Address3 || "",
          block: singleBPdata[0]?.Addresses[0]?.Block || "",
          city: singleBPdata[0]?.Addresses[0]?.City || "",
          zip: singleBPdata[0]?.Addresses[0]?.ZipCode || "",
          state: singleBPdata[0]?.Addresses[0]?.StateName || "",
          cuntry: singleBPdata[0]?.Addresses[0]?.County || "",
          building: singleBPdata[0]?.Addresses[0]?.Building || "",
          CountryCode: singleBPdata[0]?.Addresses[0]?.CountryCode || "",
          StateCode: singleBPdata[0]?.Addresses[0]?.StateCode || "",
          Street: singleBPdata[0]?.Addresses[0]?.Street || "",
          StreetNo: singleBPdata[0]?.Addresses[0]?.StreetNo || "",
        });
      }
    };

    fetchData();
  }, [bpGroupList, getBP, id, singleBPdata]);

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

  const submitUserData = (e) => {
    e.preventDefault();

    if (step === 1) {
      const { CardCode, CardName, GroupCode, mobile, email } = inputdata;

      if (!CardCode || !CardName || !groupCodeOptions || !mobile || !email) {
        toast.error("All fields are required in Step 1");
        if (!isValidEmail(email)) {
          toast.error("Invalid email address");
          return;
        }
        return;
      }
      
      else{

        incrementStep();
      }

    } else if (step === 2) {
      const {
        CardCode,
        CardName,
        GroupCode,
        mobile,
        email,
        address1,
        address2,
        block,
        city,
        zip,
        state,
        cuntry,
        building,
        CountryCode,
        StateCode,
        Street,
        StreetNo,
      } = inputdata;

      if (
        !address1 ||
        !address2 ||
        !block ||
        !city ||
        !zip ||
        !state ||
        !cuntry ||
        !selectedAddress
      ) {
        toast.error("All fields are required in Step 2");
        return;
      }else{

        BpUpdate(
          CardCode,
          CardName,
          GroupCode,
          mobile,
          email,
          address1,
          address2,
          block,
          city,
          zip,
          state,
          cuntry,
          building,
          CountryCode,
          StateCode,
          Street,
          StreetNo,
          selectedAddress
        );
      }

    }
  };

  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value });
  };

  const handleProgressBarClick = (clickedStep) => {
    if (clickedStep >= 1 && clickedStep <= 2) {
      setStep(clickedStep);
    }
  };

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
                Card Code
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                name="CardCode"
                onChange={setInputValue}
                value={inputdata.CardCode}
              />
            </div>

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
                options={ groupCodeOptions}
                value= { !selecedGroup ? groupCodeOptions.find(
                  (option) => option.value === inputdata.GroupCode
                ) : selecedGroup}
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
            <div className="mb-3 col-md-4">
              <label htmlFor="selectedAddress" className="form-label">
                Select Address
              </label>
              <Select
                options={[
                  { value: "BILL", label: "Billing Address" },
                  { value: "Sgh", label: "Shipping Address" },
                ]}
                value={selectedAddress}
                onChange={(selectedOption) =>
                  setSelectedAddress(selectedOption)
                }
              />
            </div>

            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Address Line 1
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                name="address1"
                onChange={setInputValue}
                value={inputdata.address1}
              />
            </div>

            <div className="mb-4 col-md-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Address Line 2
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="address2"
                onChange={setInputValue}
                value={inputdata.address2}
              />
            </div>

            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Block
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                name="block"
                onChange={setInputValue}
                value={inputdata.block}
              />
            </div>

            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputPassword1" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                name="city"
                onChange={setInputValue}
                value={inputdata.city}
              />
            </div>

            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputPassword1" className="form-label">
                ZIP Code
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleInputPassword1"
                name="zip"
                onChange={setInputValue}
                value={inputdata.zip}
              />
            </div>

            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputPassword1" className="form-label">
                State
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Western Australia"
                name="state"
                onChange={setInputValue}
                value={inputdata.state}
              />
            </div>

            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Country
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Australia"
                id="exampleInputPassword1"
                name="cuntry"
                onChange={setInputValue}
                value={inputdata.cuntry}
              />
            </div>

            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Building
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                name="building"
                onChange={setInputValue}
                value={inputdata.building}
              />
            </div>

            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputPassword1" className="form-label">
                CountryCode
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="AU"
                id="exampleInputPassword1"
                name="CountryCode"
                onChange={setInputValue}
                value={inputdata.CountryCode}
              />
            </div>

            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputPassword1" className="form-label">
                StateCode
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="WA"
                id="exampleInputPassword1"
                name="StateCode"
                onChange={setInputValue}
                value={inputdata.StateCode}
              />
            </div>

            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Street
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                name="Street"
                onChange={setInputValue}
                value={inputdata.Street}
              />
            </div>

            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Street Number
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                name="StreetNo"
                onChange={setInputValue}
                value={inputdata.StreetNo}
              />
            </div>

            <button
              type="button"
              className="btn btn-secondary mt-3"
              onClick={decrementStep}
            >
              Previous
            </button>
            <button
              type="submit"
              className="btn btn-primary mt-3"
              onClick={submitUserData}
            >
              {!createLoading ? "Submit" : "Creating..."}
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default BPUpdate;

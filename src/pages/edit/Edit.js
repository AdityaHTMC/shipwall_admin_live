import { Radio } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import Man from '../../Man.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { LoginContext } from '../../Components/ContextProvider/Context';

const Edit = () => {
  const navigate = useNavigate();
  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },
  ];
  let token = localStorage.getItem("usersdatatoken");
  const { loginData, setLoginData } = useContext(LoginContext);
  
  // const dashValid = async () => {
  //   await axios.get("/api/v1/valid-seller", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": token
  //     }
  //   })
  //     .then((res) => {
  //       console.log(res.data);
  //       setLoginData(res.data.user);

  //     })
  //     .catch(err => {
  //       console.log(err)
  //       navigate("*")
  //     })
  // }
  const [inputdata, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
    mobile: "",
    gender: "",
    location: "",
    address: "",
    accountNo: "",
    IFSC_code: "",
    bankName: "",
    branchName: "",
    branchCode: "",
  });
  // console.log(inputdata)
  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState("");
  const [imageData, setImageData] = useState("");
  const [preview, setPreview] = useState("");
  const [billingadd , setBillingadd] = useState("") 
  const [shippingadd , setshippingadd] = useState("") 


  // setInput Value
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value })
  };

  // status getting here
  const setStatusValue = (e) => {
    setStatus(e.value);

  };

  // image getting here
  const setProfile = (e) => {
    setImage(e.target.files[0]);
  };

  // Submit User data
  const submitUserData = (e) => {
    e.preventDefault();
    const { fname,
      lname,
      email,
      mobile,
      gender,
      location,
      password,
      cpassword,
      address,
      accountNo,
      bankName,
      branchCode,
      branchName,
      IFSC_code, } = inputdata


    if (fname === "") {
      toast.error("First name is Required !")
    } else if (lname === "") {
      toast.error("Last name is Required !")
    } else if (email === "") {
      toast.error("Email is Required !")
    } else if (!email.includes("@")) {
      toast.error("Enter Valid Email !")
    } else if (mobile === "") {
      toast.error("Mobile is Required !")
    } else if (mobile.length > 10) {
      toast.error("Enter Valid Mobile!f")
    } else if (gender === "") {
      toast.error("Gender is Required !")
    } else if (status === "") {
      toast.error("Status is Required !")
    } else if (!image && imageData === "") {
      toast.error("Prfile photo is Required !")
    } else if (location === "") {
      toast.error("location is Required !")
    } else {
      // toast.success("Registeration successfully Done!")
      const data = new FormData();
      data.append("fname", fname);
      data.append("lname", lname);
      data.append("email", email);
      data.append("password", password);
      data.append("cpassword", cpassword);
      data.append("mobile", mobile);
      data.append("gender", gender);
      data.append("status", status);
      data.append("location", location);
      data.append("address", address);
      data.append("accountNo", accountNo);
      data.append("bankName", bankName);
      data.append("branchCode", branchCode);
      data.append("branchName", branchName);
      data.append("IFSC_code", IFSC_code);
      data.append("user_profile", image || imageData);

      axios.post(`/user/edit/${id}`, data)
        .then((res) => {
          console.log(res);
          alert("Successfully Data Updated!")
          navigate("/home-page")
        })
        .catch((err) => {
          console.log(err);
        })
    }
  };

  // getting user data for update
  const { id } = useParams();
  const getUserData = async () => {
    try {
      const resp = await axios.get(`/user/${id}`);
      console.log(resp);
      setInputData(resp.data)
      setStatus(resp.data.status);
      setImageData(resp.data.profile);
      setPreview(resp.data.profile)
      setBillingadd(resp.data.Billing_address)

    } catch (error) {
      console.log(error);
    }
  }




  useEffect(() => {
    // dashValid()
    if (image) {
      setPreview(URL.createObjectURL(image))
    }
    getUserData();
  }, [image])
  return (
    <>
      <div className='container mt-1'>
        <h4 className='text-center mb-5'>Update Your Details</h4>
        <form className="row">
          <div className='text-center'>
            <img src={preview ? preview : imageData} style={{ height: "86px", borderRadius: "50px", width: "86px" }} alt="Img" />
          </div>

          <div className="mb-3 col-md-4">
            <label htmlFor="exampleInputPassword1" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              name='fname'
              onChange={setInputValue}
              value={inputdata.fname}
            />
          </div>
          <div className="mb-3 col-md-4">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              name='lname'
              value={inputdata.lname}
              onChange={setInputValue}
            />
          </div>


          <div className="mb-4 col-md-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name='email'
              onChange={setInputValue}
              value={inputdata.email}
            />

          </div>

          <div className="mb-3 col-md-4">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Mobile
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              name='mobile'
              value={inputdata.mobile}
              onChange={setInputValue}
            />
          </div>

          <div className='col-md-4'>
            Select your gender
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="maleRadio"
                value="Male"
                checked={inputdata.gender === "Male" ? true : false}
                onChange={setInputValue}

              />
              <label className="form-check-label" htmlFor="maleRadio">
                Male
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="femaleRadio"
                value="female"
                checked={inputdata.gender === "female" ? true : false}
                onChange={setInputValue}
              />
              <label className="form-check-label" htmlFor="femaleRadio">
                Female
              </label>
            </div>
          </div>

          <div className='col-md-4'>
            Select status
            <Select
              defaultValue={status}
              onChange={setStatusValue}
              options={options}
            />
          </div>

          <div className="mb-3 col-md-4 mt-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Select your profile
            </label>
            <input
              type="file"
              className="form-control"
              id="exampleInputPassword1"
              onChange={setProfile}
            />
          </div>

          <div className="mb-3 col-md-4">
            <label htmlFor="billingAddress" className="form-label">
              Billing Address
            </label>
            <input
              type="text"
              className="form-control"
              id="billingAddress"
              name="location"
              onChange={setInputValue}
              value={inputdata.location}
            />
          </div>

          <div className="mb-3 col-md-4">
            <label htmlFor="shippingAddress" className="form-label">
              Shipping Address
            </label>
            <input
              type="text"
              className="form-control"
              id="shippingAddress"
              name="address"
              onChange={setInputValue}
              value={inputdata.address}
            />
          </div>

          <div className="mb-3 col-md-4">
            <label htmlFor="accountno" className="form-label">
              Bank Account No
            </label>
            <input
              type="text"
              className="form-control"
              id="accountno"
              name="accountNo"
              onChange={setInputValue}
              value={inputdata.accountNo}
            />
          </div>

          <div className="mb-3 col-md-4">
            <label htmlFor="bankName" className="form-label">
              Bank Name
            </label>
            <input
              type="text"
              className="form-control"
              id="bankName"
              name="bankName"
              onChange={setInputValue}
              value={inputdata.bankName}
            />
          </div>

          <div className="mb-3 col-md-4">
            <label htmlFor="ifscCode" className="form-label">
              IFSC Code
            </label>
            <input
              type="text"
              className="form-control"
              id="ifscCode"
              name="IFSC_code"
              onChange={setInputValue}
              value={inputdata.IFSC_code}
            />
          </div>

          <div className="mb-3 col-md-4">
            <label htmlFor="bankAddress" className="form-label">
              Branch name
            </label>
            <input
              type="text"
              className="form-control"
              id="bankAddress"
              name="branchName"
              onChange={setInputValue}
              value={inputdata.branchName}
            />
          </div>

          <div className="mb-3 col-md-4">
            <label htmlFor="bankCode" className="form-label">
              Branch Code
            </label>
            <input
              type="text"
              className="form-control"
              id="bankCode"
              name="branchCode"
              onChange={setInputValue}
              value={inputdata.branchCode}
            />
          </div>         

          <button type="submit" className="btn btn-primary mt-3" onClick={submitUserData}>
            Submit
          </button>
        </form>
      </div>

      <ToastContainer position='top-center' />



    </>
  )
}

export default Edit

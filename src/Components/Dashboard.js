import React, { useContext, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context';

const Dashboard = () => {
  const navigate = useNavigate();
  const loginData = JSON.parse(localStorage.getItem("log2"))
  const userdata = loginData?.data || {}

  // const { loginData, setLoginData } = useContext(LoginContext);
  let token = localStorage.getItem("usersdatatoken");


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

  // useEffect(() => {
  //   dashValid()
  // }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h3 className='mb-3'>Admin Details</h3>
      <h5>Email:{loginData ? userdata.email : ""}</h5>
      <h5>Name:{loginData ? userdata.name :""}</h5>
    </div>
  )
}

export default Dashboard

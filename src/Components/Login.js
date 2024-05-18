import React, { useContext, useState } from 'react'

import './login.css'

import logo from "../assets/img/logo.png"
import iconMail from "../assets/img/icons/mail.svg"
import liginImg from "../assets/img/login.jpg"



import { NavLink, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useAppContext } from '../contextApi/AppContext'
// import { LoginContext } from './ContextProvider/Context'

const Login = () => {
    // const { loginData, setLoginData } = useContext(LoginContext);
    // console.log(loginData)
    const [passShow, setPassShow] = useState(false);
    const {LoginUser, logindiable} = useAppContext()

    const [inpvl, setInpvl] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setInpvl({
            ...inpvl,
            [name]: value
        })
    };

 const handelLogin = ()=>{
    const  {email , password} = inpvl;
     LoginUser(email,password)
    }

    // const userLogin = async (e) => {
    //     e.preventDefault();
    //     const { email, password } = inpvl;

    //     if (email === '') {
    //         alert("Please enter email");
    //     } else if (!email.includes("@")) {
    //         alert("Please enter a valid email");
    //     } else if (password === '') {
    //         alert("Please enter Password");
    //     } else if (password.length < 6) {
    //         alert("Password must be greater than 6 char!");
    //     } else {
    //         try {
    //             const resp = await axios.post("/api/v1/login-seller", inpvl);
    //             console.log(resp);
    //             if (resp.status === 201) {
    //                 alert(resp.data.message);
    //                 localStorage.setItem("usersdatatoken", resp.data.result.token)
    //                 setInpvl({ ...inpvl, fname: "", email: "", password: "", cpassword: "" });
    //                 navigate("/home-page")
    //             } else {
    //                 alert(resp.response.data.message)
    //             }
    //         } catch (error) {
    //             console.log(error);

    //         }
    //     }
    // }
    return (
        <div className='loginBx'>


{/* new login part work start here */}
<div class="account-content">
<div class="login-wrapper">
    <div class="login-content">
        <div class="login-userset">
            <div class="login-logo">
                <img src={logo} alt="img"></img>
            </div>
            <div class="login-userheading">
                <h3>Welcome Back, Log In</h3>
                <h4>Hi, we are you glad you are back. Please login.</h4>
            </div>
            <div class="form-login">
                <label htmlFor="email">Email</label>
                <div class="form-addons">                
                    <input type="email" name="email" onChange={handleChange} value={inpvl.email} id="email" placeholder='Enter Your User Name' />
                    <img src={iconMail} alt="img" ></img>
                </div>
            </div>
            <div class="form-login">
                <label htmlFor="password">Password</label>
                <div class="pass-group">
                    <input className='pass-input' type={!passShow ? "password" : "text"} name="password" onChange={handleChange} value={inpvl.password} id="password" placeholder='Enter Your password' />
                    <span class="fas toggle-password fa-eye-slash"></span>
                    <div className="showpass" onClick={() => setPassShow(!passShow)}>{!passShow ?  <span class="fas toggle-password fa-eye-slash"></span> : <span class="far toggle-password fa-eye"></span>}</div>
                </div>
            </div>
            {/* <div class="form-login">
                <div class="alreadyuser">
                    <h4><a href="#." class="hover-a">Forgot Password?</a></h4>
                </div>
            </div> */}
            <div class="form-login">
                <button className={`btn btn-primary width100 ${logindiable ? 'disabled' : ''}`} onClick={handelLogin}>Login</button>
            </div>
            {/* <p>Don't have an Account? <NavLink to="/register">Sign Up</NavLink></p> */}
        </div>
    </div>
    <div class="login-img">
        <img src={liginImg} alt="img" ></img>
    </div>
</div>
</div>
{/* new login part work end here */}

        </div>
    )
}

export default Login
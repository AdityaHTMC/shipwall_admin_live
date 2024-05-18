import React, { useState } from 'react'
import './mix.css'
import { NavLink, useNavigate } from "react-router-dom"
import axios from 'axios'

const Register = () => {
    const [passShow, setPassShow] = useState(false);
    const [cpassShow, setCPassShow] = useState(false);

    const [inpvl, setInpvl] = useState({
        fname: "",
        email: "",
        password: "",
        cpassword: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setInpvl({
            ...inpvl,
            [name]: value
        })
    };

    const addUserDetail = async (e) => {
        e.preventDefault();
        const { fname, email, password, cpassword } = inpvl;

        if (fname === '') {
            alert("Please enter fname");
        } else if (email === '') {
            alert("Please enter email");
        } else if (!email.includes("@")) {
            alert("Please enter a valid email");
        } else if (password == "") {
            alert("Please enter Password");
        } else if (password.length < 6) {
            alert("Password must be greater than 6 char!");
        } else if (cpassword === '') {
            alert("Please enter cpassword");
        } else if (cpassword !== password) {
            alert("Password and Conform password are not same");
        } else {
            try {
                const resp = await axios.post("/register-user", inpvl);
                console.log(resp);
                // alert("Data Posted");
                if(resp.data.status === 201){
                    alert(resp.data.message);
                    setInpvl({...inpvl, fname:"", email:"", password:"", cpassword:""});
                }else{
                    alert(resp.response.data.message)
                }
            } catch (error) {
                console.log(error);
                
            }
        }

    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Sign Up</h1>
                        <p style={{ textAlign: "center" }}>We are glad that you will be using Project Cloud to manage <br />
                            your tasks! We hope that you will get like it.</p>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="fname">Name</label>
                            <input type="text" name="fname" onChange={handleChange} value={inpvl.fname} id="fname" placeholder='Enter Your Name' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" onChange={handleChange} value={inpvl.email} placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"} name="password" onChange={handleChange} value={inpvl.password} id="password" placeholder='Enter Your password' />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <div className="form_input">
                            <label htmlFor="password">Confirm Password</label>
                            <div className="two">
                                <input type={!cpassShow ? "password" : "text"} name="cpassword" onChange={handleChange} value={inpvl.cpassword} id="cpassword" placeholder='Confirm password' />
                                <div className="showpass" onClick={() => setCPassShow(!cpassShow)}>
                                    {!cpassShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className='butn' onClick={addUserDetail}>Sign Up</button>
                        <p>Already have an account? <NavLink to="/">Log In</NavLink></p>
                    </form>
                    {/* <ToastContainer /> */}
                </div>
            </section>
        </>
    )
}

export default Register

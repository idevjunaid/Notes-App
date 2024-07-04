import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate, Navigate } from 'react-router-dom';

function Login() {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [logedin, setLogedin] = useState(localStorage.getItem("token") ? true : false);

  const onSubmit = async (evt) => {
    evt.preventDefault();
    let form = evt.target;
    let email = form.querySelector("[name=email]");
    let password = form.querySelector("[name=password]");

    try {
      let res = await axios.post("http://localhost:3345/user/login", {
        username: email.value,
        password: password.value,
      });
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        setLogedin(true);
      }
    } catch (err) {
      if (err.response?.data) {
        let data = err.response.data;
        setEmailError("");
        setPasswordError("");
        if (data.name && data.name === "username") {
          setEmailError(data.msg);
        }
        if (data.name && data.name === "password") {
          setPasswordError(data.msg);
        }
      }
      console.log(err.response.data);
    }

  };


  if (logedin) {
    // return <Navigate replace to="/" />
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              required
              type="text"
              className="form-control"
              name="email"
              id="inputEmail3"
              onInput={() => {
                setEmailError("");
              }}
            />
            {emailError}
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              required
              name="password"
              type="password"
              className="form-control"
              id="inputPassword3"
            />
            {passwordError}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Sign in
        </button>
      </form>
      <NavLink className="btn btn-success" type="submit" to="/signup" >Create New Account</NavLink>

    </>
  );
}

function isEmail(emailAdress) {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return regex.test(emailAdress);
}
export default Login;

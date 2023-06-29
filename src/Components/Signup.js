import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirm_password } = credentials;
    const response = await fetch(`http://localhost:4000/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        confirm_password,
      }),
    });

    const json = await response.json();
    // console.log("json.status =============>", json);

    if (json.status === "Success") {
      // redirect
      //   localStorage.setItem("token", json.authToken);
      navigate("/login");
      props.showAlert(json.message, "success");
    } else {
      props.showAlert(json.message, "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h1>Register To Use BlogAc</h1>
      <div className="md-3">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="name"
              className="form-control"
              onChange={onChange}
              id="name"
              name="name"
              autoComplete="name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              autoComplete="email"
              onChange={onChange}
              id="email"
              name="email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              onChange={onChange}
              id="password"
              name="password"
              autoComplete="new-password"
              minLength={4}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              onChange={onChange}
              id="confirm_password"
              name="confirm_password"
              autoComplete="confirm-password"
              minLength={4}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

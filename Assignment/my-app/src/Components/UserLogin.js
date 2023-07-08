import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function UserLogin() {
  const [username, changeUserName] = useState("");
  const [password, changePassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = { username, password };
    console.log(obj);
    if (isValid()) {
      fetch("http://localhost:3000/User/" + username)
        .then((res) => res.json())
        .then((resp) => {
          if (Object.keys(resp).length === 0) {
            console.log("User data Not Found!");
          } else {
            if (resp.password === password) {
              navigate("/");
              sessionStorage.setItem("username", username);
            } else {
              console.log("Please enter a valid password");
            }
          }
        })
        .catch((err) => {
          console.log("Login Failed!:" + err.message);
        });
    }
  };

  const isValid = () => {
    let result = true;

    if (username === null || username === "") {
      result = false;
    }
    if (password === null || password === "") {
      result = false;
    }

    if (!result) {
      console.log("Please enter a valid username and password");
    }
    return result;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form
        className="container"
        style={{ maxWidth: "400px", width: "100%" }}
        onSubmit={handleSubmit}
      >
        <div className="card">
          <div className="card-header">
            <h1 className="h4 mb-4">Login Form</h1>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="username">
                Username <span className="errmsg">*</span>
              </label>
              <input
                id="username"
                value={username}
                onChange={(e) => changeUserName(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">
                Password <span className="errmsg">*</span>
              </label>
              <input
                id="password"
                value={password}
                onChange={(e) => changePassword(e.target.value)}
                type="password"
                className="form-control"
              />
            </div>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-between">
              <Link to="/register" className="btn btn-danger btn-md">
                New User?
              </Link>
              <button type="submit" className="btn btn-primary btn-md" style={{ marginLeft: "8px" }}>
                Login
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

  


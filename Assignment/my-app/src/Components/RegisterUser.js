import React, { useState } from "react";
import "../App.css";

import { useNavigate } from "react-router-dom";
export default function RegisterUser() {
  const [id, changeId] = useState("");
  const [name, nameChange] = useState("");
  const [password, passwordChange] = useState("");
  const [email, emailChange] = useState("");
  const [phone, phoneChange] = useState("");
  const [country, countryChange] = useState("india");
  const [Address, addressChange] = useState("");
  const [gender, genderChange] = useState("female");
  const navigate = useNavigate()
const Isvalidate = ()=>{
    let isproceed = true;
    let errmessage = 'please enter value: '
    if(id===null || id===''){
        isproceed = false;
        errmessage += 'User Name'
    }
    if(password===null || password===''){
        isproceed = false;
        errmessage += 'password'
    }
    if(name===null || name===''){
        isproceed = false;
        errmessage += 'name, '
    }
    if(email===null || email===''){
        isproceed = false;
        errmessage += 'email, '
    }
   
    if(phone===null || phone===''){
        isproceed = false;
        errmessage += 'phone '
    }
   
    if(!isproceed){
        console.log(errmessage)
    } else {
        if(/^[a-zA-z0-9]+@[a-zA-z0-9]+\.[A-Za-z]+$/.test(email)){

        } else {
            isproceed = false;
            console.log('please enter the valid email')
        }
    }
    return isproceed
}
  const HandleSubmit = (e) => {
    
    e.preventDefault();
    let obj = { id, name, password, email, phone, country, Address, gender };
    console.log(obj);
    if(Isvalidate()){
    fetch(" http://localhost:3000/User", {
        method: "POST",
        headers: {'content-type': 'application/json'},
        body:JSON.stringify(obj) 
    }).then((res)=>{
       
        navigate('/login')
    }).catch((res)=> {
        console.log('Fill the details')
    })
}
  };
  return (
    <div>
      <div className="offset-lg-3 col-lg-6">
        <form className="container" onSubmit={HandleSubmit}>
          <div className="card">
            <div className="card-header">
              <h1>User Registration</h1>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      UserName<span className="errmsg">*</span>
                    </label>
                    <input
                      value={id}
                      onChange={(e) => changeId(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Password<span className="errmsg">*</span>
                    </label>
                    <input
                      value={password}
                      onChange={(e) => passwordChange(e.target.value)}
                      type="password"
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      FullName<span className="errmsg">*</span>
                    </label>
                    <input
                      value={name}
                      onChange={(e) => nameChange(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Email<span className="errmsg">*</span>
                    </label>
                    <input
                      value={email}
                      onChange={(e) => emailChange(e.target.value)}
                      type="email"
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Phone Number<span className="errmsg">*</span>
                    </label>
                    <input
                      value={phone}
                      onChange={(e) => phoneChange(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Country<span className="errmsg">*</span>
                    </label>
                    <select
                      value={country}
                      onChange={(e) => countryChange(e.target.value)}
                      className="form-control"
                    >
                      <option value="india">India</option>
                      <option value="USA">USA</option>
                      <option value="China">China</option>
                    </select>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Address</label>
                    <textarea
                      value={Address}
                      onChange={(e) => addressChange(e.target.value)}
                      className="form-control"
                    ></textarea>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Gender</label>
                    <br></br>
                    <input
                      checked={gender === "male"}
                      onChange={(e) => genderChange(e.target.value)}
                      type="radio"
                      name="gender"
                      value="male"
                      className="app-check"
                    ></input>
                    <label>Male</label>
                    <input
                      checked={gender === "female"}
                      onChange={(e) => genderChange(e.target.value)}
                      type="radio"
                      name="gender"
                      value="female"
                      className="app-check"
                    ></input>
                    <label>Female</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer ">
                <div className="buttons" >
              <button type="submit" className="btn btn-success">
                Submit
              </button>
              <a className="btn btn-danger" href="/login">
                Back
              </a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

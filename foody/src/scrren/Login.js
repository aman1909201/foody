import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [userdata, setuserdata] = useState({ email: "", password: "" })
  let navigate = useNavigate()
  const handlesubmit = async (e) => {
    e.preventDefault(); //it is synthetic event
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: userdata.email, password: userdata.password })
    })
    const json = await response.json();
    console.log(json)

    if (!json.success) {
      alert("enter valid data")
    }
    if (json.success) {
      localStorage.setItem("useremail",userdata.email)
      localStorage.setItem("authtoken",json.authtoken)
      console.log(localStorage.getItem("authtoken"))
      navigate("/")

    }

  }

  const change = (e) => {
    setuserdata({ ...userdata, [e.target.name]: e.target.value })
  }
  return (
    <><Navbar />
      <div className='container'>
        <form onSubmit={handlesubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={userdata.email} onChange={change} />

          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={userdata.password} onChange={change} />
          </div>

          <button type="submit" className=" btn btn-success">Submit</button>
          <Link to="/Signup" className="m-3 btn btn-danger">I am new user</Link>
        </form>
      </div>
    </>
  )
}

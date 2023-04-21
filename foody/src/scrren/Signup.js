import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
export default function Signup() {
  const [userdata, setuserdata] = useState({ name: "", email: "", password: "", location: "" })
  let navigate = useNavigate()
  const handlesubmit = async (e) => {
    e.preventDefault(); //it is synthetic event
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: userdata.name, email: userdata.email, password: userdata.password, location: userdata.location })
    })
    const json = await response.json();
    console.log(json)

    if (!json.success) {
      alert("enter valid data")
    }
    if (json.success) {
      navigate("/Login")
    }
  }

  const change = (e) => {
    setuserdata({...userdata, [e.target.name]: e.target.value})
  }
  return (
    <>
      <div className='container'>
        <form onSubmit={handlesubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" name='name' value={userdata.name} onChange={change} />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">Location</label>
            <input type="text" className="form-control" name='location' value={userdata.location} onChange={change} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={userdata.email} onChange={change} />

          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={userdata.password} onChange={change} />
          </div>

          <button type="submit" className=" btn btn-success">Submit</button>
          <Link to="/Login" className="m-3 btn btn-danger">already user</Link>
        </form>
      </div>
    </>
  )
}

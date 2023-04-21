import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { Badge } from 'react-bootstrap';
import Model from '../Model';
import Cart from '../scrren/Cart';
import { useCart } from './Contextreducer';

export default function Navbar() {
  let data = useCart()
  const [cartview, setcartview] = useState(false)
  const navigate=useNavigate();
  const handlelogout=()=>{
    localStorage.removeItem("authtoken")
    navigate("/login")
  }
  
  return (
    <>

      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
          <div className="container-fluid">
            <Link className="navbar-brand fs-1" to="/">FOODY</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className='collapse navbar-collapse'>

              <ul className='navbar-nav'>

                <li className='nav-item me-auto '>

                  <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                </li>
                {(localStorage.getItem("authtoken")) ?
                  <li className='nav-item me-auto '>

                    <Link className="nav-link active fs-5" aria-current="page" to="/Myorder">Myorders</Link>
                  </li>
                  : ""}
              </ul>
            </div>
            {(!localStorage.getItem("authtoken")) ?
              <div className="d-flex">
                <Link className="btn bg-white text-success mx-1" to="/Login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/Signup">Signup</Link>
              </div>
              :
              <div>
                <div className='btn bg-white text-success mx-2' onClick={()=>{setcartview(true)}}>
                  Mycart {" "}
                  <Badge pill bg='success m'>{data.length}</Badge>
                </div>
                {cartview? <Model onClose={()=>setcartview(false)} > <Cart/></Model> :null}
                <div className='btn bg-white text-danger mx-2' onClick={handlelogout}>
                  Logout
                </div>
              </div>

            }
          </div>
        </nav>
      </div>
    </>
  )
}

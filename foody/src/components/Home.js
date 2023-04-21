import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Card from './Card'
import Footer from './Footer'



export default function Home() {
  const [search, setsearch] = useState("")
  const [foodcat, setfoodcat] = useState([])// [] using this because we have to use .map function
  const [fooditem, setfooditem] = useState([])

  const loaddata = async () => {
    let response = await fetch("http://localhost:5000/api/fooddata", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      }
    })
    response = await response.json()
    //console.log(response[0], response[1])
    setfooditem(response[0])
    setfoodcat(response[1])
  }

  useEffect(() => {
    loaddata()
  }, [])



  return (
    <>
      <div><Navbar /></div>
      <div><div id="carouselExampleIndicators" className="carousel slide " style={{ objectFit: "contain !important" }}> { /*overide on css properties it will put no matter what*/}
        <div className="carousel-indicators" id="caro">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-caption d-none d-md-block" style={{ zIndex: "10" }}>

            <div className="d-flex justify-content-center" role="search" >
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>setsearch(e.target.value)} />
              {/* <button className="btn btn-outline-success text-white " type="submit">Search</button> */}
            </div>
          </div>
          <div className="carousel-item active">
            <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />

          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900x700/?pizza" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900x700/?sandwich" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div></div>
      <div className='container'>
        {
          foodcat !== [] ? foodcat.map((data) => {
            return (
              <div className='row mb-3'>
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}</div>
                <hr />
                {fooditem !== [] ? fooditem.filter((item) =>
                  (item.CategoryName === data.CategoryName)&& item.name.toLowerCase().includes(search.toLocaleLowerCase()))
                  .map(filteritems => {
                    return (
                      <div key={filteritems._id} className='col-10 col-md-5 col-lg-3 mx-3'>
                        <Card fooditem= {filteritems}
                          options={filteritems.options[0]}
                          />
                      </div>
                    )
                  }) : <div>no data found</div>}
              </div>
            )
          })
            : ""
        }

      </div>

      <div><Footer /></div>

    </>
  )
}

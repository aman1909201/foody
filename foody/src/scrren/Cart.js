import React from 'react'
// import Delete from '@material-ui/icons/Delete'
import trash from '../trash-full-svgrepo-com.svg'
import { useCart, useDispatch } from '../components/Contextreducer';
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatch();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3 text-success '>The Cart is Empty!</div>
      </div>
    )
  }
  // const handleRemove = (index)=>{
  //   console.log(index)
  //   dispatch({type:"REMOVE",index:index})
  // }

  const handleCheckOut = async () => {
    let useremail = localStorage.getItem("useremail");
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    let response = await fetch("http://localhost:5000/api/orderdata", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: useremail,
        order_date: new Date().toDateString()
      })
    });
    console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>

      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>

            {data.map((food, index) => (

              <tr>
                <th scope='row' >{index + 1}</th>
                <td className='text-success fs-6'>{food.name}</td>
                <td className='text-success fs-6'>{food.qty}</td>
                <td className='text-success fs-6'>{food.size}</td>
                <td className='text-success fs-6'>{food.price}</td>
                <td ><button type="button" className="btn p-0"><img src={trash} alt="delete" style={{ backgroundColor: "white", width: "30px", height: "30px" }} onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td></tr>

            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2 text-success'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>



    </div>
  )
}
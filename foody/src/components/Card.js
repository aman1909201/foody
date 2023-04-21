import React,{useRef, useState,useEffect} from 'react'
import { useDispatch,useCart } from './Contextreducer'

export default function Card(props) {
    let dispatch=useDispatch()
    let data=useCart()
    const priceref=useRef()
    let options=props.options
    let price=Object.keys(options)
    
    const [qty, setqty] = useState(1)
    const [size, setsize] = useState("")
    const handleAddtocart=async()=>{
        let food=[]
        for(const item of data){
            if(item.id===props.fooditem_id){
                food=item

                break
            }
        }
        if(food!==[]){
            if(food.size===size){
                await dispatch({type: "UPDATE",id:props.fooditem_id,price:finalPrice,qty:qty})
                return
            }
        }
        else if(food.size!==size){
        await dispatch({type: "ADD",id:props.fooditem_id,name:props.fooditem.name, price:finalPrice,qty:qty,size:size})
        return
    }
        await dispatch({type: "ADD",id:props.fooditem_id,name:props.fooditem.name, price:finalPrice,qty:qty,size:size})
    }
    let finalPrice=qty*parseInt(options[size])
    useEffect(() => {
     setsize(priceref.current.value)
    }, [])
    
    
  return (
        <div>
            <div className="card mt-3" style={{ "width": "18rem" }}>
                <img src={props.fooditem.img} className="card-img-top" alt="..." style={{height:"120px",objectFit:"fill"}}/>
                <div className="card-body">
                    <h5 className="card-title">{props.fooditem.name}</h5>
                    <p className="card-text">Some quick example thecard's content.</p>
                    <div className='container'>
                        <select className=" h-100 m-2 bg-success rounded "  onChange={(e)=>setqty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>
                        <select className=" h-100 m-2 bg-success rounded"  ref={priceref} onChange={(e)=>setsize(e.target.value)}>
                          {price.map((data)=>{
                            return <option key={data} value={data}>{data}</option>
                          })}
                        </select>
                        <div className="d-inline h-100 fs-5">Rs{finalPrice}/-
                        </div>
                    </div>
                    <hr />
                    <button className='btn btn-success justify-center ms-2' onClick={handleAddtocart} >Add to cart</button>
                </div>
            </div>
        </div>
    )
}

import React, { createContext, useContext, useReducer } from 'react'

const Cartstatecontext= createContext(null);
const Cartdispatch=createContext(null);

const reducer=(state,action)=>{
    switch(action.type){
        case "ADD": 
        return [...state,{
            id:action.id,name:action.name,qty:action.qty,
            size:action.size,price:action.price,img:action.img
        }]
        
        case "REMOVE":
            let newarr=[...state]
            newarr.splice(action.index,1)
            return newarr

        case "UPDATE":
            let arr=[...state]
            arr.find((food,index)=>{
                if(food.id===action.id){
                    console.log(food.qty, parseInt(action.qty), action.price+food.price)
                    arr[index]={...food,qty: parseInt(action.qty)+food.qty,price:action.price+food.price}
                }
                return arr
            })
            return arr
        case "DROP":
            let emptyarray=[]
            return emptyarray
           
        default:
            console.log("error")
    }
}

export const Cartprovider=({children})=>{
    const [state, dispatch] = useReducer(reducer,[]) // one code many states
    return(
        <Cartdispatch.Provider value={dispatch}>
            <Cartstatecontext.Provider value={state}>
                {children}
            </Cartstatecontext.Provider>
        </Cartdispatch.Provider>
    )
}

export const useCart=()=>useContext(Cartstatecontext)
export const useDispatch=()=>useContext(Cartdispatch)

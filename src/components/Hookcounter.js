import React,{useState} from 'react'

function Hookcounter() {
    const [count,setCount] = useState(0)
    const incrementfive=()=>{
        for(let i=0;i<5;i++){
            setCount(mycount=>mycount+1)
        }



    }
  return (
    <div>
        {count}
    <button onClick={()=>setCount(mycount=>mycount+1)}></button>    
    <button onClick={incrementfive}>Increment 5</button>    
        Hook  ounter
    </div>
  )
}

export default Hookcounter
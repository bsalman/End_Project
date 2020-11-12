import React,{useEffect, useState} from 'react'


const TimeNow =()=>{

    const initialState={
        time:""
    }

    const [state,
        setState] = useState(initialState)
        let clk = setInterval(function () {
            let today = new Date()
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
                setState({
                ...state,
                time: time
                })
        },1000)



    useEffect(()=>{
        //component did update
        return () =>{
            //component did unmount
            clearInterval(clk)
        }
    })

    return(
    <div className="card">
        <div className="card-body">
        {state.time}
        </div>
    </div>
    )
}

export default TimeNow
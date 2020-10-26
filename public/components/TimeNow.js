import React,{useState} from 'react'


const TimeNow =()=>{

    const initialState={
        time:""
    }
    const [state,
        setState] = useState(initialState)
       const clock=()=>{setInterval(function () {
        let today = new Date()
         let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
         setState({
          ...state,
          time: time
        })
       },1000)}
    return(
    <div className="card">
        <div className="card-body">
        {clock()}{state.time}
        </div>
    </div>
    )
}

export default TimeNow
import React,{useEffect,useState} from 'react'

import { render } from 'react-dom'
import {Link,location} from 'react-router-dom'
//=========================================//
import {allRoomsPost} from '../services/api'
//================================//
const YourRooms =(props)=>{
    const initialState={
        rooms:[]
    }

    //console.log(props.newRoom)
    //================declaring set state=================//
    const [state, setState] = useState( initialState)
    
    //================== ussEffect to update the state ========================//
     useEffect(() => {
        allRoomsPost().then(data => {
            if(data != 2){
                setState({...state, rooms: data})
            } 
        });


    },[state.rooms])


    const roomElement =state.rooms.map(room=>{
        return(
            <div key={room.id} className="card" data-unit="switch-light-6">
                <div className="card-body d-flex flex-row justify-content-start">
                <div className="col-auto mr-auto"><Link to="#">  <h5>{room.type} : {room.name}</h5></Link></div>
                     <div className="col-auto ">
                     {/* style={{color: "red"}} */}
                      <button type="button" className="btn btn-primary" >Delete</button>
                    </div>
                </div>
            </div>
        )
    })
    
    // let ro = state.rooms
    //     ro.push(props)
    //     setState({...state, rooms:ro })
        
        return(

            <React.Fragment>
                
            <div className="col-sm-12 col-md-6 pb-3 ct-chart">
                <div className="card" data-unit-group="switch-lights">
                    <div className="card-body">
                        <h3 className="card-title">Your Room</h3>
                        <hr className="my-0"/>
                        {roomElement}
                        {/* {console.log(props)} */}
                    </div> 
                </div>
            </div>
                </React.Fragment>
        )
    
        
}

export default YourRooms
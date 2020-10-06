import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
//=========================================//
import {allRoomsPost} from '../services/api'
//================================//
const YourRooms =()=>{
    const initialState={
        rooms:[]
    }
    //================declaring set state=================//
    const [state, setState] = useState( initialState)
    //================== ussEffect to update the state ========================//
     useEffect(() => {
        allRoomsPost().then(data => {
            if(data != 2){
                setState({...state, rooms: data})
            } 
        })
    },[])

    const roomElement =state.rooms.map(room=>{
        return(
            <div key={room.id} className="card" data-unit="switch-light-6">
                <div className="card-body d-flex flex-row justify-content-center">
                    <Link to="#">  <h5>{room.type}</h5></Link>
                </div>
            </div>
        )
    })
    
        return(
            <React.Fragment>
            <div className="col-sm-12 col-md-6 pb-3 ct-chart">
                <div className="card" data-unit-group="switch-lights">
                    <div className="card-body">
                        <h3 className="card-title">Add Room</h3>
                        <hr className="my-0"/>
                        {roomElement}
                        
                    </div> 
                </div>
            </div>
                </React.Fragment>
        )
    

}

export default YourRooms
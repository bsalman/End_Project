import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import {Button,Label  } from 'reactstrap';
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
           
            <div key={room.id} className="col-sm-12 col-md-6 col-xl-4">
                <div className="card active">
                    {/* <svg className="icon-sprite">
						<use className="glow" fill="url(#radial-glow)" xlinkHref="assets/images/icons-sprite.svg#glow"/>
						<use xlinkHref="assets/images/icons-sprite.svg#bulb-eco"/>
					</svg> */}
                    <div className="card-body d-flex flex-row justify-content-center">
                         <Link to={"/adddevices/"+room.type.replace(/ /g, '_')+"/"+room.id}>  
                         <h4 className="card-title">{room.type} : {room.name}</h4>
                         </Link>
                    </div>
                    
                     {/* style={{color: "red"}} */}
                      
                   
                    <hr className="my-0"/>
                    <ul className="list-group borderless px-1">
                        <li className="list-group-item">
							<p className="specs">Device1</p>
							<p className="ml-auto mb-0 text-success">connected</p>
						</li>
                        <li className="list-group-item pt-0">
						<p className="specs">Device1</p>
						<p className="ml-auto mb-0">connected</p>
						</li>
                        <li className="list-group-item pt-0 pb-4">
						    <p className="specs">Device2</p>
							<p className="ml-auto mb-0">connected</p>
						</li>
                    </ul>
                    <hr className="my-0"/>
                   
                    <Button type="button" className="btn btn-primary" >Delete</Button>
                    {/* device element */}
                    
                </div>
            </div>

        )
    })
    
    // let ro = state.rooms
    //     ro.push(props)
    //     setState({...state, rooms:ro })
        
        return(

            <React.Fragment>
                {roomElement}
            </React.Fragment>
        )
    
        
}

export default YourRooms
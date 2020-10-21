import React from 'react'
import {connect} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
import {ListGroup, ListGroupItem, Label, Input} from 'reactstrap';


// importing the components
import {getRoomPost} from '../services/api'
import LightDev from './LightDev'
import TempDev from './TempDev'
import Motions from './Motions'
// importing the action
import {setRoomsAction} from '../actions'



const SingleRoomOv =(props) =>{

//* for redux

console.log('params',params)

//const titleElement = (<div className="card p-2 mb-4" ><h5 className="mx-auto">{room.type} : {room.name}</h5></div>)

console.log(props.rooms);

// copy a one room out of the array
// const selectedRoom = props.rooms.splice(props.rooms.indexOf(props.rooms.find(element => element.id === params.id)),1)
//console.log('selectedRoom',selectedRoom);
//*redux end 


  //console.log('state', state);
  //console.log('state', state);
  console.log('props', props);
  console.log('rooms',props.rooms[0]);
  
  let roomInfo = {
      roomName: '',
      roomTitle: '',
      devices: []

  }

  if(props.rooms.length > 0) {
      console.log('rooms2',props.rooms[0].devices[0])
      roomInfo.roomName = props.rooms[0].name
      roomInfo.roomType = props.rooms[0].type
      roomInfo.devices = props.rooms[0].devices[0]
  }
  
//   deviceElement = roomInfo.devices.map(devices => {
//     return (device[0])  
//   })

// to the path of the chosen room and its devices
const params = useParams()


  

    return(


        <React.Fragment>

        {/* head component start */}
	        <div className="row">
		        <div className="col-sm-12">
			      <div className="card p-2 mb-4" >
             	   {/* <h5 className="mx-auto">
                   {rooms.type}: {rooms.name}</h5> */}
                   <h5 className="mx-auto">{roomInfo.roomName} : {roomInfo.roomType}</h5>
                    {/* {titleElement}  */}
		  	      </div>
		       </div>
	         </div>
        {/* head component end */}


    
        <div className="row">
      
           {/* Temp component start */}
               <TempDev />
            {/* Temp component end */}

            {/* Motion component start */}
                <Motions />
            {/* Motion component end */}

            {/* light component start */}
                <LightDev />
            {/* light component end */}

            
             {/* row and card div */}
         </div>
        </React.Fragment>
    )
 

}

// here we change our initial state to props to be able to send it to the main state
// //! this is to get the state of redux and save it in the props of this component
const setStateToProps = (state) => {
    return ({
       // rooms: state.rooms
        rooms: state.rooms
    })
}

// when you see props.room. ..... is touching the main state ( the redux state)
// when you see this.state....  it is touching the initial state





export default connect(setStateToProps, {setRoomsAction})(SingleRoomOv)


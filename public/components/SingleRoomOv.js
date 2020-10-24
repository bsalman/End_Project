import React from 'react'
import {connect} from 'react-redux'
import {useParams} from 'react-router-dom'


//=====================================//
// importing the components
import LightDev from './LightDev'
import TempDev from './TempDev'
import MotionsDev from './MotionsDev'
// importing the action
import {setRoomsAction} from '../actions'



const SingleRoomOv =(props) =>{
// to the path of the chosen room and its devices
const params = useParams()



//console.log('params',params)
//console.log(props.rooms);
//console.log('props', props);

  
  let roomInfo = {
      roomType: '',
      roomName: '',
    // devices: [],
     params:'',
     lightArr:[],
     tempArr:[],
     motionArr:[],
 
  }

  if(props.rooms.length > 0) {


    // select the rooms
     roomInfo.rooms = props.rooms  //* array of rooms
     roomInfo.params = params
     const selectedRoom = roomInfo.rooms.find(room => room.id == roomInfo.params.id) 
     roomInfo.roomType = selectedRoom.type
     roomInfo.roomName = selectedRoom.name
     // select the devices
     //light
     const selectedDevice = selectedRoom.devices
     roomInfo.lightArr = selectedDevice.filter(device => device.category == 'Light')
     const lightDevices = roomInfo.lightArr
     // temperature
     roomInfo.tempArr = selectedDevice.filter(device => device.category == 'Temperature')
     const  tempDevices = roomInfo.tempArr
     //motion 
     roomInfo.motionArr = selectedDevice.filter(device => device.category == 'Motion')
     const motionDevices = roomInfo.motionArr

  

      //  console.log('props.roomsArr',props.roomsArr)
      //  console.log('selectedRoom',selectedRoom);
      //  console.log('selectedDevice',selectedDevice);
      //  console.log('roomType',selectedRoom.type); 
      //  console.log('roomName',selectedRoom.name); 
      //  console.log('motion',motionDevices );

      
}

console.log('lightArr', roomInfo.lightArr);
//console.log('temDevices', roomInfo.tempDevices);
//console.log( 'roomType',selectedRoom.type); 

    return(

        <React.Fragment>
        {/* head component start */}
	        <div className="row">
		        <div className="col-sm-12">
			      <div className="card p-2 mb-4" >
             	   {/* <h5 className="mx-auto">
                   {rooms.type}: {rooms.name}</h5> */}
                   <h5 className="mx-auto">{roomInfo.roomType} : {roomInfo.roomName}</h5>
                    {/* {titleElement}  */}
		  	      </div>
		       </div>
	         </div>
        {/* head component end */}


    
        <div className="row">
      
           {/* Temp component start */}
            <div className="col-sm-12 col-md-6 col-xl-4">
            <div className="card text-center" data-unit="room-temp-02">
            <div className="card-body">
              <h4 className="card-title"> Temperature </h4>
              </div>
               <TempDev tempDevices={roomInfo.tempArr}/> 
             
            </div>
            </div>
            {/* Temp component end */}

            {/* Motion component start */}
            <div className="col-sm-12 col-md-6 col-xl-4">
            <div className="card text-center" data-unit="room-temp-02">
            <div className="card-body">
              <h4 className="card-title"> Motion </h4>
              </div>
                <MotionsDev motionDevices={roomInfo.motionArr}/>
            </div>
            </div>
            {/* Motion component end */}

            {/* light component start */}
            <div className="col-sm-12 col-md-6 col-xl-4">
            <div className="card text-center" data-unit="room-temp-02">
            <div className="card-body">
              <h4 className="card-title"> Light </h4>
              </div>
                <LightDev lightDevices={roomInfo.lightArr}/>
            </div>
            </div>
            {/* light component end */}

            
             {/* row and card div */}
         </div>
        </React.Fragment>
    )
 

}


const setStateToProps = (state) => {
    return ({
       // rooms: state.rooms
        rooms: state.rooms
    })
}


export default connect(setStateToProps, {setRoomsAction})(SingleRoomOv)
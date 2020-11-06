import React from 'react'
import {connect} from 'react-redux'
import { Label, Input} from 'reactstrap';


// importing the action
import {setRoomsAction} from '../actions'
import {editDataPost} from '../services/api'

//===============================//

const DashboardAppliance = (props) =>{ 

  const dashApplianceInfo={

    dashApplianceElementArr:[]

  } 
     //============================//
     //console.log('main state rooms ',props.rooms);
     const turnOnOff=(e, deviceid, roomid)=> {
        e.preventDefault()
       // send data to be saved on database (light data / on / off) and make the light on or off
       // if server side reply with success
       const rooms = [...props.rooms]
       let room = rooms.find(room => room.id == roomid)
       let device = room.devices.find(device => device.id == deviceid)
       device.data = device.data == 'on' ? 'off' : 'on'
       editDataPost(deviceid,device.data).then(data1 => {
        room.devices[room.devices.map(device => device.id).indexOf(deviceid)] = device
        rooms[rooms.map(room => room.id).indexOf(roomid)] = room
        console.log('rooms after change', rooms);
        props.setRoomsAction(rooms)})
   
   
     }
     //=============================//



 if(props.rooms.length > 0) {

 const rooms = props.parameter //* parameter = applianceDevices in the father: dashboard
    //console.log("rooms", props.rooms);
    const applianceElement = rooms.filter(room => room.devices.find(device => device.category ==='Appliance')).map((room)=>{
        const devices = room.devices.filter(device => device.category ==='Appliance').map(device => {
         // console.log("device",device);
      return (
        <React.Fragment  key={device.id}>
        <div className="card col-sm-12 col-md-6 col-xl-5">
            <div className="card-body d-flex flex-wrap justify-content-start" data-unit="room-temp-02">
            <img src={device.imgUrl}></img>
            &nbsp;&nbsp;
                 <h5>{device.name}</h5>
                 <Label className={`switch ml-auto ${device.data === 'on' ? 'checked' : '' }`} onClick={(e) => {turnOnOff(e, device.id, device.room_id)}} >
                  <Input type="checkbox" id={'switch-light-' + device.id} defaultChecked={device.data === 'on' }/>  {/* checked/ */}
                 </Label>
            </div>
        </div>
      &nbsp;
      &nbsp;
      </React.Fragment>
        
      )
    })
    
    return(
        <React.Fragment key={room.id}>
							&nbsp;
              <div>
              &nbsp;
              <h5>&nbsp;{room.type}</h5>

							<div  className="card-body d-flex flex-wrap overflow4 justify-content-md-center">
			          	{devices}
							</div>
              </div>
        </React.Fragment>
      )
    })

    dashApplianceInfo.dashApplianceElementArr = applianceElement

  }


  return(

        <div className="col-12">   {/* key={room.id} */}
      
          	<div className="col col-sm-12 card ">
							<div className="card-body">
							<h4 className="card-title "><img src="/images/appliance.png"></img> Appliances</h4>
              {dashApplianceInfo.dashApplianceElementArr }
        </div>
        </div>
					</div>
   
    )

}


const setStateToProps = (state) => {
  return ({
    
      rooms: state.rooms
  })
}


export default connect(setStateToProps, {setRoomsAction})(DashboardAppliance)
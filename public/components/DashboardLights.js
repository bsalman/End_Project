import React,{ useState } from 'react'
import {connect} from 'react-redux'
import {Label, Input} from 'reactstrap';

import {setRoomsAction} from '../actions'

import {editDataPost,editSelected} from '../services/api';


const DashboardLights = (props)=>{
//=======================================================//
const initialStat={
    isOpen:false
    
}
    const [state, setState] = useState(initialStat);

    const toggle = (e,roomId) =>{
        e.preventDefault()
        // setState({...state,isOpen:!state.isOpen})
        const rooms = [...props.rooms]
        let room = rooms.find(room => room.id == roomId)
        room.selected= room.selected == 'on' ? 'off' : 'on'
        editSelected(roomId,room.selected).then(data=>{
            console.log('data',data);
            rooms[rooms.map(room => room.id).indexOf(roomId)] = room
            props.setRoomsAction(rooms)
        })
    }
   
//=========================================================//
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
        props.socket.emit('light_status', {status: device.data, sn: device.number})
        props.setRoomsAction(rooms)
       })
   
   
    }
 //===============================================//
    const rooms2=props.parameter
    const LightElement=rooms2.filter(room => room.devices.find(device => device.category ==='Light')).map((room)=>{
        const devices = room.devices.filter(device=>device.category ==='Light').map(device => {
            return(
                   <div key={device.id} className=" d-flex flex-row justify-content-start mb-3" >
                       <h6 className="ml-4">{device.name}</h6>
                            
                        <Label className={`switch ml-auto ${device.data === 'on' ? 'checked' : '' }`} onClick={(e) => {turnOnOff(e, device.id, device.room_id)}} >
                            <Input type="checkbox" id={'switch-light-' + device.id} defaultChecked={device.data === 'on' }/> 
                        </Label>
                   </div>
            )
                 })
                 
        return(
           
        <div  key={room.id} className="card">
          <div className="card-body d-flex flex-row justify-content-start" data-unit="room-temp-02">
                
                <img src="../images/light.png" style={{width:"32px",height:"32px"}}></img>
                 <h5>{room.type}</h5>
                 <button className="btn btn-secondary  ml-auto" onClick={(e)=>{toggle(e,room.id)}}
                  data-toggle="tooltip"
                   data-placement="top" 
                   title="show all lights in this room"
                   id={room.id}>
                       <i className={`${room.selected=='off'?"far fa-eye":"far fa-eye-slash"}`}></i>
                   </button>
                </div>
                <div  className={` col ${room.selected=='off'?"d-none":"d-block"}`} >
                { devices}
                 </div>
           
           </div>
           
         
        )
    })

     
        return (
        <React.Fragment>
            <div className="col-sm-12 col-md-6 col-xl-4">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Lights - interior</h4>
                        <div className="overflow">
                        {LightElement}
                        </div>
                    </div>
                    <hr className="my-0"/>
                </div>
            </div>
        </React.Fragment>
        )
}

const setStateToProps = (state) => {
    return ({
      
        rooms: state.rooms,
        socket: state.socket
    })
  }
export default connect(setStateToProps, {setRoomsAction})(DashboardLights)
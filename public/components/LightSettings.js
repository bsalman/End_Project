import React, {useEffect, useState} from 'react'
import {Link,useParams} from 'react-router-dom'
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import {editDataPost} from '../services/api'
//==============================================//
import {connect} from 'react-redux'
// importing the action
import {setRoomsAction} from '../actions'
//==============================================//
import CustomModal from './CustomModal'
import TimeNow from './TimeNow'
import {editDevicePost, getDeviceRelatedDevicesPost} from '../services/api'

import LightDeviceSettings from './TimeDeviceSettings'

//==============functionalComponent start==============================//
const LightSetting = (props) => {
  const params = useParams()
 const deviceCategoryParam =params.deviceCategory;
  const deviceId=params.id
const deviceName=params.deviceName
   const roomId =params.roomId
  
   useEffect(() => {
    getDeviceRelatedDevicesPost(params.id).then(relatedDevices => {
      // motionDevices : [
      //   {startTime: '',
      //   stopTime: '',
      //   selectedDevice: null,}],
      // console.log(relatedDevices);
      let checkChecked = true
      const lightDevices = relatedDevices.map((device) => {
        if(device.active != 1)
          checkChecked = false
          // console.log(device);
          const x= {
            startTime: device.start_time,
            stopTime: device.stop_time,
            id: device.id,
            active: device.active
          }
          return (x)
        
        
        
      })
      lightDevices.push(
        {
          startTime: '',
          stopTime: '',
          id: null,
          active: 1
        }
      )

      setState({ ...state, lightDevices: lightDevices, checked: checkChecked })
    })
  }, [])




  const initialState = {
    errorModal: {
      show: false,
      title: '',
      content: null
    },
        //time on/off
        lightDevices: [
        ],
    showdownTime:"",
    ternOnTim:"",
    classChecked:"",
    serialNumber:"",
    checked : false
  }
//=======================================//
  const [state,setState] = useState(initialState)
//==========================================//
 let room={
   id:"",
   name:"",
   type:"",
   devices:[]
 }
 let device={}
//==============================================//

if(props.rooms.length>0){
  //console.log("hi",props.rooms);
  room.id=roomId
  const rooms=props.rooms
  const selectedRoom = rooms.find(room=>room.id==roomId)
  room.name=selectedRoom.name
  room.type= selectedRoom.type
  room.devices = selectedRoom.devices
  device=room.devices.find(device => device.id == deviceId)
  
  

  
  // const devices= selectedRoom.devices
  // // room.roomType=selectedRoom.type;
 
  // const device=devices.find(device=>device.id== deviceId)
}
    
  
  //==========================================//
  const turnOnOff=(e,deviceId,roomId)=> {
    e.preventDefault()
    setState({...state,checked:!state.checked})
    const rooms = [...props.rooms]
    //  setState({...state,checked:!state.checked})
    let device = room.devices.find(device => device.id == deviceId)
    
     device.data = device.data == 'on' ? 'off' : 'on'
     editDataPost(deviceId,device.data).then(data1 => {
      rooms[rooms.map(room => room.id).indexOf(roomId)] = room
      props.setRoomsAction(rooms)
     })
  }


  const lightDevicesElement = state.lightDevices.map((device,idx) => {
    return (
      <LightDeviceSettings deviceId={params.id} key={idx} device={device}/>
    )
  })

    //add new time on + btn click function
    const addNewTimeBoxBtn = (e) => {
      e.preventDefault()
      //// big NOOOOOOOOOOOOOO
      //state.motionDevices.forEach(Element=>{
      const newLightDevices = state.lightDevices
      newLightDevices.push({
        startTime: '',
        stopTime: '',
        id: null,
        active: 1
      })
      setState({ ...state, lightDevices: newLightDevices })
      //})
  
  
      // console.log('hi');
  
      // console.log('state,motionDevices', state.motionDevices);
    }


  //============== edit serial number function  ========================//
  const editSerialNumberOnClick =(e)=>{
    e.preventDefault()
    if (state.serialNumber.trim() != '') {
    //   const errorsElement = (
    //     <ul>
    //       {state.serialNumber.trim() === ''? <div>Serial Number empty</div>: null}
    //     </ul>
    //   )
    //   const newState = {...state}
    //   newState.errorModal.show = true
    //   newState.errorModal.title = "Entries Error"
    //   newState.errorModal.content = errorsElement
    //   // hide addroom modal because we need to show error modal and we can not show
    //   // two modals on the same time
    //   newState.roomModalShow = false
    //   setState(newState)
    // }else{
      editDevicePost(deviceId,state.serialNumber).then((device)=>{
       

       
        if(device){

          const newRooms = props.rooms.map(room => {
            if(room.id === device.room_id){
                room.devices[room.devices.map(device => device.id).indexOf(device.id)] = device
                // room.devices.push(device)
            }
            return room;
        });
          // {id: 25, name: "3", number: "147", category: "Light", room_id: 91}
        props.setRoomsAction(newRooms)
           setState(
          {...state,serialNumber:""}
        
         )}
        
      })

    }
  }
  //==========================================//
  const errorModalClose = () => {
    const newState = {
      ...state
    }
    newState.errorModal.show = false
    setState(newState)
  }
  //=================================================
  return (

    <React.Fragment>

      <CustomModal
        show={state.errorModal.show}
        close={errorModalClose}
        className="bg-danger"
        title={state.errorModal.title}>
        {state.errorModal.content}
      </CustomModal>

      {/*  <!-- Appliances  START --> */}
      <div className="row">
        <div className="col-sm-12">
          <div className="card p-2 mb-4">
            <div className="card-body d-flex flex-row justify-content-center">
  <h3 className="card-title">{room.type}/{deviceCategoryParam}/{deviceName}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
      <div className="col-sm-12">
        <div className="card active">
          <div className="card-body">
          <div><h3 className="card-title text-center"><TimeNow/></h3></div>
          </div>
          <hr className="my-0"/>
          <ul className="list-group borderless">
            <li className="list-group-item align-items-center">
              <img src="/images/timer.png"></img>
              &nbsp;
              <h5 className="card-title">Light:Set Time</h5>
              <div className="d-flex ml-auto align-items-center ">
              <Label className={`switch ml-auto ${device.data=="on" ? 'checked' : '' }`} onClick={(e)=>{turnOnOff(e,deviceId,roomId)}}>
							<Input type="checkbox" id={deviceId}/>
						</Label>
            &nbsp;
                
              </div>
            </li>
          </ul>

          <hr className="my-0"/>
          &nbsp;

          
          

          {lightDevicesElement}

        <div className="row col-2 ml-3 mb-3 mt-4">
          <Button
            type="button"
            className="btn btn-primary"
            data-toggle="tooltip"
            data-placement="right"
            title="Add Devices"
            onClick={addNewTimeBoxBtn}>
            <i className="fas fa-plus"></i>
          </Button>
          &nbsp;&nbsp;
        </div>
            {/* //from to with + button */}
            {/* <div className="col justify-content-center ">
              <h5 className="specs text-center">From</h5>
            </div>
            <div className="col justify-content-center ">
              <Input
                className="ml-auto mb-0 text-primary text-center"
                type="time"
                onChange={(e)=>{
                  e.preventDefault()
                  setState({
                    ...state,
                    ternOnTim: e.target.value
                  })
                }}
                value={state.ternOnTim}
               />
            </div>
            
            {/* //to */}
            {/* <div className="col justify-content-center ">
              <h5 className="specs text-center">To</h5>
            </div>
            <div className="col justify-content-center">
              <Input
                className="ml-auto mb-0 text-primary text-center"
                type="time"
                placeholder="HH : MM : SS"
                value={state.showdownTime}
                onChange={(e)=>{setState({...state,showdownTime: e.target.value})}}
                />
            </div>
            
            
            <div className="col justify-content-end ">
              <Button >Save</Button>
            </div> */}
           
          





          
          &nbsp;
          <hr className="my-0"/>
          <ul className="list-group borderless">
            <li className="list-group-item align-items-center">
            <img src="/images/timer.png"></img>
              &nbsp;
              <h5 className="card-title">Motion:Set Time</h5>
              <div className=" ml-auto ">
                <div></div>
              </div>
            </li>
          </ul>
          <hr className="my-0"/>
          &nbsp;
          <div className="row d-flex justify-content-center">
            <div className="col justify-content-center ">
              <h5 className="specs text-center">From</h5>
            </div>
            <div className="col justify-content-center ">
              <Input
                className="ml-auto mb-0 text-primary text-center"
                type="time"
                placeholder="HH : MM : SS"/>
            </div>
            <div className="col justify-content-center ">
              <h5 className="specs text-center">To</h5>
            </div>
            <div className="col justify-content-center">
              <Input
                className="ml-auto mb-0 text-primary text-center"
                type="time"
               />
            </div>
            <div className="col justify-content-end ">
              <Button >Save</Button>
            </div>
          </div>
          &nbsp;
          <hr className="my-0"/>
        </div>
        <div className="card temp-range heating" data-unit="room-temp-02">

          <div className="card-body">
            <div className="col-12">
              <Form>
                <FormGroup row>
                  <Label for="serialNumber" sm={2}>Serial Number</Label>
                  <Col sm={8}>
                    <Input
                      type="text"
                      name="serial-number"
                      id="serialNumber"
                      placeholder="insert new Serial Number"
                      value={state.serialNumber}
                     onChange={(e)=>{setState({...state,serialNumber: e.target.value})}}/>
                  </Col>
                  <Button onClick={editSerialNumberOnClick}>Save</Button>
                </FormGroup>
                <div className="row ">
                <div className="col">
                  {/* <Link to={"/room/" + room.roomType.replace(/ /g, '_') + "/" + params.roomId}> */}
                  <Link to={"/room/"+room.type +"/"+ params.roomId}>
                      <Button
                        type="button "
                       className="btn btn-primary"
                        data-toggle="tooltip"
                        data-placement="right"
                        title="go Back">
                       BACK
                      </Button>
                </Link>
                </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
        {/* <!-- Living room temperature  END --> */}
      </div>
      </div>
    </React.Fragment>
  )

  // }) // from room Element map
}

const setStateToProps = (state) => {
  return ({
    rooms: state.rooms
  })
}
export default connect(setStateToProps, {setRoomsAction})(LightSetting)
//export default SingleRoomOv

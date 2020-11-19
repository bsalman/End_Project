import React, {Fragment, useEffect, useState, useRef} from 'react'
// import {connect} from 'react-redux' import {useParams, useHistory} from
// 'react-router-dom'
import {Link} from 'react-router-dom'
import {ListGroup, ListGroupItem, Label, Input, Button} from 'reactstrap';
import {connect} from 'react-redux'

// importing the components
// importing the action
import {setRoomsAction} from '../actions'
import { useParams } from 'react-router-dom';

import CustomModal from './CustomModal'
import TimeNow from './TimeNow'
import {editDevicePost} from '../services/api'


const TempSettings = (props) => {

const params = useParams()

console.log('params:',params);
console.log('paramsDeviceCategory:',params.deviceCategory);
console.log('paramsDeviceName:',params.deviceName);
console.log('paramsRoomId:',params.roomId);
console.log('paramsId:',params.id);
  // console.log('props', props);
  // console.log('rooms', props);

  const initialState = {
    errorModal: {
      show: false,
      title: '',
      content: null
    },
    
    showdownTime:"",
    ternOnTim:"",
    classChecked:"",
    serialNumber:""
  }
//=======================================//
  const [state,
    setState] = useState(initialState)



  let roomInfo = {
    roomType : '',
    deviceCategory : '',
    deviceName : '',
    deviceData: ''
  }

  if (props.rooms.length > 0) {
    const selectedRoom = props.rooms.find(room => room.id == params.roomId) 
    const selectedDevices = selectedRoom.devices.find(device => device.id == params.id) 
    //console.log('selectedRoom', selectedRoom)
 

    roomInfo.roomType = selectedRoom.type
    roomInfo.deviceCategory = params.deviceCategory
    roomInfo.deviceName = params.deviceName
    roomInfo.deviceData = selectedDevices.data ? JSON.parse(selectedDevices.data) : null
    
  }
  console.log('selectedDevices', roomInfo.deviceData)

  // console.log('selectedRoom',state.selectedRoom,'/',state.selectedDevice);

  //============== edit serial number function  ========================//
  const editSerialNumberOnClick =(e)=>{
   
    if (state.serialNumber.trim() === '') {
      const errorsElement = (
        <ListGroup>
          {state.serialNumber.trim() === ''? <div>Serial Number is empty</div>: null}
        </ListGroup>
      )
      const newState = {...state}
      newState.errorModal.show = true
      newState.errorModal.title = "Error with your Entries"
      newState.errorModal.content = errorsElement
      // hide addroom modal because we need to show error modal and we can not show
      // two modals on the same time
      newState.roomModalShow = false
      setState(newState)
    }else{
      editDevicePost(params.id,state.serialNumber).then((device)=>{
       
         //const  devices=props.rooms.find(room=>room.id==device.room_id)
       
        if(device){
          const errorsElement = (
            <ListGroup>
              <div>Your Serial Number has been changed successfully</div>
            </ListGroup>
          )
          const newState = {...state}
          newState.errorModal.show = true
          newState.errorModal.title = "Data Change"
          newState.errorModal.content = errorsElement
          newState.roomModalShow = false
          setState(newState)
          //console.log("device", device);
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
        <div className="col-12">
          <div className="card p-2 mb-4">
            <div className="card-body d-flex flex-row justify-content-center">
              <h5 className="mx-auto">{roomInfo.roomType} / {roomInfo.deviceCategory} / {roomInfo.deviceName}</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          {/* <!-- TV2  START --> */}
          <div className="card active" data-unit="tv-lcd-2">
            {/* <!-- Living room temperature  START --> */}
            <div className="temp-range heating" data-unit="room-temp-02">
              <hr className="my-0"/>
              <div className="d-flex justify-content-between" data-rangeslider="room-temp-02">
                <ListGroup className="list-group borderless px-1 align-items-stretch">
                  <ListGroupItem className="list-group-item list-group-item1">
                    &nbsp;
                    <h5 className="specs mr-auto mb-auto">Desired temperature</h5>
                  </ListGroupItem>
                </ListGroup>
                <div
                  className="p-4"
                  style={{
                  position: 'relative'
                }}>
                  <p className="mr-auto mt-2 mb-0 display-5">
                    <span className="room-temp-C">{roomInfo.deviceData ? roomInfo.deviceData.t : '0.00'}</span>
                    <sup>°C</sup>
                  </p>
                  <p className="mr-auto mt-2 mb-0 lead text-primary">
                    <span className="room-temp-F">{roomInfo.deviceData ? roomInfo.deviceData.h : '0.00'}</span>
                    <sup>°F</sup>
                  </p>
                </div>
              </div>

              <ListGroup className="list-group borderless">
                <hr className="my-0"/>
                <div className="col-12" modal-content="true">
                  <ListGroupItem className="list-group-item list-group-item2 align-items-center">

                    <Label for="device_seralNum" className=" col-xl-3 col-md-3 col-sm-3 col-form-label modal-font">Device Serial Number</Label >
                    <Input
                      className=" form-control custom-focus col-xl-9 col-md-9 col-sm-9"
                      type="text"
                      id="device_seralNum"
                      placeholder="insert new Serial Number"
                      value={state.serialNumber}
                     onChange={(e)=>{setState({...state,serialNumber: e.target.value})}}/>

                  </ListGroupItem>
                </div>
              </ListGroup>

              <div className="card-body">
                <div className="row">
                <div className="col-auto mr-auto ml-4">
              <Link to={"/room/" + roomInfo.roomType.replace(/ /g, '_') + "/" + params.roomId}>
              <Button
                  type="button"
                  className="btn btn-primary"
                  data-toggle="tooltip"
                  data-placement="right"
                  title="Save changes">
                  BACK
                </Button>
                </Link>
              </div>
                  <div className="col-auto mr-4 mb-2">

                    &nbsp;&nbsp;

                    <Button
                      type="button"
                      className="btn btn-primary"
                      data-toggle="tooltip"
                      data-placement="right"
                      title="Save changes"
                      onClick={editSerialNumberOnClick}>
                      Save
                    </Button>

                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Living room temperature  END --> */}
          </div>
        </div>
      </div>

    </React.Fragment>
  )

  // }) // from room Element map
}

// here we change our initial state to props to be able to send it to the main
// state //! this is to get the state of redux and save it in the props of this
// component
const setStateToProps = (state) => {
  return ({
    // rooms: state.rooms
    rooms: state.rooms
  })
}

// when you see props.room. ..... is touching the main state ( the redux state)
// when you see this.state....  it is touching the initial state

export default connect(setStateToProps, {setRoomsAction})(TempSettings)
//export default SingleRoomOv
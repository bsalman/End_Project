import React, {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
//==============================================//
import {connect} from 'react-redux'
// importing the action
import {setRoomsAction} from '../actions'
//==============================================//
import CustomModal from './CustomModal'
import TimeNow from './TimeNow'
import {editDevicePost} from '../services/api'

//==============functionalComponent start==============================//
const LightSetting = (props) => {
  const params = useParams()
  const deviceCategory=params.deviceCategory;
  const deviceId=params.id
  const deviceName=params.deviceName
  const roomId =params.roomId
  
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
//==========================================//
  let room ={
    roomType: '',
    devicesArr:""
  }
//==============================================//

  if (props.rooms.length > 0) {
   
    const rooms=props.rooms
   
    const selectedRoom= rooms.find(room=>room.id==roomId)
    const devices= selectedRoom.devices
  
    room.roomType=selectedRoom.type
    const selectedDevice=devices.find(device=> device.id=== deviceId)
    room.devicesArr=devices
    // console.log(selectedDevice);
   
  }

  //=======================================//
  const ternOffOnLight=(e)=>{
    if (state.ternOnTim.trim() === '' || state.showdownTime === '') {
      const errorsElement = (
        <ul>
          {state.ternOnTim.trim() === ''? <div>set Time for ternOn</div>: null}
          {state.showdownTime.trim() === ''? <div>set Time for ternOf</div>: null}
        </ul>
      )
      const newState = {...state}
      newState.errorModal.show = true
      newState.errorModal.title = "Entries Error"
      newState.errorModal.content = errorsElement
      // hide addroom modal because we need to show error modal and we can not show
      // two modals on the same time
      newState.roomModalShow = false
      setState(newState)
    }
    
  }
  //============== edit serial number function  ========================//
  const editSerialNumberOnClick =(e)=>{
   
    if (state.serialNumber.trim() === '') {
      const errorsElement = (
        <ul>
          {state.serialNumber.trim() === ''? <div>Serial Number empty</div>: null}
        </ul>
      )
      const newState = {...state}
      newState.errorModal.show = true
      newState.errorModal.title = "Entries Error"
      newState.errorModal.content = errorsElement
      // hide addroom modal because we need to show error modal and we can not show
      // two modals on the same time
      newState.roomModalShow = false
      setState(newState)
    }else{
      editDevicePost(deviceId,state.serialNumber).then((device)=>{
       
         const  devices=props.rooms.find(room=>room.id==device.room_id)
       
        if(device){
console.log("device", device);
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
  <h3 className="card-title">{room.roomType}/{deviceCategory}/{deviceName}</h3>
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
              <i className="fas fa-stopwatch"></i>
              &nbsp;
              <h5 className="card-title">Light:Set Time</h5>
              <div className="d-flex ml-auto align-items-center ">
              <label className="switch ml-auto">
							<input type="checkbox" id="switch-house-lock"  />
						</label>
            &nbsp;
                
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
            <div className="col justify-content-center ">
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
              <Button onClick={ternOffOnLight}>Save</Button>
            </div>
          </div>
          &nbsp;
          <hr className="my-0"/>
          <ul className="list-group borderless">
            <li className="list-group-item align-items-center">
              <i className="fas fa-stopwatch"></i>
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

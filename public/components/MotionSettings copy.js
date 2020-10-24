import React, {Fragment, useEffect, useState, useRef} from 'react'
// import {connect} from 'react-redux' import {useParams, useHistory} from
// 'react-router-dom'
import {
  ListGroup,
  ListGroupItem,
  Label,
  Input,
  Button,
  FormGroup,
  Form,
  Col
} from 'reactstrap';
import {connect} from 'react-redux'

// importing the components
import {getRoomPost} from '../services/api'
// importing the action
import {setRoomsAction} from '../actions'
import { useParams } from 'react-router-dom';

const MotionSettings = (props) => {

  const params = useParams()

  console.log('params:',params);
  console.log('paramsDeviceCategory:',params.deviceCategory);
  console.log('paramsDeviceName:',params.deviceName);
  console.log('paramsRoomId:',params.roomId);
  console.log('paramsId:',params.id);
    // console.log('props', props);
    // console.log('rooms', props);
  
    let roomInfo = {
      roomType : '',
      deviceCategory : '',
      deviceName : ''
    }
  
    if (props.rooms.length > 0) {
      const selectedRoom = props.rooms.find(room => room.id == params.roomId) 
      const selectedDevices = selectedRoom.devices.find(device => device.id == params.id) 
      console.log('selectedRoom', selectedRoom)
      console.log('selectedDevices', selectedDevices)
  
      roomInfo.roomType = selectedRoom.type
      roomInfo.deviceCategory = params.deviceCategory
      roomInfo.deviceName = params.deviceName
    }

  const initialState = {
    x : []
  }

//=======================================//
const [state,setState] = useState(initialState)
const y = []
for (let i = 0; i <= state.x.length; i++) {
  const newTime = (
    <React.Fragment key={i}>
                    <div className="col-xl-5 col-sm-5" modal-content="true">
                    <Input
                      className="form-control custom-focus ml-4 mb-2 text-primary text-center"
                      type="time"
                      id="device_seralNum"
                      onChange={e => {
                      console.log('hi');
                    }}/>
                  </div>

                  {/* //to */}
                  <div className="col-xl-5 col-sm-5" modal-content="true">
                    <Input
                      className="form-control custom-focus  ml-4 mb-2 text-primary text-center"
                      type="time"
                      id="device_seralNum"/>
                  </div>
                    </React.Fragment>  

  )
  y.push(newTime)
}

  
 
  

  //add new time on + btn click function
  const addNewTimeBoxBtn = (e) => {
    e.preventDefault()
    console.log('hi');
    setState({...state,x:y})
  }

  return (

    <React.Fragment>

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

            {/* <!-- Motion On + button START --> */}
            <ListGroup className="list-group borderless">
              <ListGroupItem className="list-group-item align-items-center">
                <h5 className="card-title">Motion On
                </h5>
                <div className="d-flex ml-auto align-items-center ">
                  <Label className="switch ml-auto !checked">
                    <Input type="checkbox" id="tv-lcd-2" />
                  </Label>
                </div>
              </ListGroupItem>
            </ListGroup>
            {/* <!-- Motion On + button END --> */}



            {/* <!-- time from to input START --> */}
            <div className="only-if-active">
              <hr className="my-0"/>
              <FormGroup className="row">
                {/* //from to with + button */}
                <div className="row col-xl-6 col-sm-12">
                  {/* //from */}
                  <div className="col-xl-5 col-sm-5" modal-content="true">
                    <Label
                      for="device_seralNum"
                      className="col-12 col-form-label modal-font text-center">From</Label >
                    <Input
                      className="form-control custom-focus ml-4 mb-2 text-primary text-center"
                      type="time"
                      id="device_seralNum"
                      onChange={e => {
                      console.log('hi');
                    }}/>
                  </div>

                  {/* //to */}
                  <div className="col-xl-5 col-sm-5" modal-content="true">
                    <Label
                      for="device_seralNum"
                      className="col-12 col-form-label modal-font  text-center">To</Label >
                    <Input
                      className="form-control custom-focus  ml-4 mb-2 text-primary text-center"
                      type="time"
                      id="device_seralNum"/>
                  </div>




                    {/*  */}
                  {state.x}

                    {/*  */}









                  <div className="col-3 ml-4 mt-3">
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

                </div>

                {/* //turn on device */}
                <div className="row col-xl-6 col-sm-12  d-flex justify-content-center">
                  <div className="col-9">
                    <Label for="room_type" className="col-12 col-form-label modal-font text-center">Turn On Device</Label>
                    <Input
                      className="form-control custom-focus"
                      type="select"
                      name="select"
                      id="room_type">
                      <option></option>
                      <option>Light1</option>
                      <option>Light2</option>
                      <option>Light3</option>
                    </Input>
                  </div>
                </div>
              </FormGroup>

              &nbsp;

            </div>

            {/* <!-- time from to input END --> */}



            {/* <!-- serial number START --> */}
            <hr className="my-0"/>
            <hr className="my-0"/>
            <div className="col-12">
              <Form>
                <FormGroup className="row mt-4">
                  <Label for="serialNumber" sm={2}>Serial Number</Label>
                  <Col sm={8}>
                    <Input
                      type="text"
                      name="serial-number"
                      id="serialNumber"
                      placeholder="insert new Serial Number"/>
                  </Col>
                </FormGroup>
                ​
              </Form>
            </div>
            {/* <!-- serial number END --> */}
            



            {/* <!-- button Save START --> */}
            <div className="row">
              <div className="col-auto mr-auto"></div>
              <div className="col-auto mr-4 mb-2">

                &nbsp;&nbsp;

                <Button
                  type="button"
                  className="btn btn-primary"
                  data-toggle="tooltip"
                  data-placement="right"
                  title="Save changes">
                  SAVE
                </Button>

              </div>
            </div>
            {/* <!-- button Save END --> */}
          </div>
        </div>
        {/* <!-- temp  END --> */}

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

export default connect(setStateToProps, {setRoomsAction})(MotionSettings)
//export default SingleRoomOv
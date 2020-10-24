import React, {Fragment, useEffect, useState, useRef} from 'react'
// import {connect} from 'react-redux' import {useParams, useHistory} from
// 'react-router-dom'
import {ListGroup, ListGroupItem, Label, Input, Button} from 'reactstrap';
import {connect} from 'react-redux'

// importing the components
import {getRoomPost} from '../services/api'
// importing the action
import {setRoomsAction} from '../actions'
import { useParams } from 'react-router-dom';

const TempSettings = (props) => {

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

  // console.log('selectedRoom',state.selectedRoom,'/',state.selectedDevice);

  return (

    <React.Fragment>

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
                    <span className="room-temp-C">22</span>
                    <sup>°C</sup>
                  </p>
                  <p className="mr-auto mt-2 mb-0 lead text-primary">
                    <span className="room-temp-F">71.6</span>
                    <sup>°F</sup>
                  </p>
                </div>
              </div>

              <ListGroup className="list-group borderless">
                <hr className="my-0"/>
                <div className="col-12" modal-content="true">
                  <ListGroupItem className="list-group-item list-group-item2 align-items-center">

                    <Label for="device_seralNum" className="col-3 col-form-label modal-font">Device Serial Number</Label >
                    <Input
                      className="form-control custom-focus col-9"
                      type="text"
                      id="device_seralNum"/>

                  </ListGroupItem>
                </div>
              </ListGroup>

              <div className="card-body">
                <div className="row">
                  <div className="col-auto mr-auto">

                    &nbsp;&nbsp;</div>
                  <div className="col-auto">

                    &nbsp;&nbsp;

                    <Button
                      type="button"
                      className="btn btn-primary"
                      data-toggle="tooltip"
                      data-placement="right"
                      title="Save changes"
                      onClick={() => {
                      deleteBtnClick(room.id)
                    }}>
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
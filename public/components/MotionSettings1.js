import React, {Fragment, useEffect, useState, useRef} from 'react'
// import {connect} from 'react-redux' import {useParams, useHistory} from
// 'react-router-dom'
import {
  ListGroup,
  ListGroupItem,
  Label,
  Input,
  Button,
  FormGroup
} from 'reactstrap';
import {connect} from 'react-redux'

// importing the components
import {getRoomPost} from '../services/api'
// importing the action
import {setRoomsAction} from '../actions'

const MotionSettings = (props) => {

  // console.log('props', props);
  // console.log('rooms', props);

  // let roomInfo = {
  //   roomName: '',
  //   roomTitle: '',
  //   devices: []

  // }

  // if (props.rooms.length > 0) {
  //   console.log('rooms2', props.rooms[0].devices)
  //   roomInfo.roomName = props.rooms[0].name
  //   roomInfo.roomType = props.rooms[0].type
  //   roomInfo.devices = props.rooms[0].devices[0]
  // }

  // console.log('selectedRoom',state.selectedRoom,'/',state.selectedDevice);

  return (

    <React.Fragment>
      <div className="row">
        <div className="col-sm-12">
          <div className="card p-2 mb-4">
            <h5 className="mx-auto">RoomName : RoomType</h5>
          </div>
        </div>
      </div>

      <div className="col-12">
        {/* <!-- TV2  START --> */}
        <div className="card active" data-unit="tv-lcd-2">
          {/* <!-- TV2 switch START --> */}
          <div className="only-if-active">
                             <hr className="my-0" />
                            <ListGroup className="list-group borderless px-1">
                     
          
          
                    <ListGroupItem className="list-group-item pb-0">
                        <h5 className="specs">Light Device</h5>
                        <div className="btn-group btn-group-toggle ml-auto py-1" data-toggle="buttons">
                          <Label className="btn btn-label btn-sm mb-0">
                            <Input type="radio" name="options" id="c1-nv-on" autoComplete="off" />
					              		ON
                          </Label>
                          <Label className="btn btn-label btn-sm mb-0 active">
                            <Input type="radio" name="options" id="c1-nv-off" autoComplete="off"/>
					              		OFF
                          </Label>
                          {/* <Link to={"/settings/" + room.type.replace(/ /g, '_') + "/" + room.id}><Button */}
                          </div>
                      </ListGroupItem>        
      
{/* serieal number was here  */}

                    </ListGroup>
                    
                    &nbsp;
              </div>
          {/* <!-- TV2 switch END --> */}

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

          <ListGroup className="list-group borderless">
            <hr className="my-0"/>
            <div className="col-4" modal-content="true">
              {/*  <ListGroupItem className="list-group-item list-group-item2 align-items-center">

                        <Label for="device_seralNum" className="col-3 col-form-label modal-font">From</Label >
                        <Input
                            className="form-control custom-focus col-9"
                            type="time"
                            name="time" placeholder="hrs:mins"
                            id="device_seralNum"/>

                        </ListGroupItem>*/}
              <h5>Motion on</h5>


              <Label className="switch ml-auto">
                <Input type="checkbox" id="tv-lcd-2"/>
              </Label>
            </div>
          </ListGroup>

          <FormGroup className="row">
            <div className="col-sm-6 col-md-6 col-xl-3" modal-content="true">
              <Label for="device_seralNum" className="col-4 col-form-label modal-font">From</Label >
              <Input className="form-control custom-focus" type="time" id="device_seralNum" 
              onChange={e => {
                console.log('hi');
              }}/>
              </div>
            <div className="col-sm-6 col-md-6 col-xl-3" modal-content="true">
              <Label for="device_seralNum" className="col-4 col-form-label modal-font">To</Label >
              <Input className="form-control custom-focus" type="time" id="device_seralNum"/>
            </div>

            <div className="col-sm-6 col-md-6 col-xl-3"></div>
            <div className="col-sm-6 col-md-6 col-xl-3 ">
              <Label for="room_type" className="col-12 col-form-label modal-font">Turn On Device</Label>
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
          </FormGroup>

          <FormGroup className="row">
            <div className="col-auto mr-auto">
              
              <Button
                type="button"
                className="btn btn-primary"
                data-toggle="tooltip"
                data-placement="right"
                title="Add Devices">
                <i className="fas fa-plus"></i>
              </Button>
              &nbsp;&nbsp;</div>
          </FormGroup>
          <div className="only-if-active">
            <hr className="my-0"/>
            <ListGroup className="list-group borderless px-1"></ListGroup>

            &nbsp;
          </div>

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
                  title="Save changes">
                  SAVE
                </Button>

              </div>
            </div>
          </div>

        </div>
      </div>
      {/* <!-- temp  END --> */}

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
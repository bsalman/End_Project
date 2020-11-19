import React, { Fragment, useEffect, useState, useRef } from 'react'
// import {connect} from 'react-redux' import {useParams, useHistory} from
// 'react-router-dom'
import { Link } from 'react-router-dom'
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
import { connect } from 'react-redux'

// importing the components
// importing the action
import { setRoomsAction } from '../actions'
import { useParams } from 'react-router-dom';
import CustomModal from './CustomModal'
import MotionDeviceSetting from './MotionDeviceSetting'
import { editDevicePost, getMotionRelatedDevicesPost, reversMotionDevicesPost } from '../services/api'



const MotionSettings = (props) => {


  useEffect(() => {
    getMotionRelatedDevicesPost(params.id).then(relatedDevices => {
      // motionDevices : [
      //   {startTime: '',
      //   stopTime: '',
      //   selectedDevice: null,}],
      let checkChecked = true
      const motionDevices = relatedDevices.map(device => {
        if(device.active != 1)
        checkChecked = false
        return (
          {
            startTime: device.start_time,
            stopTime: device.stop_time,
            selectedDevice: device.device_id,
            id: device.id,
            active: device.active
          })
      })
      // motionDevices.push(
      //   {
      //     startTime: '',
      //     stopTime: '',
      //     selectedDevice: null,
      //     id: null,
      //     active: 1
      //   }
      // )

      setState({ ...state, motionDevices: motionDevices, checked: checkChecked })
    })
  }, [])


  const params = useParams()

  // console.log('params:',params);
  // console.log('paramsDeviceCategory:',params.deviceCategory);
  // console.log('paramsDeviceName:',params.deviceName);
  // console.log('paramsRoomId:',params.roomId);
  // console.log('paramsId:',params.id);
  // console.log('props', props);
  // console.log('rooms', props);

  const initialState = {
    errorModal: {
      show: false,
      title: '',
      content: null
    },
    //time on/off
    motionDevices: [
      ],
    showdownTime: "",
    ternOnTim: "",
    classChecked: "",
    serialNumber: "",
    checked: false
  }
  //=======================================//
  const [state,
    setState] = useState(initialState)


  let roomInfo = {
    roomType: '',
    deviceCategory: '',
    deviceName: ''
  }

  const appliancDevices = []
  if (props.rooms.length > 0) {
    const selectedRoom = props.rooms.find(room => room.id == params.roomId)
    //const selectedDevices = selectedRoom.devices.find(device => device.id == params.id)
    // console.log('selectedRoom', selectedRoom)
    // console.log('selectedDevices', selectedDevices)

    selectedRoom.devices.forEach(device => {
      if (device.category == 'Light' || device.category == 'Appliance') {
        appliancDevices.push(<option key={device.id} value={device.id}>{device.name}</option>)
      }
    });
    roomInfo.roomType = selectedRoom.type
    roomInfo.deviceCategory = params.deviceCategory
    roomInfo.deviceName = params.deviceName
  }

  const motionDevicesElement = state.motionDevices.map((motiondevice, idx) => {
    return (
      <MotionDeviceSetting motiondevice={motiondevice} appliancDevices={appliancDevices} motionId={params.id}  key={idx}/>
    )
  })





  //add new time on + btn click function
  const addNewTimeBoxBtn = (e) => {
    e.preventDefault()
    //// big NOOOOOOOOOOOOOO
    //state.motionDevices.forEach(Element=>{
    const newMotionDevices = state.motionDevices
    newMotionDevices.push({
      startTime: '',
      stopTime: '',
      selectedDevice: '',
      id: null,
      active: 1
    })
    setState({ ...state, motionDevices: newMotionDevices })
    //})


    // console.log('hi');

    // console.log('state,motionDevices', state.motionDevices);
  }

  const reversMotionDevices = (e) => {
    e.preventDefault()
    // console.log('click');
    reversMotionDevicesPost(params.id, e.target.checked ? 1 : 0).then(relatedDevices => {
      const motionDevices = relatedDevices.map(device => {
      
        return (
          {
            startTime: device.start_time,
            stopTime: device.stop_time,
            selectedDevice: device.device_id,
            id: device.id,
            active: device.active
          })
      })
      // motionDevices.push(
      //   {
      //     startTime: '',
      //     stopTime: '',
      //     selectedDevice: null,
      //     id: null,
      //     active: 1
      //   }
      // )

      setState({ ...state, motionDevices: motionDevices, checked: !state.checked })
    })
    
  }

  //============== edit serial number function  ========================//
  const editSerialNumberOnClick = (e) => {
    e.preventDefault()


        if (state.serialNumber.trim() === '') {
          const errorsElement = (
            <ListGroup>
              {state.serialNumber.trim() === ''? <div>Serial Number empty</div>: null}
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
  }else {
      editDevicePost(params.id, state.serialNumber).then((device) => {

        //const devices = props.rooms.find(room => room.id == device.room_id)

        if (device) {
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
          // console.log("device", device);
          const newRooms = props.rooms.map(room => {
            if (room.id === device.room_id) {
              room.devices[room.devices.map(device => device.id).indexOf(device.id)] = device
              // room.devices.push(device)
            }
            return room;
          });
          // {id: 25, name: "3", number: "147", category: "Light", room_id: 91}
          props.setRoomsAction(newRooms)
          setState({ ...state, serialNumber: "" })

        }

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
            <ListGroup className=" row list-group borderless">
              <ListGroupItem className="list-group-item align-items-center">
                <h5 className="card-title ml-4">Motion On
                </h5>
                <div className="d-flex ml-auto align-items-center ">
                  <Label className={`switch ml-auto ${state.checked === true ? 'checked' : ''}`} >
                    <Input type="checkbox" id="tv-lcd-2" onChange={reversMotionDevices} checked={state.checked}/>
                  </Label>
                </div>
              </ListGroupItem>
            </ListGroup>
            {/* <!-- Motion On + button END --> */}



            {/* <!-- time from to input START --> */}
            <div>
              <hr className="my-0" />


              {/* {state.displayMotionDevices} */}
              {motionDevicesElement}

              <div className="row col-2 ml-3 mb-3 mt-4">
                <Button
                  type="button"
                  className="btn btn-primary"
                  data-toggle="tooltip"
                  data-placement="right"
                  title="Set Timer"
                  onClick={addNewTimeBoxBtn}>
                  <i className="fas fa-plus"></i>
                </Button>
                    &nbsp;&nbsp;
              </div>
            </div>

            {/* <!-- time from to input END --> */}



            {/* <!-- serial number START --> */}
            <hr className="my-0" />
            <hr className="my-0" />
            <div className="col-12">
              <Form>
                <FormGroup className="row mt-4">
                  <Label for="serialNumber" sm={2}>Serial Number</Label>
                  <Col sm={8}>
                    <Input
                      type="text"
                      name="serial-number"
                      id="serialNumber"
                      placeholder="insert new Serial Number"
                      value={state.serialNumber}
                      onChange={(e) => { setState({ ...state, serialNumber: e.target.value }) }} />
                  </Col>
                </FormGroup>

              </Form>
            </div>
            {/* <!-- serial number END --> */}




            {/* <!-- button Save START --> */}
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

export default connect(setStateToProps, { setRoomsAction })(MotionSettings)
//export default SingleRoomOv

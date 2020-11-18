//------------------------------------------------------------//
///////////////       IMPORT DEPENDENCIES     //////////////////
//------------------------------------------------------------//
import React, {useRef, useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalBody,
  ModalFooter
} from 'reactstrap';

import CustomModal from './CustomModal'
import ConfirmModal from './ConfirmModal'
import {addRoomPost} from '../services/api'
import {setRoomsAction} from '../actions'
import {addDevicePost, deleteRoomPost, editRoomPost, editSecurePost} from '../services/api'


//------------------------------------------------------------//
///////////////         CLASS COMPONENT       //////////////////
//------------------------------------------------------------//

const Rooms = (props) => {

  const deviceLiRef = useRef()
  
  //===================== Set the initial state ======================//
  let intialState = {

    //for the modal of errors
    errorModal: {
      show: false,
      title: '',
      content: null
    },

    //for the modal of confirmation of delete
    confirmModal: {
        confirmModalShow: false,
        confirmModalElement: null,
        confirmModalPayLoad: null
    },

    //add data for the room
    roomModalShow: false,
    newRoomName: '',
    newRoomType: '',

    // add data for the device
    deviceName: '',
    categoryID: '',
    deviceSerialNumType: '',
    applianceType:'',
    deviceModalShow: false,

    // edit data for the room
    roomDeviceModalShow: false,

    //selected data for the clicked room
    selectedRoomId: '',
    selectedRoomTitle: '',

    //set the security alarm
    securityAlarm :false,

    //show red border on add device
    error:{
      deviceNameFilled: false,
      deviceCategoryIDFilled: false,
      deviceSerialNumTypeFilled: false,
      deviceApplianceTypeFilled: false,
    } 
  }

  const [state,setState] = useState(intialState)


//===================== Set the initial state ======================//
console.log(props.rooms);
const roomElement = props.rooms.map(room => {
  //console.log(room);
  //mapping the devices inside room
  const devices = room
    .devices
    .map(device => {
      return (
        <li ref={deviceLiRef} key={device.id} className="list-group-item">
          <p className="specs">{device.name}</p>
      <p className="ml-auto mb-0 text-success">{device.connected ? 'connected' : 'disconnected'}</p>
        </li>
      )
    })
    
  //return the rooms
  return (
    
    <div key={room.id} className="col-sm-12 col-md-6 col-xl-4">
      <div className={`card lock ${room.secure === 0  ? "" : "active"}`} data-unit="switch-house-lock">
        <div className="card-body">
          <div className="row">
            <div className="col-auto mr-auto">
              <h5 className="card-title">{room.type}: {room.name}</h5>
            </div>
            <div className="col-auto ">
              <Link to={"/room/" + room.type.replace(/ /g, '_') + "/" + room.id}><Button
                  type="button"
                  className="btn btn-primary"
                  data-toggle="tooltip"
                  data-placement="right"
                  title="View Room">
                  <i className="far fa-eye"></i>
                </Button>
              </Link>
            </div>
          </div>

        </div>


        {/* device element START*/}

        <hr className="my-0"/>
        <div className="overflow">
          <ul className="list-group borderless px-1">
            {devices}
          </ul>
        </div>
        <hr className="my-0"/>

        {/* device element END*/}

        <div className="card-body">
          <div className="row">
            <div className="col-auto mr-auto">
              <Button
                type="button"
                className="btn btn-primary"
                data-toggle="tooltip"
                data-placement="right"
                title="Add Devices"
                onClick={()=>{deviceModaltoggle(room.id,room.type)}}>
                <i className="fas fa-plus"></i>
              </Button>
              &nbsp;&nbsp;</div>
            <div className="col-auto">

              <Button
                type="button"
                className="btn btn-primary"
                data-toggle="tooltip"
                data-placement="left"
                title="Set Security"
                onClick={(e)=>{setSecurityModaltoggle(e,room.id)}}
                id={'switch-house-lock-' + room.id} >
                <img src={`${room.secure === 0 ?"../images/open-padlock.png":"../images/lock.png"}`} style={{width:"20px",height:"20px"}} ></img>
              </Button>
              &nbsp;&nbsp;

              <Button
                type="button"
                className="btn btn-primary"
                data-toggle="tooltip"
                data-placement="left"
                title="Edit Room"
                onClick={()=>{editModaltoggle(room.id,room.name,room.type,room.devices)}}>
                <i className="fas fa-tools"></i>
              </Button>
              &nbsp;&nbsp;

              <Button
                type="button"
                className="btn btn-primary"
                data-toggle="tooltip"
                data-placement="right"
                title="Delete Room"
                onClick={()=>{deleteBtnClick(room.id)}}>
                <i className="far fa-trash-alt"></i>
              </Button>

            </div>
          </div>
        </div>

      </div>
    </div>

  )
})

//ADD ROOMS

const roomModaltoggle = () => {
  setState({
    ...state,
    roomModalShow: !state.roomModalShow
  })
}

const onAddRoomClick = e => {
  e.preventDefault();
  if (state.newRoomName.trim() === '' || state.newRoomType === '') {
    const errorsElement = (
      <ul>
        {state.newRoomName.trim() === ''? <div>Room Name should not be empty</div>: null}
        {state.newRoomType === ''? <div>select one of the Options</div>: null}
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
  } else {
    addRoomPost(state.newRoomName, state.newRoomType).then(data => {
      //console.log('data',data);
      let badgeClass = ''
      let badgeMessage = ''
      let badgeTitle = ''
      switch (data) {

        case 2:
          badgeClass = 'alert alert-danger'
          badgeMessage = 'You had an empty data, please fill your data '
          badgeTitle = 'Empty Entries'
          break;
        case 3:
          badgeClass = 'alert alert-danger'
          badgeMessage = 'this name is all ready exist, please change the name of the room '
          badgeTitle = 'Room Name is exist'
          break;
        case 4:
          badgeClass = 'alert alert-danger'
          badgeMessage = 'There was a server side error, please contact the administrator'
          badgeTitle = 'Server side error'
          break;
        default:
          const newState = {...state}
          newState.newRoomName = ''
          newState.newRoomType = ''
          setState(newState)

          // props.setRoomsAction(data,null,1) //saving all the rooms
          props.setRoomsAction(data) 
          break;
      }
      if (!isNaN(data)) {
        const badge = (
          <div className={badgeClass} role="alert">
            {badgeMessage}
          </div>
        )
        const newState = {...state}
        newState.errorModal.show = true
        newState.errorModal.title = badgeTitle
        newState.errorModal.content = badge
        // hide addroom modal because we need to show error modal and we can not show
        // two modals on the same time
        newState.roomModalShow = false
        setState(newState)

      }
    }).catch((error) => {
      // console.log(error);
      const badge = (
        <div className="alert alert-danger" role="alert">
          can not send the registration data to server
        </div>
      )
      const newState = {...state}
    newState.errorModal.content= badge
    setState(newState)
    })

  }
}



//ADD DEVICE
  const deviceModaltoggle = (roomID,roomType) => {
    const newState = {...state}
    newState.error.deviceNameFilled = false
    newState.error.deviceCategoryIDFilled = false
    newState.error.deviceSerialNumTypeFilled = false
    newState.deviceModalShow = !state.deviceModalShow
    newState.selectedRoomId = roomID
    newState.selectedRoomTitle = roomType
    setState(newState)
  }

  const onAddDeviceClick = (e) => {
    e.preventDefault();
    
      if(state.deviceName.trim()===''||state.categoryID ===''||state.deviceSerialNumType ===''){
        //device name
        if(state.deviceName.trim()===''){
          const newState = {...state}
          newState.error.deviceNameFilled = true
          setState(newState)
        }else {
          const newState = {...state}
          newState.error.deviceNameFilled = false
          setState(newState)
        }

        //categoryid
        if(state.categoryID.trim()===''){
          const newState = {...state}
          newState.error.deviceCategoryIDFilled = true
          setState(newState)
        }else {
          const newState = {...state}
          newState.error.deviceCategoryIDFilled = false
          setState(newState)
        }

        //device serialNumber
        if(state.deviceSerialNumType.trim()===''){
          const newState = {...state}
          newState.error.deviceSerialNumTypeFilled = true
          setState(newState)
        }else {
          const newState = {...state}
          newState.error.deviceSerialNumTypeFilled = false
          setState(newState)
        }


        
        // const errorsElement=(
        //     <ul>
        //           {state.deviceName.trim() === ''? <div>Device Name should not be empty</div>: null}
        //           {state.categoryID ===''? <div>select one of the type Options</div>: null}
        //           {state.deviceSerialNumType ===''? <div>select one of the serial number Options</div>: null}
        //       </ul>
        // )
        // const newState = {...state}
        // newState.errorModal.show = true
        // newState.errorModal.title = "Entries Error"
        // newState.errorModal.content = errorsElement
        // // hide addroom modal because we need to show error modal and we can not show two modals on the same time
        // newState.deviceModalShow = false
        // setState(newState)
    }else{
      let imgUrl="";
      switch (state.applianceType) {
        
        case "Washing-machine":
          imgUrl="/images/washing-machine.png";
          break;
          case "Fridge":
            imgUrl="/images/fridge1.png";
            break;
            case "Dishwasher":
              imgUrl="/images/dishwasher1.png";
              break;
              case "Stereo":
                imgUrl="/images/stereo.png";
                break;
                case "Tv":
                  imgUrl="/images/tv.png";
                  break;
                  case "Microwave":
                  imgUrl="/images/microwave.png";
                  break;
                  case "Other":
                    imgUrl="/images/other.png";
                    break;
        default:
          break;
      }
        const newState = {...state}
        newState.deviceName = ''
        newState.categoryID = ''
        newState.deviceSerialNumType = ''
        newState.applianceType=''
        newState.deviceModalShow = false
        addDevicePost(state.deviceName,state.categoryID,state.deviceSerialNumType,state.selectedRoomId,imgUrl).then(device => {
            // console.log('device',device);
            // console.log('propsessen3',props.setRoomsAction);
            const newRooms = props.rooms.map(room => {
              if(room.id === device.room_id){

                  room.devices.push(device)
              }
              return room;
          });
          props.setRoomsAction(newRooms) //2 is the secondType that  means we are just adding a new device.
          setState(newState)

        }).catch(error=> {
            console.log(error);
        })
        

    }
  }

//DELETE ROOM AND DEVICE TOGETHER

  const deleteBtnClick = (roomId) => {
  // console.log('showmodal',state);
  
      const newState = {...state}
      newState.confirmModal.confirmModalShow= true,
      newState.confirmModal.confirmModalPayLoad= roomId,
      newState.confirmModal.confirmModalElement= <p>I hope you know what you are doing, this room is going to be deleted forever.</p>
      setState(newState)
  }

  const deleteConfirm = roomid => {
  // console.log(roomid)
  deleteRoomPost(roomid).then(data=> {
      // console.log('data',data);
      // console.log('props',props.rooms);
      let badgeClass = ''
      let badgeMessage = ''
      let badgeTitle = ''
    switch (data) {
      case 10:
        history.push('/login')
        break;
      case 2:
        // console.log('server error');
        badgeClass = 'alert alert-danger'
        badgeMessage = 'Can not find a room with this id, contact the administrator'
        badgeTitle = 'Room not found'
        break;
    
      case 3:
        // console.log('server error');
        badgeClass = 'alert alert-danger'
        badgeMessage = 'There was a server side error, please contact the administrator'
        badgeTitle = 'Server side error'
        break;
      default:
        // console.log('state',state);
        // const newRooms = [...props.rooms]
        props.rooms.splice(props.rooms.indexOf(props.rooms.find(element => element.id === roomid)),1)
        const newState = {...state}
        newState.confirmModal.confirmModalShow = false
        setState(newState)
        break;
    }
    if (data !== 1) {
      const badge = (
        <div className={badgeClass} role="alert">
          {badgeMessage}
        </div>
      )
      const newState = {...state}
      newState.errorModal.show = true
      newState.errorModal.title = badgeTitle
      newState.errorModal.content = badge
      // hide addroom modal because we need to show error modal and we can not show
      // two modals on the same time
      newState.confirmModal.confirmModalShow = false
      setState(newState)

    }
  }).catch((error) => {
    // console.log(error);
    const badge = (
      <div className="alert alert-danger" role="alert">
        can not send the registration data to server
      </div>
    )
    const newState = {...state}
    newState.errorModal.content= badge
    setState(newState)
  })
  }


//EDIT ROOM

  const deviceRoomModaltoggle = () => {
    setState({...state,
      roomDeviceModalShow: !state.roomDeviceModalShow})
  }
  
  const editModaltoggle = (roomId,roomName,roomType,roomDevice) => {
    const obj = {
      roomId,
      roomName,
      roomType,
      roomDevice
    }
    // console.log('roomData',obj);
  
    setState({...state,
              roomDeviceModalShow: !state.roomDeviceModalShow,
              selectedRoomId: roomId,
              newRoomName: obj.roomName,
              newRoomType: obj.roomType
      })
        
  }


  // console.log('selectedRoomId:',state.selectedRoomId);
  //=========================================//

//CLOSE MODALS
    const errorModalClose = () => {
    const newState = {
      ...state
    }
    newState.errorModal.show = false
    setState(newState)
  }

  const closeConfirmModal = () => {
    const newState = {...state }
    newState.confirmModal.confirmModalShow = false
    setState(newState)
    
  }



  //=====================================================//
//set the security botton
const setSecurityModaltoggle = (e,roomId) => {
  
  e.preventDefault()
        // setState({...state,isOpen:!state.isOpen})
        const rooms = [...props.rooms]
        let room = rooms.find(room => room.id == roomId)
        room.secure= room.secure == 0 ? 1 : 0

  editSecurePost(roomId,room.secure).then(data => {
    //console.log(data);
    rooms[rooms.map(room => room.id).indexOf(roomId)] = room
    props.setRoomsAction(rooms)
    if(!state.securityAlarm){
      props.socket.emit('stop_home_alarm', null)
    }
    setState({...state, securityAlarm : !state.securityAlarm})

  }).catch(error => {
    console.log(error);
  })
  
}

  //================================================//



const onEditRoomClick = (e) => {
  e.preventDefault()
  // console.log(state);
        editRoomPost(state.newRoomName, state.newRoomType, state.selectedRoomId).then((data) => {
          // console.log('change',data);
          switch (data) {
          
            case 2:
              const newState = {...state}
              newState.errorModal.show = true
              newState.errorModal.title = 'updates failed'
              newState.errorModal.content = <p>Can not update the room, because it can not find the room with this id</p>
              // hide addroom modal because we need to show error modal and we can not show
              // two modals on the same time
              newState.roomDeviceModalShow = false
              setState(newState)
            break;

            case 3:
              const newState1 = {...state}
              newState1.errorModal.show = true
              newState1.errorModal.title = 'Server Side Error'
              newState1.errorModal.content = <p>There was a server side error, please contact the administrator</p>
              // hide addroom modal because we need to show error modal and we can not show
              // two modals on the same time
              newState1.roomDeviceModalShow = false
              setState(newState1)
            break;

            // case 10:
            //   history.push('/login')
            // break;
        
          default:
            const newState2 = {...state}
            newState2.roomDeviceModalShow = false
            setState(newState2)
            console.log('propsessen',props.setRoomsAction);
            
            props.setRoomsAction(data)
            // props.setRoomsAction(null,data.device,3)
            break;
           }
        }).catch(error => {
          // console.log(error);
          const badge = (
            <div className="alert alert-danger" role="alert">
              can not send the registration data to server
            </div>
          )
          const newState = {...state}
          newState.errorModal.content= badge
          setState(newState)
        })

    // }
  
}

  return (
    <React.Fragment>
      <div>
        <div className="row">
          {/* add rooms card start  */}
          <div className="col-sm-12 col-md-6 col-xl-4">
            <div className="card">
              <div className="card-body d-flex flex-row justify-content-center">
                <h2 className="card-title">Rooms</h2>
              </div>
              <hr className="my-0"/>
              <div className="card-body d-flex flex-row justify-content-center">
                <Button
                  data-action=""
                  className="btn btn-primary btn-lg  "
                  onClick={roomModaltoggle}>
                  <strong>Add New Room</strong>
                </Button>
              </div>
            </div>
          </div>
          {roomElement}
          {/* add rooms card end  */}
          {/* ===========================rooms element====================================== */}
        </div>
      </div>

      <CustomModal
        show={state.errorModal.show}
        close={errorModalClose}
        className="bg-danger"
        title={state.errorModal.title}>
        {state.errorModal.content}
      </CustomModal>

      <ConfirmModal
        className="bg-danger"
        show={state.confirmModal.confirmModalShow}
        close={closeConfirmModal}
        title="Confirm Delete"
        payload={state.confirmModal.confirmModalPayLoad}
        onConfirm={deleteConfirm}>
        {state.confirmModal.confirmModalElement}
      </ConfirmModal>


    {/* /*==================== MODAL FOR ADDING ROOM ==========================*/ }

      <Modal isOpen={state.roomModalShow} toggle={roomModaltoggle}>
        {/* <ModalHeader toggle={this.toggle}><h3 className="card-title">Add Room</h3></ModalHeader> */}
        <ModalBody >

          <h3 className="card-title modal-font">Add A New Room</h3>
          <Form className="p-2">
            <FormGroup className="row">
              <div className="col-12" modal-content="true">
                <Label for="room_name" className="col-12 col-form-label modal-font">Room Name</Label>
                <Input
                  className="form-control custom-focus"
                  type="text"
                  maxLength='12'
                  id="room_name"
                  onChange={e => {
                  setState({
                    ...state,newRoomName: e.target.value
                  })
                }}
                  value={state.newRoomName}/>
              </div>
            </FormGroup>
            <FormGroup className="form-group row">
              <div className="col-12">
                <Label for="room_type" className="col-12 col-form-label modal-font">Room Type</Label>
                <Input
                  className="form-control custom-focus"
                  type="select"
                  name="select"
                  id="room_type"
                  onChange={(e) => {
                  setState({
                    ...state,
                    newRoomType: e.target.value
                  })
                }}
                  value={state.newRoomType}>
                  <option></option>
                  <option>Kitchen</option>
                  <option>Dining-room</option>
                  <option>Living-room</option>
                  <option>Sleeping-room</option>
                  <option>Bathroom</option>
                  <option>Garage</option>
                </Input>
              </div>
            </FormGroup>
          </Form>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onAddRoomClick}>save</Button>
          <Button color="secondary" onClick={roomModaltoggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
      
      {/* ------------------------------- */}



      {/* /*==================== MODAL FOR ADDING DEVICE ==========================*/ }

      <Modal isOpen={state.deviceModalShow} toggle={deviceModaltoggle}>
        {/* <ModalHeader toggle={this.toggle}><h3 className="card-title">Add Room</h3></ModalHeader> */}
        <ModalBody >
          <h3 className="card-title modal-font">Add Device</h3>
          <Form className="p-2">
            <FormGroup className="row">
              <div className="col-12" modal-content="true">
                <Label for="device_name" className="col-12 col-form-label modal-font">Device Name</Label >
                <Input
                  className={`form-control custom-focus ${state.error.deviceNameFilled ? 'border-danger' : ''}`}
                  type="text"
                  maxLength='12'
                  id="device_name"
                  onChange={e => {
                  setState({
                    ...state,
                    deviceName: e.target.value
                  })
                }}
                  value={state.deviceName}/>
                  <span className={`d-none ${state.error.deviceNameFilled ? 'text-danger d-block' : ''}`}>Device Name shouldnt be empty</span>
              </div>
            </FormGroup>

            <FormGroup className="form-group row">
              <div className="col-12">
                <Label for="room_type" className="col-12 col-form-label modal-font">Device Type</Label>
                <Input
                  className={`form-control custom-focus ${state.error.deviceCategoryIDFilled ? 'border-danger' : ''}`}
                  type="select"
                  name="select"
                  id="room_type"
                  onChange={(e) => {
                  setState({
                    ...state,
                    categoryID: e.target.value
                  })
                }}
                  value={state.categoryID}>
                   
                  <option></option>
                  <option>Light</option>
                  <option>Temperature</option>
                  <option>Motion</option>
                  <option>Appliance</option>
                </Input>
                <span className={`d-none ${state.error.deviceCategoryIDFilled ? 'text-danger d-block' : ''}`}>Device Type shouldnt be empty</span>
              </div>
            </FormGroup>

            <FormGroup className="form-group row">
              <div className="col-12">
                <Label for="appliance_Type" className="col-12 col-form-label modal-font">Appliance Type</Label>
                <Input
                 disabled={`${state.categoryID=="Appliance"?"":"disabled"}`}
                 className={`form-control custom-focus ${state.error.deviceApplianceTypeFilled ? 'border-danger' : ''}`}
                  type="select"
                  name="select"
                  id="appliance_Type"
                  onChange={(e) => {
                  setState({
                    ...state,
                    applianceType: e.target.value
                  })
                }}
                
                  value={state.applianceType}>
                    
                  <option></option>
                  <option>Washing-machine</option>
                  <option>Fridge</option>
                  <option>Dishwasher</option>
                  <option>Stereo</option>
                  <option>Tv</option>
                  <option>Microwave</option>
                  <option>Other</option>
                </Input>
                <span className={`d-none ${state.error.deviceApplianceTypeFilled ? 'text-danger d-block' : ''}`}>Device Appliance Type shouldnt be empty</span>
              </div>
            </FormGroup>


            <FormGroup className="row">
              <div className="col-12" modal-content="true">
                <Label for="device_seralNum" className="col-12 col-form-label modal-font">Device Serial Number</Label >
                <Input
                  className={`form-control custom-focus ${state.error.deviceSerialNumTypeFilled ? 'border-danger' : ''}`}
                  type="text"
                  maxLength='15'
                  id="device_seralNum"
                  onChange={e => {
                  setState({
                    ...state,
                    deviceSerialNumType: e.target.value
                  })
                }}
                  value={state.deviceSerialNumType}/>
                  <span className={`d-none ${state.error.deviceSerialNumTypeFilled ? 'text-danger d-block' : ''}`}>Device Serial Number shouldnt be empty</span>
              </div>
            </FormGroup>
          </Form>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onAddDeviceClick}>save</Button>
          <Button color="secondary" onClick={deviceModaltoggle}>Cancel</Button>
          {/* <Button color="secondary" onClick={toggle}>Cancel</Button> */}
        </ModalFooter>
      </Modal>
      
      {/* --------------------------------------------------------- */}




      {/* /*==================== MODAL FOR UPDATING ROOM ==========================*/ }

      <Modal isOpen={state.roomDeviceModalShow} toggle={deviceRoomModaltoggle}>
        {/* <ModalHeader toggle={this.toggle}><h3 className="card-title">Add Room</h3></ModalHeader> */}
        <ModalBody >
          <h3 className="card-title modal-font">Update Room and Devices</h3>
          <Form className="p-2">
            <FormGroup className="row">
              <div className="col-6" modal-content="true">
                <Label for="room_name" className="col-12 col-form-label modal-font">Room Name</Label>
                <Input
                  className="form-control custom-focus"
                  type="text"
                  id="room_name"
                  onChange={e => {
                  setState({
                    ...state,newRoomName: e.target.value
                  })
                }}
                  value={state.newRoomName}/>
              </div>
              <div className="col-6 form-group">
                <Label for="room_type" className="col-12 col-form-label modal-font">Room Type</Label>
                <Input
                  className="form-control custom-focus"
                  type="select"
                  name="select"
                  id="room_type"
                  onChange={(e) => {
                  setState({
                    ...state,
                    newRoomType: e.target.value
                  })
                }}
                  value={state.newRoomType}>
                  <option></option>
                  <option>Kitchen</option>
                  <option>Dining-room</option>
                  <option>Living-room</option>
                  <option>Sleeping-room</option>
                  <option>Bathroom</option>
                  <option>Garage</option>
                </Input>
              </div>
            </FormGroup>

          </Form>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onEditRoomClick}>save</Button>
          <Button color="secondary" onClick={deviceRoomModaltoggle}>Cancel</Button>
          {/* <Button color="secondary" onClick={toggle}>Cancel</Button> */}
        </ModalFooter>
      </Modal>
      
      {/* --------------------------------------------------------- */}
    </React.Fragment>
  )

}



//--------------------------------------------------------------------------------//
///////////////        USE REDUX TO GET ROOMS FROM MAIN STATE      /////////////////
//--------------------------------------------------------------------------------//

const setStateToProps = (state) => {
  return ({
    rooms: state.rooms,
    socket: state.socket
  })
}

export default connect(setStateToProps, {setRoomsAction})(Rooms)
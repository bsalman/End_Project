import React, { useState } from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';

import {ListGroup, ListGroupItem,Button, Label, Input} from 'reactstrap';


// importing the action
import {setRoomsAction} from '../actions'

import {deleteDevicePost} from '../services/api'
import ConfirmModal from './ConfirmModal'
import CustomModal from './CustomModal'

import { useParams } from 'react-router-dom';



const Light = (props) =>{


  const params = useParams()
  // console.log('params.id',params.id);
// const roomsArr= props.roomsArr


let intialState = {
   checked:false,
   
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
  }}

  const [state,setState] = useState(intialState)


  const lightInfo={

    lightElementArr:[]

  }
  //============================//
  const turnOnOff=(e)=> {
     e.preventDefault()
    setState({...state,
      checked: !state.checked})
  }
  //=============================//
  if(props.rooms.length > 0) {
     
    const lightElement = props.lightDevices.map((device) =>{

      return(
        
        <div key={device.id} className="card active" data-unit="switch-light-1">
        {/* <!-- Light switch START --> */}
        <div className="card-body d-flex flex-row justify-content-start">
        <img src="../images/light.png"></img>
          <h5>{device.name}</h5>
          <Label className={`switch ml-auto ${state.checked === true ? 'checked' : '' }`} onClick={turnOnOff} >
            <Input type="checkbox" id={'switch-light-' + device.id} />  {/* checked/ */}
          </Label>
        </div>
        {/* <!-- Light switch END --> */}
        <hr className="my-0" />
        {/* <!-- Bulb details START --> */}
        &nbsp;&nbsp;&nbsp;
        <ListGroup className="list-group borderless px-1">
          <ListGroupItem className="list-group-item pt-0 pb-4">
            <p className="specs">Serial Nr</p>
            <p className="ml-auto mb-0">{device.number}</p>
          </ListGroupItem>
        </ListGroup>
        {/* <!-- Bulb details END --> */}
       
     <div className="card-body">
    <div className="row">
      <div className="col-auto mr-auto">
        <Link  to={"/lightSetting/" + device.category+"/"+ device.name + "/" + device.room_id+"/"+device.id}>
      <Button
          type="button"
          className="btn btn-primary"
          data-toggle="tooltip"
          data-placement="left"
          title="Edit Room"
          >
          <i className="fas fa-tools"></i>
        </Button></Link>
        &nbsp;&nbsp;</div>
      <div className="col-auto">

      
        &nbsp;&nbsp;

        <Button
          type="button"
          className="btn btn-primary"
          data-toggle="tooltip"
          data-placement="right"
          title="Delete Room"
          onClick={()=>{deleteBtnClick(device.id)}}>
          <i className="far fa-trash-alt"></i>
        </Button>

      </div>
    </div>
  </div>
</div>

      )

    })
      
    lightInfo.lightElementArr = lightElement
   
  }


//deleteDevicePost=(deviceId)
const deleteBtnClick = (deviceId) => {
  // console.log('showmodal',state);
  
  const newState = {...state}
  newState.confirmModal.confirmModalShow= true,
  newState.confirmModal.confirmModalPayLoad= deviceId,
  newState.confirmModal.confirmModalElement= <p>I hope you know what you are doing , this device gonna be deleted for ever</p>
  setState(newState)
}

const deleteConfirm = deviceId => {
  // console.log('deviceId',deviceId)
  deleteDevicePost(deviceId,params.id).then(data=> {
    // console.log('deviceId',deviceId)
    // console.log('params.id',params.id)
    //   console.log('data',data);
      // console.log('props',props.rooms);
      let badgeClass = ''
      let badgeMessage = ''
      let badgeTitle = ''
    //data success
    //2 this device id doesnt exist
    //3 kein devices
    //4 server error
    switch (data) {
      case 10:
        history.push('/login')
        break;
      case 3:
        // console.log('server error');
        badgeClass = 'alert alert-danger'
        badgeMessage = 'Can not find a device with this id, contact the administrator'
        badgeTitle = 'Device not found'
        break;
      case 2:
          // console.log('server error');
          badgeClass = 'alert alert-danger'
          badgeMessage = 'There is no devices for this room, please add some'
          badgeTitle = 'Server side error'
          break;
      case 4:
        // console.log('server error');
        badgeClass = 'alert alert-danger'
        badgeMessage = 'There was a server side error, please contact the adminstrator'
        badgeTitle = 'Server side error'
        break;
      default:
        // console.log('state',params.id);
        // const newRooms = [...props.rooms]
        // const roomId = params.id
        // const x= data.find(element => element.room_id === params.id)
        // console.log('props.rooms',x);
        //props.tempDevices.splice(props.tempDevices.indexOf(props.tempDevices.find(element => element.id === deviceId)),1)
        
        console.log("device", data);
                    const newRooms = props.rooms.map(room => {
                      console.log('data.room_id',data[0]);
                      if(room.id === data[0].room_id){
                        //room.devices[room.devices.map(data => data.id).indexOf(data.id)] = data
                      // //     // room.devices.push(device)
                      console.log('room',room);
                      room.devices.splice(room.devices.indexOf(room.devices.find(element => element.id === deviceId)),1)
                      }
                      
                      
                      return room;
                  });
                    // {id: 25, name: "3", number: "147", category: "Light", room_id: 91}
                props.setRoomsAction(newRooms)
                     
        const newState = {...state}
        newState.confirmModal.confirmModalShow = false
        setState(newState)
        break;
    }
    if (typeof(data) === 'number') {
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


  const closeConfirmModal = () => {
    const newState = {...state }
    newState.confirmModal.confirmModalShow = false
    setState(newState)
    
  }
  //CLOSE MODALS
  const errorModalClose = () => {
    const newState = {
      ...state
    }
    newState.errorModal.show = false
    setState(newState)
  }
  

return(

    <React.Fragment>

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
     
   
     
        <div className="col-12">
                {/* <!-- Light unit START --> */}
                 {lightInfo.lightElementArr }
                {/* <!-- Light unit END --> */}
              
           
        </div>
  

    </React.Fragment>
)



}

const setStateToProps = (state) => {
  return ({
    
      rooms: state.rooms
  })
}


export default connect(setStateToProps, {setRoomsAction})(Light)
//------------------------------------------------------------//
///////////////       IMPORT DEPENDENCIES     //////////////////
//------------------------------------------------------------//
import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import {Link, useParams} from 'react-router-dom'
import {ListGroup,ListGroupItem, Label, Input, Button} from 'reactstrap';

// import action 
import {setRoomsAction} from '../actions'

import {deleteDevicePost, editDataPost, getMotionRelatedDevicesPost} from '../services/api'
import ConfirmModal from './ConfirmModal'
import CustomModal from './CustomModal'


//------------------------------------------------------------//
///////////////         CLASS COMPONENT       //////////////////
//------------------------------------------------------------//

const Motion = (props) =>{

  const params = useParams()

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
    motionLightsArr : [],
    motionDevices: [...props.motionDevices]
  }

  const [state,setState] = useState(intialState)

  //===================== Set the variable for redux(main State) ======================//

  const motionInfo ={
    motionElementArr:[]
  }

      //============================//

      


      //=============================//
//console.log('props',props);
 //Check if rooms inside props are loading or not to use the redux method
  if(props.rooms.length > 0) {
 
    const motionElement = props.motionDevices.map(device =>{
      //console.log(device);
    

      return(
        <div key={device.id} className="card active" data-unit="tv-lcd-2">
          {/* Show the name of the device */}
          <ListGroup className="list-group borderless">
            <ListGroupItem className="list-group-item align-items-center">
              {/* <svg className="icon-sprite icon-1x">
                <use className="glow" fill="url(#radial-glow)" xlinkHref="images/icons-sprite.svg#glow"/>
                <use xlinkHref="images/icons-sprite.svg#camera"/>
              </svg> */}
              <img src="/images/wave.png"></img>
              <h5>{device.name}</h5>
              {/* <Label className={`switch ml-auto ${state.checked === true  ? 'checked' : '' }`} onClick={turnOnOff}>
              <Input type="checkbox" id="tv-lcd-2"/>  
              </Label> */}
            </ListGroupItem>
          </ListGroup>

          {/* <!-- Switch the button when we want to active the motion device --> */}        
            <hr className="my-0" />
            <ListGroup className="list-group borderless px-1">
            <hr className="my-0" />
            <ListGroupItem className="list-group-item list-group-item2 align-items-center">
              
              <p className="specs">Status</p>
              &nbsp;&nbsp;&nbsp;
              <p className="ml-auto mb-0 text-success">{device.connected? 'Connected': 'Disconnected'}</p>
              &nbsp;&nbsp;&nbsp;
            </ListGroupItem>       
            </ListGroup>

          {/* Show the device serial number */}
          <ListGroup className="list-group borderless">
            <hr className="my-0" />
            <ListGroupItem className="list-group-item list-group-item2 align-items-center">
              
              <p className="specs">Serial Nr</p>
              &nbsp;&nbsp;&nbsp;
              <p className="ml-auto mb-0">{device.number}</p>
              &nbsp;&nbsp;&nbsp;
            </ListGroupItem>
          </ListGroup>


          <div className="card-body">
            <div className="row">
              {/* Button for edit the device(shoot you to another page) */}
              <div className="col-auto mr-auto">
                <Link  to={"/motionSetting/" + device.category+"/"+ device.name + "/" + device.room_id+"/"+device.id}>
                  <Button
                    type="button"
                    className="btn btn-primary"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Edit Device">
                      <i className="fas fa-tools"></i>
                  </Button>
                </Link>
                &nbsp;&nbsp;
              </div>

              {/* Button for delete this device */}
              <div className="col-auto">
                &nbsp;&nbsp;
                <Button
                  type="button"
                  className="btn btn-primary"
                  data-toggle="tooltip"
                  data-placement="right"
                  title="Delete Device"
                  onClick={()=>{deleteBtnClick(device.id)}}>
                    <i className="far fa-trash-alt"></i>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )
    })


    //console.log('motionElement',props.motionDevices);
    // put the element that we crete inside the arr that we declared on the main state
    motionInfo.motionElementArr = motionElement

    

  }


  // Show the confirm Modal when we click on delete btn device
  const deleteBtnClick = (deviceId) => {
    const newState = {...state}
    newState.confirmModal.confirmModalShow= true,
    newState.confirmModal.confirmModalPayLoad= deviceId,
    newState.confirmModal.confirmModalElement= <p>I hope you know what you are doing , this device gonna be deleted for ever</p>
    setState(newState)
  }

  //Delete the device when we click on yes(call the api and delete from redux and sql database)
  const deleteConfirm = deviceId => {
    deleteDevicePost(deviceId,params.id).then(data=> {
      let badgeClass = ''
      let badgeMessage = ''
      let badgeTitle = ''
      //data success
      //2 this device id doesnt exist
      //3 kein devices
      //4 server error
      switch (data) {
        case 3:
          badgeClass = 'alert alert-danger'
          badgeMessage = 'Can not find a device with this id, contact the administrator'
          badgeTitle = 'Device not found'
          break;

        case 2:
          badgeClass = 'alert alert-danger'
          badgeMessage = 'There is no devices for this room, please add some'
          badgeTitle = 'Server side error'
        break;

        case 4:
          badgeClass = 'alert alert-danger'
          badgeMessage = 'There was a server side error, please contact the adminstrator'
          badgeTitle = 'Server side error'
        break;

        default:
          //delete the device slected from the main state(redux) ans set the rooms again
          const newRooms = props.rooms.map(room => {
            if(room.id === data[0].room_id){
              //Delete the selected device from the main state(redux)
              room.devices.splice(room.devices.indexOf(room.devices.find(element => element.id === deviceId)),1)
            }
            return room;
          });

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
        // hide confirm delete device modal 
        newState.confirmModal.confirmModalShow = false
        setState(newState)
      }
    }).catch((error) => {
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

      {/*  <!-- MOTION dEV COMPONENT CALL --> */}
      <div className="col-12">
        {/* <!-- MOTION  START --> */}
          {motionInfo.motionElementArr}
        {/* <!-- MOTION  END --> */}
      </div>
    
    </React.Fragment>
  )

}

const setStateToProps = (state) => {
  return ({
      rooms: state.rooms
  })
}

export default connect(setStateToProps, {setRoomsAction})(Motion)
//------------------------------------------------------------//
///////////////       IMPORT DEPENDENCIES     //////////////////
//------------------------------------------------------------//
import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import {Link, useParams } from 'react-router-dom';
import {ListGroup, ListGroupItem,Button, Label, Input} from 'reactstrap';

// importing the action
import {setRoomsAction} from '../actions'

import {deleteDevicePost, editDataPost, getDevicesPost} from '../services/api'
import ConfirmModal from './ConfirmModal'
import CustomModal from './CustomModal'


//------------------------------------------------------------//
///////////////         CLASS COMPONENT       //////////////////
//------------------------------------------------------------//

const Light = (props) =>{

  const params = useParams()
// console.log(params);
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
    }


  }

  const [state,setState] = useState(intialState)

  //===================== Set the variable for redux(main State) ======================//

  const lightInfo={
      lightElementArr:[]
  }

  //Check if rooms inside props are loading or not to use the redux method
  // console.log('first load rooms', props.rooms);
  if(props.rooms.length > 0) {
      const lightElement = props.lightDevices.map(device =>{
        return(
          <div key={device.id} className="card active" data-unit="switch-light-1">
          {/* Show the name of the device */}
            <div className="card-body d-flex flex-row justify-content-start">
              {/* <svg className="icon-sprite">
                <use className="glow" fill="url(#radial-glow)" xlinkHref="images/icons-sprite.svg#glow"/>
                <use xlinkHref="images/icons-sprite.svg#bulb-eco"/>
              </svg> */}
             <h5><img src="/images/light.png"></img> {device.name}</h5>
              <Label className={`switch ml-auto ${device.data === 'on' ? 'checked' : '' }`} 
               onClick={(e) => {turnOnOff(e, device.id, device.room_id)}}>
                <Input type="checkbox" 
                id={'switch-light-' + device.id} 
                defaultChecked={device.data === 'on'} 
               />  {/* checked/ */}
              </Label>
            </div>
            <hr className="my-0" />
            <ListGroup className="list-group borderless px-1">
            <ListGroupItem className="list-group-item list-group-item2 align-items-center">
              
              <p className="specs">Status</p>
              &nbsp;&nbsp;&nbsp;
              <p className="ml-auto mb-0 text-success">{device.connected? 'Connected': 'Disconnected'}</p>
              &nbsp;&nbsp;&nbsp;
            </ListGroupItem>       
            </ListGroup>
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
                  title="Edit Device">
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
      
    lightInfo.lightElementArr = lightElement
   
  }

  // useEffect(() => {
  //   console.log(params.id)
  //   getDevicesPost(params.id).then(data => {
  //     console.log('data',data);
  //     setState({...state,})
  //   }).catch(error => {
  //     console.log(error);
  //   })
  // },[])




    //=============== switch on/off=============//
   
    const turnOnOff=(e, deviceid, roomid)=> {

      e.preventDefault()
      
        const rooms = [...props.rooms]
        let room = rooms.find(room => room.id == roomid)
        let device = room.devices.find(device => device.id == deviceid)
        device.data = device.data == 'on' ? 'off' : 'on'

       editDataPost(deviceid,device.data).then(data1 => {
        
        
        room.devices[room.devices.map(device => device.id).indexOf(deviceid)] = device
        rooms[rooms.map(room => room.id).indexOf(roomid)] = room
        // console.log('rooms after change', device.data);
        props.socket.emit('light_status', {status: device.data, sn: device.number})
        props.setRoomsAction(rooms)
       })
 
  
  
    }
    //=============================//

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
          const newRooms = props.rooms.map(room => {
            if(room.id === data[0].room_id){
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
        newState.confirmModal.confirmModalShow = false
        setState(newState)

      }
    }).catch((error) => {
      const badge = (
        <div className="alert alert-danger" role="alert">
          Can not send the registration data to server
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
     
   
      {/*  <!-- LIGHT dEV COMPONENT CALL  START --> */}     
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
    
      rooms: state.rooms,
      socket: state.socket
  })
}

export default connect(setStateToProps, {setRoomsAction})(Light)
//------------------------------------------------------------//
///////////////       IMPORT DEPENDENCIES     //////////////////
//------------------------------------------------------------//
import React, { useState } from 'react'
import {connect} from 'react-redux'
import {Link, useParams} from 'react-router-dom'
import {ListGroup, ListGroupItem, Button} from 'reactstrap';


import {setRoomsAction} from '../actions' 

import {deleteDevicePost} from '../services/api'
import ConfirmModal from './ConfirmModal'
import CustomModal from './CustomModal'



//------------------------------------------------------------//
///////////////         CLASS COMPONENT       //////////////////
//------------------------------------------------------------//

const Temperature = (props) => {

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
      }
  }

  const [state,setState] = useState(intialState)

  //===================== Set the variable for redux(main State) ======================//

  const tempInfo={
      tempElementArr:[]
  }
   

  //Check if rooms inside props are loading or not to use the redux method
  if(props.rooms.length > 0) {
      const tempElement = props.tempDevices.map(device=>{
        const data = device.data ? JSON.parse(device.data) : null 
        return(
          <div key={device.id} className="card temp-range heating" data-unit="room-temp-02">
            {/* Show the name of the device */}
            <ListGroup className="list-group borderless">
              <ListGroupItem className="list-group-item align-items-center">
              <img src="/images/temperature.png"></img>
                <h5>{device.name}</h5>
              </ListGroupItem>
            </ListGroup>
            <hr className="my-0" />
            <ListGroup className="list-group borderless px-1">
            <ListGroupItem className="list-group-item list-group-item2 align-items-center">
              
              <p className="specs">Status</p>
              &nbsp;&nbsp;&nbsp;
              <p className="ml-auto mb-0 text-success">{device.connected? 'Connected': 'Disconnected'}</p>
              &nbsp;&nbsp;&nbsp;
            </ListGroupItem>       
            </ListGroup>
            {/* Show the value of the temperature */}
            <hr className="my-0" />
            <div className="d-flex justify-content-between" data-rangeslider="room-temp-02">
              <ListGroup className="list-group borderless px-1 align-items-stretch">
              <br />
                <ListGroupItem className="list-group-item list-group-item1">
                  &nbsp;
                   <h5 className="specs mr-auto mb-auto">Current Temperature</h5>
                </ListGroupItem>
              </ListGroup>

              <div className="p-4" style={{position:'relative'}}>
                <p className="mr-auto mt-2 mb-0 ">
        <span className="room-temp-C">{data ? data.t : '0.00'}</span><sup className="sup1">°C</sup>
                </p>
                {/* <p className="mr-auto mt-2 mb-0 lead text-primary">
                  <span className="room-temp-F">71.6</span><sup>°F</sup>
                </p> */}
              </div>
            </div>
             &nbsp;&nbsp;&nbsp;
             <hr className="my-0" />
            <div className="d-flex justify-content-between" data-rangeslider="room-temp-02">
              <ListGroup className="list-group borderless px-1 align-items-stretch">
              <br />
                <ListGroupItem className="list-group-item list-group-item1">
                  &nbsp;
                   <h5 className="specs mr-auto mb-auto">Current Humidty</h5>
                </ListGroupItem>
              </ListGroup>

              <div className="p-4" style={{position:'relative'}}>
                <p className="mr-auto mt-2 mb-0 ">
                  <span className="room-temp-C">{data ? data.h : '0.00'}</span><sup className="sup1">%</sup>
                </p>
              </div>
            </div>
             &nbsp;&nbsp;&nbsp;

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
                  <Link  to={"/tempSetting/" + device.category+"/"+ device.name + "/" + device.room_id+"/"+device.id}>
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
  
    // put the element that we crete inside the arr that we declared on the main state
    tempInfo.tempElementArr = tempElement
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
        //data success
        //2 this device id doesnt exist
        //3 kein devices
        //4 server error
        let badgeClass = ''
        let badgeMessage = ''
        let badgeTitle = ''

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
                //delete the selected device
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


      {/*  <!-- TEMPERATURE dEV COMPONENT CALL  START --> */}
      <div className="col-12">
        {/* <!-- Temperature  START --> */}
          {tempInfo.tempElementArr}
        {/* <!-- Temperature  END --> */}
      </div>

    </React.Fragment>

  )
  
}
  
const setStateToProps = (state) => {
  return ({
    rooms: state.rooms
  })
}

export default connect(setStateToProps, {setRoomsAction})(Temperature)
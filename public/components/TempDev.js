import React, { useState } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {ListGroup, ListGroupItem, Button} from 'reactstrap';
import {setRoomsAction} from '../actions' 

const Temperature = (props) =>{

// const roomsArr= props.roomsArr
// const roomId = props.roomParams.id


const tempInfo={
  
  tempElementArr:[]
 
 }
   
if(props.rooms.length > 0) {


//console.log('tempArrTempDev', props.tempDevices);



 const tempElement = props.tempDevices.map(device=>{
  // console.log('temp',device);
   return(
 
    <div key={device.id} className="card temp-range heating" data-unit="room-temp-02">
                  <ListGroup className="list-group borderless">
                    <ListGroupItem className="list-group-item align-items-center">
                      <svg className="icon-sprite icon-1x">
                        <use xlinkHref="images/icons-sprite.svg#thermometer-tiny"/>
                      	</svg>
                      <h5>{device.name}</h5>
                    
                    </ListGroupItem>
                  </ListGroup>
                  <hr className="my-0" />
                  <div className="d-flex justify-content-between" data-rangeslider="room-temp-02">
                    <ListGroup className="list-group borderless px-1 align-items-stretch">
                      <ListGroupItem className="list-group-item list-group-item1">
                      &nbsp;
                        <h5 className="specs mr-auto mb-auto">Desired temperature</h5>
                      </ListGroupItem>
                    </ListGroup>
                    <div className="p-4" style={{position:'relative'}}>
                    <p className="mr-auto mt-2 mb-0 display-5">
                        <span className="room-temp-C">22</span><sup>°C</sup>
                        </p>
                    <p className="mr-auto mt-2 mb-0 lead text-primary">
                        <span className="room-temp-F">71.6</span><sup>°F</sup>
                        </p>
                    </div>
                  </div>
                  &nbsp;&nbsp;&nbsp;

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
                <div className="col-auto mr-auto">
                <Link  to={"/tempSetting/" + device.category+"/"+ device.name + "/" + device.room_id+"/"+device.id}>
                <Button
                    type="button"
                    className="btn btn-primary"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Edit Room">
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
                    onClick={()=>{deleteBtnClick(room.id)}}>
                    <i className="far fa-trash-alt"></i>
                  </Button>

                </div>
              </div>
            </div>
         </div>
    )

 })


 tempInfo.tempElementArr = tempElement
 
}

    return(
    
        <React.Fragment>
    
    {/*  <!-- Appliances  START --> */}
    <div className="col-12">
                {/* <!-- Living room temperature  START --> */}
                {tempInfo.tempElementArr}
                {/* <!-- Living room temperature  END --> */}
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
import React, { useState } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {ListGroup,ListGroupItem, Label, Input, Button} from 'reactstrap';

// import action 
import {setRoomsAction} from '../actions'

const Motion = (props) =>{

  const motionInfo ={

    motionElementArr:[]

  }



  if(props.rooms.length > 0) {
  
   const motionElement = props.motionDevices.map(device =>{
      return(
 
        <div key={device.id} className="card active" data-unit="tv-lcd-2">
        {/* <!--  switch START --> */}
        <ListGroup className="list-group borderless">
          <ListGroupItem className="list-group-item align-items-center">
            <svg className="icon-sprite icon-1x">
              <use className="glow" fill="url(#radial-glow)" xlinkHref="images/icons-sprite.svg#glow"/>
              <use xlinkHref="images/icons-sprite.svg#camera"/>
            </svg>
            <h5>{device.name}</h5>
            <Label className="switch ml-auto checked">
              <Input type="checkbox" id="tv-lcd-2"/>  {/* checked */}
            
            </Label>
          </ListGroupItem>
        </ListGroup>
        {/* <!-- switch END --> */}
        
         
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
                  <Input type="radio" name="options" id="c1-nv-off" autoComplete="off"  />{/* checked */}
                  OFF
                </Label>
                {/* <Link to={"/settings/" + room.type.replace(/ /g, '_') + "/" + room.id}><Button */}
                </div>
            </ListGroupItem>        

  

          </ListGroup>
          
          &nbsp;
    </div>

    
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
      <Link  to={"/motionSetting/" + device.category+"/"+ device.name + "/" + device.room_id+"/"+device.id}>
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

    motionInfo.motionElementArr = motionElement
    console.log('motionArrMoDev', props.motionDevices);
    }

    return(
    
        <React.Fragment>
    
           <div className="col-12">
                {/* <!-- TV2  START --> */}
              {motionInfo.motionElementArr}
            </div>
                {/* <!-- temp  END --> */}
    
             
        
    
        </React.Fragment>
    )


}
const setStateToProps = (state) => {
  return ({
     // rooms: state.rooms
      rooms: state.rooms
  })
}

export default connect(setStateToProps, {setRoomsAction})(Motion)
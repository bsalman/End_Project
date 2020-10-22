import React, { useState } from 'react'
import {connect} from 'react-redux'

import {ListGroup, ListGroupItem,Button, Label, Input} from 'reactstrap';


// importing the action
import {setRoomsAction} from '../actions'

const Light = (props) =>{

  const lightInfo={

    lightElementArr:[]

  }

  
  if(props.rooms.length > 0) {
     
    const lightElement = props.lightDevices.map(device =>{

      return(
        
        <div key={device.id} className="card active" data-unit="switch-light-1">
        {/* <!-- Light switch START --> */}
        <div className="card-body d-flex flex-row justify-content-start">
          <svg className="icon-sprite">
            <use className="glow" fill="url(#radial-glow)" xlinkHref="images/icons-sprite.svg#glow"/>
            <use xlinkHref="images/icons-sprite.svg#bulb-eco"/>
          </svg>
          <h5>{device.name}</h5>
          <Label className="switch ml-auto checked">
            <Input type="checkbox" id="switch-light-1" />  {/* checked/ */}
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
      <Button
          type="button"
          className="btn btn-primary"
          data-toggle="tooltip"
          data-placement="left"
          title="Edit Room"
          onClick={()=>{editModaltoggle(room.id,room.name,room.type,room.devices)}}>
          <i className="fas fa-tools"></i>
        </Button>
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
      
    lightInfo.lightElementArr = lightElement
    console.log('lightArrLightDev', props.lightDevices);
  }



  

return(

    <React.Fragment>


     
   
     
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

import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';

import {ListGroup, ListGroupItem,Button, Label, Input} from 'reactstrap';


// importing the action
import {setRoomsAction} from '../actions'

const AppliancesDiv = (props) =>{

  const AppliancesInfo={

    AppliancesArr:[]

  }

  
  if(props.rooms.length > 0) {
    console.log(props,"props");
     console.log("props.AppliancesDevice",props.AppliancesDevice);
    const AppliancesElement = props.AppliancesDevice.map(device =>{

      return(
        
        <div key={device.id} className="card active" data-unit="switch-light-1">
        {/* <!-- Light switch START --> */}
        <div className="card-body d-flex flex-row justify-content-start">
         
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
        <hr className="my-0"/>
     <div className="card-body">
    <div className="row">
      <div className="col-auto mr-auto">
        <Link  to={"/appliancesSetting/" + device.category+"/"+ device.name + "/" + device.room_id+"/"+device.id}>
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
          onClick={()=>{deleteBtnClick(room.id)}}>
          <i className="far fa-trash-alt"></i>
        </Button>

      </div>
    </div>
  </div>
</div>

      )
    })
    AppliancesInfo.AppliancesArr = AppliancesElement
   
  }
return(

    <React.Fragment>
        <div className="col-12">
                {/* <!-- Light unit START --> */}
                 {AppliancesInfo.AppliancesArr }
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
export default connect(setStateToProps, {setRoomsAction})(AppliancesDiv)
import React, {Fragment, useEffect, useState, useRef } from 'react'
//import {connect} from 'react-redux'
//import {useParams, useHistory} from 'react-router-dom'
import {ListGroup, ListGroupItem,Button, Label, Input} from 'reactstrap';


// importing the components

// importing the action

const Light = () =>{


return(

    <React.Fragment>


     
   
        {/* <div className="card"> */}
           <div className="col-sm-12 col-md-6 col-xl-4">
                {/* <!-- Light unit START --> */}
                <div className="card active" data-unit="switch-light-1">
                  {/* <!-- Light switch START --> */}
                  <div className="card-body d-flex flex-row justify-content-start">
                    <svg className="icon-sprite">
                      <use className="glow" fill="url(#radial-glow)" xlinkHref="images/icons-sprite.svg#glow"/>
                      <use xlinkHref="images/icons-sprite.svg#bulb-eco"/>
                    </svg>
                    <h5>Light</h5>
                    <Label className="switch ml-auto checked">
                      <Input type="checkbox" id="switch-light-1" checked/>
                    </Label>
                  </div>
                  {/* <!-- Light switch END --> */}
                  <hr className="my-0" />
                  {/* <!-- Bulb details START --> */}
                  &nbsp;&nbsp;&nbsp;
                  <ListGroup className="list-group borderless px-1">
                    <ListGroupItem className="list-group-item pt-0 pb-4">
                      <p className="specs">Device Serial Nr</p>
                      <p className="ml-auto mb-0">12761263921</p>
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
                {/* <!-- Light unit END --> */}
              
           
        </div>
  

    </React.Fragment>
)

// when you see props.room. ..... is touching the main state ( the redux state)
// when you see this.state....  it is touching the initial state


}

export default Light
import React, {Fragment, useEffect, useState, useRef } from 'react'
//import {connect} from 'react-redux'
//import {useParams, useHistory} from 'react-router-dom'
import {ListGroup, ListGroupItem, Label, Input, Button} from 'reactstrap';

const Temperature = () =>{


    return(
    
        <React.Fragment>
    
    {/*  <!-- Appliances  START --> */}
    <div className="col-sm-12 col-md-6 col-xl-4">
                {/* <!-- Living room temperature  START --> */}
                <div className="card temp-range heating" data-unit="room-temp-02">
                  <ListGroup className="list-group borderless">
                    <ListGroupItem className="list-group-item align-items-center">
                      <svg className="icon-sprite icon-1x">
                        <use xlinkHref="images/icons-sprite.svg#thermometer-tiny"/>
                      	</svg>
                      <h5>Temperature</h5>
                      <h5 className="ml-auto status">22<sup>°C</sup></h5>
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
                      <p className="ml-auto mb-0">12761263921</p>
                      &nbsp;&nbsp;&nbsp;
                    </ListGroupItem>
                  </ListGroup>
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
                {/* <!-- Living room temperature  END --> */}
               </div>

    
        </React.Fragment>
    )
    
    // when you see props.room. ..... is touching the main state ( the redux state)
    // when you see this.state....  it is touching the initial state
    
    
    }
    
    export default Temperature
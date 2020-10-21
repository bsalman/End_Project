import React, {Fragment, useEffect, useState, useRef } from 'react'
//import {connect} from 'react-redux'
//import {useParams, useHistory} from 'react-router-dom'
import {ListGroup,Link, ListGroupItem, Label, Input, Button} from 'reactstrap';


const Motion = () =>{


    return(
    
        <React.Fragment>
    
    <div className="col-sm-12 col-md-6 col-xl-4">
                {/* <!-- TV2  START --> */}
        <div className="card active" data-unit="tv-lcd-2">
                  {/* <!-- TV2 switch START --> */}
                  <ListGroup className="list-group borderless">
                    <ListGroupItem className="list-group-item align-items-center">
                      <svg className="icon-sprite icon-1x">
                        <use className="glow" fill="url(#radial-glow)" xlinkHref="images/icons-sprite.svg#glow"/>
                        <use xlinkHref="images/icons-sprite.svg#camera"/>
                      </svg>
                      <h5>Motion Device</h5>
                      <Label className="switch ml-auto ">
                        <Input type="checkbox" id="tv-lcd-2"/>
                      </Label>
                    </ListGroupItem>
                  </ListGroup>
                  {/* <!-- TV2 switch END --> */}
                  
                   
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
                            <Input type="radio" name="options" id="c1-nv-off" autoComplete="off" />
					              		OFF
                          </Label>
                          {/* <Link to={"/settings/" + room.type.replace(/ /g, '_') + "/" + room.id}><Button */}
                          </div>
                      </ListGroupItem>        
      
{/* serieal number was here  */}

                    </ListGroup>
                    
                    &nbsp;
              </div>

              
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
            </div>
                {/* <!-- temp  END --> */}
    
             
        
    
        </React.Fragment>
    )
}

export default Motion



// &nbsp;&nbsp;&nbsp;
// <hr className="my-0" />
// <ListGroupItem className="list-group-item pb-0">
// <p className="specs">Serial Nr</p>
// <p className="ml-auto mb-0">12761263921</p>
// &nbsp;&nbsp;&nbsp;
// </ListGroupItem>
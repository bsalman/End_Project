import React from 'react'


import {ListGroup, ListGroupItem, Label, Input, Button} from 'reactstrap';
import {connect} from 'react-redux'



// importing the action
import {setRoomsAction} from '../actions'



const Temperature =(props) =>{

    console.log('props', props);
    console.log('rooms',props);
    
    let roomInfo = {
        roomName: '',
        roomTitle: '',
        devices: []
  
    }
  
    if(props.rooms.length > 0) {
        // console.log('rooms2',props.rooms[0].devices)
        // roomInfo.roomName = props.rooms[0].name
        // roomInfo.roomType = props.rooms[0].type
        // roomInfo.devices = props.rooms[0].devices[0]
    }


// console.log('selectedRoom',state.selectedRoom,'/',state.selectedDevice);

    return(


        <React.Fragment>
    
        {/*  <!-- Appliances  START --> */}
        <div className="row">
		        <div className="col-sm-12">
			      <div className="card p-2 mb-4" >
			     	<h5 className="mx-auto"></h5> 
		  	      </div>
		       </div>
	         </div>
        <div className="col-sm-12">
                    {/* <!-- Living room temperature  START --> */}
                    <div className="card temp-range heating" data-unit="room-temp-02">
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
                      &nbsp;&nbsp;
    
                      <ListGroup className="list-group borderless">
                      <hr className="my-0" />
                      <div className="col-12" modal-content="true">
                        <ListGroupItem className="list-group-item list-group-item2 align-items-center">
                        
                        <Label for="device_seralNum" className="col-3 col-form-label modal-font">Device Serial Number</Label >
                        <Input
                            className="form-control custom-focus col-9"
                            type="text"
                            id="device_seralNum"/> 
                        
                        </ListGroupItem>
                        </div>
                      </ListGroup>



                      <div className="card-body">
                  <div className="row">
                    <div className="col-auto mr-auto">
                      
                      &nbsp;&nbsp;</div>
                    <div className="col-auto">
    
                      
                      &nbsp;&nbsp;
    
                      <Button
                        type="button"
                        className="btn btn-primary"
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Save changes"
                        onClick={()=>{deleteBtnClick(room.id)}}>
                        Save
                      </Button>
    
                    </div>
                  </div>
                </div>
                    </div>
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

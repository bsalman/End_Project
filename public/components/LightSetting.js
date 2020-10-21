import React,{useState,useEffect} from 'react'
import {Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
//==============================================//
import {connect} from 'react-redux'
// importing the action
import {setRoomsAction} from '../actions'
//==============================================//
const LightSetting = (props) => {
    const initialState={
        timeNow:""
    }
    const [state,setState] = useState(initialState)
    useEffect(() => {
        setInterval(function(){
            let today=new Date()
            let time = today.getHours()+":"+ today.getMinutes()+":"+today.getSeconds()
                    setState({...state, timeNow:time})
        },1000)
   
    }, [])
  

  if (props.rooms.length > 0) {}

  // console.log('selectedRoom',state.selectedRoom,'/',state.selectedDevice);

  return (
      
    
    <React.Fragment>

      {/*  <!-- Appliances  START --> */}
      <div className="row">
        <div className="col-sm-12">
          <div className="card p-2 mb-4">
            <h5 className="mx-auto">setting:Device name</h5>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
        <div className="card active" data-unit="tv-lcd-2">
            <ul className="list-group borderless">
                <li className="list-group-item align-items-center">
                    <i className="fas fa-stopwatch"></i>
                    &nbsp;
                    <h5>Light:Set Time</h5>
                    <div className=" ml-auto ">
                        <div>{state.timeNow}</div>
                    </div>
                </li>
            </ul>
            
            <hr className="my-0"/>
            &nbsp;
           
                         <div className="row d-flex justify-content-center">
                            <div className="col justify-content-center ">
                                <h5 className="specs text-center">From</h5>
                            </div>
                            <div className="col justify-content-center ">
                                 <Input className="ml-auto mb-0 text-primary text-center" type="text"  placeholder="HH : MM : SS"/>
                            </div>
                            <div className="col justify-content-center ">
                                 <h5 className="specs text-center">To</h5>
                            </div>
                            <div className="col justify-content-center">
                                <Input className="ml-auto mb-0 text-primary text-center" type="text"  placeholder="HH : MM : SS"/>
                             </div>
                             <div className="col justify-content-end ">
                             <Button>Save</Button>
                            </div>
                        </div>
                        {/* <div className="row d-flex justify-content-center">
                            <div className="col justify-content-center ">
                            <FormGroup check>
                            <Label check>
                                <Input type="checkbox" />{' '}
                                 Sat
                            </Label>
                            </FormGroup>
                            </div>
                            <div className="col justify-content-center ">
                            <FormGroup check>
                            <Label check>
                                <Input type="checkbox" />{' '}
                                 Sat
                            </Label>
                            </FormGroup>
                            </div>
                            <div className="col justify-content-center ">
                            <FormGroup check>
                            <Label check>
                                <Input type="checkbox" />{' '}
                                 Sat
                            </Label>
                            </FormGroup>
                            </div>
                            <div className="col justify-content-center ">
                            <FormGroup check>
                            <Label check>
                                <Input type="checkbox" />{' '}
                                 Sat
                            </Label>
                            </FormGroup>
                            </div>
                            <div className="col justify-content-center ">
                            <FormGroup check>
                            <Label check>
                                <Input type="checkbox" />{' '}
                                 Sat
                            </Label>
                            </FormGroup>
                            </div>
                            <div className="col justify-content-center ">
                            <FormGroup check>
                            <Label check>
                                <Input type="checkbox" />{' '}
                                 Sat
                            </Label>
                            </FormGroup>
                            </div>
                            <div className="col justify-content-center ">
                            <FormGroup check>
                            <Label check>
                                <Input type="checkbox" />{' '}
                                 Sat
                            </Label>
                            </FormGroup>
                            </div>
                        
                        </div> */}
                       
                        
                 
                &nbsp;
            <hr className="my-0"/>
            <ul className="list-group borderless">
                <li className="list-group-item align-items-center">
                    <i className="fas fa-stopwatch"></i>
                    &nbsp;
                    <h5>Motion:Set Time</h5>
                    <div className=" ml-auto ">
                        <div></div>
                    </div>
                </li>
            </ul>
            <hr className="my-0"/>
            &nbsp;
            <div className="row d-flex justify-content-center">
                            <div className="col justify-content-center ">
                                <h5 className="specs text-center">From</h5>
                            </div>
                            <div className="col justify-content-center ">
                                 <Input className="ml-auto mb-0 text-primary text-center" type="text"  placeholder="HH : MM : SS"/>
                            </div>
                            <div className="col justify-content-center ">
                                 <h5 className="specs text-center">To</h5>
                            </div>
                            <div className="col justify-content-center">
                                <Input className="ml-auto mb-0 text-primary text-center" type="text"  placeholder="HH : MM : SS"/>
                             </div>
                             <div className="col justify-content-end ">
                             <Button>Save</Button>
                            </div>
                        </div>
                         &nbsp;
                        <hr className="my-0"/>
           
             

                
        </div>
        <div className="card temp-range heating" data-unit="room-temp-02">
          
              <div className="card-body">
                <div className="col-12" >
                

               
                    <Form>
                        <FormGroup row>
                            <Label for="serialNumber" sm={2}>Serial Number</Label>
                            <Col sm={9}>
                            <Input type="text" name="serial-number" id="serialNumber" placeholder="insert new Serial Number" />
                            </Col>
                             <Button>Save</Button>
                        </FormGroup>
                        
                           
                               
                              
                     
                    </Form>
                </div>
            </div>
          </div>
          {/* <!-- Living room temperature  END --> */}
        </div>
      </div>

    </React.Fragment>
  )

  // }) // from room Element map
}

const setStateToProps = (state) => {
  return ({
    // rooms: state.rooms
    rooms: state.rooms
  })
}
export default connect(setStateToProps, {setRoomsAction})(LightSetting)
//export default SingleRoomOv
import React, {Fragment, useEffect, useState, useRef } from 'react'
import {connect} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
import {ListGroup, ListGroupItem, Label, Input} from 'reactstrap';


// importing the components
import {getRoomPost} from '../services/api'
// importing the action
import {setRoomsAction} from '../actions'



const SingleRoomOv =(props) =>{

//* for redux
//console.log(props)
//console.log('params',params)

//const titleElement = (<div className="card p-2 mb-4" ><h5 className="mx-auto">{room.type} : {room.name}</h5></div>)

//console.log(props.room);

// copy a one room out of the array
// const selectedRoom = props.rooms.splice(props.rooms.indexOf(props.rooms.find(element => element.id === params.id)),1)
//console.log('selectedRoom',selectedRoom);
//*redux end 





// to the path of the chosen room and its devices
const params = useParams()

const initialState = {
  room: null,
  selectedRoom: '',
  selectedDevices: []
}

const [state, setState] = useState(initialState)

console.log('params', params);

useEffect(() => {
    getRoomPost(params.id).then(data => {
      // if(data != 2){
      //   setState({
      //   ...state,
      //   room: data
      // })
      //}
      console.log('data', data); // both arrays
      console.log('data1', data[0]); //logging the devices array
      console.log('data2', data[1][0]); // logging the room data : name and type
   
      setState({...state, selectedRoom: data[1][0], selectedDevices: data[0]})
     
    })
  }, [])
  
  //console.log('state', state);
  console.log('state', state);
  console.log('props', props);
  console.log('rooms',props.rooms[0]);
  //console.log('rooms2',props.rooms[0].devices);
    return(


        <React.Fragment>

        {/* head component start */}
	        <div className="row">
		        <div className="col-sm-12">
			      <div className="card p-2 mb-4" >
             	  <h5 className="mx-auto">
                 {state.selectedRoom.type} : {state.selectedRoom.name}</h5>   
                   {/* {titleElement} */}
		  	      </div>
		       </div>
	         </div>
        {/* head component end */}


        {/* <div className="col-sm-12 col-md-6 col-xl-4"> */}
    <div className="row">
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
                  <ListGroup className="list-group borderless px-1">
                    <ListGroupItem className="list-group-item">
             
                      {/* <p className="specs">Connection</p>
                      <p className="ml-auto mb-0 text-success">OK</p> */}
                    </ListGroupItem>
                    <ListGroupItem className="list-group-item pt-0">
                      <p className="specs">Power Consumption</p>
                      <p className="ml-auto mb-0">24W</p>
                    </ListGroupItem>
                    <ListGroupItem className="list-group-item pt-0 pb-4">
                      <p className="specs">Voltage range</p>
                      <p className="ml-auto mb-0">110-130V</p>
                    </ListGroupItem>
                    <ListGroupItem className="list-group-item pt-0 pb-4">
                      <p className="specs">Device Serial Nr</p>
                      <p className="ml-auto mb-0">12761263921</p>
                    </ListGroupItem>
                  </ListGroup>
                  {/* <!-- Bulb details END --> */}
                  <hr className="my-0" />
                  {/* <!-- Dimmer control - range slider START --> */}
                  <ListGroup className="list-group borderless px-1" data-rangeslider="dimmer-light-1">
                    <ListGroupItem className="list-group-item">
                      <p className="specs">Dim</p>
                      <p className="ml-auto mb-0"><span className="range-output">100</span>%</p>
                    </ListGroupItem>
                    <ListGroupItem className="list-group-item pt-0 pb-4">
                      <Input id="dimmer-light-1" type="range" min="10" max="100" value="100"/>
                    </ListGroupItem>
                  </ListGroup>
                  {/* <!-- Dimmer control - range slider END --> */}
                </div>
                {/* <!-- Light unit END --> */}
             </div>



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
                      <ListGroupItem className="list-group-item">
                        <p className="specs mr-auto mb-auto">Desired temperature</p>
                      </ListGroupItem>
                      <ListGroupItem className="list-group-item d-flex flex-column pb-4">
                        <p className="mr-auto mt-2 mb-0 display-5">
                        <span className="room-temp-C">22</span><sup>°C</sup>
                        </p>
                        <p className="mr-auto mt-2 mb-0 lead text-primary">
                        <span className="room-temp-F">71.6</span><sup>°F</sup>
                        </p>
                      </ListGroupItem>
                    </ListGroup>

                    <div className="p-4" style={{position:'relative'}}>
                      <Input id="room-temp-02" className="room-temp" type="range" min="66.2" max="77" step="0.1" value="71.6" data-orientation="vertical" />
                    </div>
                  </div>
                  &nbsp;&nbsp;&nbsp;

                  <ListGroup className="list-group borderless">
                  <hr className="my-0" />
                    <ListGroupItem className="list-group-item align-items-center">
                    &nbsp;&nbsp;&nbsp;

                      <p className="specs">Device Serial Nr</p>
                      <p className="ml-auto mb-0">12761263921</p>
                      &nbsp;&nbsp;&nbsp;
                    </ListGroupItem>
                  </ListGroup>
                </div>
                {/* <!-- Living room temperature  END --> */}
               </div>


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
                      <h5>Motion Sensor</h5>
                      <Label className="switch ml-auto checked">
                        <Input type="checkbox" id="tv-lcd-2" checked />
                      </Label>
                    </ListGroupItem>
                  </ListGroup>
                  {/* <!-- TV2 switch END --> */}
                  <div className="only-if-active">
                    <hr className="my-0" />
                    <ListGroup className="list-group borderless px-1">
                      <ListGroupItem className="list-group-item pb-0">
                        {/* <p className="specs">bathroom</p> */}
                        {/* <p className="ml-auto mb-0 text-primary">Kids TV24</p> */}
                      </ListGroupItem>
                      <ListGroupItem className="list-group-item pb-0">
                        <h5 className="specs">front room</h5>
                        <div className="btn-group btn-group-toggle ml-auto py-1" data-toggle="buttons">
                          <Label className="btn btn-label btn-sm mb-0">
                            <Input type="radio" name="options" id="c1-nv-on" autoComplete="off" />
					              		ON
                          </Label>
                          <Label className="btn btn-label btn-sm mb-0 active">
                            <Input type="radio" name="options" id="c1-nv-off" autoComplete="off" checked />
					              		OFF
                          </Label>
                        </div>
                      </ListGroupItem>

                      {/* *! ACHTUNG THIS IS A SECOND LABEL COMPONENT BOTH HAVE THE SAME ID !!!!   */}

                      <ListGroupItem className="list-group-item pb-0">
                        <h5 className="specs">back room</h5>
                        <div className="btn-group btn-group-toggle ml-auto py-1" data-toggle="buttons">
                          <Label className="btn btn-label btn-sm mb-0">
                            <Input type="radio" name="options" id="c1-nv-on" autoComplete="off" />
					              		ON
                          </Label>
                          <Label className="btn btn-label btn-sm mb-0 active">
                            <Input type="radio" name="options" id="c1-nv-off" autoComplete="off" checked />
					              		OFF
                          </Label>
                        </div>
                      </ListGroupItem>
                      &nbsp;&nbsp;&nbsp;
                      <hr className="my-0" />
                      <ListGroupItem className="list-group-item pb-0">
                      <p className="specs">Device Serial Nr</p>
                      <p className="ml-auto mb-0">12761263921</p>
                      &nbsp;&nbsp;&nbsp;
                      </ListGroupItem>

                    </ListGroup>
                    &nbsp;
                  </div>
                </div>
                {/* <!-- TV2  END --> */}
              </div>
              {/* row and card div */}
          </div>
        </React.Fragment>
    )
 
// }) // from room Element map
}

// here we change our initial state to props to be able to send it to the main state
// //! this is to get the state of redux and save it in the props of this component
const setStateToProps = (state) => {
    return ({
       // rooms: state.rooms
        rooms: state.rooms
    })
}

// when you see props.room. ..... is touching the main state ( the redux state)
// when you see this.state....  it is touching the initial state





export default connect(setStateToProps, {setRoomsAction})(SingleRoomOv)
//export default SingleRoomOv
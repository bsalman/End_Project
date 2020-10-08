
import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import { Label, Input } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';


//import the components



export const AllRooms = () => {

  const initialState={
    roomAndDevices:[]
}
   //================declaring set state=================//
   const [state, setState] = useState( initialState)
   
    //================== ussEffect to update the state ========================//
    useEffect(() => {
       
      allDevicesPost().then(data => {
          if(data != 2){
              setState({...state, roomAndDevices: data})
          } 
      });
  
  },[state.roomAndDevices])

//! ANCHOR 
  //? do i have to map through the room title (with room id) to see the chosen room
  //? and then map again through the second div to get the devices for this element?
  //? or do i get everything together when i map through all the div and give choose the room by id and the devices by number? 


const roomAndDeviceElement = state.roomAndDevices.map(room =>{
  return(
    <React.Fragment>
            <div key={room.id} id="main">
          <div className="container-fluid">
            <div className="col-sm-12 col-md-6 col-xl-4">
                {/* <!-- Light unit START --> */}
                <div className="card active" data-unit="switch-light-2">
                  {/* <!-- Light switch START --> */}
                  <div className="card-body d-flex flex-row justify-content-start">
                    <svg className="icon-sprite">
                      <use className="glow" fill="url(#radial-glow)" xlinkHref="images/icons-sprite.svg#glow"/>
                      
                        {/* INSERT ICON FOR THE SINGLE UNIT HERE  */}
                      {/* <use xlinkHref="images/icons-sprite.svg#bulb-eco"/> */}
                      </svg>
                    <h5>{room.type}</h5>
                    {/* <h5>Dining room</h5> */}
                    <Label className="switch ml-auto">
                    <Input type="checkbox" id="switch-light-2" /></Label>
                  </div>
                  {/* <!-- Light switch END --> */}
                  <hr className="my-0" />
                  {/* <!-- Bulb details START --> */}
                 <ListGroup className="list-group borderless px-1">
                    <ListGroupItem className="list-group-item">

                    {roomAndDeviceElement}

                      {/* <p className="specs">Light</p>
                      <p className="ml-auto mb-0 text-success">OK</p> */}
                    </ListGroupItem>
                    <ListGroupItem className="list-group-item pt-0">
                      <p className="specs">Temperature</p>
                      <p className="ml-auto mb-0">18W</p>
                    </ListGroupItem>
                    <ListGroupItem className="list-group-item pt-0 pb-4">
                      <p className="specs">Motion Sensor</p>
                      <p className="ml-auto mb-0">110-130V</p>
                    </ListGroupItem>
                  </ListGroup>
                  </div>
                </div>
              </div>
            </div>
    </React.Fragment>
    
  )
})


//! top part of the jxs was annoying to comment thats why its out of the jxs
// <div id="main">
// <div className="container-fluid">
//   <div className="col-sm-12 col-md-6 col-xl-4">
//       {/* <!-- Light unit START --> */}
//       <div className="card active" data-unit="switch-light-2">
//         {/* <!-- Light switch START --> */}
//         <div className="card-body d-flex flex-row justify-content-start">
//           <svg className="icon-sprite">
//             <use className="glow" fill="url(#radial-glow)" xlinkHref="images/icons-sprite.svg#glow"/>
            
//               {/* INSERT ICON FOR THE SINGLE UNIT HERE  */}
//             {/* <use xlinkHref="images/icons-sprite.svg#bulb-eco"/> */}
//             </svg>
//           <h5>Dining room</h5>
//           <Label className="switch ml-auto">
//           <Input type="checkbox" id="switch-light-2" /></Label>
//         </div>
//         {/* <!-- Light switch END --> */}
//         <hr className="my-0" />
//         {/* <!-- Bulb details START --> */}
//        <ListGroup className="list-group borderless px-1">
//           <ListGroupItem className="list-group-item">
//             <p className="specs">Light</p>
//             <p className="ml-auto mb-0 text-success">OK</p>
//           </ListGroupItem>
//           <ListGroupItem className="list-group-item pt-0">
//             <p className="specs">Temperature</p>
//             <p className="ml-auto mb-0">18W</p>
//           </ListGroupItem>
//           <ListGroupItem className="list-group-item pt-0 pb-4">
//             <p className="specs">Motion Sensor</p>
//             <p className="ml-auto mb-0">110-130V</p>
//           </ListGroupItem>
//         </ListGroup>




		return (
			<React.Fragment>
   
        








                  {/* <!-- Bulb details END --> */}
                  <hr className="my-0" />
                  {/* <!-- Dimmer control - range slider START --> */}
                  <ListGroup className="list-group borderless px-1" data-rangeslider="dimmer-light-2">
                    <ListGroupItem className="list-group-item">
                      <p className="specs">Dim</p>
                      <p className="ml-auto mb-0"><span className="range-output">100</span>%</p>
                    </ListGroupItem>
                    <ListGroupItem className="list-group-item pt-0 pb-4"><Input id="dimmer-light-2" type="range" min="10" max="100" value="100" />
                    </ListGroupItem>
                  </ListGroup>
                  {/* <!-- Dimmer control - range slider END --> */}
                </div>
                {/* <!-- Light unit END --> */}
                {/* <!-- Exterior lights END --> */}
          {/* </div>
        // </div> */}
        {/* <!-- Main content overlay when side menu appears  --> */}
          <div class="cover-offcanvas" data-toggle="offcanvas"></div>
         {/* </div> */}
        {/* <!-- Main content END --> */}
 
      </React.Fragment>
		);
	
}


export default AllRooms
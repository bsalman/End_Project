import React, {  useState } from 'react'
import { useParams } from 'react-router-dom'
import {connect} from 'react-redux'

import { ListGroup, ListGroupItem, Label, Input } from 'reactstrap';



//==============================================//
// importing the components
import {getRoomPost} from '../services/api'
// importing the action
import {setRoomsAction} from '../actions'

const ShowDevices =(props) =>{
 
  


  console.log(props)
  
    //room// idx // id
const titleElement = props.room.map((room, id) =>{
  console.log(props.room);
  console.log('props',props.setRoomsAction);
return (
  <div key={room.id} className="card p-2 mb-4" >
  <h5 className="mx-auto">{props.room[id].type} : {props.room[id].name}</h5>
   </div>
)


})


     //map rooms element
     const roomElement = props.room.map(room => {
    
     // mapping the devices inside room
          // const devices = props.room.device.map(device => {
          
          //     return (
          //       <li key={device.id} className="list-group-item">
          //         <p className="specs">{props.device.name}</p>
          //         <p className="ml-auto mb-0 text-success">connected</p>
          //       </li>
          //      )
          //   })
        // return the mapped rooms
              return (
                  <div key={room.id} className="col-sm-12 col-md-6 col-xl-4">
                      <div className="card ">
        
                          <div className="card-body">
                          <div className="row">
                              <div className="col-auto mr-auto">
                               {/* <h5 className="card-title">{props.room.type} : {props.room.name}</h5>  */}
                            
                              </div>
                         
                          </div>
                              
                             
                          </div>
                          <hr className="my-0" />
                          <ul className="list-group borderless px-1">
                              {/* {devices} */}
                          </ul>
                          <hr className="my-0" />
                          <div className="card-body">
                          <div className="row">
                   
                      
                        </div>
                    </div>
                          
                          {/* device element */}
      
                      </div>
                  </div>
      
              )
      })
  

    return( 
           
      <React.Fragment>
      
      {/* head component start */}
        <div className="row">
          <div className="col-sm-12">
          <div className="card p-2 mb-4" >
           {/* <h5 className="mx-auto">{props.room.type} : {props.room.name}</h5> */}
              {titleElement}
            </div>
         </div>
         </div>
      {/* head component end */}

      <div>
          <div className="row">
          
            {roomElement}
            {/* add rooms card end  */}
            {/* ===========================rooms element====================================== */}
          </div>
        </div>
      </React.Fragment>
    )
}  

const setStateToProps = (state) => {
    return ({
        room: state.rooms,
        device : state.devices
    })
}


export default connect(setStateToProps, {setRoomsAction})(ShowDevices)





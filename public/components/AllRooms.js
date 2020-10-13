
import React, {useEffect, useState} from 'react'
// import {Link, withRouter} from 'react-router-dom'
import { Label, Input } from 'reactstrap';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';


//import the components
import ConfirmModal from './ConfirmModal'
import {deleteRoomPost} from '../services/api'
import {allRoomsPost} from '../services/api'

 const AllRooms = () => {


  const initialState = {
    rooms: [],
    confirmModalShow: false,
    confirmModalElement: null,
    confirmModalPayLoad: null

  }
  const [state, setState] = useState(initialState)

  // bring data from front and update the state 
  useEffect(() =>{
    allRoomsPost().then(data=>{
      if(data != 2){
        setState({...state, rooms: data})
      }
    }).catch(error =>{
      console.log(error);
    })
  }, [])


  const closeConfirmModal = () => {
      
    setState({
      ...state,
      confirmModalShow: false
    })
  }
  const deleteConfirm = roomId => {
    //console.log(roomId)
    deleteRoomPost(roomId).then(data => {

      switch (data) {
    
        case 2:
            console.log('server error');
            break;
        default:
          const newRooms = [...state.rooks]
        newRooms.splice(newRooms.indexOf(newRooms.find(element => element._id === roomId)), 1)
        setState({
          ...state,
          rooms: newRooms,
          confirmModalShow: false
        })
          break;
      }
      
    })
}
const deleteBtnClick = (roomId) => {
  setState({
      ...state,
      confirmModalShow: true,
      confirmModalPayLoad: roomId,
      confirmModalElement: <p>This room and it's connected devices are going to be deleted, are you sure?</p>
    })
}


const roomElement = state.rooms.map(room =>{
  return (
    <React.Fragment>
  <div key={room.id} id="main"> 
    <div className="container-fluid"> 
    {/* <div class="row" data-unit-group="switch-lights-in"> */}
      <div className="col-sm-12 col-md-6 col-xl-4">
      <div className="card active">
        {/* <div className="card active"  data-unit="switch-light-1"> */}
        
            <div className="card-body d-flex flex-row justify-content-center">
              {/* <svg className="icon-sprite">
            <use className="glow" fill="url(#radial-glow)" xlinkHref="images/icons-sprite.svg#glow"/>
            
              {/* INSERT ICON FOR THE SINGLE UNIT HERE  */}
            {/* <use xlinkHref="images/icons-sprite.svg#bulb-eco"/> 
               </svg> */}

              <h5 className="card-title">{room.type}: {room.name}</h5>
                      
            </div>

    <hr className="my-0" />
 
   <ListGroup className="list-group borderless px-1">
      <ListGroupItem className="list-group-item">
        <p className="specs">Light</p>
        <p className="ml-auto mb-0 text-success">OK</p>
      </ListGroupItem>
      <ListGroupItem className="list-group-item pt-0">
        <p className="specs">Temperature</p>
        <p className="ml-auto mb-0">18W</p>
      </ListGroupItem>
      <ListGroupItem className="list-group-item pt-0 pb-4">
        <p className="specs">Motion Sensor</p>
        <p className="ml-auto mb-0">110-130V</p>
      </ListGroupItem>
      <Button onClick={(e)=>{deleteBtnClick(room.id)}} className="btn">Delete</Button>
      {/* <Button color="primary" onClick={this.onAddClick}>delete all</Button> */}
    </ListGroup>
    <hr className="my-0"/>
    </div>
    {/* </div> */}
    </div>
    </div>
    </div>
  </React.Fragment>
  )
})




		return (
      <React.Fragment>
          <ConfirmModal
        className="bg-danger"
        show={state.confirmModalShow}
        close={closeConfirmModal}
        title="Confirm Delete"
        payload={state.confirmModalPayLoad}
        onConfirm={deleteConfirm}
        >
            {state.confirmModalElement}
        </ConfirmModal>
      {roomElement}
      </React.Fragment>

    )
}


export default AllRooms




  // const getRoom = (e) => {
  //   //e.preventDefault()
  //   // console.log(e.target.checked)
  //   console.log(e.currentTarget.parentElement.parentElement.children[1].innerHTML);
    
  //  const deviceTitle =e.currentTarget.parentElement.parentElement.children[1].innerHTML
  //   if (arr.indexOf(deviceTitle) === -1) {
  //     arr.push(deviceTitle)
  //     console.log('arr',arr);
  //   } 

  // }


   
import React, {Fragment, useEffect, useState, useRef } from 'react'
import {connect} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
import {ListGroup, ListGroupItem, Label, Input} from 'reactstrap';


// importing the components
import {getRoomPost} from '../services/api'
// importing the action
import {setRoomsAction} from '../actions'



const SingleRoomOv =(props) =>{

// to the path of the chosen room and its devices
const params = useParams()


const initialState = {
  room: null,
  selectedRoom : '',
  selectedDevice: []
}

const [state, setState] = useState(initialState)

useEffect(() => {
  getRoomPost(params.id).then(data => {
    if(data != 2){
		console.log(data);
		console.log(data[1]);
		console.log(data[1][0]);
		setState({...state,
			selectedRoom: data[1][0],
			selectedDevice: data[0]
		})
	}

  })
}, [])
console.log('selectedRoom',state.selectedRoom,'/',state.selectedDevice);

//room// idx // id
// const titleElement = props.rooms.map((room,idx) =>{
// //   console.log(props);
// return (
//   	<div key={room.id} className="card p-2 mb-4" >
//   		<h5 className="mx-auto">{room.type} : {room.name}</h5>
// 	</div>

// )

// })
// const selectedRoom = props.rooms.splice(props.rooms.indexOf(props.rooms.find(element => element.id === params.id)),1)
// // console.log('element',props.rooms.filter(element => element.id === params.id));
// // console.log('selectedRoom',selectedRoom);
// props.rooms.forEach(element => {
// 	console.log('element',element.id);
// 	console.log('params',params.id);
// 	if (element.id === params.id) {
// 		console.log('success');
// 	}else{
// 		console.log('error');
// 	}
// });
 
    return(


        <React.Fragment>

        {/* head component start */}
	        <div className="row">
		        <div className="col-sm-12">
			      <div className="card p-2 mb-4" >
			     	<h5 className="mx-auto">{state.selectedRoom.type} : {state.selectedRoom.name}</h5> 
                   {/* {titleElement} */}
		  	      </div>
		       </div>
	         </div>
        {/* head component end */}


        {/* <div className="col-sm-12 col-md-6 col-xl-4"> */}
    
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
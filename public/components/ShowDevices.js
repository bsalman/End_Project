import React, {Fragment, useEffect, useState, useRef } from 'react'
import {connect} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'



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
 

}


const setStateToProps = (state) => {
    return ({
       // rooms: state.rooms
        rooms: state.rooms
    })
}





export default connect(setStateToProps, {setRoomsAction})(SingleRoomOv)
//export default SingleRoomOv
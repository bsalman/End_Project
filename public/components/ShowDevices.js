import React, {  useState } from 'react'
import { useParams } from 'react-router-dom'
// import {Button, Form, FormGroup, Label, Input } from 'reactstrap';
//==============================================//




const ShowDevices = () => { 
	const params = useParams()

	const initialState = {
		roomTitle : '',
		modalElement:null,
		showModal:false,
		modalTitle:'',
		modalClass: 'bg-primary',
		devicesElement : []
	  }
	
	  const [state,setState] = useState(initialState)
	
        return(
            // <!-- Interior lights  START -->
         
			<div>Hallo</div>
			
            
	
			
        )
    
}
export default ShowDevices
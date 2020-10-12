import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// import {Button, Form, FormGroup, Label, Input } from 'reactstrap';
//==============================================//
import CustomModal from './CustomModal'
import{getRoomPost} from '../services/api'



const AddDevices = () => { 
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
	
	  const getDeviceValue = (e) => {
		  //e.preventDefault()
		  console.log(e.target.checked)
		  console.log(e.currentTarget.parentElement.parentElement.children[1].innerHTML);
		  
		 const deviceTitle =e.currentTarget.parentElement.parentElement.children[1].innerHTML
		  if (arr.indexOf(deviceTitle) === -1) {
			  arr.push(deviceTitle)
			  console.log('arr',arr);
		  }
	  }
	  
	//   console.log('arr2' ,arr);
	  

	  const devicesSaveBtnClick = (e) => {
		e.preventDefault()
		setState({
			...state,
			modalElement:<div>Hi</div>,
			showModal:true,
			modalTitle: 'kitchen'
		})
	  }

	const closeModal = () => {
		console.log('I am called from the child');
		setState({
		  ...state,
		  showModal: false
		})
	  }

  
        return(
            // <!-- Interior lights  START -->
         <React.Fragment>
			 <CustomModal
				show={state.showModal}
				close={closeModal}
				className={state.modalClass}
				title={state.modalTitle}>
				{state.modalElement}
    		</CustomModal>
			
            
		<h3 className="card-title center">Choose devices to {state.roomTitle}</h3>
                            <div className="row">
                                {/* <!-- Add Devices   START --> */}

                            <div className="col-sm-12 col-md-12">
								{/* <!-- Exterior lights  START --> */}
								
								<div className="card" data-unit="switch-light-1 switch-light-2">
									<div className="card-body d-flex flex-row justify-content-start">
										<svg className="icon-sprite">
											<use className="glow" fill="url(#radial-glow)" xlinkHref="/images/icons-sprite.svg#glow"/>
											<use xlinkHref="/images/icons-sprite.svg#bulb-eco"/>
										</svg>
										<h5>Lights</h5>
										<label className="switch ml-auto">
											<div htmlFor="switch-light-1"  className="ml-auto">Sensors</div>
											<div className="col-12">
												<input className="" type="checkbox" id="switch-light-1" onChange={getDeviceValue}/>
											</div>
											
										</label>
										<label className="switch ml-auto">
											<input type="checkbox" id="switch-light-2" onChange={getDeviceValue}/>
										</label>
									</div>
								</div>





								<div className="card" data-unit="switch-light-3 switch-light-4">
									<div className="card-body d-flex">
									<div className="row">
									<div className="col">
										<svg className="icon-sprite">
											<use className="glow" fill="url(#radial-glow)" xlinkHref="assets/images/icons-sprite.svg#glow"/>
											<use xlinkHref="assets/images/icons-sprite.svg#bulb-eco"/>
										</svg>
										<h5>Temperature</h5>
										</div>
										<div className="col">
											<p>hi i am sensor</p>
										<label className="switch ml-auto">
											<input type="checkbox" id="switch-light-3"  onChange={getDeviceValue}/>
										</label>
										</div>
										<div className="col">
										<p>hi i am not sensor</p>
										<label className="switch ml-auto">
											<input type="checkbox" id="switch-light-4"  onChange={getDeviceValue}/>
										</label>
										</div>
									</div>
									</div>
								</div>
								<div className="card" data-unit="switch-light-5 switch-light-6">
									<div className="card-body d-flex">
										<svg className="icon-sprite">
											<use className="glow" fill="url(#radial-glow)" xlinkHref="assets/images/icons-sprite.svg#glow"/>
											<use xlinkHref="assets/images/icons-sprite.svg#bulb-eco"/>
										</svg>
										<h5>Movement</h5>
										<label className="switch ml-auto">
											<input type="checkbox" id="switch-light-5"  onChange={getDeviceValue}/>
										</label>
										<label className="switch ml-auto">
											<input type="checkbox" id="switch-light-6"  onChange={getDeviceValue}/>
										</label>
									</div>
								</div>
								<div className="card" data-unit="switch-light-7 switch-light-8">
									<div className="card-body d-flex">
										<svg className="icon-sprite">
											<use className="glow" fill="url(#radial-glow)" xlinkHref="assets/images/icons-sprite.svg#glow"/>
											<use xlinkHref="assets/images/icons-sprite.svg#bulb-eco"/>
										</svg>
										<h5>TV</h5>
										<label className="switch ml-auto">
											<input type="checkbox" id="switch-light-7"  onChange={getDeviceValue}/>
										</label>
										<label className="switch ml-auto">
											<input type="checkbox" id="switch-light-8"  onChange={getDeviceValue}/>
										</label>
									</div>
								</div>
								{/* <!-- Exterior lights  END --> */}
							</div>
							</div>
                           


                            {/* <!-- Add Devices  to room  START --> */}
                            <div className="row ">
                                <div className="col-sm-6  mx-auto">
								
									

                                <div className="card-body">
										<div className="lights-controls" data-controls="switch-lights">
											<button onClick={devicesSaveBtnClick} data-action="Add Devices" type="button" className="btn btn-primary lights-control">Add <strong>Devices</strong></button>
										</div>
									</div> 
								</div>
                            </div>


                            {/* <!-- Add Devices  to room  END --> */}
							
                        
            </React.Fragment>
           
        )
    
}
export default AddDevices
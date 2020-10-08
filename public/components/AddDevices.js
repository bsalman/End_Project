import React, { useState } from 'react'
import {Button, Form, FormGroup, Label, Input } from 'reactstrap';

//==============================================//
import SideNav from './SideNav'
import TopNav from './TopNav'
import CustomModal from './CustomModal'



const AddDevices = () => { 

	const initialState = {
		roomTitle : '',
		modalElement:null,
		showModal:false,
		modalTitle:'',
		modalClass: 'bg-primary'
	  }
	
	  const [state,setState] = useState(initialState)

	  const getDeviceValue = (e) => {
		  e.preventDefault()
		  console.log(e.currentTarget.parentElement.parentElement.children[1].innerHTML);
	  }

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
			<div id="wrapper">
                <TopNav/> 
                <div className="wrapper-offcanvas">
                   <div className="row-offcanvas row-offcanvas-left">
                     <SideNav/>
                     <div id="main">
                        <div className="container-fluid">
            
            <h3 className="card-title center">Choose devices to your home</h3>
                            <div className="row">
                                {/* <!-- Add Devices   START --> */}

                            <div className="col-sm-12 col-md-6 col-xl-4">
								{/* <!-- Exterior lights  START --> */}
								
								<div className="card" data-unit="switch-light-6">
									<div className="card-body d-flex flex-row justify-content-start">
										<svg className="icon-sprite">
											<use className="glow" fill="url(#radial-glow)" xlinkHref="assets/images/icons-sprite.svg#glow"/>
											<use xlinkHref="assets/images/icons-sprite.svg#bulb-eco"/>
										</svg>
										<h5>Front doors</h5>
										<label className="switch ml-auto">
											<input type="checkbox" id="switch-light-6" onClick={getDeviceValue}/>
										</label>
									</div>
								</div>





								<div className="card" data-unit="switch-light-7">
									<div className="card-body d-flex">
										<svg className="icon-sprite">
											<use className="glow" fill="url(#radial-glow)" xlinkHref="assets/images/icons-sprite.svg#glow"/>
											<use xlinkHref="assets/images/icons-sprite.svg#bulb-eco"/>
										</svg>
										<h5>Back doors</h5>
										<label className="switch ml-auto">
											<input type="checkbox" id="switch-light-7"/>
										</label>
									</div>
								</div>
								<div className="card" data-unit="switch-light-8">
									<div className="card-body d-flex">
										<svg className="icon-sprite">
											<use className="glow" fill="url(#radial-glow)" xlinkHref="assets/images/icons-sprite.svg#glow"/>
											<use xlinkHref="assets/images/icons-sprite.svg#bulb-eco"/>
										</svg>
										<h5>Pool</h5>
										<label className="switch ml-auto">
											<input type="checkbox" id="switch-light-8"/>
										</label>
									</div>
								</div>
								<div className="card" data-unit="switch-light-9">
									<div className="card-body d-flex">
										<svg className="icon-sprite">
											<use className="glow" fill="url(#radial-glow)" xlinkHref="assets/images/icons-sprite.svg#glow"/>
											<use xlinkHref="assets/images/icons-sprite.svg#bulb-eco"/>
										</svg>
										<h5>Garage</h5>
										<label className="switch ml-auto">
											<input type="checkbox" id="switch-light-9"/>
										</label>
									</div>
								</div>
								{/* <!-- Exterior lights  END --> */}
							</div>
                            {/* second one */}
                            <div className="col-sm-12 col-md-6 col-xl-4">
								{/* <!-- Exterior lights  START --> */}
								<div className="card" data-unit="switch-light-10">
									<div className="card-body d-flex flex-row justify-content-start">
										<svg className="icon-sprite">
											<use className="glow" fill="url(#radial-glow)" xlinkHref="assets/images/icons-sprite.svg#glow"/>
											<use xlinkHref="assets/images/icons-sprite.svg#bulb-eco"/>
										</svg>
										<h5>Front doors</h5>
										<label className="switch ml-auto">
											<input type="checkbox" id="switch-light-10"/>
										</label>
									</div>
								</div>
								<div className="card" data-unit="switch-light-11">
									<div className="card-body d-flex">
										<svg className="icon-sprite">
											<use className="glow" fill="url(#radial-glow)" xlinkHref="assets/images/icons-sprite.svg#glow"/>
											<use xlinkHref="assets/images/icons-sprite.svg#bulb-eco"/>
										</svg>
										<h5>Back doors</h5>
										<label className="switch ml-auto">
											<input type="checkbox" id="switch-light-11"/>
										</label>
									</div>
								</div>
								<div className="card" data-unit="switch-light-12">
									<div className="card-body d-flex">
										<svg className="icon-sprite">
											<use className="glow" fill="url(#radial-glow)" xlinkHref="assets/images/icons-sprite.svg#glow"/>
											<use xlinkHref="assets/images/icons-sprite.svg#bulb-eco"/>
										</svg>
										<h5>Pool</h5>
										<label className="switch ml-auto">
											<input type="checkbox" id="switch-light-12"/>
										</label>
									</div>
								</div>
								<div className="card" data-unit="switch-light-13">
									<div className="card-body d-flex">
										<svg className="icon-sprite">
											<use className="glow" fill="url(#radial-glow)" xlinkHref="assets/images/icons-sprite.svg#glow"/>
											<use xlinkHref="assets/images/icons-sprite.svg#bulb-eco"/>
										</svg>
										<h5>Garage</h5>
										<label className="switch ml-auto">
											<input type="checkbox" id="switch-light-13"/>
										</label>
									</div>
								</div>
								{/* <!-- Exterior lights  END --> */}
							</div>
                            </div>

                            {/* <!-- Add Devices   END --> */}


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
							</div>
                     </div>
                   </div>
                </div>
            </div>
                        
            </React.Fragment>
           
        )
    
}
export default AddDevices
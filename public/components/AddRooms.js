//==========import from package ===========//
import React from 'react';
import {Button, Form, FormGroup, Label, Input,Modal,ModalHeader,ModalBody,ModalFooter  } from 'reactstrap';
//============= import from component and services ==============//
import CustomModal from './CustomModal'
import {addRoomPost} from '../services/api'
import YourRooms from './YourRooms'


//================== creating class=====================//
class AddRooms extends React.Component{

	state={
		roomName:'',
		roomType :'',
		modalElement: null,
		errorComponent: null,
		showErrorModal: false,
		modalTitle: '',
		modalClass: 'bg-danger',
		modal:false
	}
	//================= add room method ====================//
	onAddClick=(e)=>{
		e.preventDefault();
		if(this.state.roomName.trim()===''||this.state.roomType ===''){
			const errorsElement=(
				<ul>
          			{this.state.roomName.trim() === ''? <div>Room Name should not be empty</div>: null}
          			{this.state.roomType ===''? <div>select one of the Options</div>: null}
          		</ul>
			)
			this.setState({ modal:false ,errorComponent: errorsElement, showErrorModal: true})
		}else{
			addRoomPost(this.state.roomName,this.state.roomType).then(data=>{
		
				let badgeClass = ''
				let badgeMessage =''
				switch (data) {
			  case 1:
				this.setState({...this.state, roomName:'',
				roomType :'',modal:false})
				break;
			  case 2:
				badgeClass = 'alert alert-danger'
				badgeMessage = 'You had an empty data, please fill your data '
				break;
				case 3:
				badgeClass = 'alert alert-danger'
				badgeMessage = 'this name is all ready exist, please change the name of the room '
				this.setState({...this.state, roomName:'',
				roomType :''})
				break;
			  case 4:
				badgeClass = 'alert alert-danger'
				badgeMessage = 'There was a server side error, please contact the adminstrator'
				break;
			  default:
				break;
			}
			if(data!=1){
				const badge = (
				<div className={badgeClass} role="alert">
							{badgeMessage}
				</div>
			  )
			  this.setState({
				errorComponent: badge,showErrorModal:true
			  })
	
			}
		}).catch((error)=>{
			console.log(error);
			const badge = (
				<div className="alert alert-danger" role="alert">
							can not send the registration data to server
				</div>
			  )
			  this.setState({
				errorComponent: badge
			  })
		})

	}}
//==============close error modal==========================//
	closeModal = () => {
		this.setState({showErrorModal: false})
	  }
//================= toggle add modal=======================//  
	toggle = () => {this.setState({modal:!this.state.modal})};
																		
//=============================================================//
	render(){
		const {className} = this.props;
		return(
			<React.Fragment>
				<CustomModal
					show={this.state.showErrorModal}
					close={this.closeModal}
					className="bg-danger"
					title="Error with Your Entries">
					{this.state.errorComponent}
				</CustomModal>
					<Modal isOpen={this.state.modal} toggle={this.toggle} className={className} >
						{/* <ModalHeader toggle={this.toggle}><h3 className="card-title">Add Room</h3></ModalHeader> */}
						<ModalBody  >
					
								<h3 className="card-title modal-font">Add Room</h3>
								<Form  className="p-2">
									<FormGroup className="row">
									<div className="col-12" modal-content>
										<Label  for="room_name" className="col-12 col-form-label modal-font">Room Name</Label>
												<Input  className="form-control custom-focus" type="text" id="room_name"
														onChange={e=>{
														this.setState({roomName:e.target.value})
														}}
														value={this.state.roomName} />
														</div>
									</FormGroup>
										<FormGroup className="form-group row">
										<div className="col-12">
                                                <Label for="room_type" className="col-12 col-form-label modal-font">Room Type</Label>
													<Input className="form-control custom-focus" type="select" name="select" id="room_type" 
															onChange={(e)=>{
															this.setState({roomType:e.target.value})
															}}
															value={this.state.roomType}>   
																<option></option>
																<option>Kitchen</option>
																<option>Dining room</option>
																<option>Living room</option>
																<option>Bath room</option>
																<option>Garage</option>
													</Input>
											</div>
										</FormGroup>
								</Form>
				
						</ModalBody>
							<ModalFooter>
								<Button color="primary" onClick={this.onAddClick} >save</Button>
								<Button color="secondary" onClick={this.toggle}>Cancel</Button>
							</ModalFooter>
					</Modal>
				
					
    			
				{/* ====================================================== */}
				<div className="row" >
					{/* add rooms card start  */}
					<div className="col-sm-12 col-md-6 col-xl-4">
						<div className="card">
							<div className="card-body d-flex flex-row justify-content-center">
								<h2 className="card-title">Rooms</h2>
							</div>
							<hr className="my-0"/>
							<div className="card-body d-flex flex-row justify-content-center">
							<Button data-action=""
							
							  className="btn btn-primary btn-lg  "
							   onClick={this.toggle}
							   >
								   <strong>Add New Room</strong></Button>
							</div>
						</div>
					</div>
					{/* add rooms card end  */}
					{/* ===========================rooms element====================================== */}
				</div>
				
					
				
			</React.Fragment>
					
				
			
			
		)
	}
}


export default AddRooms
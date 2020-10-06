import React from 'react'
import {Button, Form, FormGroup, Label, Input } from 'reactstrap';

//==============================================//
import SideNav from './SideNav'
import TopNav from './TopNav'
import CustomModal from './CustomModal'
import {addRoomPost} from '../services/api'


class AddRooms extends React.Component{
    state={
		roomName:'',
		roomType :'',
		modalElement: null,
		errorComponent: null,
		showErrorModal: false,
		modalTitle: '',
        modalClass: 'bg-danger'
	}
	//=====================//
	onAddRoomClick=(e)=>{
		e.preventDefault();
		if(this.state.roomName.trim()===''||this.state.roomType ===''){
			const errorsElement=(
				<ul>
          			{this.state.roomName.trim() === ''? <li>Room Name should not be empty</li>: null}
          			{this.state.roomType === 'select'? <li>select one of the Options</li>: null}
          		</ul>
			)
			this.setState({errorComponent: errorsElement, showErrorModal: true})
		} else{
			addRoomPost(this.state.roomName,this.state.roomType).then(data=>{
			console.log(data);

			switch (data) {
          case 1:
            badgClass = 'alert alert-success'
            badgMessage = ' the adding is successful, '
            break;
          case 2:
			badgeClass = 'alert alert-danger'
			badgeMessage = 'there sever side error , please contect with the proveider '
			break;
          case 4:
            badgClass = 'alert alert-danger'
            badgMessage = 'there was a server side error, pleasecontact the adminstrator'
            break;
          case 3:
            badgClass = 'alert alert-danger'
            badgMessage = 'there is already a user with the same email, please choose another email'
            break;
          default:
            break;
        }
		 const badge = (
			<div className={badgeClass} role="alert">
						{badgeMessage}
			</div>
		  )
		  this.setState({
			errorComponent: badge,showErrorModal:true
		  })

		}).catch((error)=>{
				console.log(error);
				const badge = (
					<div className="alert alert-danger" role="alert">
								can not send the registration data to server
					</div>
				  )
				  this.setState({
					resultElement: badge
				  })
				
		})
		}
		
	}
	closeModal = () => {
		this.setState({showErrorModal: false})
	  }

    render(){
        return(
            // <!-- Interior lights  START -->
        <React.Fragment>
			<CustomModal
				show={this.state.showErrorModal}
				close={this.closeModal}
				className="bg-danger"
				title="Error with Your Entries">
				{this.state.errorComponent}
    		</CustomModal>
			
            <div id="wrapper">
                <TopNav/> 
                <div className="wrapper-offcanvas">
                   <div className="row-offcanvas row-offcanvas-left">
                     <SideNav/>
                     <div id="main">
                        <div className="container-fluid">
                            <div className="row">
								<div className="col-sm-12 col-md-6 pb-3 ct-chart">
								
									{/* <!-- Add Room   START --> */}
										<div className="card" data-unit-group="switch-lights">
											<div className="card-body">
												<h3 className="card-title">Add Room</h3>
												<Form  className="p-2">
													<FormGroup className="row">
														<Label  for="room_name" className="col-12 col-form-label">Room Name</Label >
															<div className="col-12">
															<Input  className="form-control custom-focus" type="text" id="room_name"
															onChange={e=>{
																this.setState({roomName:e.target.value})
															}}
															value={this.state.roomName} />
															</div>
													</FormGroup>
													<FormGroup className="form-group row">
														<Label for="room_type" className="col-12 col-form-label">Room Type</Label>
															<div class="col-12">
																<Input class="form-control custom-focus" type="select" name="select" id="room_type" 
																onSelect={(e)=>{
																	this.setState({roomType:e.target.value})
																}}
																value={this.state.roomType}>
																<option>select</option>
																<option>Kitchen</option>
																<option>Dining room</option>
																<option>Living room</option>
																<option>Bath room</option>
																<option>Garage</option>
																
																</Input>
															</div>
													</FormGroup>
													<FormGroup className="row">
														<div className="col-12 mt-3 mb-2 text-center">
															<Button  className="btn btn-primary btn-block"
															onClick={(e)=>{this.onAddRoomClick}}>save</Button>
														</div>
													</FormGroup>

												</Form>
											</div>
											
											
										</div>
										
									</div>
							{/* <div class="col-sm-12 col-md-6 pb-3 ct-chart">
								<div class="card">
									<div className="card-body">
										<h3 className="card-title">Yor Rooms</h3>
										<hr className="my-0"/>
									</div>
                                </div> 
                            </div>  */}
                        </div>
                         </div>
                     </div>
                   </div>
                </div>
            </div>
            </React.Fragment>
           
        )
    }
}
export default AddRooms

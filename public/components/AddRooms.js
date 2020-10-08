import React from 'react'
import {Button, Form, FormGroup, Label, Input } from 'reactstrap';

//==============================================//
import CustomModal from './CustomModal'
import {addRoomPost} from '../services/api'
import YourRooms from './YourRooms'


class AddRooms extends React.Component{
    state={
		roomName:'',
		roomType :'',
		modalElement: null,
		errorComponent: null,
		showErrorModal: false,
		modalTitle: '',
		modalClass: 'bg-danger',
		addedRoom: null
	}
	//=====================//
	onAddRoomClick=(e)=>{
		e.preventDefault();
		if(this.state.roomName.trim()===''||this.state.roomType ===''){
			const errorsElement=(
				<ul>
          			{this.state.roomName.trim() === ''? <div>Room Name should not be empty</div>: null}
          			{this.state.roomType ===''? <div>select one of the Options</div>: null}
          		</ul>
			)
			this.setState({errorComponent: errorsElement, showErrorModal: true})
		} else{
			addRoomPost(this.state.roomName,this.state.roomType).then(data=>{
		
            let badgeClass = ''
            let badgeMessage =''
			switch (data) {
          case 1:
            // badgeClass = 'alert alert-success'
			// badgeMessage = ' the adding is successful'
			this.setState({...this.state, roomName:'',
			roomType :''})

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
		}
		
	}
	componentDidMount() {
		this.setState({
			...this.state
		  })
		console.log('state',this.state.room);
	}


	closeModal = () => {
		this.setState({showErrorModal: false})
	  }

    render(){
		const room = ()=>{
			return this.state.room
		}
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
                <div className="row">
					<div className="col-sm-12 col-md-6 pb-3 ct-chart">
						{/* <!-- Add Room   START --> */}
						<div className="card" data-unit-group="switch-lights">
							<div className="card-body">
								<h3 className="card-title">Add Room</h3>
								<Form  className="p-2">
									<FormGroup className="row">
									<div className="col-12">
										<Label  for="room_name" className="col-12 col-form-label">Room Name</Label >
											
												<Input  className="form-control custom-focus" type="text" id="room_name"
														onChange={e=>{
														this.setState({roomName:e.target.value})
														}}
														value={this.state.roomName} />
														</div>
									</FormGroup>
										<FormGroup className="form-group row">
										<div className="col-12">
                                                <Label for="room_type" className="col-12 col-form-label">Room Type</Label>
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
										<FormGroup className="row">
											<div className="col-12 mt-3 mb-2 text-center">
												<Button  className="btn btn-primary btn-block"
														onClick={this.onAddRoomClick}>save</Button>
											</div>
										</FormGroup>
								</Form>
							</div>
						</div>
					</div>
					
						<YourRooms newRoom={this.state.addedRoom} />
            </div>
            </React.Fragment>
           
        )
    }
}
export default AddRooms
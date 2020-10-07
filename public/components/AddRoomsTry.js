import React from 'react'
import {Button, Form, FormGroup, Label, Input } from 'reactstrap';

//==============================================//
import SideNav from './SideNav'
import TopNav from './TopNav'
import CustomModal from './CustomModal'
import {addRoomPost, allRoomsPost} from '../services/api'


class AddRooms extends React.Component{
    state={
		roomName:'',
		roomType :'',
		modalElement: null,
		errorComponent: null,
		showErrorModal: false,
		modalTitle: '',
		modalClass: 'bg-danger',
		rooms: ''
	}

	// componentDidMount() {
	// 	//console.log(new Date().toLocaleTimeString());
	// 	allRoomsPost().then(data => {
	// 	  console.log('rooms:',data);
	// 	}).catch(error => {
	// 	  console.log(error);
	// 	})
	//   }
	
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
            let badgeClass = ''
			let badgeMessage = ''
			
			switch (data) {
        //   case 1:
        //     badgeClass = 'alert alert-success'
        //     badgeMessage = ' the adding is successful'
        //     break;
          case 2:
			badgeClass = 'alert alert-danger'
			badgeMessage = 'You had an empty data, please fill your data '
            break;
          case 3:
            badgeClass = 'alert alert-danger'
            badgeMessage = 'there was a server side error, check your query syntaxe'
            break;
        
          case 4:
            badgeClass = 'alert alert-danger'
            badgeMessage = 'There was a server side error, please contact the adminstrator'
            break;
          default:
			  data.forEach(room => {
				this.setState({rooms: room.type})
			  });
				console.log('success');
				this.setState({rooms: data})
				// const roomElement = (
				// 	<ul>
				// 		<li>
				// 		<div className="card" data-unit="switch-light-6">
                //             <div className="card-body d-flex flex-row justify-content-center">
                //                  <h5>dvvs</h5>
                //             </div>
                //         </div>
				// 		</li>
            	// 		<li>
				// 		<div className="card" data-unit="switch-light-6">
                //             <div className="card-body d-flex flex-row justify-content-center">
                //                  <h5>{data.type}</h5>
                //             </div>
                //         </div>
				// 		</li>
          		// 	</ul>
				// )
				// this.setState({
				// 	...this.state,
				// 	room:roomElement,
				// 	roomName:'',
				// 	roomType:''
				//   })
				//   console.log(this.state.room);
				
            break;
		}
		if (typeof(data) === 'number') {
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
														
															<div className="col-12">
                                                            <Label for="room_type" className="col-12 col-form-label">Room Type</Label>
																<Input className="form-control custom-focus" type="select" name="select" id="room_type" 
																onChange={(e)=>{
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
															onClick={this.onAddRoomClick}>save</Button>
														</div>
													</FormGroup>

												</Form>
											</div>
											
											
										</div>
										
									</div>
									<div className="col-sm-12 col-md-6 pb-3 ct-chart">
                <div className="card" data-unit-group="switch-lights">
                    <div className="card-body">
                        <h3 className="card-title">Add Room</h3>
                        <hr className="my-0"/>
                        {this.state.room}
                    </div> 
                </div>
            </div>
							
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
import React,{ useState ,useEffect} from 'react'
import {connect} from 'react-redux'
import { Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
//=====================================//
import DashboardLights from './DashboardLights'
import DashboardTemperature from './DashboardTemperature'
import DashboardMotion from './DashboardMotion'
import DashboardAppliances from './DashboardAppliances'
import {setRoomsAction} from '../actions'
import {secureAllHousePost} from '../services/api'
// import {setRoomsAction} from '../actions'



const Dashboard =(props)=> {
		
	//=================================//	
	let initialState={
		security:false,
		modals:false
		
	}
	const [state,setState] = useState(initialState)
	//=========================================//
	
	// const toggle=()=>{setState({...state,
	// 	modals: !state.modals})}

	const securityActivate=(e,secure)=>{
		e.preventDefault()
		setState({...state,security:!state.security})	
		
			secureAllHousePost(secure).then(data=>{
				console.log(data);
				
			})	
	}
	
	
if(props.rooms.length>0){
				console.log("sec2",state.security);
			}
				
			
		return(
			
				<React.Fragment>
	{/* // 				<Modal isOpen={state.modals} toggle={toggle}  className="modal-warning centered fade">
	// 					<div className="modal-dialog modal-sm" role="document">
	// 						<div className="modal-content">
    //     				<ModalBody>
	// 						<div id="armTimer">
	// 	<h3 className="font-weight-bold">{`${state.modals==false?" 10 seconds to Start":" 10 seconds to Stop"}`}<span className="timer font-weight-normal"></span></h3>
	// 	</div>
    //     </ModalBody>
    //     </div>
	// 	</div>
    //   </Modal> */}
					{/* <!-- Arming Modal --> */}
	{/* <Modal   isOpen={state.security} className="modal modal-warning centered fade" id="armModal" tabindex="-1" role="dialog" aria-label="Arming" aria-hidden="true">
		<div className="modal-dialog modal-sm" role="document">
			<div className="modal-content">
				<ModalBody className="modal-body">
					<div id="armTimer">
						<h3 className="font-weight-bold">EXIT NOW! <span className="timer font-weight-normal"></span></h3>
					</div>
				</ModalBody>
			</div>
		</div>
		<Button type="button" className="close close-modal" data-dismiss="modal" aria-label="Close">
			<span aria-hidden="true">&times;</span>
		</Button>
	</Modal > */}

	{/* <!-- Alarm Modal --> */}
					
					<div className="row">
						<div className="col-sm-12">
							<div className="card p-2 mb-4 align-items-center">
								<h4>Hello:user</h4>
							</div>
						</div>
					</div>
					<div className="row">
						{/* security system start  */}
					<div className="col-sm-12 col-md-6">
							<div className=  {`card lock ${state.security==true?"active":""}`} data-unit="switch-house-lock">
								<div className="card-body " >
									<div className="d-flex flex-wrap mb-2">
										<img src={`${state.security==true?"../images/home-lock.png":"../images/home-unlock.png"}`} style={{width:"32px",height:"32px"}}></img>
										<div className="title-status">
											<h4>Security system</h4>
											<p>{`${state.security==true?"Active":"Not active"}`}</p>
										</div>
										<Label className={`switch ml-auto ${state.security==true?"checked":""}`}>
											<Input type="checkbox" id="switch-house-lock" onClick={(e)=>{securityActivate(e)}}/>
										</Label>
									</div>
								</div>
							</div>
						</div>
						{/* security system end  */}
						<div className="col-sm-12 col-md-6">
									{/* <!-- Garage-doors START --> */}
							<div className="card" data-unit="garage-doors-1">
								<div className="card-body">
									<div className="d-flex flex-wrap mb-2">
										<img src="../images/garage.png" style={{width:"32px",height:"32px"}}></img>
										<div className="title-status">
											<h5>Garage doors</h5>
											<p className="status text-danger">Close</p>
										</div>
										<div className="ml-auto timer-controls" data-controls="garage-doors-1">
												<Button data-action="open" type="button" className="btn btn-secondary doors-control">Open</Button>
												<Button data-action="pause" type="button" className="btn btn-secondary doors-control">Pause</Button>
												<Button data-action="resume" type="button" className="btn btn-secondary doors-control">Resume</Button>
												<Button data-action="close" type="button" className="btn btn-secondary doors-control">Close</Button>
										</div>
									</div>
									<div className="progress">
										<div className="progress-bar progress-tiny timer" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="12"></div>
									</div>
									<div className="info-holder info-cb">
										<div data-toggle="popover-all" data-content="Element driven by javascript (countdown timer)." data-original-title="Progress indicator" data-placement="top" data-offset="0,-12"></div>
									</div>
								</div>
							</div>
						</div>
	
					</div>
					{/* lights temp motion aria started */}
					<div className="row">
						{/* Lights system start  */}
						<DashboardLights parameter={props.rooms}/>
						{/* Lights system end  */}
						{/* Temperature system start  */}
						<DashboardTemperature parameter={props.rooms}/>
						{/* Temperature system end  */}
						{/* Motion system start  */}
						<DashboardMotion parameter={props.rooms}/>
						{/* Motion system end  */}	
					
					</div>	
					<div className="row">
					<DashboardAppliances parameter={props.rooms}/>
					</div>
				</React.Fragment>
			)
		
		}
		
	
const setStateToProps = (state) => {
		return ({rooms: state.rooms})
		  }

export default connect(setStateToProps,{setRoomsAction})(Dashboard)





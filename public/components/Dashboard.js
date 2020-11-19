import React,{ useEffect, useState } from 'react'
import {connect} from 'react-redux'
import { Button, Label, Input} from 'reactstrap'
//=====================================//
import DashboardLights from './DashboardLights'
import DashboardTemperature from './DashboardTemperature'
import DashboardMotion from './DashboardMotion'
import DashboardAppliances from './DashboardAppliances'
import {setRoomsAction} from '../actions'
import {secureAllHousePost, getSecurePost} from '../services/api'
import Garage from './Garage'
// import {setRoomsAction} from '../actions'



const Dashboard =(props)=> {
		
	//=================================//	
	let initialState={
		security:false
		
	}

	const [state,setState] = useState(initialState)
	//=========================================//
	//console.log("sec1",state.security);
	const securityActivate=(e)=>{
		e.preventDefault()
		// setState({...state,
		// 	security: !state.security})
			//console.log("sec2",state.security);
		secureAllHousePost(!state.security).then(data=>{
			if(state.security){
				props.socket.emit('stop_home_alarm', null)
			}
			
				//console.log(JSON.parse(data[0].value));
				setState({...state,
					security: JSON.parse(data[0].value)})
			})

	}
	useEffect(() => {
		getSecurePost().then(data=>{
			//console.log(data);
			setState({...state,
				security: JSON.parse(data.value)})
		})
	},[])
		//console.log("sec2",state.security);
		
	
				
			
		return(
			
				<React.Fragment>
					
					<div className="row">
						<div className="col-sm-12">
							<div className="card p-2 mb-4 align-items-center">
								<h4>Welcome Home</h4>
							</div>
						</div>
					</div>
					<div className="row">
						{/* security system start  */}
						<div className="col-sm-12 col-md-6">
							<div className=  {`card lock ${state.security==true?" active":""}`} data-unit="switch-house-lock">
								<div className="card-body " >
									<div className="d-flex flex-wrap mb-2">
										<img src={`${state.security==true?"../images/home-lock.png":"../images/home-unlock.png"}`} style={{width:"32px",height:"32px"}}></img>
										<div className="title-status">
											<h4>Security System</h4>
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
						{/* Garage Door starts  */}
							<Garage />	
						{/* <div className="col-sm-12 col-md-6">
								
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
						</div> */}

						{/* Garage Door ends  */}
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
		return ({
			rooms: state.rooms,
			socket: state.socket
		})
		  }

export default connect(setStateToProps,{setRoomsAction})(Dashboard)
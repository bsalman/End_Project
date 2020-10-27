import React from 'react'
import {connect} from 'react-redux'
//=====================================//
import DashboardLights from './DashboardLights'
import DashboardTemperature from './DashboardTemperature'
import DashboardMotion from './DashboardMotion'
import DashboardAppliances from './DashboardAppliances'
// import {setRoomsAction} from '../actions'



const Dashboard =(props)=> {
		
		
		
			if(props.rooms.length>0){
				
			}
		return(
			
				<React.Fragment>
					
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
							<div className="card " data-unit="switch-house-lock">
								<div className="card-body">
									<div className="d-flex flex-wrap mb-2">
										<svg className="icon-sprite icon-2x">
											<use xlinkHref="images/icons-sprite.svg#home"/>
											<use className="subicon-unlocked" xlinkHref="images/icons-sprite.svg#subicon-unlocked"/>
											<use className="subicon-locked" xlinkHref="images/icons-sprite.svg#subicon-locked"/>
											</svg>
										<div className="title-status">
											<h4>Security system</h4>
											<p className="status"><span className="arm"></span></p>
										</div>
										<label className="switch ml-auto">
											<input type="checkbox" id="switch-house-lock"/>
										</label>
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
										<svg className="icon-sprite icon-1x">
											<use className="glow" fill="url(#radial-glow)" xlinkHref="images/icons-sprite.svg#glow"/>
											<use xlinkHref="images/icons-sprite.svg#garage"/>
										</svg>
										<div className="title-status">
											<h5>Garage doors</h5>
											<p className="status text-danger">Close</p>
										</div>
										<div className="ml-auto timer-controls" data-controls="garage-doors-1">
												<button data-action="open" type="button" className="btn btn-secondary doors-control">Open</button>
												<button data-action="pause" type="button" className="btn btn-secondary doors-control">Pause</button>
												<button data-action="resume" type="button" className="btn btn-secondary doors-control">Resume</button>
												<button data-action="close" type="button" className="btn btn-secondary doors-control">Close</button>
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

export default connect(setStateToProps,{})(Dashboard)





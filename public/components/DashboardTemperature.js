//------------------------------------------------------------//
///////////////       IMPORT DEPENDENCIES     /////////////////
//-----------------------------------------------------------//
import React from 'react'

//------------------------------------------------------------//
///////////////    FUNCTIONAL COMPONENT       ////////////////
//-----------------------------------------------------------//
const DashboardTemperature = (props)=>{
    
    const rooms = props.parameter
		
	//console.log(props.parameter)
	const roomElement = rooms.filter(room => room.devices.find(device => device.category ==='Temperature')).map((room)=>{
		
		const TempElement = room.devices.filter(device=> device.category === 'Temperature').map(device=>{
			//console.log(device);
		 return(
			
			<h5 key={device.id} className="mt-2 ml-auto status">{JSON.parse(device.data).t}<sup>°C</sup></h5>
		  )
		})
		
        return(
                <div key={room.id} className="card">
					<div className="card-body d-flex flex-row justify-content-start" data-unit="room-temp-02">
					    {/* <svg className="icon-sprite">
						    <use xlinkHref="images/icons-sprite.svg#thermometer-tiny"/>
					    </svg> */} 
						<h5><img src="/images/temperature.png"></img> {room.type}</h5>
						{TempElement}
					</div>
				</div>
        )
     })
        return (
        <React.Fragment>
           <div className="col-sm-12 col-md-6 col-xl-4">
							<div className="card text-center">
								<div className="card-body">
									<h4 className="card-title">Temperature - Indicator</h4>
									<div className="overflow">
									{roomElement}
									</div>
									
									
								</div>
							</div>
			</div>
        </React.Fragment>
        )
}
export default  DashboardTemperature
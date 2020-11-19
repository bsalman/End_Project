import React from 'react'


const DashboardMotion = (props)=>{
   
    const rooms=props.parameter
    const MotionElement=rooms.filter(room => room.devices.find(device => device.category ==='Motion')).map((room)=>{
            
        return(
            <div  key={room.id} className="card">
                <div className="card-body d-flex flex-row justify-content-start" data-unit="room-temp-02">
                    <h5><img src="/images/wave1.png"></img> {room.type}</h5>
                    <h6 className="mt-2 ml-auto status">{room.devices.find(device => (device.category == 'Motion' && device.data == '1')) ? 'Movement' : 'No Movement'}</h6>
                </div>
            </div>
        )
    })
        return (
        <React.Fragment>
          <div className="col-sm-12 col-md-6 col-xl-4">
							<div className="card">
								<div className="card-body">
									<h4 className="card-title">Motion</h4>
                                    <div className="overflow">
								{MotionElement}
                                </div>
								</div>
							</div>
						</div>
        </React.Fragment>
        )
}
export default  DashboardMotion
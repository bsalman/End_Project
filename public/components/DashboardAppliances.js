import React from 'react'
//===============================//
const DashboardAppliance = (props) =>{
    const rooms=props.parameter
    console.log("props",rooms);
    const ApplianceElement=rooms.filter(room => room.devices.find(device => device.category ==='Appliance')).map((room)=>{
        const devices = room.devices.filter(device=>device.category ==='Appliance').map(device => {
          console.log("device",device);
      return (
        <React.Fragment>
        <div key={device.id} className="card col-sm-12 col-md-6 col-xl-5">
            <div className="card-body d-flex flex-wrap justify-content-start" data-unit="room-temp-02">
            <img src={`${device.name==="washing-machine"?'../images/washing-machine.png':''}`}></img>
            <img src={`${device.name==="tv"?'../images/tv.png':''}`}></img>
            <img src={`${device.name==="fridge"?'../images/fridge1.png':''}`}></img>
                 <h5>{device.name}</h5>
                 <label className="switch ml-auto ">
                    <input type="checkbox" id={"switch-light-"+device.id}/>
                </label>
            </div>
        </div>
      &nbsp;
      </React.Fragment>
        
      )
    })
      return(
        <React.Fragment>
							&nbsp;
              <div key={room.id}>
              <h5>{room.type}</h5>
							<div  className="card-body d-flex flex-wrap overflow4 justify-content-md-center">
			          	{devices}
							</div>
              </div>
        </React.Fragment>
      )
    })
    
return(

        <div className="col-12">
          	<div className="col col-sm-12 card ">
							<div className="card-body">
							<h4 className="card-title "><img src="../images/appliance.png"></img> Appliances</h4>
              {ApplianceElement}
        </div>
        </div>
					</div>
   
)
}


export default (DashboardAppliance)
import React from 'react'


const DashboardLights = (props)=>{
    
    const rooms=props.param
        
    const LightElement=rooms.filter(room => room.devices.find(device => device.category ==='Light')).map((room)=>{
        
        return(
            <li key={room.id} className="list-group-item d-flex active " data-unit="switch-light-1">
                <svg className="icon-sprite">
                    <use className="glow" fill="url(#radial-glow)" xlinkHref="images/icons-sprite.svg#glow"/>
                    <use xlinkHref="images/icons-sprite.svg#bulb-eco"/>
                </svg>
                <h5>{room.type}</h5>
                <label className="switch ml-auto ">
                    <input type="checkbox" id="switch-light-1"/>
                </label>
            </li>
        )
    })

     
        return (
        <React.Fragment>
            <div className="col-sm-12 col-md-6 col-xl-4">
                <div className="card" data-unit-group="switch-lights">
                    <div className="card-body">
                        <h4 className="card-title">Lights - interior</h4>
                            </div>
                                <hr className="my-0"/>
                                    <ul className="list-group list-group-flush">
                                        {LightElement}
                                    </ul>
                                    <hr className="my-0"/>
                                    <div className="card-body">
                                        <div className="lights-controls" data-controls="switch-lights">
                                                <button data-action="all-on" type="button" className="btn btn-primary lights-control">All <strong>ON</strong></button>
                                                <button data-action="all-off" type="button" className="btn btn-secondary lights-control">All <strong>OFF</strong></button>
                                            </div>
                                    </div>
                    </div>
            </div>
        </React.Fragment>
        )
}
export default  DashboardLights
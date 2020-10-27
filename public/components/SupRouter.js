import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'


import SideNav from './SideNav'
import TopNav from './TopNav'
import Page404 from './Page404'
import Dashboard from './Dashboard'
import Settings from './Settings'
import Rooms from './Rooms'

import SingleRoomOv from './SingleRoomOv'
import TempSettings from './TemperatureSettings'
import MotionSettings from './MotionSettings'
import LightSetting from './LightSettings'
import AppliancesSetting from './AppliancesSetting'

// import LightDev from './LightDev'
// import TempDev from './TempDev'
// import MotionsDev from './MotionsDev'
class SupRouter extends React.Component {
    render() {
        return (
            
            <BrowserRouter>
                <div>
                    <div id="wrapper">
                        <TopNav/> 
                        <div className="wrapper-offcanvas">
                            <div className="row-offcanvas row-offcanvas-left">
                                <SideNav/>
                                     <div id="main">
                                        <div className="container-fluid"> 
                                
                                            <Switch>
                                                {/* dummy route start */}
                                                {/* <Route path="/light" exact component={LightDev} />
                                                <Route path="/temp" exact component={TempDev} />
                                                <Route path="/mo" exact component={MotionsDev} /> */}
                                                {/* dummy route  end*/}

                                                <Route path="/dashboard" exact component={Dashboard}/>
                                                <Route path="/rooms" exact component={Rooms} />
                                                <Route path="/settings" exact component={Settings} />
                                              
                                                {/* <Route path="/room/:roomtype/:id"exact component={ShowDevices} /> */}
                                                <Route path="/room/:roomtype/:id"exact component={SingleRoomOv} />
                                                <Route path="/tempSetting/:deviceCategory/:deviceName/:roomId/:id"exact component={TempSettings} />
                                                <Route path="/motionSetting/:deviceCategory/:deviceName/:roomId/:id"exact component={MotionSettings} />
                                                <Route path="/lightSetting/:deviceCategory/:deviceName/:roomId/:id" exact component={LightSetting} />
                                                <Route path="/appliancesSetting/:deviceCategory/:deviceName/:roomId/:id"exact component={AppliancesSetting}/>
                                                {/* <Route path="/room" exact component={SingleRoomOv} /> */}
                                                <Route path="/" default component={Page404} />  
                                            </Switch>
                                        </div> 
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>               
            </BrowserRouter>
        )
    
    }
}


export default SupRouter
import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'


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
import AppliancesSetting from './AppliancesSettings'

import AccountSettings from './AccountSettings'

class SupRouter extends React.Component {
    render() {
        return (
            
            <BrowserRouter>
                <div>
                    <div id="wrapper">
                        <TopNav/> 
                        <div className="wrapper-offcanvas">
                            <div className={ this.props.smallScreenCheck ? "row-offcanvas row-offcanvas-left active" : "row-offcanvas row-offcanvas-left"}>
                                <SideNav />
                                <div id="main">
                                        <div className="container-fluid"> 
                                
                                            <Switch>
                                            <Route path="/dashboard" exact component={Dashboard}/>
                                                <Route path="/rooms" exact component={Rooms} />
                                                
                                                {/* <Route path="/dashboard/allrooms" exact component={()=><YourRooms/>} /> */}
                                                <Route path="/settings" exact component={Settings} />
                                                <Route path="/accountSettings" exact component={AccountSettings}/>
                                                {/* <Route path="/showdevices/:roomtype/:id"exact component={ShowDevices} /> */}
                                                <Route path="/room/:roomtype/:id"exact component={SingleRoomOv} />
                                                {/* <Route path="/room/:roomtype/:id"exact component={SingleRoomOv} /> */}
                                                {/* <Route path="/dashboard/deleteroom" exact component={()=><YourRooms/>} /> */}
                                                <Route path="/tempSetting/:deviceCategory/:deviceName/:roomId/:id"exact component={TempSettings} />
                                                <Route path="/motionSetting/:deviceCategory/:deviceName/:roomId/:id"exact component={MotionSettings} />
                                                <Route path="/lightSetting/:deviceCategory/:deviceName/:roomId/:id" exact component={LightSetting} />
                                                <Route path="/appliancesSetting/:deviceCategory/:deviceName/:roomId/:id"exact component={AppliancesSetting}/>
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

const mapStateToProps = (state) => {
    return({
        smallScreenCheck: state.smallScreenCheck
    })
}

export default connect(mapStateToProps,null)(SupRouter)
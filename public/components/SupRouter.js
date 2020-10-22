import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'


import SideNav from './SideNav'
import TopNav from './TopNav'
import Page404 from './Page404'

import Settings from './Settings'
import Rooms from './Rooms'

import SingleRoomOv from './SingleRoomOv'
// import AllRooms from './AllRooms'
// import Dashboard from './Dashboard'
import LightDev from './LightDev'
import TempDev from './TempDev'
import Motions from './Motions'
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
                                                <Route path="/light" exact component={LightDev} />
                                                <Route path="/temp" exact component={TempDev} />
                                                <Route path="/mo" exact component={Motions} />
                                                {/* dummy route  end*/}


                                                <Route path="/rooms" exact component={Rooms} />
                                                {/* <Route path="/dashboard/allrooms" exact component={()=><YourRooms/>} /> */}
                                                <Route path="/settings" exact component={Settings} />
                                                {/* <Route path="/allrooms" exact component={AllRooms} /> */}
                                          
                                                {/* <Route path="/showdevices/:roomtype/:id"exact component={ShowDevices} /> */}
                                                
                                                {/* <Route path="/room/:roomtype/:id"exact component={ShowDevices} /> */}
                                                <Route path="/room/:roomtype/:id"exact component={SingleRoomOv} />


                                                {/* <Route path="/room" exact component={SingleRoomOv} /> */}
                                                {/* <Route path="/dashboard/deleteroom" exact component={()=><YourRooms/>} /> */}
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
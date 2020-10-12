import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'


import SideNav from './SideNav'
import TopNav from './TopNav'
import Page404 from './Page404'
import YourRooms from './YourRooms'
import Settings from './Settings'
import Rooms from './Rooms'
import AddDevices from './AddDevices'


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
                                                
                                                <Route path="/rooms" exact component={Rooms} />
                                                {/* <Route path="/dashboard/allrooms" exact component={()=><YourRooms/>} /> */}
                                                <Route path="/settings" exact component={Settings} />
                                                <Route path="/adddevices/:roomtype/:id"exact component={AddDevices} />
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
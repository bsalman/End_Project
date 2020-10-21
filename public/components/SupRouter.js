import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'



import SideNav from './SideNav'
import TopNav from './TopNav'
import Page404 from './Page404'
import Dashboard from './Dashboard'
import Settings from './Settings'
import Rooms from './Rooms'
import SingleRoomOv from './SingleRoomOv'
import LightDev from './LightDev'

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
                                                <Route path="/dashboard" exact component={Dashboard}/>
                                                <Route path="/rooms" exact component={Rooms} />
                                                {/* <Route path="/dashboard/allrooms" exact component={()=><YourRooms/>} /> */}
                                                <Route path="/settings" exact component={Settings} />
                                                <Route path="/room/:roomtype/:id"exact component={SingleRoomOv} />
                                                {/* <Route path="/dashboard/deleteroom" exact component={()=><YourRooms/>} /> */}
                                                <Route path="/light" exact component={LightDev} />
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
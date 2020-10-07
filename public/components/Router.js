import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'


import SideNav from './SideNav'
import TopNav from './TopNav'
import Page404 from './Page404'
import YourRooms from './YourRooms'

import Dashboard from './Dashboard'


class Router extends React.Component {
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
                                                
                                                <Route path="/dashboard" exact component={Dashboard} />
                                                <Route path="/dashboard/yourroom" exact component={()=><YourRooms/>} />
                                                <Route path="/" component={Page404} />  
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


export default Router
//=======================/start-import dependencies aria /===================================//
import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
//========================/start-import dependencies aria /==================================//
//=============/start_import Routers aria/===========================//
import Login from './Login'
import Page404 from './Page404'
import Settings from './Settings'
import DashBoard from './DashBoard'
import SideNav from './SideNav'
import TopNav from './TopNav'
//================/end-import Routers aria/========================//

class Router extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <div>
                   
                  
                   {/* <div id="wrapper">
                   <TopNav/> 
                   <div className="wrapper-offcanvas">
                    <div className="row-offcanvas row-offcanvas-left">
                        <SideNav/> */}
                    <Switch>
                    <Route path="/login" exact component={Login} />
                    <Route path="/settings" exact component={Settings} />
                    <Route path="/dashboard" exact component={DashBoard} />
                    <Route path="/" component={Page404} />
                    </Switch>
                    {/* </div>
                    </div> */}
                    {/* </div> */}
                </div>
                </BrowserRouter>
        )
    }
}
//==============export aria=======================//
export default Router

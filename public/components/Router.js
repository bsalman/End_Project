// importing dependencies
import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'



// importing the components
import Login from './Login'
import Settings from './Settings'
import Page404 from './Page404'
import DashBoard from './Dashboard'


class Router extends React.Component{

    render() {
        return(
                <BrowserRouter>
                <div>
             
                    <Switch>
                    <Route path="/login" exact component={Login} />
                    <Route path="/settings" exact component={Settings} />
                    <Route path="/dashboard" exact component={DashBoard} />
                    <Route path="/" component={Page404} />
                    {/* <Route path="/" component={Page404} /> */}
                    </Switch>
                </div>
                </BrowserRouter>
        )
    }
}

export default Router
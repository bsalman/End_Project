import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'


import Login from './Login'
import Page404 from './Page404'
import Settings from './Settings'
import Dashboard from './Dashboard'
import AddDevices from './AddDevices'


class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                   
                    
                    <Switch>
                    
                        <Route path="/login" exact component={Login} />
                        <Route path="/settings" exact component={Settings} />
                        <Route path="/dashboard" exact component={Dashboard} />
                        <Route path="/dashboard/yourroom" exact component={Dashboard} />
                        <Route path="/adddevices" exact component={AddDevices} />
                        <Route path="/" component={Page404} />  
                    </Switch>
                    
                    
                </div>
                </BrowserRouter>
        )
    
    }
}


export default Router
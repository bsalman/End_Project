import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'


import Login from './Login'
import Page404 from './Page404'
import Settings from './Settings'

class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                   
                    
                    <Switch>
                    
                        <Route path="/login" exact component={Login} />
                        <Route path="/settings" exact component={Settings} />
                        <Route path="/" component={Page404} />  
                    </Switch>
                    
                    
                </div>
                </BrowserRouter>
        )
    
    }
}


export default Router
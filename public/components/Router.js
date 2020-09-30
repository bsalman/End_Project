// importing dependencies
import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'


// importing the components
import Login from './Login'

class Router extends React.Component{

    render() {
        return(
                <BrowserRouter>
                <div>
                    <Switch>
                    <Route path="/login" exact component={Login} />
                    {/* <Route path="/" component={Page404} /> */}
                    </Switch>
                </div>
                </BrowserRouter>
        )
    }
}

export default Router
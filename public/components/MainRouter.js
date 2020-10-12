import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'


import Login from './Login'
import SupRouter from './SupRouter'
// import Settings from './Settings'


class MainRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch> <Route path="/login" exact component={Login} />
                       
                        {/* <Route path="/settings" exact component={Settings} /> */}
                       
                        <SupRouter/>
                    </Switch>                   
                </div>
                </BrowserRouter>
        )
    
    }
}


export default MainRouter
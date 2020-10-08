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
                    <Switch>
                        <Route path="/login" exact component={Login} />
                        {/* <Route path="/settings" exact component={Settings} /> */}
                        {/* <Route default path="/" exact component={SupRouter}/>   */}
                        <SupRouter/>
                    </Switch>                   
                </div>
                </BrowserRouter>
        )
    
    }
}


export default MainRouter
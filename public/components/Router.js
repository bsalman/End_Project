//=======================/start-import dependencies aria /===================================//
import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
//========================/start-import dependencies aria /==================================//
//=============/start_import Routers aria/===========================//
import Login from './Login'
//================/end-import Routers aria/========================//

class Router extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <div>
                   
                   
                    <Switch>
                    <Route path="/login" exact component={Login} />
                    </Switch>
                    
                </div>
                </BrowserRouter>
        )
    }
}
//=====================================//
export default Router

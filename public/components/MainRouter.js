import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'


import Login from './Login'
import SupRouter from './SupRouter'
import LandingPage from './LandingPage'
// import Settings from './Settings'

import {setRoomsAction} from '../actions'
import {allRoomsPost} from '../services/api'


class MainRouter extends React.Component {
    componentDidMount(){
        allRoomsPost().then(rooms=>{
            this.props.setRoomsAction(rooms)
        })
    }
    render() {
        return (
            <BrowserRouter>
                <div>
                 
                <Switch> 
                    <Route path="/" exact component={LandingPage}/>
                    <Route path="/login" exact component={Login} />
                        <SupRouter/>
                    </Switch>                   
                </div>
                </BrowserRouter>
        )
    
    }
}


export default connect(null,{setRoomsAction})(MainRouter)
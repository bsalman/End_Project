import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'


import Login from './Login'
import SupRouter from './SupRouter'
// import Settings from './Settings'

import {setRoomsAction} from '../actions'
import {allRoomsPost} from '../services/api'


class MainRouter extends React.Component {
    componentDidMount(){
        allRoomsPost().then(rooms=>{
            this.props.setRoomsAction(rooms,null,1)
        })
    }
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


export default connect(null,{setRoomsAction})(MainRouter)
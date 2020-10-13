import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'


import Login from './Login'
import SupRouter from './SupRouter'
// import Settings from './Settings'

import {setRoomsAction,setDevicesAction} from '../actions'
import {allRoomsPost} from '../services/api'


class MainRouter extends React.Component {
    //bring the data from the main state(local database for react)
    componentDidMount(){
        allRoomsPost().then(rooms=>{
            this.props.setRoomsAction(rooms)
            
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

//i dont want to change the main state so i write null hier
export default connect(null,{setRoomsAction})(MainRouter)
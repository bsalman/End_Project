import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'


import Login from './Login'
import SupRouter from './SupRouter'
// import Settings from './Settings'

import {setRoomsAction} from '../actions'
import {allRoomsPost} from '../services/api'


class MainRouter extends React.Component {
    // this automatically starts the main state, and loads the rooms (on the frontend) 
    //from the main state in the moment the first page(main page) is loaded.
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


export default connect(null,{setRoomsAction})(MainRouter)
// with connect we connect to the main state, first is null because
// we don't ask the main state for something, we are not changing anything there yet
// null just gives me data, i don't want to give the main state any data , just get


// the component unmount is responsible for the the main state. 
// the the main state is immediately loaded/activated as soon as the first page of this site is called
// componentDidMount(){
//     allRoomsPost().then(rooms=>{
//         this.props.setRoomsAction(rooms)
//     })
// }
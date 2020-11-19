import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'


import Login from './Login'
import SupRouter from './SupRouter'
import LandingPage from './LandingPage'
import AboutUsPage from './AboutUs'
import ContactPage from './ContactPage'

import {setRoomsAction, setSocketAction} from '../actions'
import {allRoomsPost} from '../services/api'

import io from 'socket.io-client'





class MainRouter extends React.Component {
    componentDidMount(){
        allRoomsPost().then(loadedRooms=>{
        this.props.setRoomsAction(loadedRooms)
        
        const socket = io(window.location.origin)
		socket.on('connect', () => {

			console.log('socket connected');
			socket.on('device_connect', sn => {
                //console.log('connect', sn);
                const rooms = [...loadedRooms]
                const room = rooms.find(room => room.devices.find(device => device.number === sn))
                const device = room.devices.find(device => device.number === sn)
                device.connected = true
                room.devices[room.devices.map(device => device.number).indexOf(sn)] = device
                rooms[rooms.map(foundRoom => foundRoom.id).indexOf(room.id)] = room
                loadedRooms = rooms
                this.props.setRoomsAction(rooms)
                
			})
			socket.on('device_disconnect', sn => {
                //console.log('disconnect', sn);
                const rooms = [...loadedRooms]
                const room = rooms.find(room => room.devices.find(device => device.number === sn))
                const device = room.devices.find(device => device.number === sn)
                device.connected = false
                room.devices[room.devices.map(device => device.number).indexOf(sn)] = device
                rooms[rooms.map(foundRoom => foundRoom.id).indexOf(room.id)] = room
                loadedRooms = rooms
                this.props.setRoomsAction(rooms)
            })
            socket.on('device_status', data => {
                console.log(data);
                const rooms = [...loadedRooms]
                const room = rooms.find(room => room.devices.find(device => device.id === data.id))
                const device = room.devices.find(device => device.id === data.id)
                device.data = data.status
                room.devices[room.devices.map(device => device.id).indexOf(data.id)] = device
                rooms[rooms.map(foundRoom => foundRoom.id).indexOf(room.id)] = room
                loadedRooms = rooms
                this.props.setRoomsAction(rooms)
            })
            socket.on('temp_data', data => {
                const rooms = [...loadedRooms]
                const room = rooms.find(room => room.devices.find(device => device.id === data.id))
                const device = room.devices.find(device => device.id === data.id)
                device.data = data.status
                room.devices[room.devices.map(device => device.id).indexOf(data.id)] = device
                rooms[rooms.map(foundRoom => foundRoom.id).indexOf(room.id)] = room
                loadedRooms = rooms
                this.props.setRoomsAction(rooms)
			})

        
            this.props.setSocketAction(socket)
        })
		})
    }
    render() {
        return (
            <BrowserRouter>
                <div>
                 
                <Switch> 
                    <Route path="/" exact component={LandingPage}/>
                    <Route path="/login" exact component={Login} />
                    <Route path="/aboutus" exact component={AboutUsPage} />
                    <Route path="/contactus" exact component={ContactPage} />
                        <SupRouter/>

                        
                        
                </Switch>                   
                </div>
                </BrowserRouter>
        )
    
    }
}

const setStateToProps = (state) => {
    return ({rooms: state.rooms})
      }

export default connect(setStateToProps,{setRoomsAction, setSocketAction})(MainRouter)
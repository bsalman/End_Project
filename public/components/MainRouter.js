import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'


import Login from './Login'
import SupRouter from './SupRouter'
import LandingPage from './LandingPage'
import AboutUsPage from './AboutUs'
import ContactPage from './ContactPage'
import Technology from './Technology'

import {setRoomsAction, setSocketAction} from '../actions'
import {allRoomsPost} from '../services/api'

import io from 'socket.io-client'


import Page404 from './Page404'
import Dashboard from './Dashboard'
import Settings from './Settings'
import Rooms from './Rooms'




import SingleRoomOv from './SingleRoomOv'
import TempSettings from './TemperatureSettings'
import MotionSettings from './MotionSettings'
import LightSetting from './LightSettings'
import AppliancesSetting from './AppliancesSettings'
import AccountSettings from './AccountSettings'
import Wrapper from './Wrapper'

import {checkLoginPost} from '../services/api'


class MainRouter extends React.Component {
    componentDidMount(){
        allRoomsPost().then(loadedRooms=>{
        this.props.setRoomsAction(loadedRooms)
        })
        
        const socket = io(window.location.origin)
		socket.on('connect', () => {

			console.log('socket connected');
			socket.on('device_connect', sn => {
                //console.log('connect', sn);
                // const rooms = [...this.props.rooms]
                // const room = rooms.find(room => room.devices.find(device => device.number === sn))
                // const device = room.devices.find(device => device.number === sn)
                // device.connected = true
                // room.devices[room.devices.map(device => device.number).indexOf(sn)] = device
                // rooms[rooms.map(foundRoom => foundRoom.id).indexOf(room.id)] = room
                // loadedRooms = rooms
                this.props.setRoomsAction(null,{key:'DEVICE_CONNECT',data: {id: sn}})
                
			})
			socket.on('device_disconnect', sn => {
                //console.log('disconnect', sn);
                // const rooms = [...this.props.rooms]
                // const room = rooms.find(room => room.devices.find(device => device.number === sn))
                // const device = room.devices.find(device => device.number === sn)
                // device.connected = false
                // room.devices[room.devices.map(device => device.number).indexOf(sn)] = device
                // rooms[rooms.map(foundRoom => foundRoom.id).indexOf(room.id)] = room
                // loadedRooms = rooms
                this.props.setRoomsAction(null,{key:'DEVICE_DISCONNECT',data: {id: sn}})
            })
            socket.on('device_status', data => {
                console.log(data);
                // const rooms = [...this.props.rooms]
                // const room = rooms.find(room => room.devices.find(device => device.id === data.id))
                // const device = room.devices.find(device => device.id === data.id)
                // device.data = data.status
                // room.devices[room.devices.map(device => device.id).indexOf(data.id)] = device
                // rooms[rooms.map(foundRoom => foundRoom.id).indexOf(room.id)] = room
                // loadedRooms = rooms
                this.props.setRoomsAction(null,{key:'DEVICE_STATUS',data})
            })
            socket.on('temp_data', data => {
                // const rooms = [...this.props.rooms]
                // const room = rooms.find(room => room.devices.find(device => device.id === data.id))
                // const device = room.devices.find(device => device.id === data.id)
                // device.data = data.status
                // room.devices[room.devices.map(device => device.id).indexOf(data.id)] = device
                // rooms[rooms.map(foundRoom => foundRoom.id).indexOf(room.id)] = room
                // loadedRooms = rooms
                this.props.setRoomsAction(null,{key:'DDEVICE_TEMP',data})
			})

        
            this.props.setSocketAction(socket)
        
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
                        {/* <SupRouter/> */}

                        <Route path="/dashboard" exact component={() => <Wrapper><Dashboard/></Wrapper> } />
						{/* <Route path="/dashboard" exact component={()=> <CheckLogin><Dashboard /></CheckLogin>} />  */}
						<Route path="/rooms" exact component={() => <Wrapper><Rooms/></Wrapper> } />
						{/* <Route path="/dashboard/allrooms" exact component={()=><YourRooms/>} /> */}
						<Route path="/settings" exact component={ () => <Wrapper><Settings/></Wrapper>} />
						<Route path="/accountSettings" exact component={ () => <Wrapper><AccountSettings/></Wrapper>} />
						{/* <Route path="/showdevices/:roomtype/:id"exact component={ShowDevices} /> */}
						<Route path="/room/:roomtype/:id" exact component={ () => <Wrapper><SingleRoomOv/></Wrapper>} />
                        <Route path="/technology" exact component={Technology }/>
						{/* <Route path="/room/:roomtype/:id"exact component={SingleRoomOv} /> */}
						{/* <Route path="/dashboard/deleteroom" exact component={()=><YourRooms/>} /> */}
						<Route
							path="/tempSetting/:deviceCategory/:deviceName/:roomId/:id"
							exact
							component={ () => <Wrapper><TempSettings/></Wrapper>}
						/>
						<Route
							path="/motionSetting/:deviceCategory/:deviceName/:roomId/:id"
							exact
							component={ () => <Wrapper><MotionSettings/></Wrapper>}
						/>
						<Route
							path="/lightSetting/:deviceCategory/:deviceName/:roomId/:id"
							exact
							component={ () => <Wrapper><LightSetting/></Wrapper>}
						/>
						<Route
							path="/appliancesSetting/:deviceCategory/:deviceName/:roomId/:id"
							exact
							component={ () => <Wrapper><AppliancesSetting/></Wrapper>}
						/>
						<Route path="/" default component={Page404} />
                        
                    </Switch>                   
                </div>
                </BrowserRouter>
        )
    
    }
}


export default connect(null,{setRoomsAction, setSocketAction})(MainRouter)
import {combineReducers} from 'redux'


const userReducer = (user = null, action) => {
    if (action.type === 'CHANGE_USER') {
        return action.payload
    }


    return user
}

const loggedinReducer = (loggedin = null, action) => {
    if (action.type === 'CHANGE_LOGGEDIN') {
        return action.payload
    }


    return loggedin
}

const socketReducer = (socket = null, action) => {
    if (action.type === 'SET_SOCKET') {
        return action.payload
    }


    return socket
}

const sideBarReducer = (check = false, action) => {
    if (action.type === 'TOGGLE_NAVBAR'){
        return action.payload
    }

    return check
}

const sideBarSmallReducer = (smallScreenCheck = false, action) => {
    if (action.type === 'TOGGLE_NAVBAR_SMALL'){
        return action.payload
    }

    return smallScreenCheck
}

const roomsReducer = (rooms = [], action) => {

    if (action.type === 'SET_ROOMS') {
        
        if (action.payload.socketData === undefined){
            return action.payload
        }else{
            let key = action.payload.socketData.key
            let sn = action.payload.socketData.data.id
            const updatedRooms = [...rooms]
            let room = null;
            let device = null;
            switch (key) {
                case 'DEVICE_CONNECT':
                    room = updatedRooms.find(room => room.devices.find(device => device.number === sn))
                    device = room.devices.find(device => device.number === sn)
                    device.connected = true
                    room.devices[room.devices.map(device => device.number).indexOf(sn)] = device
                    updatedRooms[updatedRooms.map(foundRoom => foundRoom.id).indexOf(room.id)] = room

                    return updatedRooms
                    break;

                case 'DEVICE_DISCONNECT':
                    room = updatedRooms.find(room => room.devices.find(device => device.number === sn))
                    device = room.devices.find(device => device.number === sn)
                    device.connected = false
                    room.devices[room.devices.map(device => device.number).indexOf(sn)] = device
                    updatedRooms[updatedRooms.map(foundRoom => foundRoom.id).indexOf(room.id)] = room

                    return updatedRooms
                    break;

                case 'DEVICE_STATUS':
                    // in this case sn is the id
                    room = updatedRooms.find(room => room.devices.find(device => device.id === sn))
                    device = room.devices.find(device => device.id === sn)
                    device.data = action.payload.socketData.data.status
                    room.devices[room.devices.map(device => device.number).indexOf(sn)] = device
                    updatedRooms[updatedRooms.map(foundRoom => foundRoom.id).indexOf(room.id)] = room

                    return updatedRooms
                    break;

                case 'DEVICE_TEMP':
                    // in this case sn is the id
                    room = updatedRooms.find(room => room.devices.find(device => device.id === sn))
                    device = room.devices.find(device => device.id === sn)
                    device.data = action.payload.socketData.data.status
                    room.devices[room.devices.map(device => device.number).indexOf(sn)] = device
                    updatedRooms[updatedRooms.map(foundRoom => foundRoom.id).indexOf(room.id)] = room

                    return updatedRooms
                    break;
                default:
                    break;
            }
            
        }
        

        
        
    }

    return rooms
}


export default combineReducers({
    user: userReducer,
    loggedin: loggedinReducer,
    rooms: roomsReducer,
    socket: socketReducer,
    check: sideBarReducer,
    smallScreenCheck: sideBarSmallReducer
})
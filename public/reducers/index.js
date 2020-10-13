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

const roomsReducer = (rooms = [], action) => {
    if (action.type === 'SET_ROOMS') {
        return action.payload
    }


    return rooms
}

const devicesReducer = (devices = [], action) => {
    if (action.type === 'SET_DEVICES') {
        return action.payload
    }


    return devices
}

export default combineReducers({
    user: userReducer,
    loggedin: loggedinReducer,
    rooms: roomsReducer,
    devices : devicesReducer
})
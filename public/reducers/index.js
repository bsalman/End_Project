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

        let payload = action.payload
        switch (payload.secondType) {
            // Saving all the rooms
            case 1:
                    return payload.rooms
                break;
        
            // Adding a new device
            case 2:

                let newRooms = [...rooms]
                let device = payload.device
console.log('device',device);
                newRooms = newRooms.map(room => {
                    if(room.id === device.room_id){

                        room.devices.push(device)
                    }
                    return room;
                });

                console.log('newRooms',newRooms);
                return newRooms

                break;

        }
        
    }

    return rooms
}


export default combineReducers({
    user: userReducer,
    loggedin: loggedinReducer,
    rooms: roomsReducer
})
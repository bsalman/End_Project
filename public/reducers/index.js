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

        // let payload = action.payload
        // let newRooms = [...rooms]
        // let device = payload.device
        // switch (payload.secondType) {
        //     // Saving all the rooms
        //     case 1:
        //             return payload.rooms
        //         break;
        
        //     // Adding a new device
        //     case 2:

               

        //         newRooms = newRooms.map(room => {
        //             if(room.id === device.room_id){

        //                 room.devices.push(device)
        //             }
        //             return room;
        //         });

        //         return newRooms

        //         break;
        //         case 3:

                

        //          newRooms = rooms.forEach(room => {
        //             if(room.id === device.room_id){
        //                 room.devices[room.devices.map(device => device.id).indexOf(device.id)] = device
        //                 // room.devices.push(device)
        //             }
        //             //return room;
        //         });

        //         return newRooms

        //         break;

        //     default:
        //         return rooms
        //         break;
        // }
        
    }

    return rooms
}


export default combineReducers({
    user: userReducer,
    loggedin: loggedinReducer,
    rooms: roomsReducer
})
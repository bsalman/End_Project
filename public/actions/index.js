
//import * as constants from '../reducers/constants';


export const setUserAction = (user) => {
    return{
        type: 'CHANGE_USER',
        payload: user
    }
}
export const setLoggedInAction = (loggedin) => {
    return{
        type: 'CHANGE_LOGGEDIN',
        payload: loggedin
    }
} 

// export const logoutUser = () =>{ 
//     localStorage.removeItem('USER_INFO');
//     return {
//         type: constants.RESET.USER_INFO
//     }

// }

export const setRoomsAction = (rooms) => {
    return {
        type: 'SET_ROOMS',
        payload: rooms
        
    }
}

export const setSocketAction = socket => {
    return {
        type: 'SET_SOCKET',
        payload: socket
    }
}


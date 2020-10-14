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



export const setRoomsAction = (rooms) => {
    return{
        type: 'SET_ROOMS',
        payload: rooms
    }
}
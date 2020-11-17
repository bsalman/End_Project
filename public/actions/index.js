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

export const toggleSideBar = check => {
    return {
        type: 'TOGGLE_NAVBAR',
        payload: check
    }
}

export const toggleSideBarSmallScreen = (check) => {
    return {
        type: 'TOGGLE_NAVBAR_SMALL',
        payload: check
    }
}
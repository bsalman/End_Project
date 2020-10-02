export const setUserAction = (user) => {
    return{
        type: 'CHANGE_USER',
        payload: user
    }
}

export const setLoggedInAction = (user) => {
    return{
        type: 'CHANGE_LOGGEDIN' ,
        payload: user
    }
}
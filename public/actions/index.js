export const setUserAction = (user) => {
    return{
        type: 'CHANGE_USER',
        payload: user
    }
}
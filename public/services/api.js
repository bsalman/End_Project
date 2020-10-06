


// to be able to login for the first time 
export const loginPost = (username, password) => {

    return new Promise((resolve, reject) => {
        const data = {
            username,
            password
        }
        //console.log(data);
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.status === 200) {
                response.json().then(receivedData => {
                    resolve(receivedData)
                }).catch(error => {
                    reject(error)
                })
            } else {
                reject(new Error('can not send data to server. response number is: ' + response.status))
            }
        }).catch(error => {
            reject(error);
        })
    })

}



// change the default user settings
export const changeUserPost =(newUsername,newPassword,repassword, oldPassword) => {
    return new Promise((resolve,reject) => {
        const data = {
            username: newUsername,
            password: newPassword,
            repassword,
            oldPassword
        }

        fetch('/settings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.status == 200) {
                response.json().then(data => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            }else{
                reject(new Error('can not send data to server. response number is: ' + response.status))
            }
        }).catch(error => {
            reject(error)
        })
    })
}


// get all rooms to be able to add them singly
// front to backend choosing all rooms
// export const addRoomsPost = (name, type ) => {
// const roomsObj = {
//     name: name,
//     type: type 
// }
//     return new Promise((resolve, reject) => {
//         fetch('/dashboard', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//           body: JSON.stringify(roomsObj)
//         }).then(response => {
//             if (response.status === 200 ){
//                 response.json().then(data => {
//                     resolve(data)
//                 }).catch(error => {
//                     reject(error)
//                 })
//             }else {
//                 reject(new Error('can not get the data, response number is: ' + response.status))
//             }
//         }).catch(error => {
//             reject(error)
//         })
//     })
// }

export const addRoomPost =(roomName,roomType)=>{
    const roomObj={
        roomName:roomName,
        roomType:roomType
    }
    return new Promise((resolve,reject)=>{
        fetch('/dashboard',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(roomObj)
        }).then(response=>{
            if (response.status===200) {
                response.json().then((data)=>{
                    resolve(data)
                    console.log(data);
                }).catch((error)=>{
                    reject(error);  
                })
            }else{ reject(new Error('can not send data to server. response number is: ' + response.status))}
        }).catch((error)=>{
            reject(error);
        })
    })

}

// choose to the rooms for the dashboard
// export const getRoomPost = (roomId) => {
//     return new Promise((resolve, reject) => {
//         const data = {
//             id: roomId
//         }
//          //console.log(data);
//         fetch('/dashboard', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         }).then(response => {
//             if (response.status === 200) {
//                 response.json().then(data => {
//                     resolve(data)
//                 }).catch(error => {
//                     reject(error)
//                 })
//             } else {
//                 reject(new Error('can not get the data, response number is: ' + response.status))
//             }
//         }).catch(error => {
//             reject(error)
//         })
//     })
// }

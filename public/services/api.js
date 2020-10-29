
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

export const changeUserPost =(newUsername,newPassword,repassword,oldPassword) => {
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
//================================================//
export const addRoomPost =(roomName,roomType)=>{
    const roomObj={
        roomName:roomName,
        roomType:roomType
    }
    return new Promise((resolve,reject)=>{
        fetch('/addroom',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(roomObj)
        }).then(response=>{
            if (response.status===200) {
                response.json().then((data)=>{
                    resolve(data)
                    //console.log(data);
                }).catch((error)=>{
                    reject(error);  
                })
            }else{ reject(new Error('can not send data to server. response number is: ' + response.status))}
        }).catch((error)=>{
            reject(error);
        })
    })

}
//============================================//
export const allRoomsPost = () => {
    return new Promise((resolve, reject) => {
        fetch('/rooms/allrooms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200 ){
                response.json().then(data => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            }else {
                reject(new Error('can not get the data, response number is: ' + response.status))
            }
        }).catch(error => {
            reject(error)
        })
    })
}
//===========================================//

export const addDevicePost =(deviceName,type,deviceSn,roomId)=>{
    return new Promise((resolve,reject)=>{
        const deviceObj={
            deviceName:deviceName,
            deviceSn:deviceSn,
            type:type,
            roomId:roomId
        }
        //console.log(deviceObj);
        fetch('/rooms/adddevices',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(deviceObj)
        }).then(response=>{
            if (response.status===200) {
                response.json().then((data)=>{
                    resolve(data)
                    //console.log(data);
                }).catch((error)=>{
                    reject(error);  
                })
            }else{ reject(new Error('can not send data to server. response number is: ' + response.status))}
        }).catch((error)=>{
            reject(error);
        })
    })

}

//============================================//
export const deleteRoomPost=(roomId)=>{
    return new Promise ((resolve,reject)=>{
        const data={roomId}
        fetch('/rooms/deleteroom',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        }).then((response)=>{
            if (response.status===200) {
                response.json().then((data)=>{
                    resolve(data)
                }).catch((error)=>{
                    reject(error)
                })              
            }else{
                reject(new Error('can not get the data, response number is: ' + response.status))
            }
        }).catch((error)=>{
            reject(error)
        })
    })
}

//=============================================//

export const editRoomPost = (newRoomName, newRoomType, roomId) => {
    return new Promise((resolve, reject) => {
        //collect the data to be send to the server side

        const newRoomObj = {
            newRoomName,
            newRoomType,
            roomId
        }
        fetch("/rooms/editroom", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRoomObj)
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

// export const deleteDevicePost = (roomId, deviceId) => {
//     return new Promise ((resolve,reject)=>{
//         const data={roomId, deviceId}
//         fetch('/room/deletedevice',{
//             method:'POST',
//             headers:{
//                 'Content-Type':'application/json'
//             },
//             body:JSON.stringify(data)
//         }).then((response)=>{
//             if (response.status===200) {
//                 response.json().then((data)=>{
//                     resolve(data)
//                 }).catch((error)=>{
//                     reject(error)
//                 })              
//             }else{
//                 reject(new Error('can not get the data, response number is: ' + response.status))
//             }
//         }).catch((error)=>{
//             reject(error)
//         })
//     })
    
// }


export const getRoomPost = (roomId) => {
    return new Promise((resolve, reject) => {
        const data = {
            id: roomId
        }
        fetch("/room", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                //'Content-Type': 'application/x-www-form-urlencoded'
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


//===================================================================//
export const editDevicePost =(deviceId,serialNumber)=>{
    return new Promise((resolve, reject) =>{
        const dataObj={
            deviceId:deviceId,
            serialNumber:serialNumber
        }
        fetch('/editDevice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataObj)
        }).then(response=>{
            console.log(response.status);
            if(response.status==200){
                response.json().then((data)=>{
                    console.log(data);
                    resolve(data)
                }).catch((error)=>{
                    reject(error)
                })
            }else{
                reject(new Error('can not get the data, response number is: ' + response.status))
            }
        }).catch((error)=>{
            reject(error)
        })
    })
}

///deleteDevice

//============================================//
export const deleteDevicePost=(deviceId,roomId)=>{
    return new Promise ((resolve,reject)=>{
        const data={deviceId,roomId}
        fetch('/deletedevice',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        }).then((response)=>{
            if (response.status===200) {
                response.json().then((data)=>{
                    resolve(data)
                }).catch((error)=>{
                    reject(error)
                })              
            }else{
                reject(new Error('can not get the data, response number is: ' + response.status))
            }
        }).catch((error)=>{
            reject(error)
        })
    })
}

//=============================================//

export const editDataPost =(deviceId,data)=>{
    return new Promise((resolve, reject) =>{
        const dataObj={
            deviceId:deviceId,
            data:data
        }
        fetch('/editdata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataObj)
        }).then(response=>{
            console.log(response.status);
            if(response.status==200){
                response.json().then((data)=>{
                    // console.log(data);
                    resolve(data)
                }).catch((error)=>{
                    reject(error)
                })
            }else{
                reject(new Error('can not get the data, response number is: ' + response.status))
            }
        }).catch((error)=>{
            reject(error)
        })
    })
}


export const getDevicesPost = (roomId) => {
    return new Promise((resolve, reject) => {
        const data = {
            roomId: roomId
        }
        fetch("/getdevices", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                //'Content-Type': 'application/x-www-form-urlencoded'
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
import { response } from "express";

export const loginPost = (username, password) => {

    return new Promise((resolve, reject) => {
        const data = {
            username,
            password
        }
        console.log(data);
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
            username:newUsername ,
            password:newPassword ,
            repassword,
            oldPassword:oldPassword
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
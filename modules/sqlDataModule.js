const passwordHash = require('password-hash')
const mySql = require('mysql')
const fs = require('fs')

// declare con
let con = null

//connect function
function connect() {
    return new Promise((resolve, reject) => {
        if (con) {
            if (con.state === 'disconnected') {
                con.connect(error => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve()
                    }
                })
            } else {
                resolve()
            }
        } else {
            con = mySql.createConnection({
                multipleStatements: true,
                host: 'localhost',
                port: 3306,
                user: 'root',
                password: '12345678',
                database: 'smarthome'
            })
            con.connect(error => {
                if (error) {
                    reject(error)
                } else {
                    resolve()
                }
            })
        }
    })
}
//===================== runQuery function======================//
function runQuery(queryString) {
    return new Promise((resolve, reject) => {
        connect().then(() => {
            con.query(queryString, (error, result, fields) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        }).catch(error => {
            reject(error)
        })
    })
}

//========================================//
function checkUser(username, password) {
    return new Promise((resolve, reject) => {
        // any result from SELECT query will be return as an array (empty array or array with one element or array with many elements)
        runQuery(`SELECT * FROM configurations WHERE name LIKE 'username' OR name LIKE 'userpassword' OR name LIKE 'loggedin'`).then(result => {
            
            const systemUserName = result.find(element => element.name === 'username').value
            const systemPassword = result.find(element => element.name === 'userpassword').value
            const systemCheckLogin = result.find(element => element.name === 'loggedin').value
            if (systemUserName !== username) {
                reject(4)
            } else {
                if (passwordHash.verify(password, systemPassword)) {
                    if(systemCheckLogin === 'false') {
                        runQuery("UPDATE configurations SET value = 'true' WHERE name LIKE 'loggedin'").then(() => {
                        resolve(systemCheckLogin)
                    }).catch(error => {
                        reject(error)
                    })
                    } else {
                        resolve(systemCheckLogin)
                    }
                    
                } else {
                    reject(3)
                }
            }
        }).catch(error => {
            console.log(error);
            reject(5)
        })
    })
}

//========================================//
function changeUser (userName, newPassword,oldPassword) {
    return new Promise( (resolve, reject) => {
        runQuery(`SELECT * FROM configurations WHERE name LIKE 'userpassword'`).then(result=>{
            
            const systemPassword = result.find(element => element.name === 'userpassword').value
            if(passwordHash.verify(oldPassword,systemPassword)){
                const hashedNewPassword = passwordHash.generate(newPassword)
                runQuery(`UPDATE configurations  SET value = '${hashedNewPassword}' WHERE name LIKE 'userpassword'; UPDATE configurations  SET value = '${userName}' WHERE name LIKE 'username';`).then(()=>{
                    resolve(result)
                }).catch((error)=>{
                    reject(error)
                })
            }else{
                reject("not exist")
            }
        }).catch((error)=>{
            reject(error)
        })

    })
}

//========================================//
function addRoom(roomName,roomType) {
    return new Promise((resolve,reject) => {
        runQuery(`SELECT * FROM rooms WHERE name LIKE '${roomName}' ANd type LIKE '${roomType}'`).then((results)=>{
            if(results.length!=0){
                reject(3)
            }else{
                runQuery(`INSERT INTO rooms(name,type) VALUES ('${roomName}','${roomType}')`).then( result => {
                    getAllRooms().then(rooms => {
                        resolve(rooms)
                    }).catch(error => {
                        reject(error)
                    })
                    
                }).catch(error => {
                    console.log(error);
                    if (error.errno === 1054) {
                        reject(3)
                    } else {
                        reject(error)
                    }
                    
                })
            }
        }).catch(error=>{
            reject(error)
        })
        
    })
}
//=============================================//
function getAllRooms(){
    return new Promise((resolve, reject) =>{
        runQuery(`SELECT rooms.* FROM rooms; SELECT devices.* FROM devices;`).then(results=>{
            if(results.length > 0){
            const rooms = [];
            results[0].forEach(room=>{
                let roomObj = {
                    id: room.id,
                    name: room.name,
                    type: room.type,
                    devices:[]
                }
                rooms.push(roomObj);
            })
            results[1].forEach(device=>{
                rooms.forEach(room=>{
                    if(device.room_id === room.id){
                        let deviceObj = {
                            id: device.id,
                            name: device.name,
                            number: device.number,
                            category: device.category,
                            room_id: room.id
                        }
                        room.devices.push(deviceObj)
                    }
                })
                
            })
            resolve(rooms)
            }else{
                reject("no data found")
            }
            
        }).catch((error)=>{
            reject(error)
        })
    })
}
//================================================//
function getRoom(roomId) {
    return new Promise((resolve, reject) => {
        runQuery(`SELECT rooms.*,devices.* FROM rooms INNER JOIN devices ON devices.room_id = rooms.id  WHERE devices.room_id = ${roomId};
                    SELECT * FROM rooms WHERE rooms.id = ${roomId}`).then(roomDevice => {
                        console.log('roomDevice',roomDevice);
            if(roomDevice[0].length){
                let selectedRoom = {
                    num: 1,
                    roomDevice
                }
                resolve(selectedRoom)
            }
            else {
                runQuery(`SELECT * FROM rooms WHERE rooms.id = ${roomId}`).then(room => {
                    let selectedRoom = {
                        num: 2,
                        room
                    }
                    resolve(selectedRoom)
                }).catch(error => {
                    reject(3)
                })
               
            }
        }).catch(error => {
            console.log(error);
            reject(error)
        })
    })
}
//============================================//
function addDevice(deviceName,deviceNumber,category, roomId) {
    return new Promise((resolve,reject) => {
        runQuery(`SELECT * FROM devices WHERE name LIKE '${deviceName}' AND number LIKE '${deviceNumber}'`).then((results)=>{
            // console.log('resules',results);
            if(results.length!=0){
                reject(3)
            }else{
                runQuery(`INSERT INTO devices(name,number,category, room_id) VALUES ('${deviceName}','${deviceNumber}','${category}','${roomId}')`).then( result => {
                    resolve(result)
                }).catch(error => {
                    console.log(error);
                    if (error.errno === 1054) {
                        reject(3)
                    } else {
                        reject(error)
                    }
                    
                })
            }
        }).catch(error=>{
            reject(error)
        })
        
    })
}

//=========================================================//
function deleteRoom(roomid) {
    return new Promise((resolve, reject) => {
        //get the room clicked from the data base
        getRoom(roomid).then(data => {
            // 1 means we have a book with devices so we will delete it from the devices table
            // 2 means we have a book without a devices so we will delete the book from books table
            // 3 (others) we dont have a such book in both tables
            // console.log('deleted roo',data);
            if (data.num === 1) {
                runQuery(`DELETE FROM devices WHERE devices.room_id = ${roomid};`).then(room => {
                    console.log('delete',room);
                    resolve(room)
                 
                }).catch(error => {
                    console.log(error);
                    if (error.errno === 1146) {
                        reject(3)
                    } else {
                       reject(error) 
                    }
                })
            } else if (data.num === 2) {
                runQuery(`DELETE FROM rooms WHERE rooms.id = ${roomid};`).then(room => {
                    resolve(room)
                }).catch(error => {
                    if (error.errno === 1146) {
                        reject(3)
                    } else {
                       reject(error) 
                    }
                    
                })
                 
            } else {
                reject(2)
            }

        }).catch(error => {
            if (error.errno === 1051) {
                reject(3)
            } else {
               reject(error) 
            }
        })
    })

}
// getRoom(180)
//=========================================================//
function editRoom(newRoomName, newRoomType, roomId, newDeviceArr) {
    return new Promise((resolve, reject) => {
        try {
            (async () => {
                let oldRoomData = await getRoom(roomId)
                

                let updateRoomDataQuery = ''
                if(oldRoomData.num === 1){
                    // if (oldRoomData.roomDevice[1].name.indexOf(newRoomName) >= 0 || oldRoomData.roomDevice[1].type.indexOf(newRoomType) >= 0) {
                    //     updateRoomDataQuery += `UPDATE rooms SET name = ${newRoomName}' , type = ${newRoomType} WHERE id = ${roomId};`
                    // } else {
                    //     updateRoomDataQuery += ''
                    // }
    
                    newDeviceArr.forEach((element) => {
                        updateRoomDataQuery += `UPDATE devices SET name = '${element.name}', number = '${element.number}',category = '${element.category}' WHERE id = ${element.id};`
                    })

                    console.log('updateRoomDataQuery',updateRoomDataQuery);
                    await runQuery(`UPDATE rooms SET name = '${newRoomName}',type = '${newRoomType}' WHERE id = ${roomId};`+updateRoomDataQuery)

                    getAllRooms().then(room => {
                        resolve(room)
                    }).catch(error => {
                        reject(error)
                    })



                }else if (oldRoomData.num === 2) {
                    // if (oldRoomData.room[0].name.indexOf(newRoomName) >= 0 || oldRoomData.room[0].type.indexOf(newRoomType) >= 0) {
                    //     updateRoomDataQuery += `UPDATE rooms SET name = ${newRoomName}' , type = ${newRoomType} WHERE id = ${roomId};`
                    // } else {
                    // updateRoomDataQuery += ''
                    // }

                    await runQuery(`UPDATE rooms SET name = '${newRoomName}' , type = '${newRoomType}' WHERE id = ${roomId};`)
                    getAllRooms().then(room => {
                        resolve(room)
                    }).catch(error => {
                        reject(error)
                    })
                }


                else {
                    reject(2)
                }

            })()
        } catch (error) {
            reject(error)
        }
    })

}

//=========================================================//
//=========================================================//



module.exports = {
    checkUser,
    changeUser,
    addRoom,
    getAllRooms,
    getRoom,
    addDevice,
    deleteRoom,
    editRoom
}
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
            // console.
            (results);
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
            // console.log(rooms);
            resolve(rooms)
            }else{
                reject("no data found")
            }
            
        }).catch((error)=>{
            reject(error)
        })
    })
}
// getAllRooms()
//================================================//
function getRoom(roomId) {
    return new Promise((resolve, reject) => {
        // SELECT rooms.id as roomid, rooms.name as roomname, ..., devices.id as deviceid, devices.name as devicename.. from
        runQuery(`SELECT rooms.* FROM rooms WHERE rooms.id = ${roomId}; SELECT devices.* FROM rooms INNER JOIN devices ON devices.room_id = rooms.id  WHERE devices.room_id = ${roomId}`).then(results => {
            // console.log(results);
            if(results.length > 0){
                const rooms = [];
                // console.log(results[0][0].id);
                    let roomObj = {
                        id: results[0][0].id,
                        name: results[0][0].name,
                        type: results[0][0].type,
                        devices:[]
                    }
                    rooms.push(roomObj);
                // console.log(roomObj);
                if (results[1].length) {
                    results[1].forEach(device=>{
                        rooms.forEach(room=>{
                            
                                let deviceObj = {
                                    id: device.id,
                                    name: device.name,
                                    number: device.number,
                                    category: device.category,
                                    room_id: room.id
                                }
                                room.devices.push(deviceObj)
                            
                        })
                        
                    })
                } else {
                    rooms[0].devices = []
                }
                
                // console.log(rooms);
                resolve(rooms)
                // console.log(rooms);
                
            }
            else {
                reject(new Error('can not find a room with this id : ' + roomId))
               
            }
        }).catch(error => {
            console.log(error);
            reject(error)
        })
    })
}
//  getRoom(187); 
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
            if (data) {
                runQuery(`DELETE FROM rooms WHERE rooms.id = ${roomid}; 
                        DELETE FROM devices WHERE devices.room_id = ${roomid};`).then(room => {
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
            }else {
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
// deleteRoom(180)
//=========================================================//
function editRoom(newRoomName, newRoomType, roomId) {
    return new Promise((resolve, reject) => {
        try {
            (async () => {
                let oldRoomData = await getRoom(roomId)
                let updateRoomDataQuery = ''
                    if (oldRoomData[0].name.localeCompare(newRoomName) != 0) {
                        updateRoomDataQuery += `UPDATE rooms SET name = '${newRoomName}' WHERE id = ${roomId};`
                    } 
                    if (oldRoomData[0].type.localeCompare(newRoomType) != 0) {
                        updateRoomDataQuery +=`UPDATE rooms SET type = '${newRoomType}' WHERE id = ${roomId};`
                    }
                    runQuery(updateRoomDataQuery)
                   
                    getAllRooms().then(room => {
                        console.log(room);
                        resolve(room)
                    }).catch(error => {
                        reject(error)
                    })
                


            })()
        } catch (error) {
            reject(error)
        }
    })

}

//=========================================================//

function editDevice (deviceId,serialNumber){
    return new Promise((resolve,reject)=>{
    //    let oldDevice= runQuery(`SELECT * FROM devices WHERE id LIKE ${deviceId}`)
    //    let upDatedDevice=''
        runQuery(`UPDATE devices SET number = '${serialNumber}' WHERE id = ${deviceId}`);
        runQuery(`SELECT * FROM devices WHERE id LIKE ${deviceId}`).then((device=>{
            if(device[0]){
                resolve(device[0])
            }else{
                reject(3)
            }     
            }
        )).catch((error)=>{
            console.log(error);
            reject(error)
           })

       
        
    })

}
//=================================================//

function deleteDevice(deviceId,roomId) {
    return new Promise((resolve, reject) => {
        //get the room clicked from the data base
        runQuery(`SELECT * FROM devices WHERE id LIKE ${deviceId}`).then(device=>{
            // console.log(device);
            if(device[0]){
                runQuery(`DELETE FROM devices WHERE devices.id = ${deviceId};`).then(room => {
                    // console.log('room',room);
                    runQuery(`SELECT * FROM devices WHERE devices.room_id = ${roomId};`).then(device=>{
                        if(device){
                            resolve(device)
                        }else{
                            reject(3)
                        }     
                        
                        // console.log('device',device);
                    })
                    // getAllRooms().then(rooms => {
                    //     resolve(rooms)
                    // }).catch(error => {
                    //     reject(error)
                    // })
                             
                }).catch(error => {
                    console.log(error);
                    if (error.errno === 1146) {
                        reject(3)
                    } else {
                        reject(error) 
                    }
                })
            }else{
                reject(3)
            }     
        }).catch((error)=>{
            console.log(error);
            reject(error)
        })

    })

}

// deleteDevice(92)
//=========================================================//



module.exports = {
    checkUser,
    changeUser,
    addRoom,
    getAllRooms,
    getRoom,
    addDevice,
    deleteRoom,
    editRoom,
    editDevice,
    deleteDevice
}
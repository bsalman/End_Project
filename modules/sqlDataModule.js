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
                user: 'ubuntu',
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
                    getAllRooms().then(rooms =>{
                        resolve(rooms)
                    }).catch(error=>{
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
 //* function to get ALL ROOMS & DEVICES !!
function getAllRooms(){
    return new Promise((resolve, reject) =>{
        runQuery(`SELECT rooms.* FROM rooms; SELECT devices.* FROM devices;`).then(results=>{
            if(results.length > 0){
                
            const rooms = [];
            // const room ={
            //     roomId:'',
            //     roomName:'',
            //     roomType:'',
            //     devices:[]
            // }
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
                            category_id: device.category_id,
                            room_id: room.id
                        }
                        room.devices.push(deviceObj)
                    }
                })
                
            })
            /**rooms[{
             * roomId:10
             * roomName: bed,
             * type: 2,
             * devices:[{},{}]
             * }] */
            // const device={
            //     deviceId:'',
            //     deviceName:'',
            //     deviceNumber:''
            // }
            // results.forEach(result => {

            //     rooms.push(result)
                
            // });
                console.log(rooms)
            resolve(rooms)
            }else{
                reject("no data found")
            }
            
        }).catch((error)=>{
            reject(error)
        })
    })
}


//* first version
// function getAllRooms(){
//     return new Promise((resolve, reject) =>{
//         runQuery(`SELECT * FROM rooms`).then(results=>{
//             const rooms = [];
//             results.forEach(result => {
//                 rooms.push(result)
//             });

//             resolve(rooms)
            
//         }).catch((error)=>{
//             reject(error)
//         })
//     })
// }

//========================================//
// add devices to the room component 

function addDevice(deviceName,deviceNumber,categoryId, roomId) {
    return new Promise((resolve,reject) => {
        runQuery(`SELECT * FROM devices WHERE name LIKE '${deviceName}' AND number LIKE '${deviceNumber}'`).then((results)=>{
            // console.log('resules',results);
            if(results.length!=0){
                reject(3)
            }else{
                runQuery(`INSERT INTO devices(name,number,category_id, room_id) VALUES ('${deviceName}','${deviceNumber}','${categoryId}','${roomId}')`).then( result => {
                    // console.log(result);
                    getRooms().then(rooms => {
                        // console.log('get room',rooms);
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
// function getRooms() {
//     return new Promise((resolve, reject) => {
//         runQuery(`SELECT rooms.* , devices.* FROM rooms INNER JOIN devices ON devices.room_id = room.id WHERE devices.room_id = rooms.id`).then(results => {
//             if (results.length) {
//                 const rooms = {}
//                 results.forEach(result => {
                  
//                         console.log(result)
//                         rooms.push(result)
                    
//                 })
//                 resolve(rooms)
//             } else {
//                 reject(new Error('can not find a room with this id : ' + id))
//             }
//         }).catch(error => {
//             reject(error)
//         })
//     })
// }



//================================================//

function getRoom(roomId) {
    return new Promise((resolve, reject) => {
        runQuery(`SELECT rooms.* , devices.* FROM rooms INNER JOIN devices ON devices.room_id = room.id WHERE devices.room_id= ${roomId}`).then(results => {
            if (results.length) {
                const rooms = {}
                results.forEach(result => {
                    if(rooms.id) {
                        console.log(result)
                        rooms.id.push(result.rooms)
                    } else {
                        rooms._id = result.room_id
                        rooms.id = result.room.id
                    }
                })
                resolve(rooms)
            } else {
                reject(new Error('can not find a room with this id : ' + id))
            }
        }).catch(error => {
            reject(error)
        })
    })
}



module.exports = {
    checkUser,
    changeUser,
    addRoom,
    getAllRooms,
    addDevice,
   // getRooms,

    getRoom,
    
}
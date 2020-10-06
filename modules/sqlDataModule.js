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
                password: '0969000583',
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
            console.log('the result', result)
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
        // let saveRoomsQuery = ''
        // roomsArr.forEach(room => {
        //     console.log(room);
        //     saveRoomsQuery += `INSERT INTO rooms(name,type) VALUES ('${room.roomName}','${room.roomType}')`
        // });
        runQuery(`INSERT INTO rooms(name,type) VALUES ('${roomName}','${roomType}')`).then( result => {
            resolve(result)
        }).catch(error => {
            console.log(error);
            if (error.errno === 1054) {
                reject(3)
            } else {
                reject(error)
            }
            
        })
    })
}
//=============================================//
function getAllRooms(){
    return new Promise((resolve, reject) =>{
        runQuery(`SELECT * FROM rooms`).then(results=>{
            const rooms = [];
            results.forEach(result => {
                rooms.push(result)
            });
            resolve(rooms)
            console.log(rooms);
        }).catch((error)=>{
            reject(error)
        })
    })
}

module.exports = {
    checkUser,
    changeUser,
    addRoom,
    getAllRooms
}
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
function getConfig(value){
    return new Promise((resolve,reject)=>{
            runQuery(`SELECT * from configurations WHERE configuration.value=${value}`).then(results=>{
                resolve(results)
            }).catch((error)=>{
                reject(error)
            })
    })
}
//=========================================//
function changeUser (userName, password,value) {
    return new Promise( (resolve, reject) => {
        try{
            (async () => {
                let oldUsers = await getConfig(value)
                let usernameChange=null;
                let userPasswordchange=null;

                if (oldUsers) {

                    oldUsers.forEach(async oldUser => {
                        if(oldUser.name=='username'&&oldUser.value=='admin'){
                            await runQuery(`UPDATE configurations SET value='${userName}' WHERE name='username' `).then(data=>{
                                usernameChange= data;
                            }).catch(error =>{
                                reject(error)
                            })
                        
                        
                        }
                        if(oldUser.name=='userpassword'&&oldUser.value=='admin'){
                            await runQuery(`UPDATE configurations SET value='${password}' WHERE name='userpassword' `).then(data=>{
                                userPasswordchange = data;
                            }).catch(error =>{
                                reject(error)
                            })
                        }

                    }) 
                    if (usernameChange && userPasswordchange) {

                        resolve('username and Password changes')

                    }else{
                        reject(error)
                    }
                    
                }else{
                    reject('no user found')
                }
            })()
            
           

        }catch(error) {
        reject(error)
    }
       
    })
}


//========================================//
function checkUser(username, password) {
    return new Promise((resolve, reject) => {
        // any result from SELECT query will be return as an array (empty array or array with one element or array with many elements)
        runQuery(`SELECT * FROM configurations WHERE name = 'username' OR name = 'userpassword'`).then(result => {
            console.log(result)
            if (result[0].value !== username) {
                reject(4)
            } else {
                if (passwordHash.verify(password, result[1].value)) {
                    result[0]._id = result[0].id
                    resolve(result[0])
                } else {
                    reject(3)
                }
            }
        }).catch(error => {
            console.log(error);
            reject(error)
        })
    })
}

module.exports = {
    checkUser
}
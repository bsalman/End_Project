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

                        resolve('Username and Password changes')

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

module.exports = {
    checkUser,
    changeUser
}
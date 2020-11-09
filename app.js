const express = require('express')
const fs = require('fs')
const session = require('express-session')
const fileupload = require('express-fileupload')
const passwordHash = require('password-hash')

//include data module
const dataModule = require('./modules/sqlDataModule')


const app = express()

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())


const port = process.env.PORT || 3000


// app.get('/dummy', (req, res) => {

//     res.json(passwordHash.generate('admin'))

// })

//=============================================//
app.post('/login', (req, res) => {
    console.log(req.body);

    if (req.body.username && req.body.password) {
        dataModule.checkUser(req.body.username.trim(), req.body.password).then(checklogin => {
            // req.session.user = user
            res.json(checklogin)
        }).catch(error => {
            console.log(error);
            switch (error) {
                case 3:
                    res.json(3)
                    break;
                case 4:
                    res.json(4)
                    break;
                case 5:
                    res.json(5)
                    break;
                default:
                    res.json(5)
                    break;
            }
        })
    } else {
        res.json(2)
    }

});
//==============================================//
app.post('/settings', (req, res) => {
    console.log(req.body);

    //2 data error
    //1 user registered successfully
    //3 user not exist
    //4 server error
    const username = req.body.username.trim()
    const oldPassword = req.body.oldPassword
    const password = req.body.password
    const rePassword = req.body.repassword

    if (username && oldPassword && password == rePassword) {
        dataModule.changeUser(username, password, oldPassword).then(() => {
            res.json(1)
        }).catch(error => {
            //console.log(error);
            if (error == "not exist") {
                res.json(3)
            } else {
                res.json(4)
            }
        })
    } else {
        res.json(2)
    }



});
//======================================//
app.post('/addroom', (req, res) => {
    console.log(req.body);
    const roomName = req.body.roomName
    const roomType = req.body.roomType
    if (roomName && roomType) {
        dataModule.addRoom(roomName,roomType).then(rooms => {
            res.json(rooms)
        }).catch(error => {
            if (error ===3) {
                res.json(3)
            } 
            else {
                res.json(4)
            }
        })
    } else {
        res.json(2)
    }
    
});
//==============================================//
app.post('/rooms/adddevices', (req, res) => {
    console.log(req.body);
    const deviceName = req.body.deviceName
    const categoryId = req.body.type
    const deviceSn = req.body.deviceSn
    const roomId = req.body.roomId
    const imgUrl=req.body.imgUrl
    if (deviceName && categoryId && deviceSn) {
        dataModule.addDevice(deviceName,deviceSn,categoryId,roomId,imgUrl).then(device => {
            let deviceObj = {
                id: device.insertId,
                name: deviceName,
                number: deviceSn,
                category: categoryId, 
                room_id: roomId,
                imgUrl:imgUrl
            }
            res.json(deviceObj)

        }).catch(error => {
            if (error ===3) {
                res.json(3)
            } 
            else {
                res.json(4)
            }
        })
    } else {
        res.json(2)
    }
    
});
//==================get all Rooms  ======================//
app.post('/rooms/allrooms',(req,res)=>{
    dataModule.getAllRooms().then(rooms=>{
        res.json(rooms)
    }).catch(error=>{
        res.json(2)
    })
})

//================== delete room=========================//
app.post('/rooms/deleteroom',(req,res)=>{
    //1 success
    //2 can not find a room with this id
    //3 server error
    console.log(req.body)
    // res.json(1)
    const roomId = req.body.roomId
    dataModule.deleteRoom(roomId).then(() => {
        res.json(1)
    }).catch(error => {
        if (error === 3) {
            res.json(3)
        } else {
            console.log(error);
            res.json(2)
        }
        
    })
})
//===================================================//
app.post('/rooms/editroom',(req,res)=>{
    //1 success
    //2 can not find a room with this id
    //3 server error
    // console.log(req.body)
    // res.json(1)
    dataModule.editRoom(req.body.newRoomName, req.body.newRoomType, req.body.roomId).then((room) => {
        // console.log('room',room);
        // let roomObj = {
        //         room:[req.body.newRoomName,req.body.newRoomType,req.body.id],
        //         device : room.roomDevice[0]
            
        // }
        // console.log('roomObj',roomObj);
        res.json(room)
    }).catch(error => {
        if (error === 2) {
            res.json(2)
        } else {
            console.log(error);
            res.json(3)
        }
        
    })
})
//===============================================//
app.post('/room', (req, res) => {
    console.log(req.body);
    dataModule.getRoom(req.body.id).then(data => {
        console.log(data.roomDevice);
        res.json(data.roomDevice)
    }).catch(error => {
        res.json(2)
    })
});
//=======================================================//
app.post('/editDevice',(req,res)=>{
   //1 success
    //2 error  entries 
    //3 server error
    // console.log(req.body)
    
    const deviceId=req.body.deviceId;
    const serialNumber=req.body.serialNumber
    if(deviceId&&serialNumber){
    dataModule.editDevice(deviceId,serialNumber).then((device)=>{
        console.log(device);
        res.json(device)
    }).catch(error=>{
        console.log(error);
        res.json(3)
    })
    }else{
        res.json(2)
    }
})
//==================================================//
app.post('/deleteDevice', (req, res) => {
    //data success
    //3 this device id doesnt exist
    //2 kein devices
    //4 server error
    console.log(req.body)


    const deviceId = req.body.deviceId;
    const roomId = req.body.roomId;

    if (deviceId) {
        dataModule.deleteDevice(deviceId,roomId).then((device) => {
            console.log(device);
            res.json(device)
        }).catch(error => {
            console.log(error);
            if (error == 3) {
                res.json(3)
            } else {
                res.json(4)
            }
            
        })
    } else {
        res.json(2)
    }
})
//==================================================//
app.post('/editdata', (req, res) => {
    console.log(req.body)
    const deviceId = req.body.deviceId;
    const data = req.body.data
    if (deviceId && data) {
        dataModule.editData(deviceId, data).then((device) => {
            console.log(device);
            res.json(device)
        }).catch(error => {
            console.log(error);
            res.json(3)
        })
    } else {
        res.json(2)
    }
});

app.post('/getdevices', (req, res) => {
    dataModule.getDevices(req.body.roomId).then((devices) => {
        res.json(devices)

    }).catch(error => {
        res.json(error)
    })
});
//==============================================================//
app.post('/editselected',(req,res)=>{
    const roomId=req.body.roomId;
    const selected=req.body.selected
    if(roomId&&selected){
        dataModule.editSelected(roomId,selected).then((room)=>{
            res.json(room)
        }).catch(error => {
            console.log(error);
            res.json(3)
        })
    }
})
//===============================================//
app.post('/addtimemotion', (req, res) => {
    console.log(req.body);
    // res.json(req.body)
    dataModule.addTimeMotion(req.body.startTime,req.body.stopTime,req.body.motionId,req.body.deviceId,req.body.active).then(data => {
        res.json(data)
    }).catch(error => {
        if (error === 3) {
            res.json(3)
        } else {
            res.json(4)
        }
    })
    

});
//===================================================//
app.post('/secureAllHouse',(req,res)=>{
    
    dataModule.updateSecureAllHouse(req.body.secure).then((data)=>{
       
        res.json(data)
    }).catch(error=>{
       
        res.json(2)
    })
})

//=============================================================//
app.use('/', (req, res, next) => {
    const html = fs.readFileSync(__dirname + '/index.html', 'utf-8')
    res.send(html)
});
//===============================================================//
app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});
//==============================================//
// const io = require('socket.io')(server)

// io.on('connection', socket => {
//     console.log('user is connected');

//     socket.join('home')
// //socket listeneer
//     socket.on('device_connect', sn => {
//         socket.broadcast.to('home').emit('device_connect', sn)
//     })
//     socket.on('device_disconnect', sn => {
//         socket.broadcast.to('home').emit('device_disconnect', sn)
//     })
//     socket.on('light_status' , data => {
//         socket.broadcast.to('home').emit('light_status', data)
//     })
//     socket.on('device_status' , data => {
//         socket.broadcast.to('home').emit('device_status', data)
//     })
// })

//     const ioClient = require('socket.io-client')

//     const socketClient = ioClient('http://pi.local:3000')
//     socketClient.on('connect', () => {
//         console.log('house is connected');
//     })

    

// // get a list of devices from database
// dataModule.getDevices().then(devices => {
//     // connection to iot devices
//     const radio = new Radio()

//     radio.setReadingPipe('0xABCDABCD71')
//     radio.begin()
//     radio.read((data) => {
//         console.log(data);
//         const sn = data.substr(0, data.indexOf('-'))

//         //console.log(sn);
//         const device = devices.find(device => device.number === sn)
//         if (device) {
//             devices[devices.map(device => device.id).indexOf(device.id)].connected = true
//             // get the message and replace the empty hexa field with nothing
//             const message = data.substr(data.indexOf('-') + 1, data.length).replace(/\x00/gi, '')
//             if (message === 'hi') {
//                 dataModule.setDeviceConnection(sn, true).then(() => {
//                     socketClient.emit('device_connect', sn)
//                     if (device.category === 'Light'){
//                         // if(device.data === 'on'){
                            
//                         // }
//                         radio.send('data-' + device.data, 10, device.number).then(() => {
//                             //console.log('setting has been sent');
//                         }).catch(error => {
//                             //console.log('setting has not been sent');

//                         })
                    
//                     }
//                 }).catch(error => {
//                     //console.log(error);
//                 })
//             }

//             if(message.indexOf('data') === 0) {
//                 //socketClient.emit('device_status', {id: 78, status: message.substr(message.lastIndexOf('-') + 1, message.length).replace(/\x00/gi, '') == '1'? 'on' : 'off'})
//                 if (device.category === 'Motion') {
//                     const stringData = message.substr(message.lastIndexOf('-') + 1, message.length).replace(/\x00/gi, '')

//                     dataModule.editData(device.id, stringData == '1'? '1' : '').then(() => {
//                         devices[devices.map(device => device.id).indexOf(device.id)].data = (stringData == '1'? '1' : '')
//                         dataModule.getMotionRelatedDevices(device.id).then((results) => {
//                             //console.log('429',results);
//                             results.forEach(realtedDevice => {
//                                 const foundDevice = devices.find(device => device.id === realtedDevice.device_id)
//                                 dataModule.editData(foundDevice.id, stringData == '1'? 'on' : 'off').then(() => {
//                                     setTimeout(() => {
//                                         radio.send('data-' +  stringData == '1'? 'on' : 'off', 10, foundDevice.number).then(() => {
//                                             devices[devices.map(device => device.id).indexOf(foundDevice.id)].data = stringData == '1'? 'on' : 'off'
//                                             socketClient.emit('device_status', {id: foundDevice.id, status: stringData == '1'? 'on' : 'off'})
//                                             console.log('434', stringData);
//                                         }).catch(error => {
//                                             console.log('436',error);
//                                         })
//                                     }, 500)
                                    
//                                 }).catch(error => {
// console.log('439',error);
//                                 })
                                
//                             });
//                         }).catch(error => {
// console.log('444',error);
//                         })
//                     }).catch(error => {
//                         console.log('447', error);
//                     })
//                 }
//             }
//         }
//     })

//     // radio.send('hi', 10, '0x744d52687C').then(() => {
//     //     console.log('sent');
//     // })

//     socketClient.on('light_status' , data => {
//         //socket.broadcast.to('home').emit('light_status', data)
//         const device = devices.find(device => device.number === data.sn)
//         devices[devices.map(device => device.id).indexOf(device.id)].data = data.status
//         radio.send('data-' + data.status, 10, device.number).then(() => {
//             console.log('setting has been sent');
//         }).catch(error => {
//             console.log('setting has not been sent');

//         })
//     })
//     setInterval(() => {
//         recursiveSend(0)
//     }, devices.length * 1000)


//     function recursiveSend(i){
//         if(i < devices.length){
           
//            checkConnected(devices[i]).then(() => {
//             recursiveSend(i+1)
//            }).catch(() => {
//             recursiveSend(i+1)
//            })
//         }
//     }

//     function checkConnected(device) {
//         //console.log(device);
//         return new Promise((resolve, reject) => {
            
//             radio.send('hi', 3, device.number).then(() => {
                
//                 if(device.connected){
//                     resolve()
//                 } else {
//                     dataModule.setDeviceConnection(device.number, true).then(() => {
//                         devices[devices.map(device => device.id).indexOf(device.id)].connected = true
//                         //device.connected = true
//                         socketClient.emit('device_connect', device.number)
//                         resolve()
//                     }).catch(error => {
//                         console.log(error);
//                         reject()
//                     })
//                 }
            
//         }).catch(() => {
//             if(device.connected){
//                 dataModule.setDeviceConnection(device.number, false).then(() => {
//                     devices[devices.map(device => device.id).indexOf(device.id)].connected = false
//                     //device.connected = false
//                     socketClient.emit('device_disconnect', device.number)
//                     reject()
//                 }).catch(error => {
//                     console.log(error);
//                     reject()
//                 })
//             } else {
//                 reject()
//             }
            
//         })
//         })
//     }

// }).catch(error => {
//     console.log(error);
// })

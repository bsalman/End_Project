const express = require('express')
const fs = require('fs')
const session = require('express-session')
const fileupload = require('express-fileupload')
const passwordHash = require('password-hash')

//const cors = require('cors')
//include data module
const dataModule = require('./modules/sqlDataModule')

// transmitter to connect with iot devices
const Radio = require('./modules/transmitter')

const emailSender = require('./modules/emailSender')

const app = express()

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

//app.use(cors())


const port = process.env.PORT || 3000

// session options 
const sessionOptions = {
    secret: 'smartHome',
    //  resave: false,
    //  saveUninitialized: false,
    cookie: {}  // if there is secure: true in the {} then i have to use https: in the browser..(not now as i am working on localhost)
}


// use the session
app.use(session(sessionOptions))


// app.use((req,res,next)=> {
//     if (req.session) {
//         next()
//     } else {
//         switch (req.method.toUpperCase()) {
//             case 'GET':
//                 res.redirect('/login')
//                 break;

//             case 'POST':
//                 res.json(10)
//                 break;

//             default:
//                 res.json('nothing will be shown')
//                 break;
//         }


//     }
// })
app.post('/checklogin', (req, res) => {
    if (req.session.user) {
        res.json(req.session.user)
    } else {
        res.json(10)
    }


});

app.post('/logout', (req, res) => {
    req.session.destroy()
    res.json(10)
});

app.get('/dummy', (req, res) => {

    res.json(passwordHash.generate('admin'))

})


app.post('/login', (req, res) => {
    //console.log(req.body);

    if (req.body.username && req.body.password) {
        dataModule.checkUser(req.body.username.trim(), req.body.password).then(checkLogin => {
            req.session.user = req.body.username
            res.json(checkLogin)
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

app.post('/addroom', (req, res) => {
    //console.log(req.body);
    const roomName = req.body.roomName
    const roomType = req.body.roomType
    if (roomName && roomType) {
        dataModule.addRoom(roomName, roomType).then(rooms => {
            //console.log('rooms', rooms);
            res.json(rooms)
        }).catch(error => {
            if (error === 3) {
                res.json(3)
            } else {
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
    const imgUrl = req.body.imgUrl

    if (deviceName && categoryId && deviceSn) {
        dataModule.addDevice(deviceName, deviceSn, categoryId, roomId, imgUrl).then(device => {

            // console.log('device', device);
            let deviceObj = {
                id: device.insertId,
                name: deviceName,
                number: deviceSn,
                category: categoryId,
                room_id: roomId,
                imgUrl: imgUrl
            }
            //console.log(deviceObj);
            res.json(deviceObj)


        }).catch(error => {
            if (error === 3) {
                res.json(3)
            } else {
                res.json(4)
            }
        })
    } else {
        res.json(2)
    }

});
//==================get all Rooms  ======================//
app.post('/rooms/allrooms', (req, res) => {
    dataModule.getAllRooms().then(rooms => {
        res.json(rooms)
    }).catch(error => {
        res.json(2)
    })
})

//================== delete room=========================//
app.post('/rooms/deleteroom', (req, res) => {
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


//================== edit room=========================//
app.post('/rooms/editroom', (req, res) => {
    //1 success
    //2 can not find a room with this id
    //3 server error
    // console.log(req.body)
    // res.json(1)
    dataModule.editRoom(req.body.newRoomName, req.body.newRoomType, req.body.roomId).then((room) => {

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

// app.post('/room/deletedevice', (req, res) => {
//     console.log(req.body);
//     dataModule.deleteDevice(req.body.roomId, req.body.deviceId).then(data => {
//         console.log(data);
//         res.json(data)
//     }).catch(error => {
//         if (error === 3) {
//             res.json(3)
//         } else {
//             console.log(error);
//             res.json(2)
//         }

//     })
// });


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
app.post('/editDevice', (req, res) => {
    //1 success
    //2 error  entries 
    //3 server error
    // console.log(req.body)

    const deviceId = req.body.deviceId;
    const serialNumber = req.body.serialNumber
    if (deviceId && serialNumber) {
        dataModule.editDevice(deviceId, serialNumber).then((device) => {
            console.log(device);
            res.json(device)
        }).catch(error => {
            console.log(error);
            res.json(3)
        })
    } else {
        res.json(2)
    }
})

//deleteDevice(deviceId)
app.post('/deletedevice', (req, res) => {
    //data success
    //3 this device id doesnt exist
    //2 kein devices
    //4 server error
    //console.log(req.body)


    const deviceId = req.body.deviceId;
    const roomId = req.body.roomId;

    if (deviceId) {
        dataModule.deleteDevice(deviceId, roomId).then((device) => {
            //console.log('hi', device);
            res.json(device)
        }).catch(error => {
            //console.log(error);
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

//==============================================================//
app.post('/editdata', (req, res) => {
    console.log(req.body)
    const deviceId = req.body.deviceId;
    const data = req.body.data
    if (deviceId && data) {
        dataModule.editData(deviceId, data).then((device) => {
            //console.log(device);
            res.json(device)
        }).catch(error => {
            //console.log(error);
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
app.post('/editselected', (req, res) => {
    const roomId = req.body.roomId;
    const selected = req.body.selected
    if (roomId && selected) {
        dataModule.editSelected(roomId, selected).then((room) => {
            res.json(room)
        }).catch(error => {
            console.log(error);
            res.json(3)
        })
    }
})

//==============================================================//
app.post('/addtimemotion', (req, res) => {
    console.log(req.body);
    // res.json(req.body)
    dataModule.addTimeMotion(req.body.startTime, req.body.stopTime, req.body.motionId, req.body.deviceId, req.body.active).then(data => {
        res.json(data)
    }).catch(error => {
        if (error === 3) {
            res.json(3)
        } else {
            res.json(4)
        }
    })


});
//==============================================================//
app.post('/updatetimemotion', (req, res) => {
    console.log(req.body);
    // res.json(req.body)
    dataModule.updateTimeMotion(req.body.id, req.body.startTime, req.body.stopTime, req.body.motionId, req.body.deviceId, req.body.active).then(data => {
        res.json(data)
    }).catch(error => {
        if (error === 3) {
            res.json(3)
        } else {
            res.json(4)
        }
    })


});
//==============================================================//
app.post('/deletetimemotion', (req, res) => {
    console.log(req.body);
    // res.json(req.body)
    dataModule.deleteTimeMotion(req.body.id).then(data => {
        res.json(data)
    }).catch(error => {
        if (error === 3) {
            res.json(3)
        } else {
            res.json(4)
        }
    })


});
//==============================================================//
app.post('/getmotiondevices', (req, res) => {
    //console.log(req.body);
    dataModule.getAllMotionRelatedDevices(req.body.deviceId).then((devices) => {
        res.json(devices)

    }).catch(error => {
        res.json(error)
    })
});
//==============================================================//
app.post('/changeMotionDeviceStatus', (req, res) => {
    //console.log(req.body);
    dataModule.changeMotionDeviceStatus(req.body.relationId).then((device) => {
        res.json(device)

    }).catch(error => {
        res.json(error)
    })
});
//==============================================================//
app.post('/changeTimeDeviceStatus', (req, res) => {
    //console.log(req.body);
    dataModule.changeTimeDeviceStatus(req.body.relationId).then((device) => {
        res.json(device)

    }).catch(error => {
        res.json(error)
    })
});
//==============================================================//
app.post('/reversmotiondevices', (req, res) => {
    //console.log(req.body);
    dataModule.reversMotionDevices(req.body.id, req.body.status).then((devices) => {
        res.json(devices)

    }).catch(error => {
        res.json(error)
    })
});


//==============================================================//
app.post('/reverstimedevices', (req, res) => {
    //console.log(req.body);
    dataModule.reversTimeDevices(req.body.id, req.body.status).then((devices) => {
        res.json(devices)

    }).catch(error => {
        res.json(error)
    })
});
//================================================================//
app.post('/editsecure', (req, res) => {
    console.log(req.body);
    dataModule.editSecure(req.body.roomId, req.body.secure).then((room) => {
        res.json(room)

    }).catch(error => {
        res.json(error)
    })
})


//================================================================//

//===================================================//
app.post('/secureAllHouse', (req, res) => {

    dataModule.updateSecureAllHouse(req.body.secure).then((data) => {

        res.json(data)
    }).catch(error => {

        res.json(2)
    })
})

//=============================================================//

app.post('/getsecure', (req, res) => {

    dataModule.getSecureAllHouse().then((data) => {

        res.json(data)
    }).catch(error => {

        res.json(2)
    })
})


//==============================================================//
app.post('/addtimedevice', (req, res) => {
    console.log(req.body);
    // res.json(req.body)
    dataModule.addTimeDevice(req.body.startTime, req.body.stopTime, req.body.deviceId, req.body.active).then(data => {
        res.json(data)
    }).catch(error => {
        if (error === 3) {
            res.json(3)
        } else {
            res.json(4)
        }
    })


});

//==============================================================//
app.post('/updatetimedevice', (req, res) => {
    console.log('', req.body);
    // res.json(req.body)
    dataModule.updateTimeDevice(req.body.id, req.body.startTime, req.body.stopTime, req.body.deviceId, req.body.active).then(data => {
        res.json(data)
    }).catch(error => {
        if (error === 3) {
            res.json(3)
        } else {
            res.json(4)
        }
    })


});
//==============================================================//
app.post('/deletetimedevice', (req, res) => {
    console.log(req.body);
    // res.json(req.body)
    dataModule.deleteTimeDevice(req.body.id).then(data => {
        res.json(data)
    }).catch(error => {
        if (error === 3) {
            res.json(3)
        } else {
            res.json(4)
        }
    })


});
//==============================================================//

//==============================================================//
app.post('/gettimedevices', (req, res) => {
    //console.log(req.body);
    dataModule.getAllTimeRelatedDevices(req.body.deviceId).then((devices) => {
        res.json(devices)

    }).catch(error => {
        res.json(error)
    })
});
//==============================================================//
app.post('/contactus', (req, res) => {
    console.log(req.body);
    //res.json(1)
    const name = req.body.name
    const email = req.body.email
    const message = req.body.message
    if (name != '' && name.length < 100) {
        emailSender.sendEmail(name, email, message, (ok) => {
            console.log(ok);
            if (ok) {
                //res.json(200)
                res.status(200).json({
                    success: true
                });
            } else {
                //res.json(500)//server erreur
                console.log('error: ');
                res.status(401).json({
                    success: false
                });
            }
        })
    }

});
//================================================================//
app.use('/', (req, res, next) => {
    const html = fs.readFileSync(__dirname + '/index.html', 'utf-8')
    res.send(html)
});
//===============================================================//
const server = app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});







const io = require('socket.io')(server)

io.on('connection', socket => {
    console.log('user is connected');

    socket.join('home')
    //socket listeneer
    socket.on('device_connect', sn => {
        socket.broadcast.to('home').emit('device_connect', sn)
    })
    socket.on('device_disconnect', sn => {
        socket.broadcast.to('home').emit('device_disconnect', sn)
    })
    socket.on('light_status', data => {
        socket.broadcast.to('home').emit('light_status', data)
    })
    socket.on('device_status', data => {
        socket.broadcast.to('home').emit('device_status', data)
    })
    socket.on('temp_data', data => {
        socket.broadcast.to('home').emit('temp_data', data)
    })
    socket.on('stop_home_alarm', data => {
        socket.broadcast.to('home').emit('stop_home_alarm', data)
    })

})

const ioClient = require('socket.io-client')

const socketClient = ioClient('http://pi.local:3000')
socketClient.on('connect', () => {
    console.log('house is connected');
})



// get a list of devices from database
dataModule.getDevices().then(initDevices => {


    let devices = initDevices
    setInterval(()=>{
        dataModule.getDevices().then(CurrentDevices => {
            devices = CurrentDevices
        })
    },500)
 
    // check schedule jobs
    setInterval(() => {
        dataModule.getSchedules().then(schedules => {


            devices.forEach(device => {

                if (device.category === 'Light' || device.category === 'Appliance') {



                    schedules.forEach(schedule => {
                        if (schedule.device_id === device.id) {
                            const startTime = schedule.start_time.split(':')
                            const startHour = parseInt(startTime[0])
                            const startMinuts = parseInt(startTime[1])

                            const stopTime = schedule.stop_time.split(':')
                            const stopHour = parseInt(stopTime[0])
                            const stopMinuts = parseInt(stopTime[1])

                            const currentD = new Date();
                            const startHourD = new Date();
                            startHourD.setHours(startHour, startMinuts, 0); // 5.30 pm
                            const endHourD = new Date();
                            endHourD.setHours(stopHour, stopMinuts, 0); // 6.30 pm

                            if (currentD >= startHourD && currentD < endHourD) {
                                console.log("yes!");
                                if (device.data === 'off') {
                                    dataModule.editData(device.id, 'on').then(data => {
                                        devices[devices.map(device => device.id).indexOf(device.id)].data = 'on'
                                        radio.send('data-on', 3, device.number).then(() => {

                                        }).catch(error => {

                                        })
                                        socketClient.emit('device_status', { id: device.id, status: 'on' })
                                    }).catch(error => {
                                        console.log(error);
                                    })
                                }
                            } else {
                                if (device.data === 'on') {
                                    dataModule.editData(device.id, 'off').then(data => {
                                        devices[devices.map(device => device.id).indexOf(device.id)].data = 'off'
                                        radio.send('data-off', 3, device.number).then(() => {

                                        }).catch(error => {

                                        })
                                        socketClient.emit('device_status', { id: device.id, status: 'off' })
                                    }).catch(error => {
                                        console.log(error);
                                    })
                                }
                            }
                        }
                    })




                }
            })


        }).catch(error => {
            console.log(error);
        })
    }, 20 * 1000);

    // connection to iot devices
    const radio = new Radio()


    radio.setReadingPipe('0xABCDABCD71')
    radio.begin()


    


    radio.read((data) => {
        console.log(data);
        const sn = data.substr(0, data.indexOf('-'))

        //console.log(sn);
        const device = devices.find(device => device.number === sn)
        if (device) {
            devices[devices.map(device => device.id).indexOf(device.id)].connected = true
            // get the message and replace the empty hexa field with nothing
            const message = data.substr(data.indexOf('-') + 1, data.length).replace(/\x00/gi, '')
            if (message === 'hi') {
                dataModule.setDeviceConnection(sn, true).then(() => {
                    socketClient.emit('device_connect', sn)
                    if (device.category === 'Light') {
                        // if(device.data === 'on'){

                        // }
                        radio.send('data-' + device.data, 3, device.number).then(() => {
                            //console.log('setting has been sent');
                        }).catch(error => {
                            //console.log('setting has not been sent');

                        })

                    }
                }).catch(error => {
                    console.log(error);
                })
            }

            if (message.indexOf('data') === 0) {
                //socketClient.emit('device_status', {id: 78, status: message.substr(message.lastIndexOf('-') + 1, message.length).replace(/\x00/gi, '') == '1'? 'on' : 'off'})
                if (device.category === 'Motion') {
                    const stringData = message.substr(message.lastIndexOf('-') + 1, message.length).replace(/\x00/gi, '')

                    dataModule.checkHomeSecurity().then(value => {
                        if(value === 'true') {
                            devices.forEach(device => {
                                if (device.category === 'Motion'){
                                    radio.send('alarm-on', 10, device.number).then(() => {
                                        console.log('alarm sent to ', device.number);
                                    }).catch(error => {
                                
                                    })
                                }
                            })
                        }
                    })
                    dataModule.checkRoomSecurity(device.room_id).then(value => {
                        if(value) {
                            devices.forEach(device => {
                                if (device.category === 'Motion'){
                                    radio.send('alarm-on', 10, device.number).then(() => {
                                        console.log('alarm sent to ', device.number);
                                    }).catch(error => {
                                
                                    })
                                }
                            })
                        }
                    })
                    dataModule.editData(device.id, stringData == '1' ? '1' : '').then(() => {
                        socketClient.emit('device_status', { id: device.id, status: stringData == '1' ? '1' : '' })
                        devices[devices.map(device => device.id).indexOf(device.id)].data = (stringData == '1' ? '1' : '')
                        dataModule.getMotionRelatedDevices(device.id).then((results) => {
                            //console.log('429',results);
                            results.forEach(realtedDevice => {
                                dataModule.getSchedules().then(schedules => {
                                    let hasControl = true
                                    schedules.forEach(schedule => {
                                        if (schedule.device_id == realtedDevice.device_id){
                                            const startTime = schedule.start_time.split(':')
                                            const startHour = parseInt(startTime[0])
                                            const startMinuts = parseInt(startTime[1])
    
                                            const stopTime = schedule.stop_time.split(':')
                                            const stopHour = parseInt(stopTime[0])
                                            const stopMinuts = parseInt(stopTime[1])
    
                                            const currentD = new Date();
                                            const startHourD = new Date();
                                            startHourD.setHours(startHour, startMinuts, 0); // 5.30 pm
                                            const endHourD = new Date();
                                            endHourD.setHours(stopHour, stopMinuts, 0); // 6.30 pm
    
                                            if (currentD >= startHourD && currentD < endHourD) {
                                                hasControl = false
                                            }
                                        }
                                        
                                        })
                                    if (hasControl) {
                                        const foundDevice = devices.find(device => device.id === realtedDevice.device_id)
                                        dataModule.editData(foundDevice.id, stringData == '1' ? 'on' : 'off').then(() => {
                                            setTimeout(() => {
                                                radio.send('data-' + (stringData === '1' ? 'on' : 'off'), 3, foundDevice.number).then(() => {
                                                    devices[devices.map(device => device.id).indexOf(foundDevice.id)].data = stringData == '1' ? 'on' : 'off'
                                                    socketClient.emit('device_status', { id: foundDevice.id, status: stringData == '1' ? 'on' : 'off' })
                                                    console.log('434', stringData);
                                                }).catch(error => {
                                                    console.log('436', error);
                                                })
                                            }, 500)

                                        }).catch(error => {
                                            console.log('439', error);
                                        })
                                    }

                                })


                            });
                        }).catch(error => {
                            console.log('444', error);
                        })
                    }).catch(error => {
                        console.log('447', error);
                    })
                }
                if (device.category === 'Temperature') {
                    const stringData = message.substr(message.indexOf('-') + 1, message.length).replace(/\x00/gi, '')
                    const savedData = {
                        t: stringData.split('-')[0],
                        h: stringData.split('-')[1]
                    }
                    dataModule.editData(device.id, JSON.stringify(savedData)).then(() => {
                        devices[devices.map(device => device.id).indexOf(device.id)].data = JSON.stringify(savedData)
                        socketClient.emit('temp_data', { id: device.id, status: JSON.stringify(savedData) })
                    }).catch(error => {
                        console.log('447', error);
                    })
                }
            }
        }
    })

    // radio.send('hi', 10, '0x744d52687C').then(() => {
    //     console.log('sent');
    // })

    socketClient.on('light_status', data => {
        //socket.broadcast.to('home').emit('light_status', data)
        // console.log(data);
        const device = devices.find(device => device.number === data.sn)
        devices[devices.map(device => device.id).indexOf(device.id)].data = data.status
        radio.send('data-' + data.status, 3, device.number).then(() => {
            console.log('setting has been sent');
        }).catch(error => {
            console.log('setting has not been sent');

        })
    })
    
    socketClient.on('stop_home_alarm', data => {
        //socket.broadcast.to('home').emit('light_status', data)
        devices.forEach(device => {
            if (device.category === 'Motion'){
                radio.send('alarm-off', 3, device.number).then(() => {
                    console.log('stop alarm sent to ', device.number);
                }).catch(error => {
            
                })
            }
        })
    })

    setInterval(() => {
        // recursiveSend(0)
        devices.forEach(device => {
            checkConnected(device).then(() => {

            }).catch(error => {
                console.log(error, device.number);
            })
        })
    }, (devices.length) * 1000)


    // function recursiveSend(i){
    //     if(i < devices.length){

    //        checkConnected(devices[i]).then(() => {
    //         recursiveSend(i+1)
    //        }).catch(() => {
    //         recursiveSend(i+1)
    //        })
    //     }
    // }

    function checkConnected(device) {
        //console.log(device);
        return new Promise((resolve, reject) => {

            radio.checkConnected('hi', 10, device.number).then(() => {

                if (device.connected) {
                    resolve()
                } else {
                    dataModule.setDeviceConnection(device.number, true).then(() => {
                        devices[devices.map(device => device.id).indexOf(device.id)].connected = true
                        //device.connected = true
                        socketClient.emit('device_connect', device.number)
                        resolve()
                    }).catch(error => {
                        console.log(error);
                        reject()
                    })
                }

            }).catch(() => {
                if (device.connected) {
                    dataModule.setDeviceConnection(device.number, false).then(() => {
                        devices[devices.map(device => device.id).indexOf(device.id)].connected = false
                        //device.connected = false
                        socketClient.emit('device_disconnect', device.number)
                        reject()
                    }).catch(error => {
                        console.log(error);
                        reject()
                    })
                } else {
                    reject()
                }

            })
        })
    }

}).catch(error => {
    console.log(error);
})

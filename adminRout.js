const express = require('express')
const dataModule = require('./modules/sqlDataModule')
const adminRouter = express.Router()

adminRouter.use((req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        switch (req.method.toUpperCase()) {
            case 'GET':
                res.redirect('/login')
                break;
            case 'POST': //!2
                res.json(10)
                break;
            default:
                res.json('there is nothing to show')
                break;
        }
    }
})


adminRouter.post('/settings', (req, res) => {
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

adminRouter.post('/addroom', (req, res) => {
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
adminRouter.post('/rooms/adddevices', (req, res) => {
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
adminRouter.post('/rooms/allrooms', (req, res) => {
    dataModule.getAllRooms().then(rooms => {
        res.json(rooms)
    }).catch(error => {
        res.json(2)
    })
})

//================== delete room=========================//
adminRouter.post('/rooms/deleteroom', (req, res) => {
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
adminRouter.post('/rooms/editroom', (req, res) => {
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


adminRouter.post('/room', (req, res) => {
    console.log(req.body);
    dataModule.getRoom(req.body.id).then(data => {
        console.log(data.roomDevice);
        res.json(data.roomDevice)
    }).catch(error => {
        res.json(2)
    })
});


//=======================================================//
adminRouter.post('/editDevice', (req, res) => {
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
adminRouter.post('/deletedevice', (req, res) => {
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
adminRouter.post('/editdata', (req, res) => {
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

adminRouter.post('/getdevices', (req, res) => {
    dataModule.getDevices(req.body.roomId).then((devices) => {
        res.json(devices)

    }).catch(error => {
        res.json(error)
    })
});

//==============================================================//
adminRouter.post('/editselected', (req, res) => {
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
adminRouter.post('/addtimemotion', (req, res) => {
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
adminRouter.post('/updatetimemotion', (req, res) => {
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
adminRouter.post('/deletetimemotion', (req, res) => {
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
adminRouter.post('/getmotiondevices', (req, res) => {
    //console.log(req.body);
    dataModule.getAllMotionRelatedDevices(req.body.deviceId).then((devices) => {
        res.json(devices)

    }).catch(error => {
        res.json(error)
    })
});
//==============================================================//
adminRouter.post('/changeMotionDeviceStatus', (req, res) => {
    //console.log(req.body);
    dataModule.changeMotionDeviceStatus(req.body.relationId).then((device) => {
        res.json(device)

    }).catch(error => {
        res.json(error)
    })
});
//==============================================================//
adminRouter.post('/changeTimeDeviceStatus', (req, res) => {
    //console.log(req.body);
    dataModule.changeTimeDeviceStatus(req.body.relationId).then((device) => {
        res.json(device)

    }).catch(error => {
        res.json(error)
    })
});
//==============================================================//
adminRouter.post('/reversmotiondevices', (req, res) => {
    //console.log(req.body);
    dataModule.reversMotionDevices(req.body.id, req.body.status).then((devices) => {
        res.json(devices)

    }).catch(error => {
        res.json(error)
    })
});


//================================================================//
adminRouter.post('/editsecure', (req, res) => {
    console.log(req.body);
    dataModule.editSecure(req.body.roomId, req.body.secure).then((room) => {
        res.json(room)

    }).catch(error => {
        res.json(error)
    })
})


//================================================================//

//===================================================//
adminRouter.post('/secureAllHouse', (req, res) => {

    dataModule.updateSecureAllHouse(req.body.secure).then((data) => {

        res.json(data)
    }).catch(error => {

        res.json(2)
    })
})

//=============================================================//

adminRouter.post('/getsecure', (req, res) => {

    dataModule.getSecureAllHouse().then((data) => {

        res.json(data)
    }).catch(error => {

        res.json(2)
    })
})


//==============================================================//
adminRouter.post('/addtimedevice', (req, res) => {
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
adminRouter.post('/updatetimedevice', (req, res) => {
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
adminRouter.post('/deletetimedevice', (req, res) => {
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
adminRouter.post('/gettimedevices', (req, res) => {
    //console.log(req.body);
    dataModule.getAllTimeRelatedDevices(req.body.deviceId).then((devices) => {
        res.json(devices)

    }).catch(error => {
        res.json(error)
    })
});
//==============================================================//


module.exports = adminRouter
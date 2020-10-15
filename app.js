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


app.get('/dummy', (req, res) => {

    res.json(passwordHash.generate('admin'))

})

// =================== LOGIN ==============//

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

//================= SETTINGS ============ //

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


//======================== ROOMS ====================== //

//* add rooms to the component 
app.post('/addroom', (req, res) => {
    console.log(req.body);
    const roomName = req.body.roomName
    const roomType = req.body.roomType

    if (roomName && roomType) {
        dataModule.addRoom(roomName,roomType).then(rooms => {
            console.log(rooms);
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



// get the devices 
app.post('/rooms/adddevices', (req, res) => {
    console.log(req.body);
    const deviceName = req.body.deviceName
    const categoryId = req.body.type
    const deviceSn = req.body.deviceSn
    const roomId = req.body.roomId
    if (deviceName && categoryId && deviceSn) {
        dataModule.addDevice(deviceName,deviceSn,categoryId,roomId).then(device => {

            let deviceObj = {
                id: device.insertId,
                name: deviceName,
                number: deviceSn,
                category: categoryId, 
                room_id: roomId
            }
console.log(deviceObj);
            res.json(deviceObj)

        }).catch(error => {
            if (error === 3) {
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
    console.loge(body)
    const roomId = req.body.roomId
    dataModule.deleteRoom(roomId).then(() => {
        res.json(1)
    }).catch(error => {
        console.log(error);
        res.json(2)
    })
})

// ============= all rooms with devices app =================//
//! trying to get dummy data to see if the sql function get Room is working 

// app.post('/rooms', (req,res)=>{
//    dataModule.getRoom().then(rooms =>{
//     console.log(rooms);
//    }).catch(error =>{
//        console.log(error);
//    }) 
// })




//==============================================================//
app.use('/', (req, res, next) => {
    const html = fs.readFileSync(__dirname + '/index.html', 'utf-8')
    res.send(html)
});
//===============================================================//
app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});
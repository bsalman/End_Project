const express = require('express')
const session = require('express-session')
const fs = require('fs')
const fileupload = require('express-fileupload')
const passwordHash = require('password-hash')


//include data module
const dataModule = require('./modules/sqlDataModule')

const app = express()


app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())


//session options for later 


// use the session later 


 app.get('/dummy',(req,res)=>{

    res.json(passwordHash.generate('admin'))

 })



// middleware for login 
app.post('/login', (req, res) => {
    console.log(req.body);
    if (req.body.username && req.body.password) {
        dataModule.checkUser(req.body.username.trim(),req.body.password).then(checklogin => {
            // req.session.user = user
            res.json(checklogin)
        }).catch(error => {
            console.log(error);
            switch (error) {
                case 3:
                    res.json(3)
                    break;
                case 4:
                    res.json(4) // 
                    break;
                case 5:
                    res.json(5)
                    break;
                default:
                    res.json(5)  // server error
                    break;
            }
        })
    } else {
        res.json(2)
    }
});


// app for the setting 
// app.post('/settings', (req, res) => {
//      console.log(req.body);
//     res.json('something')
    

// });

// middleware for the settings
app.post('/settings', (req, res) => {
    console.log(req.body);
    // 1 user registered successfully
    // 2 data error
    // 3 user exist
    // 4 server error
   const username = req.body.username.trim()
   const oldPassword = req.body.oldPassword
   const password = req.body.password
   const repassword = req.body.repassword

   if (username && oldPassword && password && password == repassword) {
      // let result = dataModule.registerUser
       dataModule.changeUser(username,password,oldPassword).then(() => {
           res.json(1)
       }).catch(error => {
           console.log(error);
           if (error == "exist") {
               res.json(3)
           } else {
               res.json(4)
           }
           
       })
   }else {
       res.json(2)
   }
    
    

});

// middleware for adding a single room
// adminRouter.post('/dashboard', (req, res) => {
//     const arr = [{roomName: 'bed', roomType: 'a'}]
//   //  const room = req.body.room       
// dataModule.addRoom(arr).then(result => {
//     console.log(result);
//         }).catch(error => {
//             console.log(error);
//                 res.json(3)  
//         }) 
// });

// middleware to show all rooms
// app.post("/dashboard", (req, res) => {
//     // you have to get all the exames from db and send them to the ejs file and render it
//     dataModule.addRooms().then((rooms) => {
        
//         res.render('dashboard', {
//             rooms
//         })
//     }).catch(error => {

//         res.json(2)

//     })

// });

//middleware to get all rooms
// app.post('/dashboard', (req, res) => {
//     dataModule.addRooms().then(rooms => {
//         res.json(rooms)
//     }).catch(error => {
//         res.json(2)
//     })
// });


//===============================================//
app.post('/dashboard',(req,res)=>{
    console.log(req.body);
   // res.send ('Hallo')
})

//-----------------------------------------------
app.use('/', (req, res, next)=>{
    const html = fs.readFileSync(__dirname + '/index.html', 'utf-8')
    res.send(html)
})


const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log(`app listening to port ${port}!`);
})
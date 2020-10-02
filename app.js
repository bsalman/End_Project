const express = require('express')
const fs = require('fs')
const session = require('express-session')
const fileupload = require('express-fileupload')
const passwordHash = require('password-hash')

//include data module
const dataModule = require('./modules/sqlDataModule')


const app = express()

app.use(express.static(__dirname+'/public'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())


const port = process.env.PORT || 3000


app.get('/dummy',(req,res)=>{

    res.json(passwordHash.generate('admin'))

})


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
    //console.log(req.body);
    //2 data error
    //1 user registered successfully
    //3 user exist
    //4 server error
//    const username = req.body.username.trim()
//    const password = req.body.password
//    const repassword = req.body.repassword

//    if (username && password && password == repassword) {
//       // let ressult = dataModule.registerUser
//        dataModule.changeUser(username,password,'admin').then(() => {
//            res.json(1)
//        }).catch(error => {
//            console.log(error);
//            if (error == "exist") {
//                res.json(3)
//            } else {
//                res.json(4)
//            }
           
//        })
//    }else {
//        res.json(2)
//    }
    
    

});


// app.post('/settings', (req, res) => {
    
// });


app.use('/', (req, res,next) => {
    const html = fs.readFileSync(__dirname + '/index.html','utf-8')
    res.send(html)
});




app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});
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



// app post login
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
app.post('/settings', (req, res) => {
    // console.log(req.body);
    res.json('something')
    

});



app.use('/', (req, res, next)=>{
    const html = fs.readFileSync(__dirname + '/index.html', 'utf-8')
    res.send(html)
})


const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log(`app listening to port ${port}!`);
})
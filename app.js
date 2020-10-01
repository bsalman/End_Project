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
        dataModule.checkUser(req.body.username.trim(),req.body.password).then(user => {
            // req.session.user = user
            res.json(1)
        }).catch(error => {
            if (error == 3) {
                res.json(3)
            }else{
                res.json(4)
            }
        })
    } else {
        res.json(2)
    }

});

app.post('/settings', (req, res) => {
    console.log(req.body);
    
    

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
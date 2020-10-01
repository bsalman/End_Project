const express = require('express')
const fs = require('fs')
const dataModule= require('./modules/mysqlDataModules')

const app = express()

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

const port = process.env.PORT || 3000

app.post('/settings',(req,res)=>{
const {userName,password}=req.body
    dataModule.changeUser(userName, password,value){

    }
})

app.use('/', (req, res) => {
    const html = fs.readFileSync(__dirname + '/index.html' , 'utf-8')
    res.send(html);
})

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});
const express = require('express')
const session = require('express-session')
const fs = require('fs')


const app = express()


app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())


//session options for later 


// use the session later 

app.use('/', (req, res, next)=>{
    const html = fs.readFileSync(__dirname + '/index.html', 'utf-8')
    res.send(html)
})


const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log(`app listening to port ${port}!`);
})
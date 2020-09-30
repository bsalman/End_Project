const express = require('express')
const fs = require('fs')

const app = express()

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

const port = process.env.PORT || 3000

// app.get('/',(req,res)=>{
//     res.send('hello')
// })
app.use('/', (req, res) => {
    const html = fs.readFileSync(__dirname + '/index.html' , 'utf-8')
    res.send(html);
})

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});
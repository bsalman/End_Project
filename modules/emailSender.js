//import our nodemailer
const nodemailer = require('nodemailer')

//send email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { //the user email
        user: 'smart19112020@gmail.com',
        pass: 'smart2020*'
    }
})


function sendEmail(name, email, message,callback) {
    const mailOption = {
        from: email,//from the owner website
        to: 'smart19112020@gmail.com',//email you will sent to
        subject: 'Request for more Informations',
        text: 'email: ' + email+'\n'+ 'name: ' + name + '\n' + 'Content: ' +  message

    }
    transporter.sendMail(mailOption, function (error, info) {
        if (error) {
            console.log(error);
            callback(false)
        } else {
            console.log(info.response);
            callback(true)
        }

    })
}

module.exports = {sendEmail}

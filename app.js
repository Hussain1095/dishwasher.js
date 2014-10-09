var nodemailer = require('nodemailer'),
    options = require('./options'),
    fetch_emails = require('./fetch_emails'),
    fs = require('fs');


var emails = []
var target = ''

fs.readFile('emails.txt', 'utf8', function(err, data){
    emails = data.split('\n');
    emails = emails.slice(0, emails.length-1)
})

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: options.email,
        pass: options.password
    }
})

var check_imap = function(){
    fetch_emails(transporter, options, function(from){
        var send_options = {
            from: options.email,
            to: from,
            subject: 'victim',
            text: "this week's victim is " + target
        }
        transporter.sendMail(send_options);    
    });
}

var send_reminder = function(){
    target = emails[Math.floor(Math.random()*emails.length)];
    console.log("target: " + target)
    var send_options = {
        from: options.email,
        to: target,
        subject: options.subject,
        text: options.body
    }
    transporter.sendMail(send_options)
}

setInterval(check_imap, 15000)
setInterval(send_reminder, options.timeout)

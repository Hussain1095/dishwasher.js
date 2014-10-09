var inspect = require('util').inspect;
    Imap = require('imap');



var get_emails = function(transporter, options, cb){


    var imap = new Imap({
        user: options.email,
        password: options.password,
        host: 'imap.gmail.com',
        port: 993,
        tls: true
    })

    var openInbox = function(cb){
        imap.openBox('INBOX', false, cb);
    }

    imap.once('ready', function() {
        
        openInbox(function(err, box) {
            if (err) throw err;
            imap.search(['UNSEEN'], function(err, results) {
                if (err) {imap.end(); return null};
                if (results.length == 0){imap.end(); return null};
                var f = imap.fetch(results, { bodies: '', markSeen : true });
                f.on('message', function(msg, seqno) {
                    var prefix = '(#' + seqno + ') ';
                    var buffer = '';
                    var count = 0;
                    msg.on('body', function(stream, info) {
                        stream.on('data', function(chunk) {
                            count += chunk.length;
                            buffer += chunk.toString('utf8');
                        });
                    }); 
                    msg.once('attributes', function(attrs) {
                    });
                    msg.once('end', function() {
                        var from = buffer.split('From: ')[1].split('\n')[0]
                        cb(from);
                    });
                });
                f.once('error', function(err) {
                });
                f.once('end', function() {
                    imap.end();
                });
            });
        });
        
    })

    imap.once('error', function(err) {
    });

    imap.once('end', function() {
    });

    imap.connect();
  
};
module.exports = get_emails

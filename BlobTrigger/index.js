const parseString = require('xml2js').parseString;
const amqp = require('amqplib/callback_api');
//const rabbit = require('./send');

module.exports = async function (context, myBlob) {
let xml = myBlob.toString('utf8');
const options = {ignoreAttrs : true, explicitArray : false};

parseString(xml, options, function (err, result) {
    sendMessage(result);
});

};

const sendMessage =  (message) =>{
    amqp.connect('amqp://52.90.145.195', function(err, conn) {
            conn.createChannel(function(err, ch) {
              const queue = 'ColaBiblioteca';
              ch.assertQueue(queue, {durable: false});
                message.biblioteca.libro.forEach(book => {           
                ch.sendToQueue(queue, Buffer.from(JSON.stringify(book)));
              }); 
              ch.close(function() {conn.close()});
            });
            //setTimeout(() =>{ ch.closeconn.close(); process.exit(0) }, 500);  
          });
}
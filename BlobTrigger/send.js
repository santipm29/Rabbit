let amqp = require('amqplib/callback_api');

rabbitmq = {}
rabbitmq.send = (msg) =>{
    amqp.connect('amqp://52.90.145.195', function(err, conn) {
      conn.createChannel(function(err, ch) {
        const queue = 'hello';
        //ch.assertQueue(queue, {durable: false});
        msg.bibloteca.libro.forEach(libro => {           
          ch.sendToQueue(queue, Buffer.from(JSON.stringify(libro)));
        });
          //context.log(" [x] Sent %s", msg);
      });
      setTimeout(function() { conn.close(); process.exit(0) }, 500);  
    });
}

module.exports = rabbitmq
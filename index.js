const debug = require('debug')('memory-back:server'),
      http = require('http');

const config = require('./config.json');
const app = require('./app');
const { stringify } = require('querystring');

const port = process.env.PORT ||  parseInt(config.http.port) || 3000;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, config.http.listen);

server.on('error', err => { 
  console.log("Shit went down !");
  console.log(err);
})

server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;

  console.log(`Listening on ${bind}`);
})

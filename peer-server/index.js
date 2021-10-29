const { PeerServer } = require('peer')
const { readFileSync } = require('fs');

const server = PeerServer({
    ssl: {
      key: readFileSync(process.cwd() + '/ssl/secure.key'),
      cert: readFileSync(process.cwd() + '/ssl/secure.crt'),
    },
    port: 9000
}, server => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(
    "Started PeerServer on %s, port: %s, path: %s",
    host, port, "/"
  );

  const shutdownApp = () => {
    server.close(() => {
      console.log('Http server closed.');

      process.exit(0);
    });
  };

  process.on('SIGINT', shutdownApp);
  process.on('SIGTERM', shutdownApp);
});

server.on("connection", client => {
  console.log(`Client connected: ${client.getId()}`);
});

server.on("disconnect", client => {
  console.log(`Client disconnected: ${client.getId()}`);
});
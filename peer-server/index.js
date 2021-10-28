const { PeerServer } = require('peer')

const server = PeerServer({
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
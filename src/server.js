const express = require('express');
const { ParseServer } = require('parse-server');

const config = {
  appId: 'tgpHKxu7ddxA5KpvHr8VyvLOwrXpTtBjLRu9ItbJ',
  masterKey: 'qnlEneT3sdjhXkJtGOAoK6nCyqSgxZmzwhfPa8Uk',
  appName: 'duto',
  cloud: './cloud/main',
  databaseURI: 'mongodb://127.0.0.1:27017/parse',
  liveQuery: {
    classNames: ['Order'],
    redisURL: 'redis://localhost:6379',
  },
};

const app = express();
const api = new ParseServer(config);

app.use('/parse', api);

app.listen(1337, function() {
  console.log('parse-server running on port ' + 1337);
});

const httpServer = require('http').createServer(app);
httpServer.listen(1338, function() {
  console.log('parse-live-query-server running on port ' + 1337);
});

ParseServer.createLiveQueryServer(httpServer, {
  redisURL: 'redis://localhost:6379',
});

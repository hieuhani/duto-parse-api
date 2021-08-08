const express = require('express');
const { ParseServer } = require('parse-server');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const config = {
  appId: process.env.PARSE_APP_ID,
  masterKey: process.env.PARSE_MASTER_KEY,
  appName: 'duto',
  cloud: './cloud/main',
  databaseURI: process.env.DATABASE_URI,
  liveQuery: {
    classNames: ['Order'],
    redisURL: process.env.REDIS_URI,
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
  redisURL: process.env.REDIS_URI,
});

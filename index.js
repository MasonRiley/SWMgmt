const port = 80,
  express = require('express'),
  app = express(),
  logger = require('./controllers/logController');

app.use((req, res, next) => {
   logger.writeLogEntry(('GET request for ' + req.originalUrl));
   next();
});

app.get('/', (req, res) => {
  res.send('Welcome to HotBurger!');
  logger.writeLogEntry(('GET for ' + req.originalUrl + ' successful.'));
});

app.get('/version', (req, res) => {
  res.send('This is version 0 of the HotBurger service.');
  logger.writeLogEntry(('GET for ' + req.originalUrl + ' successful.'));
});

app.get('/logs', logger.printLog);

app.get('*', (req, res) => {
  logger.writeLogEntry(('GET for ' + req.originalUrl + ' failed - does not exist.'));
  res.send('404: Page not found.');
});

app.listen(port, () => {
    console.log(`The server has started and is listening on port number: ${port}`);
});

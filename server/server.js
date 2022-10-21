const express = require('express');
const app = express();
const path = require('path');
const userRouter = require('./routers/userRouter');
const habitRouter = require('./routers/habitRouter');
const metricRouter = require('./routers/metricRouter');

/**
 * Handle parsing request body
 */

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * Handle requests for static files
 */
if(process.env.NODE_ENV === 'production'){
  app.use('/build', express.static(path.join(__dirname, '../build')));
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });
}

/**
 * Define Route Handlers
 */
app.use('/user', userRouter);
app.use('/habit', habitRouter);
app.use('/metric', metricRouter);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  }
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
})

app.listen(3000);

module.exports = app;
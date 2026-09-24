require('dotenv').config();
const express = require('express');
const app = express();

const errorHandler = require('./src/middlewares/errorHandler');

app.get('/', (req, res) => {
  res.send('App is running');
});

app.get('/health', (req, res) => {
  res.status(200).json({
    message: 'health route is working',
  });
});

// error handler must be last, after all routes
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log('Server is running');
});

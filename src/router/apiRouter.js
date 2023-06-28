const express = require('express');
const userRouter = require('./v1/userRouter');

const apiRouter = express.Router();

// Define the /v1 route
apiRouter.use('/v1', userRouter);

module.exports = apiRouter;

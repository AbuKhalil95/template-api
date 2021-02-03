'use strict';

const express = require('express');
const router = express.Router();

// ---------------------------------------- Special Routes ---------------------------------------- //

const authRouter = require('./routes/auth-router.js');
const serverErrorHandler = require('./middleware/500.js');
router.use(authRouter, serverErrorHandler);

// ---------------------------------------- Generic Routes ---------------------------------------- //

const getModel = require('./middleware/model-finder.js');
router.param('model', getModel);

const bearerAuth = require('./middleware/bearer');

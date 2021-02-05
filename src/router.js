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

const bearerAuth = require('./middleware/bearer.js');
const aclMiddleware = require('./middleware/acl-middleware.js');
router.post('/:model', bearerAuth, aclMiddleware('read'), postItem);
router.get('/:model/:id', bearerAuth, aclMiddleware('read'), getItem);
router.put('/:model/:id', bearerAuth, aclMiddleware('read'), updateItem);
router.delete('/:model/:id', bearerAuth, aclMiddleware('read'), deleteItem);

// ---------------------------------------- Specific Routes ---------------------------------------- //

// ---------------------------------------- Generic Functions ---------------------------------------- //

function postItem(req, res, next) {
  console.log('Posting item: ', req.body);
  req.model.create(req.body).then(data => {
    res.status(201).json(data);
  }).catch(err => {
    console.log('error: ', err);
    next(err);
  });
}

function getItem(req, res, next) {
  let paramID = req.params.id;
  req.model.get(paramID).then(data => {
    let output = {
      count: 0,
      results: [],
    };

    output.count = data.length;
    output.results = data;
    res.status(200).json(output);
  }).catch(err => {
    console.log('error: ', err);
    next(err);
  });
}

function updateItem(req, res, next) {
  let paramID = req.params.id;
  req.model.update(paramID, req.body).then(data => {
    res.status(201).json(data);
  }).catch(err => {
    console.log('error: ', err);
    next(err);
  });
}

function deleteItem(req, res, next) {
  let paramID = req.params.id;
  req.model.delete(paramID).then(data => {
    res.status(201).json(data);
  }).catch(err => {
    console.log('error: ', err);
    next(err);
  });
}

// ---------------------------------------- Specific Functions ---------------------------------------- //

module.exports = router;
const models = require('../models/dataModels');

const userController = {};

/**
 * Search for a user. If it doesn't exist, returns an empty array.
 */
userController.getUser = (req, res, next) => {
  console.log('userController.getUser');
  models.User.findOne({
    username: req.params.username,
    password: req.params.password,
  }).then(data => {
    res.locals.user = data;
    return next();
  }).catch(err => {
    return next({
      log: 'error in userController.getUser',
      message: { err: err },
    });
  });
};

/**
 * Post a user. If it can't be posted, it returns an error (for now).
 */
userController.postUser = (req, res, next) => {
  console.log('userController.postUser');
  models.User.create({
    username: req.body.username,
    password: req.body.password,
  }).then(data => {
    res.locals.user = data;
    return next();
  }).catch(err => {
    return next({
      log: 'error in userController.postUser',
      message: { err: err }
    });
  });
};

module.exports = userController;
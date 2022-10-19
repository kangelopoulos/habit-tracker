const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

/**
 * search for a user of username/password passed with params
 */
router.get('/:username/:password', 
  userController.getUser, 
  (req, res) => {
    console.log('userRouter get \/:username/:password');
    if(!res.locals.user) res.status(200).json(false); // if the user doesn't exist, return false
    else res.status(200).json(res.locals.user); // if the user exists, return info
  }
);

/**
 * create a new user
 */
router.post('/', 
  userController.postUser,
  (req, res) => {
    console.log('userRouter post \/')
    res.status(200).json(res.locals.user); // return the new user
  }
);

module.exports = router;
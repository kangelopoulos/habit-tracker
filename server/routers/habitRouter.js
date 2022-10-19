const express = require('express');
const habitController = require('../controllers/habitController');
const router = express.Router();

/**
 * Serves a users habits
 */
router.get('/:user_id', habitController.get, (req,res) => {
  return res.status(200).json(res.locals.habits);
});


/**
 * Creates a new habit
 * Associates the new habit with a specific user
 */
router.post('/:user_id', habitController.create, habitController.createUserHabit, (req, res) => {
  return res.status(200);
});

/**
 * Removes a habit from a user
 * Deletes all associated data
 */
router.delete('/:user_id', habitController.deleteUserData, habitController.deleteUserHabit, (req, res) => {
  return res.status(200);
});

/**
 * Delete unused habits
 * Not sure how to do this - yet
 */

module.exports = router;
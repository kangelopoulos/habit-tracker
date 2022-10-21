const models = require('../models/dataModels');

const habitController = {};

/**
 * habitController.get
 * Purpose: Find habit and return habit data for a user.
 * Params: user_id (string)
 * Body: none
 * Locals: return - all habit objects
 */
habitController.get = (req, res, next) => {
  console.log('habitController.get');
  models.User.findOne({
    _id: req.params.user_id,
  }).then(data => {
    console.log(data);
    res.locals.habits = data.habits;
    return next();
  }).catch(err => {
    next({
      log: 'error in habitController.get',
      message: { err: err },
    });
  });
};

/**
 * habitController.create
 * Purpose: Create a new habit in the database.
 * Params: user_id (string)
 * Body: habit (string), isGood (bool)
 * Locals: return - new habit object id?
 */
habitController.create = (req, res, next) => { 
  console.log('habitController.create', req.body);
  // Attempt to find a matching habit in the system
  models.Habit.findOne({
    habit_type: req.body.habit,
    isGood: req.body.isGood,
  }).then(data => {
      // If not such habit exists, create it
      if(!data){ 
        models.Habit.create({
          habit_type: req.body.habit,
          isGood: req.body.isGood,
        }).then(data => {
          console.log('returning');
          res.locals.habit_id = data.id;
          res.locals.isGood = data.isGood;
          return next();
        })
      } else { // Or return it
        res.locals.habit_id = data.id;
        res.locals.isGood = data.isGood;
        return next();
      }
  }).catch(err => {
    return next({
      log: 'error in habitController.create',
      message: { err: err },
    });
  })
};

/**
 * habitController.createUserHabit
 * Purpose: Add a new habit to a user document.
 * Params: user_id (string)
 * Body: habit (string)
 * Locals: new habit object (id)
 */
habitController.createUserHabit = (req, res, next) => {
  let success = true;
  console.log('habitController.createUserHabit');
  // Filter for a user with this id that doesn't have this habit
  const filter = { 
    _id: req.params.user_id,
    habits: { 
      $not: { $elemMatch: { id: res.locals.habit_id } }
    }
  };
  // Create the update condition to push the new habit to the habits array
  const update = { $push: { habits: { 
    title: req.body.habit,
    date: new Date(),
    id: res.locals.habit_id,
    isGood: res.locals.isGood
  }}}
  console.log(req.params.user_id);
  // Find the user and update if they don't already have the habit
  models.User.findOneAndUpdate(filter, update, {new: true})
    .then(data => {
      if(data) res.locals.habit = data.habits[data.habits.length - 1];
      else res.locals.habit = {};
      return next();
    })
    .catch(err => {
      return next({
        log: 'error in habitController.createUserHabit',
        message: { err: err }
      })
    })
};

/**
 * habitController.deleteHabit
 * Purpose: Delete the habit from the user document.
 * Params: user_id (string)
 * Body: habit (string)
 * Locals: deleted (bool)
 */
habitController.deleteUserHabit = (req, res, next) => {
  console.log('in habitController.deleteUserHabit')
  filter = { _id: req.params.user_id };
  update = { $pull: { habits: { title: req.body.habit } } };
  models.User.findOneAndUpdate(filter, update, {new: true})
    .then(data => {
      return next();
    })
    .catch(err => {
      next({
        log: 'error in habitController.deleteUserHabit',
        message: { err: err }
      })
    })
};

module.exports = habitController;
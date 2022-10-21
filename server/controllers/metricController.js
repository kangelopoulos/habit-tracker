const { ModuleFilenameHelpers } = require('webpack');
const models = require('../models/dataModels');

const metricController = {};

/**
 * metricController.getDayForUser
 * Purpose: Get the habit metric doc for a specific date
 * Params: user_id(string), date
 * Body: none
 * Send: the Completed Habits Array
 */
metricController.getHabitMetric = (req, res, next) => {
  const day = new Date(req.params.date);
  day.setUTCHours(0,0,0,0);
  models.HabitMetrics.findOne({
    user_id: req.params.user_id,
    date: day,
  }).then(data => {
    res.locals.habitMetric = data;
    return next();
  }).catch(err => {
    return next({
      log: 'metricController.getHabitMetric',
      message: { err: err }
    });
  });
}

/**
 * metricController.getWeeklyMetrics
 * Purpose: Get habit metrics for a week
 * Params: user_id(string)
 * Body: none
 * Send: the 
 */
metricController.getDateRange = (req, res, next) => {
  const cur = new Date();
  cur.setDate(cur.getDate() - 6);
  cur.setUTCHours(0, 0, 0, 0);
  models.HabitMetrics.find({
    user_id: req.params.user_id,
    date: {
      $gte: cur,
      $lt: new Date(),
    }
  }).then(data => {
    res.locals.weekData = data;
    return next();
  }).catch(err => {
    return next({
      log: 'error in metricController.getDateRange',
      message: { err: err },
    })
  })
}

/**
 * metricController.createHabitMetric
 * Purpose: Create a new habit document for a user on a given day
 * Params: user_id(string)
 * Body: habit (id)
 */
metricController.createHabitMetric = (req, res, next) => {
  if(res.locals.habitMetric) return next();
  const cur = new Date(req.params.date);
  cur.setUTCHours(0, 0, 0, 0);
  models.HabitMetrics.create({
    habitsCompleted: [],
    user_id: req.params.user_id,
    date: cur,
  }).then(data => {
    res.locals.habitMetric = data;
    return next();
  }).catch(err => {
      return next({
        log: 'error in metricController.createHabitMetric',
        message: { err: err },
      })
    })
}

/**
 * metricController.updateUserHabitMetrics 
 * Purpose: update the users completed habits array on a given day
 * Params: user_id (string)
 * Body: updated habit array, day
 */
metricController.updateUserHabitMetrics = (req, res, next) => {
  console.log('in metricController.updateUserHabitMetrics');
  const day = new Date(req.body.date);
  day.setUTCHours(0,0,0,0);
  models.HabitMetrics.findOneAndUpdate({
    user_id: req.params.user_id,
    date: day,
  }, { habitsCompleted: req.body.habits })
    .then(data => {
      return next();
    })
    .catch(err => next({
      log: 'error in metricController.updateUserHabitMetrics',
    }));
}

/**
 * habitController.deleteAllUserHabitMetrics
 * Purpose: Delete all data associated with a specific habit and user.
 * Params: user_id (string)
 * Locals: 
 */
 metricController.deleteAllUserHabitMetrics = (req, res, next) => {
  models.HabitMetrics.deleteMany({
    user_id: req.params.user_id
  }).then(data => {
    return next();
  }).catch(err => next({
    log: 'error in metricController.deleteAllUserHabitMetrics',
    message: { err: err },
  }))
  return(next());
};


module.exports = metricController;
const express = require('express');
const metricController = require('../controllers/metricController');
const router = express.Router();

router.get('/habit/day/:user_id/:date', metricController.getHabitMetric, metricController.createHabitMetric, (req, res, next) => {
  console.log(res.locals.habitMetric);
  return res.status(200).json(res.locals.habitMetric);
})
router.post('/habit/:user_id/:date', metricController.getHabitMetric, metricController.createHabitMetric, (req, res, next) => {
  return res.status(200).json(res.locals.habitMetric);
})

router.get('/habit/week/:user_id', metricController.getDateRange, (req, res, next) =>{
  return res.status(200).json(res.locals.weekData);
})

router.put('/habit/day/:user_id', metricController.updateUserHabitMetrics, (req, res, next) => {
  return res.status(200).json(res.locals.updatedHabits);
})
router.delete('/habit/all/:user_id', metricController.deleteAllUserHabitMetrics, (req, res, next) => {
  return res.sendStatus(204);
})
module.exports = router;
const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://kangelopoulos:220095Ksa@cluster0.2w2gbwg.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'habitData',
});

const Schema = mongoose.Schema;

/**
 * userSchema
 * Purpose: Defines a new user.
 * Stores: username (String), password (String), habits ([Habit])
 * Expires: never
 */
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
  habits: [{
    title: String,
    date: Date,
    id: {
      type: Schema.Types.ObjectId,
      ref: 'habit'
    }
  }]
});
const User = mongoose.model('user', userSchema);

/**
 * habitSchema
 * Purpose: Defines a new habit for a user, differentiated by isGood.
 * Examples: Used Nicotine, Alcohol, Brushed Teeth, Keto Diet
 * Stores: habit_type (String), date_created (Date), isGood (Bool)
 * Expires: never
 */
const habitSchema = new Schema({
  habit_type: {
    type: String,
    required: true,
  },
  isGood: {
    type: Boolean,
    required: true,
  }
});
const Habit = mongoose.model('habit', habitSchema);

/**
 * habitMetricSchema
 * Purpose: Defines the daily true/false record of if a user completed a habit
 * Stores: username (User), date (Date), complete (Bool), habit (Habit)
 * Expires: 1 year
 */
const habitMetricSchema = new Schema({
  habit: {
    type: Schema.Types.ObjectId,
    ref: 'habit',
    required: true,
  },
  username: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  date: {
    type: Date,
    required: true,
    expires: 31536000,
  },
  completed: {
    type: Boolean,
    required: true,
  }
});
const HabitMetric = mongoose.model('habitMetric', habitMetricSchema);


/**
 * intraDayMetricsSchema 
 * Purpose: Defines the daily 1-10 scores of an multi-timepoint (per-day) metric
 * Examples: Mood, Energy Levels
 * Stores: metric_type (String), username (User), date (Date), score ([Number 1-10])
 * Expires: 1 year
 */
const intraDayMetricsSchema = new Schema({
  metric_type: {
    type: String,
    required: true,
  },
  username: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  date: {
    type: Date,
    required: true,
    expires: 31536000,
  },
  score: {
    type: [Number],
    min: 1,
    max: 10,
    validate: {
      validator: Number.isInteger,
      message: `{VALUE} is not an integer value`
    }
  },
});
const IntraDayMetric = mongoose.model('intraDayMetric', intraDayMetricsSchema);

/**
 * dailyMetricSchema
 * Purpose: Defines the daily 1-10 scores of a single-timepoint (per day) metric.
 * Examples: Sleep Quality, Productivity
 * Stores: metric_type (String), username (User), date (Date), score (Number 1-10)
 */
const dailyMetricSchema = new Schema({
  metric_type: {
    type: String,
    required: true,
  },
  username: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  date: {
    type: Date,
    required: true,
    expires: 31536000,
  },
  score: {
    type: Number,
    min: 1,
    max: 10,
    validate: {
      validator: Number.isInteger,
      message: `{VALUE} is not an integer value`
    }
  },
});
const DailyMetric = mongoose.model('dailyMetric', dailyMetricSchema);



module.exports = {
  User,
  IntraDayMetric,
  DailyMetric,
  Habit,
  HabitMetric,
}
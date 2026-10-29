
/** @typedef {Temporal.PlainDateTime} Time */

/**
 * @typedef {Object} AlarmBase
 * @property {boolean} useWeekday
 * @property {boolean} minuteMatch
 * @property {number} minute
 * @property {boolean} hourMatch
 * @property {number} hour
 * @property {number} gp0
 */

/**
 * @typedef {Object} AlarmWeekday
 * @property {true} useWeekday
 * @property {boolean} weekdayMatch
 * @property {Array<boolean>} weekday
 */

/**
 * @typedef {Object} AlarmDate
 * @property {false} useWeekday
 * @property {boolean} dateMatch
 * @property {number} date
 * @property {number} gp1
 */

/** @typedef {(AlarmDate & AlarmBase) | (AlarmWeekday & AlarmBase)} Alarm */

/**
 * @typedef {number} Offset
 */

/**
 * @typedef {Object} Timer
 * @property {number} timer
 * @property {number} gp2_5
 */


/**
 * @typedef {Object} Control
 * @property {boolean} enableInterruptPeriodicTimeUpdate
 * @property {boolean} enableInterruptPeriodicCountdownEvent
 * @property {boolean} enableInterruptAlarm
 * @property {boolean} enableInterruptExternalEvent
 * @property {boolean} reset
 */

/**
 * @typedef {'32kHz'|'1024Hz'|'1Hz'|'32kHz (alt)'} ClockOutputFrequency
 */

/**
 * @typedef {'4096Hz'|'64Hz'|'1Hz'|'1/60Hz'} PeriodicClockFrequency
 */

/** @typedef {'weekday'|'date'} AlarmSelect */

/** @typedef {'second'|'minute'} UpdateSelect */

/**
 * @typedef {Object} Extension
 * @property {boolean} test
 * @property {AlarmSelect} alarmSelect
 * @property {UpdateSelect} periodicUpdateSelect
 * @property {boolean} enablePeriodicTimer
 * @property {ClockOutputFrequency} outputFrequency
 * @property {PeriodicClockFrequency} periodicCountdownFrequency
 */

/**
 * @typedef {Object} Flags
 * @property {boolean} periodicTimeUpdate
 * @property {boolean} periodicCountdownTimer
 * @property {boolean} alarm
 * @property {boolean} externalEvent
 * @property {boolean} dataLoss
 * @property {boolean} temperatureCompensation
 */

/** @typedef {Partial<Flags>} ClearFlags */

/** @typedef {'None'|'3.9ms'|'15.6ms'|'125ms'} EventFilteringTime */

/** @typedef {'high'|'low'} EventEdge */

/**
 * @typedef {Object} EventControl
 * @property {boolean} enableCapture
 * @property {EventEdge} edge
 * @property {EventFilteringTime} filteringTime
 * @property {boolean} enableReset
 */

/**
 * @typedef {Temporal.Duration} Capture
 */


export {}
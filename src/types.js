
/** @typedef {Temporal.PlainDateTime} Time */

/**
 * @typedef {Object} AlarmBase
 * @property {boolean} minuteMatch
 * @property {number} minute
 * @property {boolean} hourMatch
 * @property {number} hour
 * @property {number} gp0
 */

/**
 * @typedef {Object} AlarmWeekday
 * @property {boolean} weekdayMatch
 * @property {Array<boolean>} weekday
 * @property {number|undefined} gp1
 */

/**
 * @typedef {Object} AlarmDate
 * @property {boolean} dateMatch
 * @property {number} date
 */

/** @typedef {AlarmBase & (AlarmDate | AlarmWeekday)} Alarm */

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
 * @typedef {number} ClockOutputFrequency
 */

/**
 * @typedef {number} PeriodicClockFrequency
 */

/**
 * @typedef {Object} Extension
 * @property {boolean} test
 * @property {'weekday'|'date'} alarmSelect
 * @property {'second'|'minute'} periodicUpdateSelect
 * @property {boolean} enablePeriodicTimer
 * @property {ClockOutputFrequency} outputFrequency
 * @property {PeriodicClockFrequency} periodicCountdownFrequency
 *
 *
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

/** @typedef {number} EventFilteringTime */

/**
 * @typedef {Object} EventControl
 * @property {boolean} enableCapture
 * @property {'high'|'low'} edge
 * @property {EventFilteringTime} filteringTime
 * @property {boolean} enableReset
 */

/**
 * @typedef {Temporal.Duration} Capture
 */


export {}
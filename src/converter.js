
/** biome-ignore-all lint/style/noExcessiveLinesPerFile: does it all */
import { BitSmush } from '@johntalton/bitsmush'
import {
	ALARM_BLOCK,
	CAPTURE_BLOCK,
	HIGH_RES_TIME_BLOCK,
	TIME_BLOCK,
	TIMER_BLOCK,
} from './defs.js'

/** @import { I2CBufferSource } from '@johntalton/and-other-delights' */
/** @import { Time, Alarm, Offset, Timer, Control, Extension, UpdateSelect, AlarmSelect, Flags, ClearFlags, EventControl, EventEdge, Capture } from './types.js' */
/** @import { SmushMap } from '@johntalton/bitsmush' */

export const HUNDREDTHS_PER_MILLISECOND = 10

export const MAX_4_BIT_TIMER_GP = 0x0F

export const MAX_BCD_8 = 150 + 15

//
export const ALARM_WEEKDAY_MASK = 0b0111_1111
export const ALARM_DATE_MASK = 0b0011_1111

export const ALARM_HOUR_GP0_MASK = 0b0100_0000
export const ALARM_WEEKDAY_OR_DATE_GP1_MASK = 0b0100_0000

//
export const OFFSET_BIT_WIDTH = 6

//
export const TIMER_COUNTER_0_LOWER_MASK = 0xFF
export const TIMER_COUNTER_1_UPPER_MASK = 0x0F
export const TIMER_COUNTER_1_GP_MASK = 0xF0

//
/** @type {SmushMap} */
export const CONTROL_SMUSH_MAP = [ [ 5,1 ], [ 4,1 ], [ 3,1 ], [ 2,1 ], [ 0,1]]

//
/** @type {SmushMap} */
export const EXTENSION_SMUSH_MAP = [ [ 7,1 ], [ 6,1 ], [ 5,1 ], [ 4,1 ], [ 3,2 ], [ 1,2 ] ]
export const EXTENSION_PT_SELECT_SECOND = 'second'
export const EXTENSION_PT_SELECT_MINUTE = 'minute'

/** @type {Map<UpdateSelect, number>} */
export const EXTENSION_PERIODIC_TIMER_SELECT_N2V = new Map([
	[ EXTENSION_PT_SELECT_SECOND, 0 ],
	[ EXTENSION_PT_SELECT_MINUTE, 1 ]
])
export const EXTENSION_PERIODIC_TIMER_SELECT_V2N = new Map(Array.from(EXTENSION_PERIODIC_TIMER_SELECT_N2V, ([key, value]) => [value, key]))

export const EXTENSION_ALARM_SELECT_WEEKDAY = 'weekday'
export const EXTENSION_ALARM_SELECT_DATE = 'date'
/** @type {Map<AlarmSelect, number>} */
export const EXTENSION_ALARM_SELECT_N2V = new Map([
	[ EXTENSION_ALARM_SELECT_WEEKDAY, 0 ],
	[ EXTENSION_ALARM_SELECT_DATE, 1 ]
])
export const EXTENSION_ALARM_SELECT_V2N = new Map(Array.from(EXTENSION_ALARM_SELECT_N2V, ([key, value]) => [value, key]))

//
/** @type {SmushMap} */
export const FLAGS_SMUSH_MAP = [ [ 5,1 ], [ 4,1 ], [ 3,1 ], [ 2,1 ], [ 1,1 ], [ 0,1 ] ]

//
/** @type {SmushMap} */
export const EVENT_CONTROL_SMUSH_MAP = [ [ 7,1 ], [ 6,1 ], [ 5,2 ], [ 0,1 ] ]
export const EVENT_CONTROL_EDGE_LOW = 'low'
export const EVENT_CONTROL_EDGE_HIGH = 'high'

/** @type {Map<EventEdge, number>} */
export const EVENT_CONTROL_EDGE_N2V = new Map([
	[ EVENT_CONTROL_EDGE_LOW, 0 ],
	[ EVENT_CONTROL_EDGE_HIGH, 1 ]
])
/** @type {Map<number, EventEdge>} */
export const EVENT_CONTROL_EDGE_V2N = new Map(Array.from(EVENT_CONTROL_EDGE_N2V, ([key, value]) => [value, key]))


/**
 * @param {number} bcd
 * @returns {number}
 */
export function decodeBCD(bcd) {
	const tens = bcd >> 4
	const units = bcd & 0xF
	return tens * 10 + units
}

/**
 * @param {number} value
 * @returns {number}
 */
export function encodeBCD(value) {
	if(value < 0) { throw new RangeError('value must be positive') }
	if(value > MAX_BCD_8) { throw new RangeError('exceeds max value') }
	const tens = Math.floor(value / 10)
	const units = value - (tens * 10)
	return (tens << 4) | units
}

/**
 * @param {number} oneHot
 * @returns {number}
 */
export function decodeOneHot(oneHot) {
	if(oneHot === 0) { throw new Error('one-hot zero invalid') }
	const single = oneHot > 0 && (oneHot & (oneHot - 1)) === 0
	if(!single) { throw new Error('not one-hot value') }
	return Math.log2(oneHot) + 1
}

/**
 * @param {number} value
 * @returns {number}
 */
export function encodeOneHot(value) {
	if(value === 0) { throw new Error('one-hot zero invalid') }
	return 1 << (value - 1)
}


/**
 * @param {number} oneHot
 * @param {number} index
 * @returns {boolean}
 */
export function isOneHotSet(oneHot, index) {
	const mask = encodeOneHot(index)
	return (oneHot & mask) === mask
}

/**
 * @param {number} value
 * @param {number} bitWidth
 */
export function decodeTwos(value, bitWidth) {
	const mask = (1 << bitWidth) - 1
	const maxUnsigned = 1 << bitWidth
  const maxSigned = maxUnsigned >> 1
	const val = value & mask
  return val >= maxSigned ? val - maxUnsigned : val
}

/**
 * @param {number} value
 * @param {number} bitWidth
 */
export function encodeTwos(value, bitWidth) {
	// const mask = (1 << bitWidth) - 1
	const maxUnsigned = 1 << bitWidth
	return value < 0 ? value + maxUnsigned : value
}

export class Converter {
	/**
	 * @param {I2CBufferSource} buffer
	 * @param {number} baseYear
	 * @returns {Time}
	 */
	static decodeTimeHighRes(buffer, baseYear) {
		const u8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset) :
			new Uint8Array(buffer)

		if(u8.byteLength < HIGH_RES_TIME_BLOCK.length) { throw new RangeError('invalid buffer length') }

		const [
			hundredth, second, minute, hour,
			weekday, date, month, year
		] = u8

		if(hundredth === undefined) { throw new Error('undefined time value') }
		if(second === undefined) { throw new Error('undefined time value') }
		if(minute === undefined) { throw new Error('undefined time value') }
		if(hour === undefined) { throw new Error('undefined time value') }
		if(weekday === undefined) { throw new Error('undefined time value') }
		if(date === undefined) { throw new Error('undefined time value') }
		if(month === undefined) { throw new Error('undefined time value') }
		if(year === undefined) { throw new Error('undefined time value') }

		const millisecond = decodeBCD(hundredth) * HUNDREDTHS_PER_MILLISECOND

		return Temporal.PlainDateTime.from({
			year: baseYear + decodeBCD(year),
			month: decodeBCD(month),
			day: decodeBCD(date),
			dayOfWeek: decodeOneHot(weekday),
			hour: decodeBCD(hour),
			minute: decodeBCD(minute),
			second: decodeBCD(second),
			millisecond
		})
	}

	/**
	 * @param {I2CBufferSource} buffer
	 * @param {number} baseYear
	 * @returns {Time}
	 */
	static decodeTime(buffer, baseYear) {
		const u8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset) :
			new Uint8Array(buffer)

		if(u8.byteLength < TIME_BLOCK.length) { throw new RangeError('invalid buffer length') }

		const [
			second, minute, hour,
			weekday, date, month, year
		] = u8

		if(second === undefined) { throw new Error('undefined time value') }
		if(minute === undefined) { throw new Error('undefined time value') }
		if(hour === undefined) { throw new Error('undefined time value') }
		if(weekday === undefined) { throw new Error('undefined time value') }
		if(date === undefined) { throw new Error('undefined time value') }
		if(month === undefined) { throw new Error('undefined time value') }
		if(year === undefined) { throw new Error('undefined time value') }

		return Temporal.PlainDateTime.from({
			year: baseYear + decodeBCD(year),
			month: decodeBCD(month),
			day: decodeBCD(date),
			dayOfWeek: decodeOneHot(weekday),
			hour: decodeBCD(hour),
			minute: decodeBCD(minute),
			second: decodeBCD(second)
		})
	}

	/**
	 * @param {Time} time
	 * @param {number} baseYear
	 * @returns {I2CBufferSource}
	 */
	static encodeTime(time, baseYear) {
		// todo sanity check that baseYear and time.year are sain?

		return Uint8Array.from([
			encodeBCD(time.second),
			encodeBCD(time.minute),
			encodeBCD(time.hour),
			encodeOneHot(time.dayOfWeek),
			encodeBCD(time.day),
			encodeBCD(time.month),
			encodeBCD(time.year - baseYear)
		])
	}

	/**
	 * @param {I2CBufferSource} buffer
	 * @param {boolean} useWeekday
	 * @returns {Alarm}
	 */
	static decodeAlarm(buffer, useWeekday) {
		const u8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset) :
			new Uint8Array(buffer)

		if(u8.byteLength < ALARM_BLOCK.length) { throw new RangeError('invalid buffer length') }

		const [ minuteAlarm, hourAlarm, weekdayOrDateAlarm ] = u8

		if(minuteAlarm === undefined) { throw new Error('undefined byte') }
		if(hourAlarm === undefined) { throw new Error('undefined byte') }
		if(weekdayOrDateAlarm === undefined) { throw new Error('undefined byte') }

		const minuteMatch = BitSmush.extractBits(minuteAlarm, 7, 1) === 1
		const minute = decodeBCD(BitSmush.extractBits(minuteAlarm, 6, 7))

		const hourMatch = BitSmush.extractBits(hourAlarm, 7, 1) === 1
		const hour = decodeBCD(BitSmush.extractBits(hourAlarm, 5, 6))

		const weekdayOrDateMatch = BitSmush.extractBits(weekdayOrDateAlarm, 7, 1) === 1
		const weekdayMatch = weekdayOrDateMatch
		const dateMatch = weekdayOrDateMatch

		const weekdayMask = weekdayOrDateAlarm & ALARM_WEEKDAY_MASK
		const date = decodeBCD(weekdayOrDateAlarm & ALARM_DATE_MASK)

		const gp0 = BitSmush.extractBits(hourAlarm, 6, 1)
		const gp1 = useWeekday ? (weekdayOrDateAlarm & ALARM_WEEKDAY_OR_DATE_GP1_MASK) : undefined

		const weekday = [
			false, false, false, false, false, false, false
		].map((_, index) => isOneHotSet(weekdayMask, index + 1))

		return {
			useWeekday,

			minuteMatch, minute,
			hourMatch, hour,
			gp0,

			//
			weekdayMatch, weekday,

			//
			dateMatch, date,
			gp1
		}
	}

	/**
	 * @param {Alarm} alarm
	 * @returns {I2CBufferSource}
	 */
	static encodeAlarm(alarm) {
		// todo





		return Uint8Array.from([ 0,0,0 ])
	}

	/**
	 * @param {I2CBufferSource} buffer
	 * @returns {Offset}
	 */
	static decodeOffset(buffer) {
		const u8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset) :
			new Uint8Array(buffer)

		const [ value ] = u8
		if(value === undefined) { throw new Error('undefined value') }

		// todo units 1/(32768*128) = 0.2384 ppm
		return decodeTwos(value, OFFSET_BIT_WIDTH)
	}

	/**
	 * @param {Offset} offset
	 * @returns {I2CBufferSource}
	 */
	static encodeOffset(offset) {
		// todo units 1/(32768*128) = 0.2384 ppm
		if(offset < -32) { throw new RangeError('offset out of bounds') }
		if(offset > 31) { throw new RangeError('offset out of bounds') }
		return Uint8Array.from([ encodeTwos(offset, OFFSET_BIT_WIDTH) ])
	}

	/**
	 * @param {I2CBufferSource} buffer
	 * @returns {number}
	 */
	static decodeRAM(buffer) {
		const u8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset) :
			new Uint8Array(buffer)

		const [ value ] = u8
		if(value === undefined) { throw new Error('undefined value') }

		return value
	}

	/**
	 * @param {number} value
	 * @returns {I2CBufferSource}
	 */
	static encodeRAM(value) {
		if(value < 0) { throw new RangeError('ram overflow') }
		if(value > 0xFF) { throw new RangeError('ram overflow') }
		return Uint8Array.from([ value ])
	}

	/**
	 * @param {I2CBufferSource} buffer
	 * @returns {Timer}
	 */
	static decodeTimer(buffer) {
		const u8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset) :
			new Uint8Array(buffer)

		if(u8.byteLength < TIMER_BLOCK.length) { throw new RangeError('invalid buffer length') }

		const [ tc0, tc1 ] = u8

		if(tc0 === undefined) { throw new Error('undefined value') }
		if(tc1 === undefined) { throw new Error('undefined value') }

		const lower = tc0 & TIMER_COUNTER_0_LOWER_MASK
		const upper = tc1 & TIMER_COUNTER_1_UPPER_MASK
		const timer = (upper << 8) | lower

		const gp2_5 = (tc1 & TIMER_COUNTER_1_GP_MASK) >> 4

		return {
			timer, gp2_5
		}

	}

	/**
	 * @param {Timer} timer
	 * @returns {I2CBufferSource}
	 */
	static encodeTimer(timer) {
		if(timer.gp2_5 > MAX_4_BIT_TIMER_GP) { throw new RangeError('gpio out of bounds') }

		const upper = (timer.timer >> 8) & TIMER_COUNTER_1_UPPER_MASK
		const lower = timer.timer & TIMER_COUNTER_0_LOWER_MASK

		const tc0 = lower
		const tc1 = upper | ((timer.gp2_5 << 4) & TIMER_COUNTER_1_GP_MASK)

		return Uint8Array.from([ tc0, tc1 ])
	}

	/**
	 * @param {I2CBufferSource} buffer
	 * @returns {Control}
	 */
	static decodeControl(buffer) {
		const u8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset) :
			new Uint8Array(buffer)

		const [ value ] = u8
		if(value === undefined) { throw new Error('undefined value') }

		const [
			uie, tie, aie, eie, reset
		] = BitSmush.unSmushBits(CONTROL_SMUSH_MAP, value)

		return {
			enableInterruptPeriodicTimeUpdate: uie === 1,
			enableInterruptPeriodicCountdownEvent: tie === 1,
			enableInterruptAlarm: aie === 1,
			enableInterruptExternalEvent: eie === 1,
			reset: reset === 1
		}
	}

	/**
	 * @param {Control} control
	 * @returns {I2CBufferSource}
	 */
	static encodeControl(control) {
		const uie = control.enableInterruptPeriodicTimeUpdate ? 1 : 0
		const tie = control.enableInterruptPeriodicCountdownEvent ? 1 : 0
		const aie = control.enableInterruptAlarm ? 1 : 0
		const eie = control.enableInterruptExternalEvent ? 1 : 0
		const reset = control.reset ? 1 : 0

		const value = BitSmush.smushBits(CONTROL_SMUSH_MAP, [ uie, tie, aie, eie, reset ])

		return Uint8Array.from([ value ])

	}

	/**
	 * @param {I2CBufferSource} buffer
	 * @returns {Extension}
	 */
	static decodeExtension(buffer) {
		const u8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset) :
			new Uint8Array(buffer)

		const [ value ] = u8
		if(value === undefined) { throw new Error('undefined value') }

		const [
			test, wada, usel, te, fd, td
		] = BitSmush.unSmushBits(EXTENSION_SMUSH_MAP, value)

		const alarmSelect = EXTENSION_ALARM_SELECT_V2N.get(wada)
		const periodicUpdateSelect = EXTENSION_PERIODIC_TIMER_SELECT_V2N.get(usel)

		if(alarmSelect === undefined) { throw new Error('unknown alarm select value') }
		if(periodicUpdateSelect === undefined) { throw new Error('unknown update select value') }

		return {
			test: test === 1,
			alarmSelect,
			periodicUpdateSelect,
			enablePeriodicTimer: te === 1,
			outputFrequency: fd,
			periodicCountdownFrequency: td
		}
	}

	/**
	 * @param {Extension} extension
	 * @returns {I2CBufferSource}
	 */
	static encodeExtension(extension) {
		const test = extension.test ? 1 : 0
		const wada = EXTENSION_ALARM_SELECT_N2V.get(extension.alarmSelect)
		const usel = EXTENSION_PERIODIC_TIMER_SELECT_N2V.get(extension.periodicUpdateSelect)
		const te = extension.enablePeriodicTimer ? 1 : 0
		const fd = extension.outputFrequency
		const td = extension.periodicCountdownFrequency

		if(wada === undefined) { throw new Error('unknown alarm select name') }
		if(usel === undefined) { throw new Error('unknown update select name') }

		const value = BitSmush.smushBits(EXTENSION_SMUSH_MAP, [ test, wada, usel, te, fd, td ])

		return Uint8Array.from([ value ])
	}

	/**
	 * @param {I2CBufferSource} buffer
	 * @returns {Flags}
	 */
	static decodeFlags(buffer) {
		const u8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset) :
			new Uint8Array(buffer)

		const [ value ] = u8
		if(value === undefined) { throw new Error('undefined value') }

		const [
			uf, tf, af, evf, v2f, v1f
		] = BitSmush.unSmushBits(FLAGS_SMUSH_MAP, value)

		return {
			periodicTimeUpdate: uf === 1,
			periodicCountdownTimer: tf === 1,
			alarm: af === 1,
			externalEvent: evf === 1,
			dataLoss: v2f === 1,
			temperatureCompensation: v1f === 1
		}
	}

	/**
	 * @param {ClearFlags} flags
	 * @returns {I2CBufferSource}
	 */
	static encodeFlags(flags) {
		const CLEAR = 0
		const PRESERVE = 1

		const uf = flags.periodicCountdownTimer === true ? CLEAR : PRESERVE
		const tf = flags.periodicTimeUpdate === true ? CLEAR : PRESERVE
		const af = flags.alarm === true ? CLEAR : PRESERVE
		const evf = flags.externalEvent === true ? CLEAR : PRESERVE
		const v2f = flags.dataLoss === true ? CLEAR : PRESERVE
		const v1f = flags.temperatureCompensation === true ? CLEAR : PRESERVE

		const value = BitSmush.smushBits(FLAGS_SMUSH_MAP, [ uf, tf, af, evf, v2f, v1f ])
		return Uint8Array.from([ value ])
	}

	/**
	 * @param {I2CBufferSource} buffer
	 * @returns {EventControl}
	 */
	static decodeEventControl(buffer) {
		const u8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset) :
			new Uint8Array(buffer)

		const [ value ] = u8
		if(value === undefined) { throw new Error('undefined value') }

		const [ ecp, ehl, et, erst ] = BitSmush.unSmushBits(EVENT_CONTROL_SMUSH_MAP, value)

		if(ecp === undefined) { throw new Error('undefined value') }
		if(ehl === undefined) { throw new Error('undefined value') }
		if(et === undefined) { throw new Error('undefined value') }
		if(erst === undefined) { throw new Error('undefined value') }

		const enableCapture = ecp === 1
		const edge = EVENT_CONTROL_EDGE_V2N.get(ehl)
		const filteringTime = et
		const enableReset = erst === 1

		if(edge === undefined) { throw new Error('unknown edge value') }

		return {
			enableCapture,
			edge,
			filteringTime,
			enableReset
		}
	}

	/**
	 * @param {EventControl} eventControl
	 * @returns {I2CBufferSource}
	 */
	static encodeEventControl(eventControl) {
		const ecp = eventControl.enableCapture ? 1 : 0
		const ehl = EVENT_CONTROL_EDGE_N2V.get(eventControl.edge)
		const et = eventControl.filteringTime
		const erst = eventControl.enableReset ? 1 : 0

		if(ehl === undefined) { throw new Error('unknown edge name') }

		const value = BitSmush.smushBits(EVENT_CONTROL_SMUSH_MAP, [ ecp, ehl, et, erst ])
		return Uint8Array.from([ value ])
	}

	/**
	 * @param {I2CBufferSource} buffer
	 * @returns {Capture}
	 */
	static decodeCapture(buffer) {
		const u8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset) :
			new Uint8Array(buffer)

		if(u8.byteLength < CAPTURE_BLOCK.length) { throw new RangeError('invalid buffer length') }

		const [ hundredth, seconds ] = u8

		if(hundredth === undefined) { throw new Error('undefined value') }
		if(seconds === undefined) { throw new Error('undefined value') }

		const milliseconds = decodeBCD(hundredth) * HUNDREDTHS_PER_MILLISECOND

		// not balanced let caller decide (and peek original values)
		return Temporal.Duration.from({
			seconds: decodeBCD(seconds),
			milliseconds
		})
	}
}

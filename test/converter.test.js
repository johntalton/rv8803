import { describe, it } from 'node:test'
import * as Assert from 'node:assert/strict'

import {
	Converter,
	decodeBCD,
	encodeBCD,
	encodeOneHot,
	decodeOneHot,
	encodeTwos,
	decodeTwos
} from '@johntalton/rv8803'

describe('decodeBCD', () => {
	it('should handled undefined', () => {
		const result = decodeBCD(undefined)
		Assert.equal(result, 0)
	})

	it('should handle zero', () => {
		const result = decodeBCD(0)
		Assert.equal(result, 0)
	})
})

describe('encodeBCD', () => {
	it('should handle zero', () => {
		const result = encodeBCD(0)
		Assert.equal(result, 0)
	})

	it('should handle unique value', () => {
		const result = encodeBCD(100)
		Assert.equal(result, 0b1010_0000)
	})

	it('should handle unique value alt', () => {
		const result = encodeBCD(151)
		Assert.equal(result, 0b1111_0001)
	})

	it('should handle overflow', () => {
		Assert.throws(() => encodeBCD(200), {
			message: 'exceeds max value'
		})
	})
})

describe('decodeOneHot', () => {
	it('should handle zero', () => {
		Assert.throws(() => decodeOneHot(0), {
			message: 'one-hot zero invalid',
			name: 'Error'
		})
	})

	it('should handle first', () => {
		const result = decodeOneHot(0b0000_0001)
		Assert.equal(result, 1)
	})

	it('should handle second', () => {
		const result = decodeOneHot(0b0000_0010)
		Assert.equal(result, 2)
	})

	it('should handle eighth', () => {
		const result = decodeOneHot(0b1000_0000)
		Assert.equal(result, 8)
	})
})

describe('encodeOneHot', () => {
	it('should handle zero', () => {
		Assert.throws(() => encodeOneHot(0), {
			message: 'one-hot zero invalid',
			name: 'Error'
		})
	})
})

describe('decodeTwos', () => {
	it('should handle 31', () => {
		const result = decodeTwos(0b0001_1111, 6)
		Assert.equal(result, 31)
	})

	it('should handle 30', () => {
		const result = decodeTwos(0b0001_1110, 6)
		Assert.equal(result, 30)
	})

	it('should handle 1', () => {
		const result = decodeTwos(0b0000_0001, 6)
		Assert.equal(result, 1)
	})

	it('should handle zero', () => {
		const result = decodeTwos(0b0000_0000, 6)
		Assert.equal(result, 0)
	})

	it('should handle -1', () => {
		const result = decodeTwos(0b0011_1111, 6)
		Assert.equal(result, -1)
	})

	it('should handle -2', () => {
		const result = decodeTwos(0b0011_1110, 6)
		Assert.equal(result, -2)
	})

	it('should handle -31', () => {
		const result = decodeTwos(0b0010_0001, 6)
		Assert.equal(result, -31)
	})

	it('should handle -32', () => {
		const result = decodeTwos(0b0010_0000, 6)
		Assert.equal(result, -32)
	})

	it('should handle -31 (sign extended)', () => {
		const result = decodeTwos(0b1110_0001, 6)
		Assert.equal(result, -31)
	})
})

describe('encodeTwos', () => {
	it('should handle zero', () => {
		const result = encodeTwos(0, 6)
		Assert.equal(result, 0)
	})
})

describe('Converter', () => {
	describe('decodeTimeHighRes', () => {
		it('should handle undefined', () => {
			Assert.throws(() => Converter.decodeTimeHighRes(undefined, 0), {
				message: 'invalid buffer length',
				name: 'RangeError'
			})
		})

		it('should handle zero', () => {
			const buffer = Uint8Array.from([ 0, 0, 0, 0, 0, 0, 0, 0 ])
			Assert.throws(() => Converter.decodeTimeHighRes(buffer, 0), {
				message: 'one-hot zero invalid',
				name: 'Error'
			})
		})

		it('should handle mostly zero', () => {
			const buffer = Uint8Array.from([ 0, 0, 0, 0, 0b0000_0001, 0, 0, 0 ])
			Assert.throws(() => Converter.decodeTimeHighRes(buffer, 0), {
				message: 'Temporal error: Expected positive integer.',
				name: 'RangeError'
			})
		})

		it('should handle epoch', () => {
			const buffer = Uint8Array.from([ 0, 0, 0, 0, 0b0000_0001, 1, 1, 0 ])
			const result = Converter.decodeTimeHighRes(buffer, 1970)
			Assert.equal(result.toJSON(), '1970-01-01T00:00:00')
		})

		it('should handle Apollo 11 Lunar Module Lands', () => {
			// July 20, 1969
			// 4:17 PM (EDT)
			// Sunday
			const buffer = Uint8Array.from([
				encodeBCD(5), // hundredths of seconds
				encodeBCD(1),
				encodeBCD(17),
				encodeBCD(16),
				0b0100_0000,
				encodeBCD(20),
				encodeBCD(7),
				encodeBCD(69)
			])
			const result = Converter.decodeTimeHighRes(buffer, 1900)
			Assert.equal(
				result.toLocaleString('en-US', {
					dateStyle: 'full',
					timeStyle: 'full',
				}),
				'Sunday, July 20, 1969 at 4:17:01 PM'
			)

			Assert.equal(
				result.toLocaleString('en-US', {
					hour: 'numeric',
					minute: '2-digit',
					second: '2-digit',
					fractionalSecondDigits: 3
				}),
				'4:17:01.050 PM'
			)
		})
	})

	describe('decodeTime', () => {
		it('should handle undefined', () => {
			Assert.throws(() => Converter.decodeTime(undefined, 0), {
				message: 'invalid buffer length',
				name: 'RangeError'
			})
		})

		it('should handle zero', () => {
			const buffer = Uint8Array.from([ 0, 0, 0, 0, 0, 0, 0 ])
			Assert.throws(() => Converter.decodeTime(buffer, 0), {
				message: 'one-hot zero invalid',
				name: 'Error'
			})
		})

		it('should handle mostly zero', () => {
			const buffer = Uint8Array.from([ 0, 0, 0, 0b0000_0001, 0, 0, 0 ])
			Assert.throws(() => Converter.decodeTime(buffer, 0), {
				message: 'Temporal error: Expected positive integer.',
				name: 'RangeError'
			})
		})

		it('should handle epoch', () => {
			const buffer = Uint8Array.from([ 0, 0, 0, 0b0000_0001, 1, 1, 0 ])
			const result = Converter.decodeTime(buffer, 1970)
			Assert.equal(result.toJSON(), '1970-01-01T00:00:00')
		})

		it('should handle Apollo 11 Lunar Module Lands', () => {
			// July 20, 1969
			// 4:17 PM (EDT)
			// Sunday
			const buffer = Uint8Array.from([
				0,
				encodeBCD(17),
				encodeBCD(16),
				0b0100_0000,
				encodeBCD(20),
				encodeBCD(7),
				encodeBCD(69)
			])
			const result = Converter.decodeTime(buffer, 1900)
			Assert.equal(
				result.toLocaleString('en-US', {
					dateStyle: 'full',
					timeStyle: 'full'
				}),
				'Sunday, July 20, 1969 at 4:17:00 PM')
		})
	})

	describe('encodeTime', () => {
		it('should handle zero', () => {
			const result = Converter.encodeTime(Temporal.PlainDateTime.from('1969-07-20T16:17'), 1900)
			Assert.deepEqual(result, Uint8Array.from([
				encodeBCD(0),
				encodeBCD(17),
				encodeBCD(16),
				0b0100_0000,
				encodeBCD(20),
				encodeBCD(7),
				encodeBCD(69)
			]))
		})
	})

	describe('decodeAlarm', () => {
		it('should handle invalid buffer length', () => {
			Assert.throws(() => Converter.decodeAlarm(Uint8Array.from([ 0 ]), true), {
				message: 'invalid buffer length',
				name: 'RangeError'
			})
		})

		it('should handle zero', () => {
			const buffer = Uint8Array.from([
				0, 0, 0
			])
			const result = Converter.decodeAlarm(buffer, true)
			Assert.deepEqual(result, {
				useWeekday: true,

				minuteMatch: false, minute: 0,
				hourMatch: false, hour: 0,
				gp0: 0,

				weekdayMatch: false, weekday: [ false, false, false, false, false, false, false ],

				dateMatch: false, date: 0,
				gp1: 0
			})
		})

		it('should handle weekday 1 and 6', () => {
			const buffer = Uint8Array.from([
				0, 0, 0b1010_0001
			])
			const result = Converter.decodeAlarm(buffer, true)
			Assert.deepEqual(result, {
				useWeekday: true,

				minuteMatch: false, minute: 0,
				hourMatch: false, hour: 0,
				gp0: 0,

				weekdayMatch: true, weekday: [ true, false, false, false, false, true, false ],

				dateMatch: true, date: 21,
				gp1: 0
			})
		})

		it('should handle date 21, gp0:1', () => {
			const buffer = Uint8Array.from([
				0b0000_0010, 0b0100_0000, 0b1100_0000 | encodeBCD(21)
			])
			const result = Converter.decodeAlarm(buffer, false)
			Assert.deepEqual(result, {
				useWeekday: false,

				minuteMatch: false, minute: 2,
				hourMatch: false, hour: 0,
				gp0: 1,

				weekdayMatch: true, weekday: [ true, false, false, false, false, true, true ],

				dateMatch: true, date: 21,
				gp1: undefined
			})
		})
	})

	describe('encodeAlarm', () => {
		it('should handle default (weekday)', () => {
			const result = Converter.encodeAlarm({
				useWeekday: true,

				minuteMatch: false, minute: 0,
				hourMatch: false, hour: 0,
				gp0: 0,

				weekdayMatch: false, weekday: [],
				gp1: 0
			})
			Assert.deepEqual(result, Uint8Array.from([ 0, 0, 0 ]))
		})

		it('should handle default (date)', () => {
			const result = Converter.encodeAlarm({
				useWeekday: false,

				minuteMatch: false, minute: 0,
				hourMatch: false, hour: 0,
				gp0: 0,

				dateMatch: false, date: 0
			})
			Assert.deepEqual(result, Uint8Array.from([ 0, 0, 0 ]))
		})
	})

	describe('decodeOffset', () => {
		it('should handle zero', () => {
			const buffer = Int8Array.from([ 0 ])
			const result = Converter.decodeOffset(buffer)
			Assert.equal(result, 0)
		})

		it('should handle -31 (from sign extend)', () => {
			const buffer = Int8Array.from([ -31 ])
			const result = Converter.decodeOffset(buffer)
			Assert.equal(result, -31)
		})

		it('should handle 1 (with out of range bits)', () => {
			const buffer = Uint8Array.from([ 0b1100_0001 ])
			const result = Converter.decodeOffset(buffer)
			Assert.equal(result, 1)
		})
	})

	describe('encodeOffset', () => {
		it('should handle zero', () => {
			const result = Converter.encodeOffset(0)
			Assert.deepEqual(result, Uint8Array.from([ 0 ]))
		})

		it('should handle -20', () => {
			const result = Converter.encodeOffset(-20)
			Assert.deepEqual(result, Uint8Array.from([ 0b0010_1100 ]))
		})

		it('should handle -64 (out of bounds)', () => {
			Assert.throws(() => Converter.encodeOffset(-64), {
				message: 'offset out of bounds',
				name: 'RangeError'
			})
		})
	})

	describe('decodeRAM', () => {
		it('should handle value', () => {
			const buffer = Uint8Array.from([ 42 ])
			const result = Converter.decodeRAM(buffer)
			Assert.equal(result, 42)
		})
	})

	describe('encodeRAM', () => {
		it('should handle out of range', () => {
			Assert.throws(() => Converter.encodeRAM(1977), {
				message: 'ram overflow',
				name: 'RangeError'
			})
		})

		it('should handle value', () => {
			const result = Converter.encodeRAM(42)
			Assert.deepEqual(result, Uint8Array.from([ 42 ]))
		})
	})

	describe('decodeTimer', () => {
		it('should handle invalid buffer length', () => {
			const buffer = Uint8Array.from([ 0 ])
			Assert.throws(() => Converter.decodeTimer(buffer), {
				message: 'invalid buffer length',
				name: 'RangeError'
			})
		})

		it('should handle zero', () => {
			const buffer = Uint8Array.from([ 0, 0 ])
			const result = Converter.decodeTimer(buffer)
			Assert.deepEqual(result, {
				timer: 0,
				gp2_5: 0
			})
		})

		it('should handle value', () => {
			const buffer = Uint8Array.from([ 0b0011_0001, 0b1111_0100 ])
			const result = Converter.decodeTimer(buffer)
			Assert.deepEqual(result, {
				timer: 0b0100_0011_0001,
				gp2_5: 0b1111
			})
		})
	})

	describe('encodeTimer', () => {
		it('should handle basics', () => {
			const result = Converter.encodeTimer({
				timer: 0,
				gp2_5: 0
			})
			Assert.deepEqual(result, Uint8Array.from([ 0, 0 ]))
		})

		it('should handle 4-bit gpio', () => {
			const result = Converter.encodeTimer({
				timer: 0,
				gp2_5: 0b1111
			})
			Assert.deepEqual(result, Uint8Array.from([ 0, 0b1111_0000 ]))
		})

		it('should handle truncated 4-bit', () => {
			Assert.throws(() => Converter.encodeTimer({
				timer: 0,
				gp2_5: 0b0001_0001
			}), {
				message: 'gpio out of bounds',
				name: 'RangeError'
			})
		})

		it('should handle random values', () => {
			const result = Converter.encodeTimer({
				timer: 1057,
				gp2_5: 0b1001
			})
			Assert.deepEqual(result, Uint8Array.from([ 0b0010_0001, 0b1001_0100 ]))
		})
	})

	describe('decodeControl', () => {
		it('should handle zero', () => {
			const buffer = Uint8Array.from([ 0 ])
			const result = Converter.decodeControl(buffer)
			Assert.deepEqual(result, {
				enableInterruptPeriodicTimeUpdate: false,
				enableInterruptPeriodicCountdownEvent: false,
				enableInterruptAlarm: false,
				enableInterruptExternalEvent: false,
				reset: false
			})
		})

		it('should handle all on (no reset)', () => {
			const buffer = Uint8Array.from([ 0b0011_1100 ])
			const result = Converter.decodeControl(buffer)
			Assert.deepEqual(result, {
				enableInterruptPeriodicTimeUpdate: true,
				enableInterruptPeriodicCountdownEvent: true,
				enableInterruptAlarm: true,
				enableInterruptExternalEvent: true,
				reset: false
			})
		})
	})

	describe('encodeControl', () => {
		it('should handle basic', () => {
			const result = Converter.encodeControl({
				enableInterruptPeriodicTimeUpdate: true,
				enableInterruptPeriodicCountdownEvent: false,
				enableInterruptAlarm: true,
				enableInterruptExternalEvent: false,
				reset: true
			})
			Assert.deepEqual(result, Uint8Array.from([ 0b0010_1001 ]))
		})

		it('should handle alternate', () => {
			const result = Converter.encodeControl({
				enableInterruptPeriodicTimeUpdate: false,
				enableInterruptPeriodicCountdownEvent: true,
				enableInterruptAlarm: false,
				enableInterruptExternalEvent: true,
				reset: false
			})
			Assert.deepEqual(result, Uint8Array.from([ 0b0001_0100 ]))
		})
	})

	describe('decodeExtension', () => {
		it('should handle zero', () => {
			const buffer = Uint8Array.from([ 0 ])
			const result = Converter.decodeExtension(buffer)
			Assert.deepEqual(result, {
				test: false,
				alarmSelect: 'weekday',
				periodicUpdateSelect: 'second',
				enablePeriodicTimer: false,
				outputFrequency: 0,
				periodicCountdownFrequency: 0
			})
		})

		it('should handle custom', () => {
			const buffer = Uint8Array.from([ 0b0110_0110 ])
			const result = Converter.decodeExtension(buffer)
			Assert.deepEqual(result, {
				test: false,
				alarmSelect: 'date',
				periodicUpdateSelect: 'minute',
				enablePeriodicTimer: false,
				outputFrequency: 1,
				periodicCountdownFrequency: 2
			})
		})
	})

	describe('encodeExtension', () => {
		it('should handle default', () => {
			const result = Converter.encodeExtension({
				test: false,
				alarmSelect: 'weekday',
				periodicUpdateSelect: 'second',
				enablePeriodicTimer: false,
				outputFrequency: 0,
				periodicCountdownFrequency: 0
			})
			Assert.deepEqual(result, Uint8Array.from([ 0b0000_0000 ]))
		})

		it('should handle select alt values', () => {
			const result = Converter.encodeExtension({
				test: false,
				alarmSelect: 'date',
				periodicUpdateSelect: 'minute',
				enablePeriodicTimer: false,
				outputFrequency: 0,
				periodicCountdownFrequency: 0
			})
			Assert.deepEqual(result, Uint8Array.from([ 0b0110_0000 ]))
		})

		it('should handle test with freq values', () => {
			const result = Converter.encodeExtension({
				test: true,
				alarmSelect: 'weekday',
				periodicUpdateSelect: 'second',
				enablePeriodicTimer: true,
				outputFrequency: 1,
				periodicCountdownFrequency: 2
			})
			Assert.deepEqual(result, Uint8Array.from([ 0b1001_0110 ]))
		})
	})

	describe('decodeFlags', () => {
		it('should handle zero', () => {
			const buffer = Uint8Array.from([ 0 ])
			const result = Converter.decodeFlags(buffer)
			Assert.deepEqual(result, {
				periodicTimeUpdate: false,
				periodicCountdownTimer: false,
				alarm: false,
				externalEvent: false,
				dataLoss: false,
				temperatureCompensation: false
			})
		})

		it('should handle alarm and dataLoss', () => {
			const buffer = Uint8Array.from([ 0b0000_1010 ])
			const result = Converter.decodeFlags(buffer)
			Assert.deepEqual(result, {
				periodicTimeUpdate: false,
				periodicCountdownTimer: false,
				alarm: true,
				externalEvent: false,
				dataLoss: true,
				temperatureCompensation: false
			})
		})
	})

	describe('encodeFlags', () => {
		it('should handle no-clear', () => {
			const result = Converter.encodeFlags({})
			Assert.deepEqual(result, Uint8Array.from([ 0b0011_1111 ]))
		})

		it('should handle clear alarm', () => {
			const result = Converter.encodeFlags({ alarm: true })
			Assert.deepEqual(result, Uint8Array.from([ 0b0011_0111 ]))
		})

		it('should handle clear all', () => {
			const result = Converter.encodeFlags({
				periodicCountdownTimer: true,
				periodicTimeUpdate: true,
				alarm: true,
				externalEvent: true,
				dataLoss: true,
				temperatureCompensation: true
			})
			Assert.deepEqual(result, Uint8Array.from([ 0 ]))
		})
	})

	describe('decodeEventControl', () => {
		it('should handle zero', () => {
			const buffer = Uint8Array.from([ 0 ])
			const result = Converter.decodeEventControl(buffer)
			Assert.deepEqual(result, {
				enableCapture: false,
				edge: 'low',
				filteringTime: 0,
				enableReset: false
			})
		})

		it('should handle high edge with reset', () => {
			const buffer = Uint8Array.from([ 0b0100_0001 ])
			const result = Converter.decodeEventControl(buffer)
			Assert.deepEqual(result, {
				enableCapture: false,
				edge: 'high',
				filteringTime: 0,
				enableReset: true
			})
		})

		it('should handle with filter timing', () => {
			const buffer = Uint8Array.from([ 0b0011_0001 ])
			const result = Converter.decodeEventControl(buffer)
			Assert.deepEqual(result, {
				enableCapture: false,
				edge: 'low',
				filteringTime: 3,
				enableReset: true
			})
		})
	})

	describe('encodeEventControl', () => {
		it('should handle defaults', () => {
			const result = Converter.encodeEventControl({
				enableCapture: false,
				edge: 'low',
				filteringTime: 0,
				enableReset: false
			})
			Assert.deepEqual(result, Uint8Array.from([ 0 ]))
		})

		it('should handle alt', () => {
			const result = Converter.encodeEventControl({
				enableCapture: false,
				edge: 'high',
				filteringTime: 3,
				enableReset: true
			})
			Assert.deepEqual(result, Uint8Array.from([ 0b0111_0001 ]))
		})
	})

	describe('decodeCapture', () => {
		it('should handle invalid buffer length', () => {
			const buffer = new ArrayBuffer()
			Assert.throws(() => Converter.decodeCapture(buffer), {
				message: 'invalid buffer length',
				name: 'RangeError'
			})
		})

		it('should handle zero ', () => {
			const buffer = Uint8Array.from([ 0, 0 ])
			const result = Converter.decodeCapture(buffer)
			Assert.deepEqual(result.toLocaleString('en-US', { style: 'long', secondsDisplay: 'always' }), '0 seconds')
		})

		it('should handle hundredths of second ', () => {
			const buffer = Uint8Array.from([
				encodeBCD(2),
				encodeBCD(3)
			 ])
			const result = Converter.decodeCapture(buffer)
			Assert.deepEqual(result.toLocaleString('en-US', { style: 'long', secondsDisplay: 'always' }), '3 seconds, 20 milliseconds')
		})

		it('should handle seconds overflow (unbalanced) ', () => {
			const buffer = Uint8Array.from([
				encodeBCD(11),
				encodeBCD(61)
			 ])
			const result = Converter.decodeCapture(buffer)
			Assert.deepEqual(result.toLocaleString('en-US', { style: 'long', secondsDisplay: 'always' }), '61 seconds, 110 milliseconds')
			Assert.deepEqual(result.total('milliseconds'), 61_110)
		})
	})
})


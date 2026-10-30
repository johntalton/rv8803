import { describe, it } from 'node:test'
import * as Assert from 'node:assert/strict'

import { RV8803, RV8803_DEFAULT_ADDRESS } from '@johntalton/rv8803'
import { I2CAddressedBus } from '@johntalton/and-other-delights'
import { MemBus } from './mem-bus.js'

describe('RV8803', () => {
	describe('RV8803', () => {
		it('should construct', () => {
			const mb = new MemBus()
			const bus = new I2CAddressedBus(mb, RV8803_DEFAULT_ADDRESS)
			const device = new RV8803(bus)
			Assert.ok(device instanceof RV8803)
		})
	})

	describe('getTime', () => {
		it('should get', async () => {
			const mb = new MemBus(Uint8Array.from([ 0, 0, 0, 0b0000_0001, 1, 1, 0 ]))
			const bus = new I2CAddressedBus(mb, RV8803_DEFAULT_ADDRESS)
			const device = new RV8803(bus)
			const result = await device.getTime()
			Assert.equal(mb.lastRegister, 0x00)
			Assert.equal(mb.lastBytesLength, 7)
			Assert.ok(result !== undefined)
			Assert.equal(result.toJSON(), '2000-01-01T00:00:00')
		})
	})

	describe('getTimeHighRes', () => {
		it('should get', async () => {
			const mb = new MemBus(Uint8Array.from([ 0, 0, 0, 0, 0b0000_0001, 1, 1, 0 ]))
			const bus = new I2CAddressedBus(mb, RV8803_DEFAULT_ADDRESS)
			const device = new RV8803(bus)
			const result = await device.getTimeHighRes()
			Assert.equal(mb.lastRegister, 0x10)
			Assert.equal(mb.lastBytesLength, 8)
			Assert.ok(result !== undefined)
			Assert.equal(result.toJSON(), '2000-01-01T00:00:00')
		})
	})

	describe('setTime', () => {
		it('should write', async () => {
			const mb = new MemBus()
			const bus = new I2CAddressedBus(mb, RV8803_DEFAULT_ADDRESS)
			const device = new RV8803(bus)
			await device.setTime(Temporal.PlainDateTime.from('2000-01-01'))
			Assert.equal(mb.lastRegister, 0x00)
			Assert.equal(mb.lastBytesLength, 7)
		})
	})

	describe('getAlarm', () => {
		it('should ', async () => {
			const mb = new MemBus(Uint8Array.from([ 0, 0, 0 ]))
			const bus = new I2CAddressedBus(mb, RV8803_DEFAULT_ADDRESS)
			const device = new RV8803(bus)
			const result = await device.getAlarm(true)
			Assert.equal(mb.lastRegister, 0x08)
			Assert.equal(mb.lastBytesLength, 3)
			Assert.ok(result !== undefined)
		})
	})

	describe('setAlarm', () => {
		it('should ', async () => {
			const mb = new MemBus()
			const bus = new I2CAddressedBus(mb, RV8803_DEFAULT_ADDRESS)
			const device = new RV8803(bus)
			await device.setAlarm({

			})
			Assert.equal(mb.lastRegister, 0x08)
			Assert.equal(mb.lastBytesLength, 3)
		})
	})

	describe('getOffset', () => {
		it('should ', async () => {
			const mb = new MemBus(Uint8Array.from([ 0 ]))
			const bus = new I2CAddressedBus(mb, RV8803_DEFAULT_ADDRESS)
			const device = new RV8803(bus)
			const result = await device.getOffset()
			Assert.equal(mb.lastRegister, 0x2C)
			Assert.equal(mb.lastBytesLength, 1)
			Assert.ok(result !== undefined)
		})
	})

	describe('setOffset', () => {
		it('should ', async () => {
			const mb = new MemBus()
			const bus = new I2CAddressedBus(mb, RV8803_DEFAULT_ADDRESS)
			const device = new RV8803(bus)
			await device.setOffset(0)
			Assert.equal(mb.lastRegister, 0x2C)
			Assert.equal(mb.lastBytesLength, 1)
		})
	})

	describe('getRAM', () => {
		it('should ', async () => {
			const mb = new MemBus(Uint8Array.from([ 0 ]))
			const bus = new I2CAddressedBus(mb, RV8803_DEFAULT_ADDRESS)
			const device = new RV8803(bus)
			const result = await device.getRAM()
			Assert.equal(mb.lastRegister, 0x07)
			Assert.equal(mb.lastBytesLength, 1)
			Assert.ok(result !== undefined)
		})
	})

	describe('setRAM', () => {
		it('should ', async () => {
			const mb = new MemBus()
			const bus = new I2CAddressedBus(mb, RV8803_DEFAULT_ADDRESS)
			const device = new RV8803(bus)
			await device.setRAM(0)
			Assert.equal(mb.lastRegister, 0x07)
			Assert.equal(mb.lastBytesLength, 1)
		})
	})

	describe('getTimer', () => {
		it('should ', async () => {
			const mb = new MemBus(Uint8Array.from([ 0, 0 ]))
			const bus = new I2CAddressedBus(mb, RV8803_DEFAULT_ADDRESS)
			const device = new RV8803(bus)
			const result = await device.getTimer()
			Assert.equal(mb.lastRegister, 0x0B)
			Assert.equal(mb.lastBytesLength, 2)
			Assert.ok(result !== undefined)
		})
	})

	describe('setTimer', () => {
		it('should write', async () => {
			const mb = new MemBus()
			const bus = new I2CAddressedBus(mb, RV8803_DEFAULT_ADDRESS)
			const device = new RV8803(bus)
			await device.setTimer({

			})
			Assert.equal(mb.lastRegister, 0x0B)
			Assert.equal(mb.lastBytesLength, 2)
		})
	})

	describe('getControl', () => {
		it('should ', async () => {
			const mb = new MemBus(Uint8Array.from([ 0 ]))
			const bus = new I2CAddressedBus(mb, RV8803_DEFAULT_ADDRESS)
			const device = new RV8803(bus)
			const result = await device.getControl()
			Assert.equal(mb.lastRegister, 0x0F)
			Assert.equal(mb.lastBytesLength, 1)
			Assert.ok(result !== undefined)
		})
	})

	describe('setControl', () => {
		it('should write', async () => {
			const mb = new MemBus()
			const bus = new I2CAddressedBus(mb, RV8803_DEFAULT_ADDRESS)
			const device = new RV8803(bus)
			await device.setControl({

			})
			Assert.equal(mb.lastRegister, 0x0F)
			Assert.equal(mb.lastBytesLength, 1)
		})
	})

	describe('getExtension', () => {
		it('should ', async () => {
			const mb = new MemBus(Uint8Array.from([ 0 ]))
			const bus = new I2CAddressedBus(mb, RV8803_DEFAULT_ADDRESS)
			const device = new RV8803(bus)
			const result = await device.getExtension()
			Assert.equal(mb.lastRegister, 0x0D)
			Assert.equal(mb.lastBytesLength, 1)
			Assert.ok(result !== undefined)
		})
	})

	describe('setExtension', () => {
		it('should ', async () => {
			const mb = new MemBus()
			const bus = new I2CAddressedBus(mb, RV8803_DEFAULT_ADDRESS)
			const device = new RV8803(bus)
			await device.setExtension({
				alarmSelect: 'weekday',
				periodicUpdateSelect: 'minute',
				enablePeriodicCountdownTimer: false,
				outputFrequency: '1024Hz',
				periodicCountdownFrequency: '4096Hz',
				test: false
			})
			Assert.equal(mb.lastRegister, 0x0D)
			Assert.equal(mb.lastBytesLength, 1)
		})
	})

	describe('getFlags', () => {
		it('should ', async () => {
			const mb = new MemBus(Uint8Array.from([ 0 ]))
			const bus = new I2CAddressedBus(mb, RV8803_DEFAULT_ADDRESS)
			const device = new RV8803(bus)
			const result = await device.getFlags()
			Assert.equal(mb.lastRegister, 0x0E)
			Assert.equal(mb.lastBytesLength, 1)
			Assert.ok(result !== undefined)
		})
	})

	describe('clearFlags', () => {
		it('should ', async () => {
			const mb = new MemBus()
			const bus = new I2CAddressedBus(mb, RV8803_DEFAULT_ADDRESS)
			const device = new RV8803(bus)
			await device.clearFlags({

			})
			Assert.equal(mb.lastRegister, 0x0E)
			Assert.equal(mb.lastBytesLength, 1)
		})
	})

	describe('getEventControl', () => {
		it('should ', async () => {
			const mb = new MemBus(Uint8Array.from([ 0 ]))
			const bus = new I2CAddressedBus(mb, RV8803_DEFAULT_ADDRESS)
			const device = new RV8803(bus)
			const result = await device.getEventControl()
			Assert.equal(mb.lastRegister, 0x2F)
			Assert.equal(mb.lastBytesLength, 1)
			Assert.ok(result !== undefined)
		})
	})

	describe('setEventControl', () => {
		it('should write', async () => {
			const mb = new MemBus()
			const bus = new I2CAddressedBus(mb, RV8803_DEFAULT_ADDRESS)
			const device = new RV8803(bus)
			await device.setEventControl({
				edge: 'low',
				filteringTime: 'None',
				enableCapture: false,
				enableReset: false
			})
			Assert.equal(mb.lastRegister, 0x2F)
			Assert.equal(mb.lastBytesLength, 1)
		})
	})

	describe('getCapture', () => {
		it('should read', async () => {
			const mb = new MemBus(Uint8Array.from([ 0, 0 ]))
			const bus = new I2CAddressedBus(mb, RV8803_DEFAULT_ADDRESS)
			const device = new RV8803(bus)
			const result = await device.getCapture()
			Assert.equal(mb.lastRegister, 0x20)
			Assert.equal(mb.lastBytesLength, 2)
			Assert.ok(result !== undefined)
		})
	})
})

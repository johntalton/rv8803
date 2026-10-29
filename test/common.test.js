import { describe, it } from 'node:test'
import * as Assert from 'node:assert/strict'

import { I2CAddressedBus } from '@johntalton/and-other-delights'
import { Common, RV8803_DEFAULT_ADDRESS } from '@johntalton/rv8803'

import { MemBus } from './mem-bus.js'

describe('Common', () => {
	describe('getTimeHighRes', () => {
		it('should read', async () => {
			const u8 = Uint8Array.from([ 0, 0, 0, 0, 0, 0, 0, 0 ])
			const bus = new I2CAddressedBus(new MemBus(u8), RV8803_DEFAULT_ADDRESS)
			const result = await Common.getTimeHighRes(bus)
			Assert.deepEqual(result, u8)
		})
	})

	describe('getTime', () => {
		it('should read', async () => {
			const u8 = Uint8Array.from([ 0, 0, 0, 0, 0, 0, 0 ])
			const bus = new I2CAddressedBus(new MemBus(u8), RV8803_DEFAULT_ADDRESS)
			const result = await Common.getTime(bus)
			Assert.deepEqual(result, u8)
		})
	})

	describe('setTime', () => {
		it('should check length', () => {
			Assert.rejects(() => Common.setTime(undefined, new ArrayBuffer()), {
				message: 'invalid buffer length',
				name: 'RangeError'
			})
		})

		it('should write', async () => {
			const mb = new MemBus()
			const bus = new I2CAddressedBus(mb, RV8803_DEFAULT_ADDRESS)
			await Common.setTime(bus, Uint8Array.from([ 0,0,0,0,0,0,0 ]))
			Assert.equal(mb.lastRegister, 0)
			Assert.equal(mb.lastBytesLength, 7)
		})
	})

	describe('getAlarm', () => {
		it('should read', async () => {
			const u8 = Uint8Array.from([ 0, 0, 0 ])
			const bus = new I2CAddressedBus(new MemBus(u8), RV8803_DEFAULT_ADDRESS)
			const result = await Common.getAlarm(bus)
			Assert.deepEqual(result, u8)
		})
	})

	describe('setAlarm', () => {
		it('should check length', () => {
			Assert.rejects(() => Common.setAlarm(undefined, new ArrayBuffer()), {
				message: 'invalid buffer length',
				name: 'RangeError'
			})
		})

		it('should write', async () => {
			const mb = new MemBus()
			const bus = new I2CAddressedBus(mb, RV8803_DEFAULT_ADDRESS)
			await Common.setAlarm(bus, Uint8Array.from([ 0,0,0 ]))
			Assert.equal(mb.lastRegister, 0x08)
			Assert.equal(mb.lastBytesLength, 3)
		})
	})

	describe('getOffset', () => {
		it('should read', async () => {
			const u8 = Uint8Array.from([ 0 ])
			const bus = new I2CAddressedBus(new MemBus(u8), RV8803_DEFAULT_ADDRESS)
			const result = await Common.getOffset(bus)
			Assert.deepEqual(result, u8)
		})
	})

	describe('setOffset', () => {
		it('should check length', () => {
			Assert.rejects(() => Common.setOffset(undefined, new ArrayBuffer()), {
				message: 'invalid buffer length',
				name: 'RangeError'
			})
		})

		it('should write', async () => {
			const mb = new MemBus()
			const bus = new I2CAddressedBus(mb, RV8803_DEFAULT_ADDRESS)
			await Common.setOffset(bus, Uint8Array.from([ 0 ]))
			Assert.equal(mb.lastRegister, 0x2C)
			Assert.equal(mb.lastBytesLength, 1)
		})
	})

	describe('getRAM', () => {
		it('should read', async () => {
			const u8 = Uint8Array.from([ 0 ])
			const bus = new I2CAddressedBus(new MemBus(u8), RV8803_DEFAULT_ADDRESS)
			const result = await Common.getRAM(bus)
			Assert.deepEqual(result, u8)
		})
	})

	describe('setRAM', () => {
		it('should check length', () => {
			Assert.rejects(() => Common.setRAM(undefined, new ArrayBuffer()), {
				message: 'invalid buffer length',
				name: 'RangeError'
			})
		})

		it('should write', async () => {
			const mb = new MemBus()
			const bus = new I2CAddressedBus(mb, RV8803_DEFAULT_ADDRESS)
			await Common.setRAM(bus, Uint8Array.from([ 0 ]))
			Assert.equal(mb.lastRegister, 0x07)
			Assert.equal(mb.lastBytesLength, 1)
		})
	})

	describe('getTimer', () => {
		it('should read', async () => {
			const u8 = Uint8Array.from([ 0, 0 ])
			const bus = new I2CAddressedBus(new MemBus(u8), RV8803_DEFAULT_ADDRESS)
			const result = await Common.getTimer(bus)
			Assert.deepEqual(result, u8)
		})
	})

	describe('setTimer', () => {
		it('should check length', () => {
			Assert.rejects(() => Common.setTimer(undefined, new ArrayBuffer()), {
				message: 'invalid buffer length',
				name: 'RangeError'
			})
		})

		it('should write', async () => {
			const mb = new MemBus()
			const bus = new I2CAddressedBus(mb, RV8803_DEFAULT_ADDRESS)
			await Common.setTimer(bus, Uint8Array.from([ 0,0 ]))
			Assert.equal(mb.lastRegister, 0x0B)
			Assert.equal(mb.lastBytesLength, 2)
		})
	})

	describe('getControl', () => {
		it('should read', async () => {
			const u8 = Uint8Array.from([ 0 ])
			const bus = new I2CAddressedBus(new MemBus(u8), RV8803_DEFAULT_ADDRESS)
			const result = await Common.getControl(bus)
			Assert.deepEqual(result, u8)
		})
	})

	describe('setControl', () => {
		it('should check length', () => {
			Assert.rejects(() => Common.setControl(undefined, new ArrayBuffer()), {
				message: 'invalid buffer length',
				name: 'RangeError'
			})
		})

		it('should write', async () => {
			const mb = new MemBus()
			const bus = new I2CAddressedBus(mb, RV8803_DEFAULT_ADDRESS)
			await Common.setControl(bus, Uint8Array.from([ 0 ]))
			Assert.equal(mb.lastRegister, 0x0F)
			Assert.equal(mb.lastBytesLength, 1)
		})
	})

	describe('getExtension', () => {
		it('should read', async () => {
			const u8 = Uint8Array.from([ 0 ])
			const bus = new I2CAddressedBus(new MemBus(u8), RV8803_DEFAULT_ADDRESS)
			const result = await Common.getExtension(bus)
			Assert.deepEqual(result, u8)
		})
	})

	describe('setExtension', () => {
		it('should check length', () => {
			Assert.rejects(() => Common.setExtension(undefined, new ArrayBuffer()), {
				message: 'invalid buffer length',
				name: 'RangeError'
			})
		})

		it('should write', async () => {
			const mb = new MemBus()
			const bus = new I2CAddressedBus(mb, RV8803_DEFAULT_ADDRESS)
			await Common.setExtension(bus, Uint8Array.from([ 0 ]))
			Assert.equal(mb.lastRegister, 0x0D)
			Assert.equal(mb.lastBytesLength, 1)
		})
	})

	describe('getFlags', () => {
		it('should read', async () => {
			const u8 = Uint8Array.from([ 0 ])
			const bus = new I2CAddressedBus(new MemBus(u8), RV8803_DEFAULT_ADDRESS)
			const result = await Common.getFlags(bus)
			Assert.deepEqual(result, u8)
		})
	})

	describe('clearFlags', () => {
		it('should check length', () => {
			Assert.rejects(() => Common.clearFlags(undefined, new ArrayBuffer()), {
				message: 'invalid buffer length',
				name: 'RangeError'
			})
		})

		it('should write', async () => {
			const mb = new MemBus()
			const bus = new I2CAddressedBus(mb, RV8803_DEFAULT_ADDRESS)
			await Common.clearFlags(bus, Uint8Array.from([ 0 ]))
			Assert.equal(mb.lastRegister, 0x0E)
			Assert.equal(mb.lastBytesLength, 1)
		})
	})

	describe('getEventControl', () => {
		it('should read', async () => {
			const u8 = Uint8Array.from([ 0 ])
			const bus = new I2CAddressedBus(new MemBus(u8), RV8803_DEFAULT_ADDRESS)
			const result = await Common.getEventControl(bus)
			Assert.deepEqual(result, u8)
		})
	})

	describe('setEventControl', () => {
		it('should check length', () => {
			Assert.rejects(() => Common.setEventControl(undefined, new ArrayBuffer()), {
				message: 'invalid buffer length',
				name: 'RangeError'
			})
		})

		it('should write', async () => {
			const mb = new MemBus()
			const bus = new I2CAddressedBus(mb, RV8803_DEFAULT_ADDRESS)
			await Common.setEventControl(bus, Uint8Array.from([ 0 ]))
			Assert.equal(mb.lastRegister, 0x2F)
			Assert.equal(mb.lastBytesLength, 1)
		})
	})

	describe('getCapture', () => {
		it('should read', async () => {
			const u8 = Uint8Array.from([ 0, 0 ])
			const bus = new I2CAddressedBus(new MemBus(u8), RV8803_DEFAULT_ADDRESS)
			const result = await Common.getCapture(bus)
			Assert.deepEqual(result, u8)
		})
	})
})

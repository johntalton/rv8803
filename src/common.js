import { ALARM_BLOCK, CAPTURE_BLOCK, HIGH_RES_TIME_BLOCK, REGISTERS, TIME_BLOCK, TIMER_BLOCK } from './defs.js'

/** @import { I2CAddressedBus, I2CBufferSource } from '@johntalton/and-other-delights' */

export class Common {

	/**
	 * @param {I2CAddressedBus} bus
	 * @returns {Promise<I2CBufferSource>}
	 */
	static async getTimeHighRes(bus) {
		return bus.readI2cBlock(HIGH_RES_TIME_BLOCK.start, HIGH_RES_TIME_BLOCK.length)
	}

	/**
	 * @param {I2CAddressedBus} bus
	 * @returns {Promise<I2CBufferSource>}
	 */
	static async getTime(bus) {
		return bus.readI2cBlock(TIME_BLOCK.start, TIME_BLOCK.length)
	}

	/**
	 * @param {I2CAddressedBus} bus
	 * @param {I2CBufferSource} buffer
	 * @returns {Promise<void>}
	 */
	static async setTime(bus, buffer) {
		await bus.writeI2cBlock(TIME_BLOCK.start, buffer)
	}

	/**
	 * @param {I2CAddressedBus} bus
	 * @returns {Promise<I2CBufferSource>}
	 */
	static async getAlarm(bus) {
		return bus.readI2cBlock(ALARM_BLOCK.start, ALARM_BLOCK.length)
	}

	/**
	 * @param {I2CAddressedBus} bus
	 * @param {I2CBufferSource} buffer
	 * @returns {Promise<void>}
	 */
	static async setAlarm(bus, buffer) {
		await bus.writeI2cBlock(ALARM_BLOCK.start, buffer)
	}

	/**
	 * @param {I2CAddressedBus} bus
	 * @returns {Promise<I2CBufferSource>}
	 */
	static async getOffset(bus) {
		return bus.readI2cBlock(REGISTERS.OFFSET, 1)
	}

	/**
	 * @param {I2CAddressedBus} bus
	 * @param {I2CBufferSource} buffer
	 * @returns {Promise<void>}
	 */
	static async setOffset(bus, buffer) {
		await bus.writeI2cBlock(REGISTERS.OFFSET, buffer)
	}

	/**
	 * @param {I2CAddressedBus} bus
	 * @returns {Promise<I2CBufferSource>}
	 */
	static async getRAM(bus) {
		return bus.readI2cBlock(REGISTERS.RAM, 1)
	}

	/**
	 * @param {I2CAddressedBus} bus
	 * @param {I2CBufferSource} buffer
	 * @returns {Promise<void>}
	 */
	static async setRAM(bus, buffer) {
		await bus.writeI2cBlock(REGISTERS.RAM, buffer)
	}

	/**
	 * @param {I2CAddressedBus} bus
	 * @returns {Promise<I2CBufferSource>}
	 */
	static async getTimer(bus) {
		return bus.readI2cBlock(TIMER_BLOCK.start, TIMER_BLOCK.length)
	}

	/**
	 * @param {I2CAddressedBus} bus
	 * @param {I2CBufferSource} buffer
	 * @returns {Promise<void>}
	 */
	static async setTimer(bus, buffer) {
		await bus.writeI2cBlock(TIMER_BLOCK.start, buffer)
	}

	/**
	 * @param {I2CAddressedBus} bus
	 * @returns {Promise<I2CBufferSource>}
	 */
	static async getControl(bus) {
		return bus.readI2cBlock(REGISTERS.CONTROL_REGISTER, 1)
	}

	/**
	 * @param {I2CAddressedBus} bus
	 * @param {I2CBufferSource} buffer
	 * @returns {Promise<void>}
	 */
	static async setControl(bus, buffer) {
		await bus.writeI2cBlock(REGISTERS.CONTROL_REGISTER, buffer)
	}

	/**
	 * @param {I2CAddressedBus} bus
	 * @returns {Promise<I2CBufferSource>}
	 */
	static async getExtension(bus) {
		return bus.readI2cBlock(REGISTERS.EXTENSION_REGISTER, 1)
	}

	/**
	 * @param {I2CAddressedBus} bus
	 * @param {I2CBufferSource} buffer
	 * @returns {Promise<void>}
	 */
	static async setExtension(bus, buffer) {
		await bus.writeI2cBlock(REGISTERS.EXTENSION_REGISTER, buffer)
	}

	/**
	 * @param {I2CAddressedBus} bus
	 * @returns {Promise<I2CBufferSource>}
	 */
	static async getFlags(bus) {
		return bus.readI2cBlock(REGISTERS.FLAGS_REGISTER, 1)
	}

	/**
	 * @param {I2CAddressedBus} bus
	 * @param {I2CBufferSource} buffer
	 * @returns {Promise<void>}
	 */
	static async setFlags(bus, buffer) {
		await bus.writeI2cBlock(REGISTERS.FLAGS_REGISTER, buffer)
	}

	/**
	 * @param {I2CAddressedBus} bus
	 * @returns {Promise<I2CBufferSource>}
	 */
	static async getEventControl(bus) {
		return bus.readI2cBlock(REGISTERS.EVENT_CONTROL, 1)
	}

	/**
	 * @param {I2CAddressedBus} bus
	 * @param {I2CBufferSource} buffer
	 * @returns {Promise<void>}
	 */
	static async setEventControl(bus, buffer) {
		await bus.writeI2cBlock(REGISTERS.EVENT_CONTROL, buffer)
	}

	/**
	 * @param {I2CAddressedBus} bus
	 * @returns {Promise<I2CBufferSource>}
	 */
	static async getCapture(bus) {
		return bus.readI2cBlock(CAPTURE_BLOCK.start, CAPTURE_BLOCK.length)
	}


}
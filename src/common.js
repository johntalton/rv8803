import { REGISTERS } from "./defs.js"

/** @import { I2CAddressedBus, I2CBufferSource } from '@johntalton/and-other-delights' */

export class Common {

	/**
	 * @param {I2CAddressedBus} bus
	 */
	static async getTime(bus) {
		return bus.readI2cBlock(REGISTERS.ONE_HUNDREDTHS_SECONDS, 8)
	}

	/**
	 * @param {I2CAddressedBus} bus
	 * @param {I2CBufferSource} buffer
	 */
	static async setTime(bus, buffer) {
		return bus.writeI2cBlock()
	}

	/**
	 * @param {I2CAddressedBus} bus
	 * @returns {Promise<I2CBufferSource>}
	 */
	static async getAlarm(bus) {
		return bus.readI2cBlock()
	}

	/**
	 * @param {I2CAddressedBus} bus
	 * @param {I2CBufferSource} buffer
	 */
	static async setAlarm(bus, buffer) {
		return bus.writeI2cBlock()
	}

	/**
	 * @param {I2CAddressedBus} bus
	 * @returns {Promise<I2CBufferSource>}
	 */
	static async getOffset(bus) {
		return bus.readI2cBlock()
	}

	/**
	 * @param {I2CAddressedBus} bus
	 * @param {I2CBufferSource} buffer
	 */
	static async setOffset(bus, buffer) {
		return bus.writeI2cBlock()
	}

	/**
	 * @param {I2CAddressedBus} bus
	 * @returns {Promise<I2CBufferSource>}
	 */
	static async getRAM(bus) {
		return bus.readI2cBlock()
	}

	/**
	 * @param {I2CAddressedBus} bus
	 * @param {I2CBufferSource} buffer
	 */
	static async setRAM(bus, buffer) {
		return bus.writeI2cBlock()
	}

	/**
	 * @param {I2CAddressedBus} bus
	 * @returns {Promise<I2CBufferSource>}
	 */
	static async getTimer(bus) {
		return bus.readI2cBlock()
	}

	/**
	 * @param {I2CAddressedBus} bus
	 * @param {I2CBufferSource} buffer
	 */
	static async setTimer(bus, buffer) {
		return bus.writeI2cBlock()
	}

	/**
	 * @param {I2CAddressedBus} bus
	 * @returns {Promise<I2CBufferSource>}
	 */
	static async getControl(bus) {
		return bus.readI2cBlock()
	}

	/**
	 * @param {I2CAddressedBus} bus
	 * @param {I2CBufferSource} buffer
	 */
	static async setControl(bus, buffer) {
		return bus.writeI2cBlock()
	}

	/**
	 * @param {I2CAddressedBus} bus
	 * @returns {Promise<I2CBufferSource>}
	 */
	static async getExtension(bus) {
		return bus.readI2cBlock()
	}

	/**
	 * @param {I2CAddressedBus} bus
	 * @param {I2CBufferSource} buffer
	 */
	static async setExtension(bus, buffer) {
		return bus.writeI2cBlock()
	}

	/**
	 * @param {I2CAddressedBus} bus
	 * @returns {Promise<I2CBufferSource>}
	 */
	static async getFlags(bus) {
		return bus.readI2cBlock()
	}

	/**
	 * @param {I2CAddressedBus} bus
	 * @param {I2CBufferSource} buffer
	 */
	static async setFlags(bus, buffer) {
		return bus.writeI2cBlock()
	}

	/**
	 * @param {I2CAddressedBus} bus
	 * @returns {Promise<I2CBufferSource>}
	 */
	static async getEventControl(bus) {
		return bus.readI2cBlock()
	}

	/**
	 * @param {I2CAddressedBus} bus
	 * @param {I2CBufferSource} buffer
	 */
	static async setEventControl(bus, buffer) {
		return bus.writeI2cBlock()
	}
}
import { Common } from './common.js'
import { Converter } from './converter.js'
import { DEFAULT_BASE_YEAR } from './defs.js'

/** @import { I2CAddressedBus } from '@johntalton/and-other-delights' */
/** @import { Time, Alarm, Offset, Timer, Control, Extension, Flags, ClearFlags, EventControl, Capture } from './types.js' */

export class RV8803 {
	/** @type {I2CAddressedBus} */
	#bus

	/**
	 * @param {I2CAddressedBus} bus
	 */
	constructor(bus) {
		this.#bus = bus
	}

	/**
	 * @param {number} [baseYear = DEFAULT_BASE_YEAR]
	 * @returns {Promise<Time>}
	 */
	async getTime(baseYear = DEFAULT_BASE_YEAR) {
		const buffer = await Common.getTime(this.#bus)
		return Converter.decodeTime(buffer, baseYear)
	}

	/**
	 * @param {number} [baseYear = DEFAULT_BASE_YEAR]
	 * @returns {Promise<Time>}
	 */
	async getTimeHighRes(baseYear = DEFAULT_BASE_YEAR) {
		const buffer = await Common.getTimeHighRes(this.#bus)
		return Converter.decodeTimeHighRes(buffer, baseYear)
	}

	/**
	 * @param {Time} time
	 * @returns {Promise<void>}
	 */
	async setTime(time) {
		return Common.setTime(this.#bus, Converter.encodeTime(time))
	}

	/**
	 * @returns {Promise<Alarm>}
	 */
	async getAlarm() {
		const buffer = await Common.getAlarm(this.#bus)
		return Converter.decodeAlarm(buffer)
	}

	/**
	 * @param {Alarm} alarm
	 * @returns {Promise<void>}
	 */
	async setAlarm(alarm) {
		return Common.setAlarm(this.#bus, Converter.encodeAlarm(alarm))
	}

	/**
	 * @returns {Promise<Offset>}
	 */
	async getOffset() {
		const buffer = await Common.getOffset(this.#bus)
		return Converter.decodeOffset(buffer)
	}

	/**
	 * @param {Offset} offset
	 * @returns {Promise<void>}
	 */
	async setOffset(offset) {
		return Common.setOffset(this.#bus, Converter.encodeOffset(offset))
	}

	/**
	 * @returns {Promise<number>}
	 */
	async getRAM() {
		const buffer = await Common.getRAM(this.#bus)
		return Converter.decodeRAM(buffer)
	}

	/**
	 * @param {number} user8
	 * @returns {Promise<void>}
	 */
	async setRAM(user8) {
		return Common.setRAM(this.#bus, Converter.encodeRAM(user8))
	}

	/**
	 * @returns {Promise<Timer>}
	 */
	async getTimer() {
		const buffer = await Common.getTimer(this.#bus)
		return Converter.decodeTimer(buffer)
	}

	/**
	 * @param {Timer} timer
	 * @param {number} user4
	 * @returns {Promise<void>}
	 */
	async setTimer(timer, user4) {
		return Common.setTimer(this.#bus, Converter.encodeTimer(timer, user4))
	}

	/**
	 * @returns {Promise<Control>}
	 */
	async getControl() {
		const buffer = await Common.getControl(this.#bus)
		return Converter.decodeControl(buffer)
	}

	/**
	 * @param {Control} control
	 * @returns {Promise<void>}
	 */
	async setControl(control) {
		return Common.setControl(this.#bus, Converter.encodeControl(control))
	}

	/**
	 * @returns {Promise<Extension>}
	 */
	async getExtension() {
		const buffer = await Common.getExtension(this.#bus)
		return Converter.decodeExtension(buffer)
	}

	/**
	 * @param {Extension} extension
	 * @returns {Promise<void>}
	 */
	async setExtension(extension) {
		return Common.setExtension(this.#bus, Converter.encodeExtension(extension))
	}

	/**
	 * @returns {Promise<Flags>}
	 */
	async getFlags() {
		const buffer = await Common.getFlags(this.#bus)
		return Converter.decodeFlags(buffer)
	}

	/**
	 * @param {ClearFlags} flags
	 * @returns {Promise<void>}
	 */
	async clearFlags(flags) {
		return Common.clearFlags(this.#bus, Converter.encodeFlags(flags))
	}

	/**
	 * @returns {Promise<EventControl>}
	 */
	async getEventControl() {
		const buffer = await Common.getEventControl(this.#bus)
		return Converter.decodeEventControl(buffer)
	}

	/**
	 * @param {EventControl} eventControl
	 * @returns {Promise<void>}
	 */
	async setEventControl(eventControl) {
		return Common.setEventControl(this.#bus, Converter.encodeEventControl(eventControl))
	}

	/**
	 * @returns {Promise<Capture>}
	 */
	async getCapture() {
		const buffer = await Common.getCapture(this.#bus)
		return Converter.decodeCapture(buffer)
	}
}

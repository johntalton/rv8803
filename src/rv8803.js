import { Common } from './common.js'
import { Converter } from './converter.js'

/** @import { I2CAddressedBus } from '@johntalton/and-other-delights' */
/** @import { Time, Alarm, Offset, Timer, Control, Extension, Flags, EventControl} from './types.js' */

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
	 * @returns {Promise<Time>}
	 */
	async getTime() {
		const buffer = await Common.getTime(this.#bus)
		return Converter.toTime(buffer)
	}

	/**
	 * @param {Time} time
	 */
	async setTime(time) {
		return Common.setTime(this.#bus, Converter.fromTime(time))
	}

	/**
	 * @returns {Promise<Alarm>}
	 */
	async getAlarm() {
		const buffer = await Common.getAlarm(this.#bus)
		return Converter.toAlarm(buffer)
	}

	/**
	 * @param {Alarm} alarm
	 * @param {number} user2
	 */
	async setAlarm(alarm, user2) {
		return Common.setAlarm(this.#bus, Converter.fromAlarm(alarm, user2))
	}

	/**
	 * @returns {Promise<Offset>}
	 */
	async getOffset() {
		const buffer = await Common.getOffset(this.#bus)
		return Converter.toOffset(buffer)
	}

	/**
	 * @param {Offset} offset
	 */
	async setOffset(offset) {
		return Common.setOffset(this.#bus, Converter.fromOffset(offset))
	}

	/**
	 * @returns {Promise<number>}
	 */
	async getRAM() {
		const buffer = await Common.getRAM(this.#bus)
		return Converter.toRAM(buffer)
	}

	/**
	 * @param {number} user8
	 */
	async setRAM(user8) {
		return Common.setRAM(this.#bus, Converter.fromRAM(user8))
	}

	/**
	 * @returns {Promise<Timer>}
	 */
	async getTimer() {
		const buffer = await Common.getTimer(this.#bus)
		return Converter.toTimer(buffer)
	}

	/**
	 * @param {Timer} timer
	 * @param {number} user4
	 */
	async setTimer(timer, user4) {
		return Common.setTimer(this.#bus, Converter.fromTimer(timer, user4))
	}

	/**
	 * @returns {Promise<Control>}
	 */
	async getControl() {
		const buffer = await Common.getControl(this.#bus)
		return Converter.toControl(buffer)
	}

	/**
	 * @param {Control} control
	 */
	async setControl(control) {
		return Common.setControl(this.#bus, Converter.fromControl(control))
	}

	/**
	 * @returns {Promise<Extension>}
	 */
	async getExtension() {
		const buffer = await Common.getExtension(this.#bus)
		return Converter.toExtension(buffer)
	}

	/**
	 * @param {Extension} extension
	 */
	async setExtension(extension) {
		return Common.setExtension(this.#bus, Converter.fromExtension(extension))
	}

	/**
	 * @returns {Promise<Flags>}
	 */
	async getFlags() {
		const buffer = await Common.getFlags(this.#bus)
		return Converter.toFlags(buffer)
	}

	/**
	 * @param {Flags} flags
	 */
	async setFlags(flags) {
		return Common.setFlags(this.#bus, Converter.fromFlags(flags))
	}

	/**
	 * @returns {Promise<EventControl>}
	 */
	async getEventControl() {
		const buffer = await Common.getEventControl(this.#bus)
		return Converter.toEventControl(buffer)
	}

	/**
	 * @param {EventControl} eventControl
	 */
	async setEventControl(eventControl) {
		return Common.setEventControl(this.#bus, Converter.fromEventControl(eventControl))
	}
}


/** @import { I2CBufferSource } from '@johntalton/and-other-delights' */
/** @import { Time, Alarm, Offset, Timer, Control, Extension, Flags, EventControl, Capture } from './types.js' */

export class Converter {
	/**
	 * @param {I2CBufferSource} buffer
	 * @returns {Time}
	 */
	static toTimeHighRes(buffer) {
		const u8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset) :
			new Uint8Array(buffer)

		const [
			hundredths, seconds, minutes, hours,
			weekday, date, month, year
		] = u8

	}

	/**
	 * @param {I2CBufferSource} buffer
	 * @returns {Time}
	 */
	static toTime(buffer) {
		const u8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset) :
			new Uint8Array(buffer)

		const [
			seconds, minutes, hours,
			weekday, date, month, year
		] = u8


	}

	/**
	 * @param {Time} time
	 * @returns {I2CBufferSource}
	 */
	static fromTime(time) {
		const buffer = new Uint8Array()
		// todo
		return buffer
	}

	/**
	 * @param {I2CBufferSource} buffer
	 * @returns {Alarm}
	 */
	static toAlarm(buffer) {
		const u8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset) :
			new Uint8Array(buffer)

	}

	/**
	 * @param {Alarm} alarm
	 * @param {number} user2
	 * @returns {I2CBufferSource}
	 */
	static fromAlarm(alarm, user2) {
		const buffer = new Uint8Array()
		// todo
		return buffer
	}

	/**
	 * @param {I2CBufferSource} buffer
	 * @returns {Offset}
	 */
	static toOffset(buffer) {
		const u8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset) :
			new Uint8Array(buffer)

	}

	/**
	 * @param {Offset} offset
	 * @returns {I2CBufferSource}
	 */
	static fromOffset(offset) {
		const buffer = new Uint8Array()
		// todo
		return buffer
	}

	/**
	 * @param {I2CBufferSource} buffer
	 * @returns {number}
	 */
	static toRAM(buffer) {
		const u8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset) :
			new Uint8Array(buffer)

	}

	/**
	 * @param {number} user8
	 * @returns {I2CBufferSource}
	 */
	static fromRAM(user8) {
		const buffer = new Uint8Array()
		// todo
		return buffer
	}

	/**
	 * @param {I2CBufferSource} buffer
	 * @returns {Timer}
	 */
	static toTimer(buffer) {
		const u8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset) :
			new Uint8Array(buffer)

	}

	/**
	 * @param {Timer} timer
	 * @param {number} user4
	 * @returns {I2CBufferSource}
	 */
	static fromTimer(timer, user4) {
		const buffer = new Uint8Array()
		// todo
		return buffer
	}

	/**
	 * @param {I2CBufferSource} buffer
	 * @returns {Control}
	 */
	static toControl(buffer) {
		const u8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset) :
			new Uint8Array(buffer)

	}

	/**
	 * @param {Control} control
	 * @returns {I2CBufferSource}
	 */
	static fromControl(control) {
		const buffer = new Uint8Array()
		// todo
		return buffer
	}

	/**
	 * @param {I2CBufferSource} buffer
	 * @returns {Extension}
	 */
	static toExtension(buffer) {
		const u8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset) :
			new Uint8Array(buffer)

	}

	/**
	 * @param {Extension} extension
	 * @returns {I2CBufferSource}
	 */
	static fromExtension(extension) {
		const buffer = new Uint8Array()
		// todo
		return buffer
	}

	/**
	 * @param {I2CBufferSource} buffer
	 * @returns {Flags}
	 */
	static toFlags(buffer) {
		const u8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset) :
			new Uint8Array(buffer)

	}

	/**
	 * @param {Flags} flags
	 * @returns {I2CBufferSource}
	 */
	static fromFlags(flags) {
		const buffer = new Uint8Array()
		// todo
		return buffer
	}

	/**
	 * @param {I2CBufferSource} buffer
	 * @returns {EventControl}
	 */
	static toEventControl(buffer) {
		const u8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset) :
			new Uint8Array(buffer)

	}

	/**
	 * @param {EventControl} eventControl
	 * @returns {I2CBufferSource}
	 */
	static fromEventControl(eventControl) {
		const buffer = new Uint8Array()
		// todo
		return buffer
	}

	/**
	 * @param {I2CBufferSource} buffer
	 * @returns {Capture}
	 */
	static toCapture(buffer) {
		const u8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset) :
			new Uint8Array(buffer)
	}

}
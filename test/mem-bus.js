
/** @import { I2CBus } from '@johntalton/and-other-delights' */

/** @type {I2CBus} */
export class MemBus {
	lastRegister = 0
	lastBytesLength = 0
	#mem
	constructor(mem) { this.#mem = mem }

	supportsMultiByteDataAddress = true
	name = 'mem'
	supportsScan = false

	close() {}

	async scan() { return [] }

	async sendByte() {}

	async readI2cBlock(address, cmd, length, targetBuffer) {
		this.lastRegister = cmd
		this.lastBytesLength = length

		return {
			bytesRead: this.#mem.byteLength,
			buffer: this.#mem
		}
	}

  async writeI2cBlock(address, cmd, length, buffer) {
		this.lastRegister = cmd
		this.#mem = buffer
		this.lastBytesLength = length

		return {
			bytesWritten: buffer.byteLength,
			buffer
		}
	}

	async i2cRead() {

		return {
			bytesRead: this.#mem.byteLength,
			buffer: this.#mem
		}
	}

	async i2cWrite() {

		return {
			bytesWritten: 0,
			buffer: Uint8Array.from([])
		}
	}
}
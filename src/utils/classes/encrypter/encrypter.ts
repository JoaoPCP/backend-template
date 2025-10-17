import { IEncrypter } from "./IEncrypter"
import bcrypt from "bcrypt"

export const bcryptAdapter: IEncrypter = {
	async hash(data: string): Promise<string> {
		return bcrypt.hash(data, 10)
	},

	async compare(data: string | Buffer, encrypted: string): Promise<boolean> {
		return bcrypt.compare(data, encrypted)
	}
}

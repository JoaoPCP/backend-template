import jwt from "jsonwebtoken"
import { IAuthenticator } from "./IAuthenticator"
import { User } from "@/domain/user/model/user"
import { randomUUID } from "crypto"
import { StringValue } from "ms"

const {
	REFRESH_TOKEN_SECRET,
	ACESS_TOKEN_SECRET,
	REFRESH_TOKEN_EXPIRE_TIME,
	ACESS_TOKEN_EXPIRE_TIME
} = process.env
export const jwtAuth: IAuthenticator = {
	sign(user: User) {
		const rtid = randomUUID()
		const accessToken = jwt.sign(
			{ userId: user.id, name: user.name },
			ACESS_TOKEN_SECRET,
			{ expiresIn: ACESS_TOKEN_EXPIRE_TIME as StringValue }
		)
		const refreshToken = jwt.sign(
			{ userId: user.id, rtid },
			REFRESH_TOKEN_SECRET,
			{ expiresIn: REFRESH_TOKEN_EXPIRE_TIME as StringValue }
		)
		return { accessToken, refreshToken: { refreshToken, rtid } }
	},
	verify(clientToken: string) {
		const decoded = jwt.verify(clientToken, ACESS_TOKEN_SECRET) as {
			userId: number
		}
		return decoded
	}
}

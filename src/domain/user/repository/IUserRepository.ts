import { IRepository } from "@/utils/interfaces/IRepository"
import { User } from "../model/user"
import { RefreshTokenDTO } from "../useCases/auth/types/authTokens"

export interface IUserRepository extends IRepository<User> {
	findByEmail(email: string): Promise<User | null>
	findByPhone(phoneNumber: string): Promise<User | null>
	registerRefreshToken(
		userId: number,
		refreshToken: RefreshTokenDTO
	): Promise<void>
	getRefreshToken(userId: number): Promise<string>
}

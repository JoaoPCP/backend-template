import { User } from "@/domain/user/model/user"
import { RefreshTokenDTO } from "@/domain/user/useCases/auth/types/authTokens"

export interface IAuthenticator {
	sign(user: User): { accessToken: string; refreshToken: RefreshTokenDTO }
	verify(clientToken: string): { userId: number }
}

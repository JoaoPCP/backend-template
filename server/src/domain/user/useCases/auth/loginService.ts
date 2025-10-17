import { IService } from "@/utils/interfaces/IService"
import { UserCredentials } from "./types/userCredentials"
import { IEncrypter } from "@/utils/classes/encrypter/IEncrypter"
import { IUserRepository } from "../../repository/index"
import { User } from "../../model/user"
import { IAuthenticator } from "@/utils/classes/authenticator/IAuthenticator"
import { AuthTokens } from "./types/authTokens"

export class LoginService implements IService<UserCredentials, AuthTokens> {
	constructor(
		private readonly userRepo: IUserRepository,
		private readonly encrypter: IEncrypter,
		private readonly authenticator: IAuthenticator
	) {}
	async execute(args: UserCredentials): Promise<AuthTokens> {
		const { login, password } = args

		let userExist: User | null
		if (login.includes("@")) userExist = await this.userRepo.findByEmail(login)
		else userExist = await this.userRepo.findByPhone(login)
		if (!userExist) throw new Error("As credenciais fornecidas são inválidas")
		const isPasswordValid = await this.encrypter.compare(
			password,
			userExist.password
		)
		if (!isPasswordValid)
			throw new Error("As credenciais fornecidas são inválidas")

		const { accessToken, refreshToken: refreshTokenDTO } =
			this.authenticator.sign(userExist)
		await this.userRepo.registerRefreshToken(userExist.id!, refreshTokenDTO)

		return { accessToken, refreshToken: refreshTokenDTO.refreshToken }
	}
}

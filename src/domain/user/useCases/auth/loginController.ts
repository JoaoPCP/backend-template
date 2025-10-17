import { IController } from "@/utils/interfaces/IController"
import { IService } from "@/utils/interfaces/IService"
import { UserCredentials } from "./types/userCredentials"
import { AuthTokens } from "./types/authTokens"
import { HttpRequest, HttpResponse } from "@/utils/protocols/http"
import { ok } from "@/utils/protocols/httpResponse"
import { Cookie } from "@/routing/types/cookie"

export class LoginController implements IController {
	constructor(
		private readonly loginService: IService<UserCredentials, AuthTokens>
	) {}
	async handle(request: HttpRequest): Promise<HttpResponse> {
		const { login, password } = request.body as UserCredentials
		const tokens = await this.loginService.execute({ login, password })

		//TODO: melhorar options dos cookies

		const cookies: Cookie[] = [
			{
				name: "access",
				val: tokens.accessToken,
				options: { httpOnly: true, secure: true }
			},
			{
				name: "refresh",
				val: tokens.refreshToken,
				options: { httpOnly: true, secure: true }
			}
		]
		return ok({ body: "Login realizado", cookies })
	}
}

import { IAuthenticator } from "@/utils/classes/authenticator/IAuthenticator"
import IMiddleware from "@/utils/interfaces/IMiddleware"
import { HttpRequest } from "@/utils/protocols/http"
import { unauthorized } from "@/utils/protocols/httpResponse"

export default class AuthMiddleware implements IMiddleware {
	constructor(private readonly authenticator: IAuthenticator) {}

	handle(req: HttpRequest) {
		const token = req.cookies ? req.cookies["access"] : undefined

		if (!token) {
			return unauthorized(new Error("Usuário não autenticado"))
		}

		try {
			const { userId } = this.authenticator.verify(token)
			req.userId = userId
		} catch (error) {
			return unauthorized(new Error("Erro na autorização do usuário " + error))
		}
	}
}

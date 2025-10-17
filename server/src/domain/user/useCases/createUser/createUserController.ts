import { HttpRequest, HttpResponse } from "../../../../utils/protocols/http"
import { badRequest, created } from "../../../../utils/protocols/httpResponse"
import { User } from "../../model/user"
import { IController } from "@/utils/interfaces/IController"
import { IService } from "@/utils/interfaces/IService"
import { UserDTO } from "../../model/UserDTO"

export class CreateUserController implements IController {
	constructor(private readonly criarUsuarioService: IService<UserDTO, User>) {}
	async handle(request: HttpRequest<UserDTO>): Promise<HttpResponse> {
		try {
			//TODO: Tratar erro de body vazio propriamente
			const { name, email, password, phoneNumber } = request.body!
			const user = await this.criarUsuarioService.execute({
				name,
				email,
				password,
				phoneNumber
			})
			return created({ body: user })
		} catch (error) {
			return badRequest(
				error instanceof Error ? error : new Error(String(error))
			)
		}
	}
}

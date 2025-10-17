import { createRouter } from "@/utils/createRouter"
import { LoginController } from "@/domain/user/useCases/auth/loginController"
import { LoginService } from "@/domain/user/useCases/auth/loginService"
import { UserRepository } from "@/domain/user/repository/UserRepository"
import prisma from "@/infra/db/prisma/connection"
import { jwtAuth } from "@/utils/classes/authenticator/authenticator"
import { bcryptAdapter } from "@/utils/classes/encrypter/encrypter"
import { adaptRoute } from "@/routing/adapters/adaptRouter"
import { adaptMiddleware } from "@/routing/adapters/adaptMiddleware"
import AuthMiddleware from "../middlewares/authMiddleware"

export const authMiddleware = adaptMiddleware(new AuthMiddleware(jwtAuth))
const auth = createRouter([
	{
		method: "post",
		path: "/auth",
		handlers: [
			adaptRoute(
				new LoginController(
					new LoginService(new UserRepository(prisma), bcryptAdapter, jwtAuth)
				)
			)
		]
	}
])

export default auth

import { createRouter } from "../../utils/createRouter"

import { UserRepository } from "@/domain/user/repository/UserRepository"
import { CreateUserController } from "@/domain/user/useCases/createUser/createUserController"
import { CreateUserService } from "@/domain/user/useCases/createUser/createUserService"
import prisma from "@/infra/db/prisma/connection"
import { bcryptAdapter } from "@/utils/classes/encrypter/encrypter"
import { adaptRoute } from "../adapters/adaptRouter"

const userRouter = createRouter([
	{
		method: "post",
		path: "/createUser",
		handlers: [
			adaptRoute(
				new CreateUserController(
					new CreateUserService(new UserRepository(prisma), bcryptAdapter)
				)
			)
		]
	}
])

export default userRouter

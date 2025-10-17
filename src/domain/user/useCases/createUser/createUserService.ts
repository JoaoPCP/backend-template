import { IService } from "@/utils/interfaces/IService"
import { User } from "../../model/user"
import { IUserRepository } from "../../repository/IUserRepository"
import { IEncrypter } from "@/utils/classes/encrypter/IEncrypter"
import { UserDTO } from "../../model/UserDTO"

export class CreateUserService implements IService<UserDTO, User> {
	constructor(
		private readonly userRep: IUserRepository,
		private readonly encrypter: IEncrypter
	) {}
	async execute(args: UserDTO): Promise<User> {
		const { name, email, password, phoneNumber } = args
		const hashedPassword = await this.encrypter.hash(password, 10)
		const user = User.create({
			name,
			email,
			password: hashedPassword,
			phoneNumber
		})
		const savedUser = await this.userRep.save(user)
		return savedUser
	}
}

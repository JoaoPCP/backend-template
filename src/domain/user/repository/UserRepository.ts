import { PrismaClient } from "../../../../prismaClient/client"
import { User } from "../model/user"
import { RefreshTokenDTO } from "../useCases/auth/types/authTokens"
import { IUserRepository } from "./IUserRepository"

export class UserRepository implements IUserRepository {
	constructor(private readonly prisma: PrismaClient) {}
	async save(user: User): Promise<User> {
		const { name, email, password, phoneNumber } = user
		try {
			await this.prisma.user.create({
				data: {
					name,
					email,
					password,
					phoneNumber
				}
			})

			return user
		} catch (error) {
			throw new Error("DATABASE ERROR:" + error)
		}
	}
	async delete(id: number): Promise<void> {
		try {
			await this.prisma.user.delete({
				where: { id }
			})
		} catch (error) {
			throw new Error("DATABASE ERROR:" + error)
		}
	}
	async findAll(): Promise<User[]> {
		try {
			const usersDB = await this.prisma.user.findMany()
			const userList = usersDB.map((user) => User.fromDB(user, user.id))
			return userList
		} catch (error) {
			throw new Error("DATABASE ERROR:" + error)
		}
	}
	async findById(id: number): Promise<User | null> {
		try {
			const userDB = await this.prisma.user.findUnique({
				where: { id }
			})
			if (!userDB) return null
			const user = User.fromDB(userDB, userDB.id)
			return user
		} catch (error) {
			throw new Error("DATABASE ERROR:" + error)
		}
	}

	async update(id: number, user: Partial<User>): Promise<User> {
		const { name, email, password, phoneNumber } = user
		try {
			const updatedUserDB = await this.prisma.user.update({
				data: { name, email, password, phoneNumber },
				where: { id }
			})
			const updatedUser = User.fromDB(updatedUserDB, id)
			return updatedUser
		} catch (error) {
			throw new Error("DATABASE ERROR:" + error)
		}
	}

	async findByPhone(phoneNumber: string): Promise<User | null> {
		try {
			const userDB = await this.prisma.user.findFirst({
				where: { phoneNumber }
			})
			if (!userDB) return userDB
			const user = User.fromDB(userDB, userDB.id)
			return user
		} catch (error) {
			throw new Error("DATABASE ERROR:" + error)
		}
	}

	async findByEmail(email: string): Promise<User | null> {
		try {
			const userDB = await this.prisma.user.findFirst({
				where: { email }
			})
			if (!userDB) return userDB
			const user = User.fromDB(userDB, userDB.id)
			return user
		} catch (error) {
			throw new Error("DATABASE ERROR:" + error)
		}
	}

	async registerRefreshToken(
		userId: number,
		refreshTokenDTO: RefreshTokenDTO
	): Promise<void> {
		const { refreshToken, rtid } = refreshTokenDTO
		try {
			await this.prisma.refreshToken.upsert({
				create: { rtid, refreshToken, userId },
				update: { rtid, refreshToken, userId },
				where: { userId }
			})
		} catch (error) {
			throw new Error("DATABASE ERROR:" + error)
		}
	}

	async getRefreshToken(userId: number): Promise<string> {
		try {
			const token = await this.prisma.refreshToken.findUniqueOrThrow({
				select: { refreshToken: true },
				where: { userId }
			})
			return token.refreshToken
		} catch (error) {
			throw new Error("DATABASE ERROR:" + error)
		}
	}
}

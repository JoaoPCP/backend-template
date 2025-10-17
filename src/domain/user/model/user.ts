import { Entity } from "@/utils/interfaces/Entity"
import { UserDTO } from "./UserDTO"

interface UserProps {
	name: string
	password: string
	email: string | null
	phoneNumber: string | null
}

export class User extends Entity<UserProps> {
	constructor(id: number | null, props: UserProps) {
		super(id, props)
	}
	static create(props: UserDTO) {
		const user = new User(null, {
			name: props.name,
			password: props.password,
			email: props.email || null,
			phoneNumber: props.phoneNumber || null
		})
		return user
	}
	static fromDB(props: UserProps, id: number) {
		const user = new User(id, {
			name: props.name,
			password: props.password,
			email: props.email || null,
			phoneNumber: props.phoneNumber || null
		})
		return user
	}
	get name() {
		return this.props.name
	}
	get email(): string | undefined | null {
		return this.props.email
	}
	get password() {
		return this.props.password
	}
	get phoneNumber() {
		return this.props.phoneNumber
	}

	public set name(value: string) {
		if (value.length < 3) {
			throw new Error("Nome deve ter pelo menos 3 caracteres")
		}
		this.props.name = value
	}

	public set email(value: string) {
		this.props.email = value
	}

	public set password(value: string) {
		this.props.password = value
	}
}

import { Cookie } from "@/routing/types/cookie"

export const ok = (res: { body: string | object; cookies?: Cookie[] }) => ({
	statusCode: 200,
	body: res.body,
	cookies: res.cookies
})

export const created = (res: {
	body: string | object
	cookies?: Cookie[]
}) => ({
	statusCode: 201,
	body: res.body,
	cookies: res.cookies
})

export const badRequest = (error: Error) => ({
	statusCode: 400,
	body: {
		message: error.message
	}
})

export const unauthorized = (error: Error) => ({
	statusCode: 401,
	body: {
		message: error.message
	}
})

export const forbidden = (error: Error) => ({
	statusCode: 403,
	body: {
		message: error.message
	}
})

export const notFound = (error: Error) => ({
	statusCode: 404,
	body: {
		message: error.message
	}
})

export const conflict = (error: Error) => ({
	statusCode: 409,
	body: {
		message: error.message
	}
})

export const serverError = (error: Error) => ({
	statusCode: 500,
	body: {
		message: "Internal server error",
		details: error.message
	}
})

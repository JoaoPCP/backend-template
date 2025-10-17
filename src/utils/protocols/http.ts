import { Cookie } from "@/routing/types/cookie"
import { IncomingHttpHeaders } from "http"

export type HttpResponse = {
	statusCode: number
	body: object | string
	headers?: IncomingHttpHeaders
	cookies?: Cookie[]
}

export interface HttpRequest<T = unknown> {
	body?: T
	headers?: IncomingHttpHeaders
	params?: Record<string, string>
	query?: Record<string, string>
	cookies?: Record<string, string | undefined>
	userId?: number
}

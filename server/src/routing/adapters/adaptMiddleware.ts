import IMiddleware from "@/utils/interfaces/IMiddleware"
import { HttpRequest } from "@/utils/protocols/http"
import { NextFunction, Request, Response } from "express"

export const adaptMiddleware = (middleware: IMiddleware) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const httpRequest: HttpRequest = {
			params: req.params,
			body: req.body,
			headers: req.headers,
			query: req.query as Record<string, string>,
			cookies: req.cookies
		}

		const httpResponse = await middleware.handle(httpRequest)
		if (httpResponse) {
			res.status(httpResponse.statusCode).json(httpResponse.body)
		} else next()
	}
}

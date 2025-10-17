import { IController } from "../../utils/interfaces/IController"
import { HttpRequest } from "../../utils/protocols/http"
import { Request, Response } from "express"

export const adaptRoute = (controller: IController) => {
	return async (req: Request, res: Response) => {
		const httpRequest: HttpRequest = {
			params: req.params,
			body: req.body,
			headers: req.headers,
			query: req.query as Record<string, string>,
			cookies: req.cookies
		}

		const httpResponse = await controller.handle(httpRequest)
		if (httpResponse.cookies) {
			for (const cookie of httpResponse.cookies) {
				res.cookie(cookie.name, cookie.val, cookie.options)
			}
		}
		res.status(httpResponse.statusCode).json(httpResponse.body)
	}
}

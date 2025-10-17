import { HttpRequest, HttpResponse } from "../protocols/http"

export default interface IMiddleware {
	handle(request: HttpRequest): void | HttpResponse
}

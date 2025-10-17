import { RequestHandler, Router } from "express"

interface RouteConfig {
	method: "get" | "post" | "put" | "delete"
	path: string
	handlers: RequestHandler[]
}

export function createRouter(config: RouteConfig[]) {
	const router = Router()
	config.forEach((route) => {
		router[route.method](route.path, ...route.handlers)
	})
	return router
}

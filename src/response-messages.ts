export default {
	Success: {
		Success: `Success.`,
		Created: `Created.`,
		DatabaseConnected: 'Database Connected Successfully.',
		ServerStartUp: `App is running at http://localhost:<%-port%> in <%-mode%>.`,
		StopServerMessage: `Press CTRL-C to stop.`,
	},
	Error: {
		NotFound: `Not found.`,
		BadRequest: `Bad Request.`,
		Unauthorized: `Un-authorized access.`,
		InternalServerError: `Server error`,
		UnprocessableEntity: `Unprocessable Entity.`,
		UrlNotFound: `Route '<%-url%>' not found on this server.`,
		DatabaseConnectionFailed: 'Database Connection Failed.',
		MissingEnvFile: `Missing environment file for NODE_ENV=<%-environment%>`,
	},
}

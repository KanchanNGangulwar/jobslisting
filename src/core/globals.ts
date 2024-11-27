import Config, { ConfigInterface } from '@config'
import { Logger } from './logger'
import { GenerateCallableMessages } from './utils'
import messages from '../response-messages'
// import notificationMessages from '../notification-messages'

// Database Models
import LinkedinJobModel from '@models/linkedin_jobs.model'

const config: ConfigInterface = Config()
// Export Global Variables
export const Global: any = global
Global.Logger = Logger
Global.App = {
	Config: config,
	Message: GenerateCallableMessages(messages),
	// Notification: GenerateCallableMessages(notificationMessages),
	Models: {
		LinkedinJob: LinkedinJobModel
	},
}

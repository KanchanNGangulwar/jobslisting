import { ConfigInterface } from '@config'
import dotenv from 'dotenv'
dotenv.config()

export default (): ConfigInterface => {
	return {
		PORT: +process.env.PORT,
		ENVIRONMENT: process.env.NODE_ENV,
		DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
		ITEMS_PER_PAGE: +process.env.ITEMS_PER_PAGE,
		BCRYPT_SALTROUND: process.env.BCRYPT_SALTROUND,
		COINGECKO: {
			URL: process.env.COINGECKO_URL,
			API_KEY: process.env.COINGECKO_API_KEY
		},
		LINKEDIN: {
			URL: process.env.LINKEDIN_URL,
			API_KEY: process.env.LINKEDIN_API_KEY
		},
		NAUKRI: {
			URL: process.env.NAUKRI_URL,
			API_KEY: process.env.NAUKRI_API_KEY
		},
		JWT: {
			SECRET: process.env.JWT_SECRET,
			EXPIRY: process.env.JWT_EXPIRY,
		},
	}
}

import '@core/declarations'
import { Request, Response, NextFunction } from 'express'
import * as fs from 'fs'
import ejs from 'ejs'
import jwt from 'jsonwebtoken'
import { IAxiosConfig } from 'interfaces'
import constant from './constants'
import Web3 from 'web3'

export const FileExistsSync = (FilePath: string) => {
	return fs.existsSync(`${FilePath}.js`) || fs.existsSync(`${FilePath}.ts`)
}

export function Wrap(controller: CallableFunction) {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await controller(req, res, next)
		} catch (error) {
			Logger.error(error)
			return res.internalServerError({ error: error?.message })
		}
	}
}

export function GenerateCallableMessages(_Messages: any) {
	const Messages = {}

	;(function _GenerateCallableMessages(target, values: any) {
		try {
			for (const key in values) {
				if (typeof values[key] === 'string') {
					target[key] = (params: any) => {
						return ejs.render(values[key], params)
					}
				} else {
					target[key] = {}
					_GenerateCallableMessages(target[key], values[key])
				}
			}
		} catch (error) {
			Logger.error(error)
		}
	})(Messages, _Messages)

	return Messages
}

export function GenerateAuthToken(payload): string {
	const token = jwt.sign(payload, App.Config.JWT.SECRET, { expiresIn: App.Config.JWT.EXPIRY })
	return token
}


export const axiosConfig = ({ url, method, data, headers }: IAxiosConfig) => {
	const obj = {
		url,
		method,
		...(data ? { data } : {}),
		headers,
	}

	return obj
}

export function isObject(value: any) {
	return Object.prototype.toString.call(value) === '[object Object]'
}

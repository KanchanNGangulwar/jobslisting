import '@core/declarations'
import { Schema, model as Model, Document, ObjectId } from 'mongoose'
import constant from '@core/constants'

export interface ILinkedinJobDetail extends Document {
	platform: string
	company: string
	company_url: string
	job_title: string
	job_url: string
	list_date: string
	location: string
	description: string
}

const LinkedinJobSchema = new Schema<ILinkedinJobDetail>(
	{
		platform: { type: String },
		company: { type: String },
		company_url: { type: String },
		description: { type: String },
		job_title: {
			type: String,
		},
		job_url: {
			type: String,
		},
		list_date: {
			type: String,
		},
		location: {
			type: String,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

const LinkedinJobModel = Model<ILinkedinJobDetail>(constant.MODELS.LINKEDIN_JOBS, LinkedinJobSchema)
export default LinkedinJobModel

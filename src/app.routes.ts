import '@core/declarations'
import { Router } from 'express'

import linkedinJobsRouter from '@modules/linkedin_jobs/routes'
import indeedJobsRouter from '@modules/indeed_jobs/routes'
import glassdoorJobsRouter from '@modules/glassdoor_jobs/routes'

const router = Router()

router.use('/linkedinjobs', linkedinJobsRouter)
router.use('/indeedjobs', indeedJobsRouter)
router.use('/glassdoor', glassdoorJobsRouter)


export const AppRoutes = router

import { Router } from 'express'
import Controller from '../controller'
import { Wrap } from '@core/utils'

const router = Router()

router.get('/', Wrap(Controller.GetLinkedInJobs))
router.post('/', Wrap(Controller.BulkCreateLinkedinJobs))

export default router
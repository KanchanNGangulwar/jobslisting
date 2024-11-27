import { Router } from 'express'
import Controller from '../controller'
import { Wrap } from '@core/utils'

const router = Router()

router.get('/', Wrap(Controller.GetIndeedJobs))
router.post('/', Wrap(Controller.BulkCreateIndeedJobs))

export default router
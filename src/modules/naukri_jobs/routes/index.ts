import { Router } from 'express'
import Controller from '../controller'
import { Wrap } from '@core/utils'

const router = Router()

router.get('/', Wrap(Controller.getNaukriJobs))
// router.post('/', Wrap(Controller.BulkCreateGlassdoorJobs))

export default router
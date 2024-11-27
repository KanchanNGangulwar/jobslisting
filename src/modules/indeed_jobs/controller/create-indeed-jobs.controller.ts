import { Request, Response } from 'express';
import LinkedinJobModel from '../../../models/linkedin_jobs.model';
import { fetchIndeedJobs } from './get-indeed-jobs.controller'; 

export default async function BulkCreateIndeedJobs(req: Request, res: Response) {
  console.log('BulkCreateLinkedinJobs endpoint called');

  try {
    const jobData = await fetchIndeedJobs(
      req.query.keyword as string || 'engineer',
      req.query.location as string || 'india',
      // req.query.domain as string || 'www.indeed.com'
    );

    if (!jobData || jobData.length === 0) {
      return res.success({
        message: 'No job data fetched from Indeed API',
        data: [],
      });
    }

    const bulkOperations = jobData.jobs.map((job: any) => ({
      updateOne: {
        filter: { job_url: job.url },
        update: {
          $set: {
            platform: 'Indeed',
            company: job.company,
            job_title: job.title,
            job_url: job.url,
            list_date: job.date,
            location: job.location,
            description: job.description.join(' '),
          },
        },
        upsert: true,
      },
    }));
    
    const bulkWriteResult = await LinkedinJobModel.bulkWrite(bulkOperations);

    return res.success({
      message: 'Indeed job data inserted/updated successfully',
      data: bulkWriteResult,
    });
  } catch (err) {
    console.error('Error in BulkCreateLinkedinJobs:', err.message);
    return res.badRequest({
      message: 'Failed to insert Indeed job data',
      error: err.message,
    });
  }
}

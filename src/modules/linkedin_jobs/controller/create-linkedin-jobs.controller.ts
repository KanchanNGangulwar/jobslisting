import { Request, Response } from 'express';
import LinkedinJobModel from '../../../models/linkedin_jobs.model';
import { fetchLinkedInJobs } from '../controller/get-linkedin-jobs.controller'; // Assuming you abstracted the job fetch function

export default async function BulkCreateLinkedinJobs(req: Request, res: Response) {
  console.log('BulkCreateLinkedinJobs endpoint called');

  try {
    const jobData = await fetchLinkedInJobs(
      req.query.jobType as string || 'software engineer',
      req.query.experienceLevel as string || 'entry_level',
      req.query.timePeriod as string || 'past-month',
      req.query.flexibility as string || 'remote',
      parseInt(req.query.geoId as string, 10) || 92000000,
      req.query.keyword as string || 'software engineer'
    );
    if (!jobData || !jobData.job || jobData.job.length === 0) {
        console.log('No job data fetched from LinkedIn API');
      } else {
        console.log('Job data fetched:', jobData.job);
      }
      
    const bulkOperations = jobData.job.map((job: any) => ({
      updateOne: {
        filter: { job_url: job.job_url },
        update: {
          $set: {
            platform: 'LinkedIn',
            company: job.company,
            company_url: job.company_url,
            job_title: job.job_title,
            job_url: job.job_url,
            list_date: job.list_date,
            location: job.location,
          },
        },
        upsert: true,
      },
    }));

    const bulkWriteResult = await LinkedinJobModel.bulkWrite(bulkOperations);

    return res.success({
      message: 'LinkedIn job data inserted/updated successfully',
      data: bulkWriteResult,
    });
  } catch (err) {
    console.error('Error in BulkCreateLinkedinJobs:', err.message);
    return res.badRequest({ message: 'Failed to insert LinkedIn job data', error: err.message });
  }
}

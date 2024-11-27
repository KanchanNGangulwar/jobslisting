import { Request, Response } from 'express';
import LinkedinJobModel from '../../../models/linkedin_jobs.model';
import { fetchGlassdoorJobs } from './get-glassdoor-jobs.controller';

// export default async function BulkCreateGlassdoorJobs(req: Request, res: Response) {
//   try {
//     const filters = {
//       page: 0,
//       limit: 25,
//       job_title_or: ['engineer'],
//       remote: true,
//       job_location_pattern_or: ['New York', 'California', 'remote'],
//       job_title_not: ['Intern'],
//       job_country_code_or: ['US', 'IN'],
//       discovered_at_max_age_days: 2,
//       job_description_pattern_or: ['remote', 'AI'],
//       posted_at_max_age_days: 7,
//       company_location_pattern_or: ['Berlin', 'San Francisco'],
//     };

//     const jobData = await fetchGlassdoorJobs();

//     if (!jobData || jobData.length === 0) {
//       return res.success({
//         message: 'No job data fetched from Glassdoor API',
//         data: [],
//       });
//     }

//     const bulkOperations = jobData.data.map((job: any) => ({
//       updateOne: {
//         filter: { job_url: job.url },
//         update: {
//           $set: {
//             platform: 'Glassdoor',
//             company: job.company,
//             job_title: job.job_title,
//             job_url: job.url,
//             list_date: job.date_posted,
//             location: job.location,
//             description: job.description,
//           },
//         },
//         upsert: true,
//       },
//     }));

//     const bulkWriteResult = await LinkedinJobModel.bulkWrite(bulkOperations);

//     return res.success({
//       message: 'Glassdoor job data inserted/updated successfully',
//       data: bulkWriteResult,
//     });
//   } catch (err) {
//     return res.badRequest({
//       message: 'Failed to insert Glassdoor job data',
//       error: err.message,
//     });
//   }
// }

export default async function BulkCreateGlassdoorJobs() {
  console.log('BulkCreateGlassdoorJobs endpoint called');
  try {
    const jobData = await fetchGlassdoorJobs();

    console.log('Job data:', jobData);

    if (!jobData || jobData.length === 0) {
      console.log('No job data fetched from Glassdoor API');
    }
    const bulkOperations = jobData.data.map((job: any) => ({
      updateOne: {
        filter: { job_url: job.url },
        update: {
          $set: {
            platform: 'Glassdoor',
            company: job.company,
            job_title: job.job_title,
            job_url: job.url,
            list_date: job.date_posted,
            location: job.location,
            description: job.description,
          },
        },
        upsert: true,
      },
    }));

    const bulkWriteResult = await LinkedinJobModel.bulkWrite(bulkOperations);

    console.log('Bulk write result:', bulkWriteResult);
  } catch (err) {
    console.error('Error in BulkCreateGlassdoorJobs:', err.message);
  }
}
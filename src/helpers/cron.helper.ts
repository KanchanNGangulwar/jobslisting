import '@core/declarations'
import cron from 'node-cron'
import  BulkCreateGlassdoorJobs  from '@modules/glassdoor_jobs/controller/create-glassdoor-jobs.controller';
import BulkCreateIndeedJobs  from '@modules/indeed_jobs/controller/create-indeed-jobs.controller';
import BulkCreateLinkedinJobs from '@modules/linkedin_jobs/controller/create-linkedin-jobs.controller';

class CronHelper {
  async cronJob(): Promise<void> {
	console.log("inside CRON")
    // Schedule job to run every 5 minutes
    cron.schedule('0 6 * * *', async () => {
      console.log('Running scheduled job to fetch and update Glassdoor jobs...')

      try {
        // Glassdoor jobs
        await BulkCreateGlassdoorJobs();
        // Indeed jobs
        const mockReqIndeed = {
                  query: {
                    keyword: 'engineer',
                    location: 'india',
                  },
                } as any; 
        const mockResIndeed = {
                  success: (data: any) => console.log('Indeed Response success:', data),
                  badRequest: (data: any) => console.error('Indeed Response error:', data),
                } as any;
        await BulkCreateIndeedJobs(mockReqIndeed, mockResIndeed);
        // LinkedIn Jobs
        const mockReqLinkedIn = {
                  query: {
                    jobType: 'software engineer',
                    experienceLevel: 'entry_level',
                    timePeriod: 'past-month',
                    flexibility: 'remote',
                    geoId: '92000000',
                    keyword: 'software engineer',
                  },
                } as any;
        const mockResLinkedIn = {
                  success: (data: any) => console.log('LinkedIn Response success:', data),
                  badRequest: (data: any) => console.error('LinkedIn Response error:', data),
                } as any;
        await BulkCreateLinkedinJobs(mockReqLinkedIn, mockResLinkedIn);
      } catch (error) {
        console.error('Error in cron job execution:', error)
      }
    }, {
      timezone: 'Asia/Kolkata'
    })
  }
}

export default new CronHelper()

import { Request, Response } from 'express';
import axios from 'axios';

const PROXYCURL_API_BASE_URL = process.env.LINKEDIN_URL; 
const PROXYCURL_API_KEY = process.env.LINKEDIN_API_KEY;
// const PROXYCURL_API_BASE_URL = 'https://nubela.co/proxycurl/'; 
// const PROXYCURL_API_KEY = 'ZZ0GZPa7AGqLSfX1UbsZNA';

export const fetchLinkedInJobs = async (
  jobType: string,
  experienceLevel: string,
  timePeriod: string,
  flexibility: string,
  geoId: number,
  keyword: string
): Promise<any> => {
  console.log('Fetching LinkedIn jobs with the following parameters:');

  try {
    const response = await axios.get(
      `${PROXYCURL_API_BASE_URL}/api/v2/linkedin/company/job`,
      {
        params: {
          job_type: jobType,
          experience_level: experienceLevel,
          when: timePeriod,
          flexibility: flexibility,
          geo_id: geoId,
          keyword: keyword,
        },
        headers: {
          Authorization: `Bearer ${PROXYCURL_API_KEY}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching LinkedIn job data:', error.response?.data || error.message);
    return null;
  }
};

export async function GetLinkedInJobs(req: Request, res: Response) {
  console.log('GetLinkedInJobs endpoint called');

  try {
    const {
      jobType = 'software engineer',
      experienceLevel = 'entry_level',
      timePeriod = 'past-month',
      flexibility = 'remote',
      geoId = 92000000, 
      keyword = 'software engineer',
    } = req.query;

    console.log('Parsed query parameters:');
    const jobData = await fetchLinkedInJobs(
      jobType as string,
      experienceLevel as string,
      timePeriod as string,
      flexibility as string,
      parseInt(geoId as string, 10),
      keyword as string
    );

    if (!jobData) {
      return res.badRequest({ message: 'Failed to fetch LinkedIn job data' });
    }

    return res.success({
      message: 'LinkedIn job data retrieved successfully',
      data: jobData,
    });
  } catch (err) {
    console.error('Error in GetLinkedInJobs endpoint:', err.message);
    return res.badRequest({ err: err.message });
  }
}

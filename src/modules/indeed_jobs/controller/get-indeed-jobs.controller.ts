import { Request, Response } from 'express';
import axios from 'axios';

const INDEED_API_BASE_URL = process.env.INDEED_URL;
const INDEED_API_KEY = process.env.INDEED_API_KEY;
// const INDEED_API_BASE_URL = 'https://api.hasdata.com/scrape/indeed/listing';
// const INDEED_API_KEY = '1ccdad54-275b-4eb3-ad28-a6ea76b5e4cd';

export const fetchIndeedJobs = async (
  keyword: string,
  location: string,
  // domain: string
): Promise<any> => {
  console.log('Fetching Indeed jobs with the following parameters:');

  try {
    const response = await axios.get(INDEED_API_BASE_URL, {
      params: {
        keyword,
        location,
        // domain,
      },
      headers: {
        'x-api-key': INDEED_API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching Indeed job data:', error.response?.data || error.message);
    return null;
  }
};

export async function GetIndeedJobs(req: Request, res: Response) {
  console.log('GetIndeedJobs endpoint called');
  console.log('Request query parameters:', req.query);

  try {
    const {
      keyword = 'software',
      // keyword = 'software developer',
      location = 'india',
      // domain = 'www.indeed.com',
    } = req.query;

    console.log('Parsed query parameters:');
    const jobData = await fetchIndeedJobs(
      keyword as string,
      location as string,
      // domain as string
    );

    if (!jobData) {
      console.error('Failed to fetch Indeed job data.');
      return res.badRequest({ message: 'Failed to fetch Indeed job data' });
    }

    return res.success({
      message: 'Indeed job data retrieved successfully',
      data: jobData,
    });
  } catch (err) {
    console.error('Error in GetIndeedJobs endpoint:', err.message);
    return res.badRequest({ err: err.message });
  }
}

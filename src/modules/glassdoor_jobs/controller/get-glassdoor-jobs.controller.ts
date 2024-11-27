import { Request, Response } from 'express';
import axios from 'axios';

const API_BASE_URL = process.env.GLASSDOOR_URL;
const API_KEY = process.env.GLASSDOOR_API_KEY;
// const API_BASE_URL = 'https://api.theirstack.com/v1/jobs/search';
// const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJrYW5jaGFuZ2FuZ3Vsd2FyNTZAZ21haWwuY29tIiwicGVybWlzc2lvbnMiOiJ1c2VyIn0.Bo8HKC3mAGr4RPCVOrvox24VUXmjhKPAZh6gBszpGzE';

export const fetchGlassdoorJobs = async (): Promise<any> => {
  console.log('Fetching jobs with predefined filters');

  try {
    const response = await axios.post(
      API_BASE_URL,
      {
        page: 0,
        limit: 25,
        job_title_or: ["engineer"],
        remote: true,
        job_location_pattern_or: ["New York", "California", "remote"],
        job_title_not: ["Intern"],
        job_country_code_or: ["US", "IN"],
        discovered_at_max_age_days: 1,
        job_description_pattern_or: ["remote", "AI"],
        posted_at_max_age_days: 1,
        company_location_pattern_or: ["Berlin", "San Francisco"]
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Job data fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching job data:', error.response?.data || error.message);
    return null;
  }
};

export async function GetGlassdoorJobs(req: Request, res: Response) {
  console.log('GetJobs endpoint called');
  try {
    const jobData = await fetchGlassdoorJobs();
    if (!jobData) {
      console.error('Failed to fetch job data.');
      return res.status(400).json({ message: 'Failed to fetch job data' });
    }
    return res.status(200).json({
      message: 'Job data retrieved successfully',
      data: jobData,
    });
  } catch (err) {
    console.error('Error in GetJobs endpoint:', err.message);
    return res.status(400).json({ error: err.message });
  }
}

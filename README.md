
## Requirements

For development, you will only need Node.js and a node global package, Npm, installed in your environement.


## Install
    $ Redirect to REALTIMEJOBOPENINGS
    $ npm install


## Running the project for server

    $ npm start
## Description
This project includes automated cron jobs to fetch, process, and store job postings from various platforms (Glassdoor, Indeed, and LinkedIn). The cron jobs are designed to run daily at 6:00 AM IST and handle the following tasks:

Fetch Job Postings:

Retrieve job data from Glassdoor, Indeed, and LinkedIn APIs using specific search parameters (exmple - keywords, location, job type).
Process and Update Job Listings:

Check if the job already exists in the database using unique job URLs.
Insert new jobs and update existing records with the latest details (company, job title, description, etc.).
Technologies Used:

Node.js
Express.js
MongoDB
TypeScript
node-cron: For scheduling and running periodic tasks.
The cron job functions are defined as follows:

BulkCreateGlassdoorJobs: Fetches job data from Glassdoor and updates the database.
BulkCreateIndeedJobs: Fetches job data from Indeed and updates the database.
BulkCreateLinkedinJobs: Fetches job data from LinkedIn and updates the database.
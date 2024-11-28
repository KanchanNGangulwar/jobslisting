import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import cheerio from 'cheerio';
import fs from 'fs'; // Required to save the HTML content
import path from 'path'; // Required for handling file paths


puppeteer.use(StealthPlugin());

export const getNaukriJobs = async (req, res) => {
  try {
    console.log("Inside getNaukriJobs");

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
    );

    const naukriURL =
      'https://www.naukri.com/developer-jobs-in-remote?k=developer&l=remote&experience=3&nignbevent_src=jobsearchDeskGNB';
    console.log("Navigating to Naukri URL:", naukriURL);
   const pageGoto = await page.goto(naukriURL, { waitUntil: 'networkidle2', timeout: 60000 });
console.log("pageGOTO", pageGoto)
const content = await page.content();
console.log("page contetn",content.slice(0,10000))
   // Save the HTML content to a file
   const filePath = path.join(__dirname, 'naukri_jobs.html'); // Get the current directory and append the filename
   fs.writeFileSync(filePath, content, 'utf-8');  // Save content as naukri_jobs.html
   console.log(`HTML content saved to: ${filePath}`);

    // Wait for job listings or alternative container
    await page.waitForSelector('.jobTuple', { timeout: 60000 }); // Adjust the selector if needed

    // Extract the page content
    // const content = await page.content();
    console.log(content.slice(0, 1000));  // Log the first 1000 characters for debugging

    // Load content with Cheerio
    const $ = cheerio.load(content);

    const jobs = [];
    $('.jobTuple').each((i, elem) => {
      const title = $(elem).find('.title').text().trim();
      const company = $(elem).find('.subTitle').text().trim();
      const location = $(elem).find('.location').text().trim();
      const experience = $(elem).find('.experience').text().trim();
      const salary = $(elem).find('.salary').text().trim();
      const link = $(elem).find('.title a').attr('href');

      jobs.push({ title, company, location, experience, salary, link });
    });

    await browser.close();

    res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({
      success: false,
      message: 'Error fetching jobs',
      error: error.message,
    });
  }
};

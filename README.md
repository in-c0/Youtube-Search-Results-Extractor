# YouTube Scraper / Search Results Extractor

 A simple Javascript script to extract/scrape YouTube search results such as video titles, view counts, and upload dates. You can customise it to cater to your specific needs. Runs on Browser Console (F12).


**WARNING** (if you're enabling autoscroll):

  Use this script responsibly. Youtube's [crawler guideline](https://www.youtube.com/robots.txt) generally allows access to search results and public video pages, at least as of writing this README (17/09/2024). However, Automated scraping may violate Youtube's terms of service and may lead to blocking of your IP address or legal actions. If you require access to a large volume of video metadata, it's strongly recommended to use the official YouTube API.


## How to Use

   - Open the YouTube search results page you wish to scrape. e.g. https://www.youtube.com/results?search_query=ai    
   - Open the browser's developer console (usually by pressing `F12` or `Ctrl+Shift+I`).
   - Paste the script from `extract.js` into the console.
   - Run the script by hitting `Enter` to scrape the data from all visible videos.


## Available Functions

   - `runScript()`: Initiates data extraction. If the auto-scrolling is enabled, the script will continue through the search results page at a constant interval until no more new videos are loaded.
   - `downloadData(data, filename)`: Allows you to download the scraped data as a JSON file.
   - `copyToClipboard(data)`: Copies the scraped data to your clipboard.
   - `displayDataInNewWindow(data)`: Opens a new window and displays the scraped data in a formatted view.

## Download Format

   ```json
   [
       {
           "title": "Video Title",
           "views": "View Count",
           "uploadDate": "Upload Date"
       },
       {
           "title": "Video Title",
           "views": "View Count",
           "uploadDate": "Upload Date"
       },       
   ]
   ```

## Legal Considerations (Fetching Data via APIs vs. Web Scraping)

(Quote from Georgii Vyshnia https://www.kaggle.com/discussions/questions-and-answers/527479):

On a generic note, Web portals (platforms) that offer Web API consider them to be the legitimate way of extracting/consuming their data that they decided to make public. So, the only thing with API is for you to follow their technical requirements/guidelines to use the API in an appropriate way. Btw, the platforms that provide Web API for the data access often consider the ‘bruit force’ web scrapping to be the inappropriate use of their portals.

Regarding web scrapping in general, it is usually safe to scrap the data published on websites publicly (unless the website owners explicitly restrict it with some sort of notice/term-of-use statements). At the time of me typing this, there are no specific laws that prohibit web scraping in the United States, Europe, or Asia. However, most countries have legal frameworks that could potentially apply to web scraping activities (like CFAA, GDPR etc.).

Some legal violations with web scrapping may be imposed if you try to automatically retrieve the data not published publicly. This may refer to
 - Collecting personal data or sensitive information without consent.
 - Scraping copyrighted or proprietary content without explicit consent.
 - Scraping data from restricted or private areas of a website.
 - Unauthorized scraping of government websites or databases.
Etc.

However, the most severe legal consequences may be faced after the technical web scraping activities. Some of the violent scenarios may refer to
 - Reselling or distributing scraped data in an inappropriate manner
 - Collecting data for discriminatory, unethical, or malicious purposes (such as spam, phishing, fraud, or instigating DDoS attacks).

In such a situation, the person is prosecuted not because of the web scrapping per se. It becomes the consequence to the illegal way of using the data scrapped.


# License

MIT License





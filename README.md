# YouTube Scraper / Search Results Extractor

 A simple Javascript script to extract/scrape YouTube search results such as video titles, view counts, and upload dates. You can customise it to cater to your specific needs. Runs on Browser Console (F12).


**WARNING** (if you're enabling autoscroll):

  Use this script responsibly. Youtube's [crawler guideline](https://www.youtube.com/robots.txt) generally allows access to search results and public video pages, at least as of writing this README (17/09/2024). However, Automated scraping may violate Youtube's terms of service and may lead to blocking of your IP address or legal actions. If you require access to a large volume of video metadata, it's strongly recommended to use the official YouTube API.


## How to Use

   - Open the YouTube search results page you wish to scrape.
   - Open the browser's developer console (usually by pressing `F12` or `Ctrl+Shift+I`).
   - Paste the script from `extract.js` into the console.
   - Run the script by hitting `Enter` to scrape the data from all visible videos.


## Available Functions

   - `runScript()`: Initiates data extraction. If the auto-scrolling is enabled, the script will continue through the search results page at a constant interval until no more new videos are loaded.
   - `downloadData(data, filename)`: Allows you to download the scraped data as a JSON file.
   - `copyToClipboard(data)`: Copies the scraped data to your clipboard.
   - `displayDataInNewWindow(data)`: Opens a new window and displays the scraped data in a formatted view.

JSON Download Format:

   ```json
   [
       {
           "title": "Video Title",
           "views": "View Count",
           "uploadDate": "Upload Date"
       },
       ...
   ]
   ```



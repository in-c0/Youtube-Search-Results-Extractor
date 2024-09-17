# YouTube Scraper / Search Results Extractor

 A simple Javascript script to extract/scrape YouTube search results such as video titles, view counts, and upload dates. You can customise it to cater to your specific needs. Runs on Browser Console (F12).


**WARNING** (if you're enabling autoscroll):

  Use this script responsibly. Youtube's [crawler guideline](https://www.youtube.com/robots.txt) generally allows access to search results and public video pages, at least as of writing this README (17/09/2024). However, Automated scraping may violate Youtube's terms of service and may lead to blocking of your IP address or legal actions. If you require access to a large volume of video metadata, it's strongly recommended to use the official YouTube API.


## How to Use

   - Open the YouTube search results page you wish to scrape. e.g. https://www.youtube.com/results?search_query=ai    
   - Open the browser's developer console (usually by pressing `F12` or `Ctrl+Shift+I`).
   - Paste the following script (`extract.js`) into the console.
```
const waitForMilliseconds = 3000; // waits for 3 seconds before scrolling again
const videoData = [];

async function runScript() {
    // Uncomment below to enable auto-scrolling
    // await autoScroll();
    scrapeData();
}

function scrapeData() {
    const videos = document.querySelectorAll('ytd-video-renderer');
    
    videos.forEach(video => {
        const titleElement = video.querySelector('a#video-title');
        const title = titleElement ? titleElement.innerText : 'No Title';

        const viewsElement = video.querySelector('yt-formatted-string[aria-label]');
        const viewsMatch = viewsElement ? viewsElement.getAttribute('aria-label').match(/조회수\s([\d,]+회)/) : null;
        const views = viewsMatch ? viewsMatch[1] : 'No Views';

        const dateElement = video.querySelector('span.inline-metadata-item');
        const date = dateElement ? dateElement.innerText : 'No Date';

        videoData.push({
            title: title,
            views: views,
            uploadDate: date
        });
    });

    console.log(videoData);
}

// WARNING (if enabling autoscroll):
// As of 17/09/2024, Youtube's (robots.txt)[https://www.youtube.com/robots.txt] generally allows access to search results and public video pages.
// However, Automated scraping may violate Youtube's terms of service and may lead to blocking of your IP address or taking legal actions.
// Use this script responsibly. If you require access to a large volume of video metadata, it's strongly recommended to use the official YouTube API.
async function autoScroll() {
    let lastHeight = document.body.scrollHeight;
    while (true) {
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise(resolve => setTimeout(resolve, waitForMilliseconds));

        let newHeight = document.body.scrollHeight;
        if (newHeight === lastHeight) {
            break; // Stop scrolling if no new content is loaded
        }
        lastHeight = newHeight;
    }
}


function downloadData(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function copyToClipboard(data) {
    const text = JSON.stringify(data, null, 2);
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Results copied to clipboard!');
}

function displayDataInNewWindow(data) {
    const newWindow = window.open('', '', 'width=600,height=400');
    newWindow.document.write('<pre>' + JSON.stringify(data, null, 2) + '</pre>');
}



runScript();


copyToClipboard(videoData); 
```

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





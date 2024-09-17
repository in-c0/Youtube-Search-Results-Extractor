

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
        const viewsMatch = viewsElement ? viewsElement.getAttribute('aria-label').match(/\s([\d,]+views)/) : null;
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

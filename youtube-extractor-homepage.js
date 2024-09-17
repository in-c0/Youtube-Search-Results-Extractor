// This is for extracting from youtube homepage. Use youtube-extractor.js instead for extracting from search query results.

const videoData = [];
const waitTime = 2000; // 2 sec

async function autoScroll() {
    let previousHeight = 0;
    let scrollHeight = document.body.scrollHeight;

    while (previousHeight !== scrollHeight) {
        window.scrollTo(0, scrollHeight);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        previousHeight = scrollHeight;
        scrollHeight = document.body.scrollHeight;
    }
}

function scrapeData() {
    const videos = document.querySelectorAll('ytd-rich-item-renderer');

    videos.forEach(video => {
        const titleElement = video.querySelector('yt-formatted-string#video-title');
        const title = titleElement ? titleElement.innerText : 'Title not found';

        const viewsElement = video.querySelector('span.inline-metadata-item');
        const views = viewsElement ? viewsElement.innerText : 'Views not found';

        const dateElement = video.querySelector('span.inline-metadata-item:nth-of-type(2)');
        const date = dateElement ? dateElement.innerText : 'Date not found';

        videoData.push({
            Title: title,
            Views: views,
            UploadDate: date
        });
    });
}

async function runScript() {
    await autoScroll();
    scrapeData();
}

runScript();

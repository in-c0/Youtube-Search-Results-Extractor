// This is for extracting from youtube homepage. Use youtube-extractor.js instead for extracting from search query results.

const videoData = [];
const waitTime = 2000; // 2 sec

async function runScript() {
    // Uncomment below for enabling autoscroll. READ WARNING IN README.MD
    // await autoScroll();
    scrapeData();
}

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


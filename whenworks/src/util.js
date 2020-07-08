export function getCalendarWidth() {
    const windowWidth = window.innerWidth;
    if (windowWidth < 400) {
        return windowWidth * 0.95;
    }
    if (windowWidth < 769) {
        return windowWidth * 0.85;
    }
    return 560;
}

export function getCalendarHeight() {
    const windowHeight = window.innerHeight;
    // const fullScreenHeight = windowHeight - 150 - 80 - 56 - 20 - 42 - 20 - 30 - 20;
    const fullScreenHeight = windowHeight - 100 - 56 - 50 - 82 - 42 - 20 - 30;

    return fullScreenHeight < 240 ? 240 : fullScreenHeight;
}

function pad(number, length) {
    let str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
   
    return str;
}

export function formatDate(date) {
    if (!date) {
        return;
    }
    return date.getFullYear()
        + '-' + pad(date.getMonth() + 1, 2)
        + '-' + pad(date.getDate(), 2);
        // + ' ' + pad(date.getHours(), 2)
        // + ':' + pad(date.getMinutes(), 2)
        // + ':' + pad(date.getSeconds(), 2);
}

export function updateDocumentTitle(text) {
    if (text) {
        document.title = text;

        // todo update og meta tags? why is title not showing up in text...
        // let ogTitleEle = document.querySelector('meta[property="og:title"]');
        // if (ogTitleEle) {
        //     ogTitleEle.setAttribute("content", text);
        // }
    }
}

export function updateCalendarHeaderText(text) {
    if (text) {
        document.querySelector('.Cal__Header__wrapper').innerText = text;
    }
}
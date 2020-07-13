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

export function getCalendarHeight(type) {
    const windowHeight = window.innerHeight;
    let fullScreenHeight = windowHeight;

    if (type === 'create') {
        fullScreenHeight = windowHeight - 48 - 30 - 40 - 25 - 82 - 49 - 25 - 36 - 20;

    } else {
        fullScreenHeight = windowHeight - 48 - 25 - 32 - 41 - 40 - 25 - 82 - 49 - 25 - 36 - 20;
    }
    
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

export function formatDateRange(start, end) {
    let dates = '';
    if (start && end) {
        let startArr = start.split('-');
        let endArr = end.split('-');
        let sameYear = startArr[0] === endArr[0];

        dates += startArr[1] + '/' + startArr[2];
        if (!sameYear) {
            dates += '/' + startArr[0];
        }
        dates += ' - ';
        dates += endArr[1] + '/' + endArr[2];
        if (!sameYear) {
            dates += '/' + endArr[0];
        }
    }
    return dates;
}

export function ignoreTimezone(date) {
    const dateWithTimezoneOffset = new Date(date) || new Date();
    const userTimezoneOffset = dateWithTimezoneOffset.getTimezoneOffset() * 60000;
    return new Date(dateWithTimezoneOffset.getTime() + userTimezoneOffset);
}
export function getCalendarWidth() {
    const windowWidth = window.innerWidth;
    if (windowWidth < 769) {
        return windowWidth * 0.86
    }
    return 700;
}

export function getCalendarHeight() {
    const windowHeight = window.innerHeight;
    const fullScreenHeight = windowHeight - 150 - 48 - 56 - 20 - 42 - 20 - 30;
    return fullScreenHeight < 225 ? 225 : fullScreenHeight;
}

function pad(number, length) {
    var str = '' + number;
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
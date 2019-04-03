export function linkify(text) {
    var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(urlRegex, function(url) {
        return '<a href="'+url+'" target="_blank">' + url + '</a>';
    });
}

export function removeUrl(text) {
    var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(urlRegex, function(url) {
        return '';
    });
}

export function getUrlFromText(text){
    var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.match(urlRegex);
}

export function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function truncate(string, length){
    if (string.length > length)
       return string.substring(0,length)+'...';
    else
       return string;
};

export function hashLink(text){
    return text.replace(/([@#])([a-z\d_]+)/ig, function(_, marker, tag) {
        if (marker === "@")
            return '<a href="javascript:void(0);" onClick={alert("clicked")}>@' + tag + '</a>';
        return '<a href="javascript:void(0);" onClick={alert("clicked")}>#' + tag+'</a>';
    });
}

export function parseTextWithLinks(text){
    return linkify(hashLink(text));
}

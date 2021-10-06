function ajax(options) {
    var defaults = {
        type: 'get',
        url: '',
        async: true,
        data: {},
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function() {},
        error: function() {}
    }
    Object.assign(defaults, options);
    var xhr = new XMLHttpRequest();
    var params = '';
    for (var attr in defaults.data) {
        params += attr + '=' + defaults.data[attr] + '&';
        params = params.substr(0, params.length - 1)
    }
    if (defaults.type == 'get') {
        defaults.url += '?' + params;
    }
    xhr.open(defaults.type, defaults.url, defaults.async);
    if (defaults.type == 'post') {
        xhr.setRequestHeader('Content-Type', defaults.header['Content-Type']);
        if (defaults.header['Content-Type'] == 'application/json') {
            xhr.send(JSON.stringify(defaults.data))
        } else {
            xhr.send(params);
        }
    } else {
        xhr.send();
    }
    xhr.onload = function() {
        var contentType = xhr.getResponseHeader('content-type');
        var responseText = xhr.responseText;
        if (contentType.includes('application/json')) {
            responseText = JSON.parse(responseText);
        }
        if (xhr.status == 200) {
            defaults.success(responseText, xhr);
        } else {
            defaults.error(responseText, xhr);
        }
    }
    xhr.onerror = function() {
        defaults.error(xhr);
    }
}
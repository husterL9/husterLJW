window.addEventListener('load', function() {
    var searchInp = document.getElementById('search');
    var listBox = document.getElementById('list-box');
    var timer = null;
    searchInp.oninput = function() {
        clearTimeout(timer);
        var query = this.value;
        if (query.trim().length == 0) {
            listBox.style.display = 'none';
            return;
        }
        timer = setTimeout(function() {
            ajax({
                type: 'get',
                url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch',
                data: {
                    query: query
                },
                success: function(result) {
                    listBox.innerHTML = ''
                    for (var i = 0; i < result.message.length; i++) {
                        var str = '<li><a href="#" alt="">' + result.message[i].goods_name + '</a></li>'
                        listBox.innerHTML += str
                        listBox.style.display = 'block';
                    }
                }
            })
        }, 800)

    }
})
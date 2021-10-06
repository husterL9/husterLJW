window.addEventListener('load', function() {
    var tab_list = document.querySelector('.tab_list')
    var lis = tab_list.querySelectorAll('li')
    var items = document.querySelectorAll('.item')
    for (var i = 0; i < lis.length; i++) {
        lis[i].setAttribute('index', i)
        lis[i].addEventListener('click', function() {
            for (var i = 0; i < lis.length; i++) {
                lis[i].className = ''
            }
            this.className = 'current'
            var index = this.getAttribute('index')
            for (var i = 0; i < items.length; i++) {
                items[i].style.display = 'none'
            }
            items[index].style.display = 'block'
        })
    }
    var list_box = document.querySelector('.list-box')
    ajax({
        type: 'get',
        url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',
        data: {

        },
        success: function(result) {
            var html = template('tpl', { result: result.message.goods })
            console.log(result.message.goods)
            var str = '<li><a class="aa"><img src="" alt="" ></a></li>'
            list_box.innerHTML = str
                // var a = document.querySelector('.aa')
                // a.children[0].src = result.message.goods[0].goods_name
        }
    })
})
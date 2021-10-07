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
            for (var i = 0; i < result.message.goods.length / 2; i++) {
                var str = ''
                var str = '<li><a href="" alt=""><img src="" alt="" id="aa' + i + '"></a><p class="bb' + i + '"><a href="" alt=""></a></p><span class="cc' + i + '"></span></li>'
                list_box.innerHTML += str
                var img = document.getElementById('aa' + i + '')
                var p = document.querySelector('.bb' + i + '')
                var span = document.querySelector('.cc' + i + '')
                console.log(img)
                var index = 2 * i + 1
                console.log(index)
                img.src = result.message.goods[index].goods_small_logo
                p.children[0].innerHTML = result.message.goods[index].goods_name
                span.innerHTML = '￥' + result.message.goods[index].goods_price
            }
        }
    })
})
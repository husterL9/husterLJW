window.addEventListener('load', function() {
    var banner = document.querySelector('.banner')
    var imgs = banner.querySelectorAll('img')
    const xhr = new XMLHttpRequest()
    xhr.responseType = 'json'
    xhr.open('GET', 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata')
    xhr.send()
    xhr.onload = function() {
        imgs[0].src = xhr.response.message[2].image_src
        imgs[4].src = xhr.response.message[0].image_src
        for (var i = 1; i < imgs.length - 1; i++) {
            imgs[i].src = xhr.response.message[i - 1].image_src
        }
        var floor_title = document.querySelectorAll('.floor_title')
        var product = document.querySelectorAll('.product')
        var product_imgs = new Array()
        for (var i = 0; i < product.length; i++) {
            product_imgs[i] = product[i].querySelectorAll('img')
            console.log(product_imgs[i][0])
        }
        const xhr1 = new XMLHttpRequest()
        xhr1.responseType = 'json'
        xhr1.open('GET', 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata')
        xhr1.send()
        xhr1.onload = function() {
            console.log(xhr1.response.message[0].product_list[2].image_src)
            for (var i = 0; i < floor_title.length; i++) {
                floor_title[i].children[0].src = xhr1.response.message[i].floor_title.image_src
                for (var j = 0; j < product_imgs[0].length; j++) {
                    product_imgs[i][j].src = xhr1.response.message[i].product_list[j].image_src
                }
            }
        }
    }

    //轮播图
    var banner = document.querySelector('.banner')
    var w = banner.offsetWidth
    var ul = banner.children[0]
    var ol = banner.children[1]
    var index = 0
    var timer = setInterval(function() {
        index++
        var translatex = -index * w
        ul.style.transition = 'all .3s'
        ul.style.transform = 'translateX(' + translatex + 'px)'
    }, 2000)
    ul.addEventListener('transitionend', function() {
        if (index >= 3) {
            index = 0
            var translatex = -index * w
            ul.style.transition = 'none'
            ul.style.transform = 'translateX(' + translatex + 'px)'
        } else if (index < 0) {
            index = 2
            var translatex = -index * w
            ul.style.transition = 'none'
            ul.style.transform = 'translateX(' + translatex + 'px)'
        }
        ol.querySelector('.current').classList.remove('current')
        ol.children[index].classList.add('current')
    })
    var flag = false
    var startX = 0
    var moveX = 0
    ul.addEventListener('touchstart', function(e) {
        startX = e.targetTouches[0].pageX
        clearInterval(timer)
    })
    ul.addEventListener('touchmove', function(e) {
        moveX = e.targetTouches[0].pageX - startX
        var translatex = -index * w + moveX
        ul.style.transition = 'none'
        ul.style.transform = 'translateX(' + translatex + 'px)'
        e.preventDefault()
        flag = true
    })
    ul.addEventListener('touchend', function() {
            if (flag) {
                if (Math.abs(moveX) > 100) {
                    if (moveX > 0) {
                        index--
                        var translatex = -index * w
                        ul.style.transition = 'all .3s'
                        ul.style.transform = 'translateX(' + translatex + 'px)'
                    } else {
                        index++
                        var translatex = -index * w
                        ul.style.transition = 'all .3s'
                        ul.style.transform = 'translateX(' + translatex + 'px)'
                    }
                } else {
                    var translatex = -index * w
                    ul.style.transition = 'all .3s'
                    ul.style.transform = 'translateX(' + translatex + 'px)'
                }
                timer = setInterval(function() {
                    index++
                    var translatex = -index * w
                    ul.style.transition = 'all .3s'
                    ul.style.transform = 'translateX(' + translatex + 'px)'
                }, 2000)
            }
            flag = false
        })
        //轮播图
})
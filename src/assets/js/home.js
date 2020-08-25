$(function () {
    // 轮播图
    var mySwiper = new Swiper('.swiper-container', {
        // 速度
        speed:800,
        loop: true, // 循环模式选项
        // 自动播放
        autoplay: {
            delay:5000,
        }, 
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        // 切换效果
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    })

    // 判断用户是否登录
    if(getCookie('username')){
        $('.userInfo').hide();
        $('.loginInfo').show().find('.un').text(getCookie('username'));
    }
})
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

    // 全局钩子，用于进度条的显示和小时
    $(window).ajaxSend(function (){
        /*开启这个进度条.*/
        NProgress.configure();
        NProgress.start();
    })

    $(window).ajaxComplete(function(){
        NProgress.done();
    })

    // 分类列表的渲染
    $.ajax({
        type: "get",
        url: "../../interface/categoryList.php",
        data: {},
        dataType: "json",
        success: function (response) {
            var htmlStr = template('firstList',{'data':response});
            $('#category-list').html(htmlStr);
        }
    });
})
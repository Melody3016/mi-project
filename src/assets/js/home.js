$(function () {
    // 轮播图
    var mySwiper = new Swiper('.swiper-container', {
        // 速度
        speed: 800,
        loop: true, // 循环模式选项
        // 自动播放
        autoplay: {
            delay: 5000,
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
    if (getCookie('username')) {
        $('.userInfo').hide();
        $('.loginInfo').show().find('.un').text(getCookie('username'));
    }

    // 全局钩子，用于进度条的显示和小时
    $(window).ajaxSend(function () {
        /*开启这个进度条.*/
        NProgress.configure();
        NProgress.start();
    })

    $(window).ajaxComplete(function () {
        NProgress.done();
    })

    // 分类列表的渲染
    $.ajax({
        type: "get",
        url: "../../interface/categoryList.php",
        data: {},
        dataType: "json",
        success: function (response) {
            var htmlStr = template('firstList', {
                'data': response
            });
            $('#category-list').html(htmlStr);
        }
    });

    showProList();

    // 给分类列表添加点击事件
    $('#category-list').on('click','.firstList',function(){
        // 添加now样式，并清除所有其他兄弟的now样式
        $(this).addClass('now').siblings().removeClass('now');
        var id = $(this).attr('data-id');
        showProList(id);
    })

})

// 根据传入的id，渲染商品
function showProList(id) {
    if (!id) id = 1;
    $.ajax({
        type: "get",
        url: "../../interface/productList.php",
        data: {
            id
        },
        beforeSend:function(){
            $('.second-list').html('<div class="no-data">数据加载中···</div>');
        },
        dataType: "json",
        success: function (response) {
            if(response.length===0){
                $('.second-list').html('<div class="no-data">该分类下暂无数据</div>');
                return;
            }
            var htmlStr = template('productList', {
                'data': response
            });
            $('.second-list').html(htmlStr);
        }
    });
}

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

    showList();


    // 给分类列表添加鼠标进入事件
    $('#category-list').on('mouseenter', '.firstList', function () {
        // 添加now样式，并清除所有其他兄弟的now样式
        $(this).addClass('now').siblings().removeClass('now');
        $('#list').children().eq($(this).index()).addClass('show').siblings().removeClass('show');

    })

    // 给商品添加点击事件，进入商品详情页
    $('#list').on('click', '.second-list-item', function () {
        // 将id作为参数输入到url中，跳转
        var id = $(this).attr('data-id');
        window.open('../pages/details.html?id=' + id);
    })

    // 给轮播图上的分类列表添加鼠标移入事件
    $('.slist-item').mouseenter(function () {
        // 给当前li添加active类别
        $(this).addClass('active').siblings().removeClass('active');
        // 给当前li对应的children-list添加active类别
        $('.sl-right').children().eq($(this).index()).addClass('active').siblings().removeClass('active');
    })

    // 给轮播图上的分类列表添加鼠标移出事件
    $('.shoplist').mouseleave(function () {
        $('.sl-right').children().removeClass('active');
        $('.slist-item').removeClass('active');
    })


    // 秒杀功能
    setInterval(flashSale,1000);
})

// 根据传入的id，渲染商品
function showProList(id) {
    if (!id) id = 1;
    $.ajax({
        type: "get",
        url: "../../interface/productList.php",
        data: {
            'c_id': id
        },
        beforeSend: function () {
            $('.second-list').html('<div class="no-data">数据加载中···</div>');
        },
        dataType: "json",
        success: function (response) {
            if (response.length === 0) {
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

function showList() {
    // 请求分类列表信息
    $.ajax({
        type: "get",
        url: "../../interface/categoryList.php",
        data: {},
        beforeSend: function () {
            NProgress.configure();
            NProgress.start();
        },
        dataType: "json",
        success: function (firstRes) {
            // 渲染分类列表
            var htmlStr = template('firstList', {
                'data': firstRes
            });
            $('#category-list').html(htmlStr);

            // 请求商品信息
            $.ajax({
                type: "get",
                url: "../../interface/productList.php",
                data: {},
                beforeSend: function () {
                    NProgress.configure();
                    NProgress.start();
                    $('#list').html('<div class="no-data">数据加载中···</div>');
                },
                dataType: "json",
                success: function (secondRes) {
                    // 渲染商品信息
                    var htmlStr = template('productList', {
                        firstRes,
                        secondRes
                    });
                    $('#list').html('');
                    $('#list').append(htmlStr);

                    // 渲染 slist-item 信息
                    var pStr = template('pro_List', {
                        secondRes
                    });
                    $('.sl-right').html(pStr);

                    // 动态设置ul的宽度
                    setWidth();

                },
                complete: function () {
                    NProgress.done();
                }
            });
        }
    });

}

function setWidth() {
    $('.children-list').each(function () {
        var total = $(this).children().length;
        var num = parseInt(total / 7) + 1;
        $(this).css('width', num * 250);
    })

}

// 秒杀功能
function flashSale() {
    var date = new Date();
    var hour = date.getHours();

    var minute = 59 - date.getMinutes();
    var second = 59 - date.getSeconds();

    // 添0
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;
    
    var hourStr = hour + ":00 场";

    $('.round').html(hourStr);
    $('.minutes').html(minute);
    $('.seconds').html(second);

}
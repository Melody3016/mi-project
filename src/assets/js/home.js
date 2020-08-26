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

    // 分类列表的渲染
    /* $.ajax({
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
    }); */

    showList();

    // 给分类列表添加点击事件
    /* $('#category-list').on('click', '.firstList', function () {
        // 添加now样式，并清除所有其他兄弟的now样式
        $(this).addClass('now').siblings().removeClass('now');
        var id = $(this).attr('data-id');
        showProList(id);
    }) */

    // 给分类列表添加鼠标进入事件
    $('#category-list').on('mouseenter', '.firstList', function () {
        // 添加now样式，并清除所有其他兄弟的now样式
        $(this).addClass('now').siblings().removeClass('now');
        $('#list').children().eq($(this).index()).addClass('show').siblings().removeClass('show');

    })

    // 给商品添加点击事件，进入商品详情页
    /* $('.second-list').on('click', '.second-list-item', function () {
        // 将id作为参数输入到url中，跳转
        var id = $(this).attr('data-id');
        location.href = '../pages/details.html?id=' + id;
    }) */

    $('#list').on('click', '.second-list-item', function () {
        // 将id作为参数输入到url中，跳转
        var id = $(this).attr('data-id');
        window.open('../pages/details.html?id=' + id);
    })

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
                    $('.children-list').html('<div class="no-data-2">数据加载中···</div>');
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
                    var c1Str = template('c1List', {
                        secondRes
                    });
                    $('.c1').html(c1Str);
                    var c2Str = template('c2List', {
                        secondRes
                    });
                    $('.c2').html(c2Str);
                    var c3Str = template('c3List', {
                        secondRes
                    });
                    $('.c3').html(c3Str);
                    var c4Str = template('c4List', {
                        secondRes
                    });
                    $('.c4').html(c4Str);
                    var c5Str = template('c5List', {
                        secondRes
                    });
                    $('.c5').html(c5Str);
                    var c6Str = template('c6List', {
                        secondRes
                    });
                    $('.c6').html(c6Str);
                    var c7Str = template('c7List', {
                        secondRes
                    });
                    $('.c7').html(c7Str);
                    var c8Str = template('c8List', {
                        secondRes
                    });
                    $('.c8').html(c8Str);
                    var c9Str = template('c9List', {
                        secondRes
                    });
                    $('.c9').html(c9Str);
                    var c10Str = template('c10List', {
                        secondRes
                    });
                    $('.c10').html(c10Str);
                },
                complete: function () {
                    NProgress.done();
                }
            });
        }
    });

}
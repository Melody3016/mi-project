$(function () {
    // 根据url获取传入的id值
    var url = location.href;
    url = url.split('?')[1];
    if (!url) {
        $('.productInfo').html('<div class="warning">请不要直接访问该页面！</div>');
        return;
    }

    // 判断用户是否登录
    if (!getCookie('username')) {
        $('.add-btn').find('a').attr('href', '../pages/login.html')
        $('.add-btn').find('a').html('请先登录');
    }


    var id = url.split('=')[1];

    // 渲染页面功能
    render(id);

    // 添加购物车功能
    $('.productInfo').on('click', '.add-btn', function () {
        // 获取页面的数据
        var proId = id;
        var proName = $('.product').find('h2').html();
        var nums = $('.nums').html();
        var price = $('#c-price').attr('data-price');
        var image = $('.img-left').find('img').attr('src');
        var uId = getCookie('userId');

        $.ajax({
            type: "post",
            url: "../../interface/cartAdd.php",
            data: {
                proId,
                proName,
                nums,
                price,
                image,
                uId
            },
            beforeSend: function () {
                NProgress.configure();
                NProgress.start();
            },
            dataType: "json",
            success: function (response) {
                if (response.code == 1) {
                    // 跳转购物车
                    location.href = '../pages/cart.html'
                }

            },
            complete: function () {
                NProgress.done();
            }
        });
    });

    // 修改数量
    $('.productInfo').on('click', '.sub', function () {
        // 获取数量
        var num = $('.nums').html();
        if (num == 1) {
            alert('数量不能为0');
            return;
        }
        num--;
        $('.nums').html(num);
        calcPrice(num);
    })

    // 修改数量
    $('.productInfo').on('click', '.add', function () {
        // 获取数量
        var num = $('.nums').html();
        num++;
        $('.nums').html(num);
        calcPrice(num);
    })


})

function calcPrice(num) {
    // 获取当前价格
    var price = $('#c-price').attr('data-price');
    // 计算价格
    var total = price * num;
    // 显示到页面
    var str = '总计：' + total + '元';
    $('.total-price').html(str)
}

function render(id) {
    // 根据id发送ajax请求
    $.ajax({
        type: "get",
        url: "../../interface/productList.php",
        data: {
            'pro_id': id
        },
        beforeSend: function () {
            $('.productInfo').html('<div class="warning">数据加载中，请稍等···</div>');
            NProgress.configure();
            NProgress.start();
        },
        dataType: "json",
        success: function (response) {
            var htmlStr = template('productInfo', {
                'data': response[0]
            });
            $('.productInfo').html(htmlStr);
        },
        complete: function () {
            NProgress.done();
        }
    });
}
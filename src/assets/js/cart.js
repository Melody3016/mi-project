$(function () {
    // 判断用户是否登录
    if (!getCookie('username')) {
        alert('请先登录')
        location.href = '../pages/login.html';
        return;
    }

    $('#name').text(getCookie('username'));

    // 获取用户id，根据id渲染购物车列表
    var id = getCookie('userId');
    render(id);

    // 删除功能
    del(id);

    // 修改数量功能
    update(id);

})

// 渲染购物车
function render(id) {
    $.ajax({
        url: '../../interface/cartList.php',
        data: {
            'uId': id
        },
        beforeSend: function () {
            NProgress.configure();
            NProgress.start();
        },
        dataType: 'json',
        success: function (res) {
            if (res.length == 0) {
                $('.list-body').html('<div class="cart-info">购物车里面还没有东西呢，去购物吧</div>');
                return;
            }
            // 渲染购物车
            var htmlStr = template('cartInfo', {
                'data': res
            });
            $('.list-body').html(htmlStr);
        },
        complete: function () {
            NProgress.done();
        }
    })
}

// 删除功能
function del(uId) {
    // 添加删除按钮的单击事件
    $('.list-body').on('click', '.del', function () {

        var choose = confirm('确认删除该商品吗？');
        if (!choose) return;
        // 获取id
        var id = $(this).attr('data-id');
        $.ajax({
            type: "get",
            url: "../../interface/cartDel.php",
            data: {
                id
            },
            beforeSend: function () {
                NProgress.configure();
                NProgress.start();
            },
            dataType: "json",
            success: function (response) {
                if (response.code == 1) {
                    // 删除成功渲染页面
                    render(uId);
                }
            }
        });
    })
}

// 修改功能
function update(uId) {

    // 修改数量
    $('.list-body').on('click', '.sub', function () {
        // 获取cartId
        var cartId = $(this).parent().attr('data-id');
        // 获取数量
        var num = $(this).siblings('.nums').html();
        if (num == 1) {
            alert('数量不能为0');
            return;
        }
        num--;
        $(this).siblings('.nums').html(num);
        change(cartId, num, function () {
            render(uId);
        });
    })

    // 修改数量
    $('.list-body').on('click', '.add', function () {
        // 获取cartId
        var cartId = $(this).parent().attr('data-id');
        // 获取数量
        var num = $(this).siblings('.nums').html();
        num++;
        $(this).siblings('.nums').html(num);
        change(cartId, num, function () {
            render(uId);
        });
    })
}

function change(id, num, cb) {
    $.ajax({
        type: "get",
        url: "../../interface/cartUpdate.php",
        data: {
            id,
            num
        },
        beforeSend: function () {
            NProgress.configure();
            NProgress.start();
        },
        dataType: "json",
        success: function (response) {
            if (response.code == 1) {
                cb && cb();
            }
        }
    });
}
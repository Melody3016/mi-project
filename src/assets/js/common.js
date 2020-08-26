
// 判断用户是否登录
if (getCookie('username')) {
    $('.userInfo').hide();
    $('.loginInfo').show().find('.un').text(getCookie('username'));
}

// 顶部登录用户下拉菜单
$('.user').hover(function () {
    // 改变username的样式
    $('.username')
        .css('color', '#ff6700')
        .css('background', '#fff')
    // 更改usermenu的高度
    $('.userMenu').css('height', 85)
}, function () {
    // 改变username的样式
    $('.username')
        .css('color', '#b0b0b0')
        .css('background', 'none')
    // 更改usermenu的高度
    $('.userMenu').css('height', 0)
})

// 退出登录
$('#J_userLogout').click(function () {
    // 清除cookie
    removeCookie('username');
    removeCookie('userId');

    location.href = '../pages/index.html';
})

// 页面加载渲染购物车菜单
function cartRender() {
    // 获取用户id
    var uId = getCookie('userId');
    if (!uId) {
        $('.msg').removeClass('hide');
        return;
    }
    $.ajax({
        type: "get",
        url: "../../interface/cartList.php",
        data: {
            uId
        },
        dataType: "json",
        success: function (response) {
            if (response.length == 0) {
                $('.msg').removeClass('hide');
                return;
            }

            // 更改购物车菜单样式
            $('.cart').addClass('full-cart');
            $('.cart i').removeClass('fa-shopping-cart').addClass('fa-cart-plus')

            // 计算商品数量
            var total = getCount(response);
            var htmlStr = '(' + total.num + ')';
            $('.cartNum').html(htmlStr)
            // 渲染数据
            var html = template('cartList', {
                'data': response
            });
            $('#J_miniCartList').html(html).removeClass('hide');
            $('#J_miniCartListTotal').removeClass('hide');

            // 渲染数量和价格
            $('.total').find('em').html(total.num);
            $('.price').find('em').html(total.price);
        }
    });
}
cartRender();

// 购物车下拉菜单的实现
$('.shopCart').hover(function () {
    // 样式的改变
    $('.cart').addClass('enter-cart');
    // 高度的改变
    $('#J_cartMenu')
        .css('height', 'auto');
}, function () {
    // 样式还原
    $('.cart').removeClass('enter-cart');
    $('#J_cartMenu').css('height', '0');

})




function getCount(data) {
    var res = {};
    // 总数量
    var num = 0;
    // 总价格
    var price = 0;
    // 遍历data
    $.each(data, function (index, item) {
        // 数量
        var n = Number(item.nums);
        num += n;
        price += n * Number(item.price);
    })
    res.num = num;
    res.price = price
    return res;
}
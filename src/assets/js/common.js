// 全局钩子，用于进度条的显示和小时
$(window).ajaxSend(function () {
    /*开启这个进度条.*/
    NProgress.configure();
    NProgress.start();
})

$(window).ajaxComplete(function () {
    NProgress.done();
})

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
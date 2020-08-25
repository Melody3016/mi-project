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
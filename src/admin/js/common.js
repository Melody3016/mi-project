$(function () {
    // 验证用户登录状态
    if (!getCookie('adminName')) {
        alert('您还没有登录！');
        location.href = '../pages/login.html';
        return false;
    }

    // 退出登录功能
    loginOut();
})

// 退出登录功能
function loginOut() {
    $('.ad_nav').find('a').click(function () {
        removeCookie('adminName');
        location.href = '../pages/login.html';
    })
}
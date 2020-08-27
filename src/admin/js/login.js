$(function () {

    // 添加登录按钮的单击事件
    $('#sub').click(function () {
        $('.err_tip').css('display', 'none');
        // 获取用户名和密码
        var loginInfo = $('form').serialize();
        // 登录功能
        login(loginInfo);
    })


})

function login(up) {
    $.ajax({
        type: "post",
        url: "../../interface/adminLogin.php",
        data: up,
        dataType: "json",
        beforeSend:function(){
            NProgress.configure();
            NProgress.start();
        },
        success: function (res) {
            // 登录失败
            if (res.code == 0) {
                // 显示失败信息
                $('.err_tip').css('display', 'block');
                $('.error-con').text(res.msg);
                NProgress.done();
            } else if (res.code == 1) {
                document.cookie = 'adminName=' + res.username;
                location.href = '../pages/index.html';
            }
        }
    });
}
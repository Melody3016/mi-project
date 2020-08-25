$(function () {
    // 获取登录之前的url

    //NProgress.done();
    // 添加登录事件
    $('.sub').click(function () {
        // 获取表单数据
        var username = $('.username').val();
        var password = $('.password').val();
        var flag = check(username, password);
        if (!flag) return;

        // 发送ajax请求
        $.ajax({
            type: "post",
            url: '../../interface/userLogin.php',
            data: {
                username,
                password
            },
            beforeSend: function () {
                $('.sub').val('正在登录...');
                /*开启这个进度条.*/
                NProgress.configure();
                NProgress.start();
            },
            complete: function () {
                $('.sub').val('登录');
                NProgress.done();
            },
            dataType: 'json',
            success: function (data) {
                if (data.code == 0) {
                    // 登录失败，提示信息
                    $('.err_tip').css('display', 'block');
                    $('.error-con').text(data.msg);
                } else {
                    // 跳转到登录之前的页面
                    alert('登录成功');
                    // 设置cookie
                    document.cookie = 'username=' + username;
                    location.href = '../pages/cart.html';
                }

            }
        })
    })
})

function check(un, pw) {
    // 校验
    if (!un) {
        // 提示信息
        $('.err_tip').css('display', 'block');
        $('.error-con').text('请输入用户名');
        return false;
    } else {
        $('.err_tip').css('display', 'none');
    }

    if (!pw) {
        // 提示信息
        $('.err_tip').css('display', 'block');
        $('.error-con').text('请输入密码');
        return false;
    } else {
        $('.err_tip').css('display', 'none');
    }

    return true;
}
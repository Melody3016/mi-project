$(function () {
    // 添加注册事件
    $('.sub').click(function () {
        // 获取表单数据
        var username = $('.username').val();
        var password = $('.password').val();
        var flag = check(username, password);
        if (!flag) return;

        // 发送ajax请求
        $.ajax({
            type: "post",
            url: '../interface/userRegister.php',
            data: {
                username,
                password
            },
            beforeSend: function () {
                $('.sub').val('正在注册...');
                /*开启这个进度条.*/
                NProgress.configure();
                NProgress.start();
            },
            complete: function () {
                $('.sub').val('注册');
                NProgress.done();
            },
            dataType: 'json',
            success: function (data) {
                if (data.code == 0) {
                    // 注册失败，提示信息
                    $('.err_tip').css('display', 'block');
                    $('.error-con').text(data.msg);
                } else {
                    // 跳转到登录页面

                    alert('注册成功');
                    location.href = '../pages/login.html'
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

    if (un.length < 6 || un.length > 18) {
        // 提示信息
        $('.err_tip').css('display', 'block');
        $('.error-con').text('用户名长度需为6-18位');
        return false;
    } else {
        $('.err_tip').css('display', 'none');
    }

    if (pw.length < 6 || pw.length > 18) {
        // 提示信息
        $('.err_tip').css('display', 'block');
        $('.error-con').text('密码长度需为6-18位');
        return false;
    } else {
        $('.err_tip').css('display', 'none');
    }

    if (/\W/.test(un)) {
        // 提示信息
        $('.err_tip').css('display', 'block');
        $('.error-con').text('用户名不能包含特殊字符');
        return false;
    } else {
        $('.err_tip').css('display', 'none');
    }

    if (/\s/.test(pw)) {
        // 提示信息
        $('.err_tip').css('display', 'block');
        $('.error-con').text('密码不能空格');
        return false;
    } else {
        $('.err_tip').css('display', 'none');
    }

    return true;
}
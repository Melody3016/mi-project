$(function () {
    // 获取登录之前的url

    //NProgress.done();
    // 添加登录事件

    login(function (data, username) {
        if (data.code == 0) {
            // 登录失败，提示信息
            $('.err_tip').css('display', 'block');
            $('.error-con').text(data.msg);
            NProgress.done();
        } else {
            // 跳转到登录之前的页面
            //alert('登录成功');
            // 设置cookie
            // 获取id,添加到cookie中
            $.ajax({
                url: '../../interface/getUserIdByName.php',
                type: 'get',
                data: {
                    username
                },
                dataType: 'json',
                success: function (res) {
                    var id = res[0].id;
                    document.cookie = 'userId=' + id;
                    document.cookie = 'username=' + username;
                    location.href = '../pages/cart.html';
                },
                complete:function(){
                    NProgress.done();
                }
            })


        }

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

function login(callback) {
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
                /*开启这个进度条.*/
                NProgress.configure();
                NProgress.start();
            },
            dataType: 'json',
            success: function (data) {
                callback && callback(data, username);
            }
        })
    })
}
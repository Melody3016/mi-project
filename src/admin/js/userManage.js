$(function () {
    // 发送ajax请求
    $.ajax({
        type: "get",
        url: "../../interface/userList.php",
        data: {},
        dataType: "json",
        beforeSend: function () {
            /*开启这个进度条.*/
            NProgress.configure();
            NProgress.start();
        },
        success: function (res) {
            var htmlStr = template('userInfo', {
                'data': res
            });
            $('tbody').html(htmlStr);
        },
        complete: function () {
            NProgress.done();
        }
    });


})
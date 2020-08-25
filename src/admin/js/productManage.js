$(function(){
    // 发送ajax请求获取数据，并渲染到页面上
    $.ajax({
        type: "get",
        url: "../../interface/productList.php",
        beforeSend:function(){
            /*开启这个进度条.*/
            NProgress.configure();
            NProgress.start();
        },
        data: {},
        dataType: "json",
        success: function (response) {
            // 使用模板字符串渲染
            var htmlStr = template('list',{'data':response});
            $('tbody').html(htmlStr);
        },
        complete: function () {
            NProgress.done();
        }
    });
})
$(function () {
    // 根据url获取传入的id值
    var url = location.href;
    url = url.split('?')[1];
    if (!url) {
        $('.productInfo').html('<div class="warning">请不要直接访问该页面！</div>');
        return;
    }
    var id = url.split('=')[1];

    // 根据id发送ajax请求
    $.ajax({
        type: "get",
        url: "../../interface/productList.php",
        data: {
            'pro_id': id
        },
        dataType: "json",
        success: function (response) {
            var htmlStr = template('productInfo', {
                'data': response[0]
            });
            $('.productInfo').html(htmlStr);
            // 判断用户是否登录
            if (!getCookie('username')) {
                $('.add-btn').find('a').attr('href', '../pages/login.html')
                $('.add-btn').find('a').html('请先登录');
            } else {
                // 添加购物车功能
                addCart(id);
            }
        }
    });

    // 修改数量
    $('.productInfo').on('click', '.sub', function () {
        // 获取数量
        var num = $('.nums').html();
        if (num == 1) {
            alert('数量不能为0');
            return;
        }
        num--;
        $('.nums').html(num);
        calcPrice(num);
    })

    // 修改数量
    $('.productInfo').on('click', '.add', function () {
        // 获取数量
        var num = $('.nums').html();
        num++;
        $('.nums').html(num);
        calcPrice(num);
    })


})

function calcPrice(num) {
    // 获取当前价格
    var price = $('#c-price').attr('data-price');
    // 计算价格
    var total = price * num;
    // 显示到页面
    var str = '总计：' + total + '元';
    $('.total-price').html(str)
}

function addCart(id) {
    $('.add-btn').find('a').click(function () {
        // 获取页面的数据
        /*  
        $proId = $_POST['proId'];
        $proName = $_POST['proName'];
        $nums = $_POST['nums'];
        $price = $_POST['price'];
        $image = $_POST['image'];
        $uID = $_POST['uId'];
        */
        var proId = id;
        var proName = $('.product').find('h2').html();
        var nums = $('.nums').html();
        var price = $('#c-price').attr('data-price');
        var image = $('.img-left').find('img').attr('src');
        var uId = getCookie('userId');

        $.ajax({
            type: "post",
            url: "../../interface/cartAdd.php",
            data: {
                proId,
                proName,
                nums,
                price,
                image,
                uId
            },
            dataType: "json",
            success: function (response) {
                if (response.code == 1) {
                    // 跳转购物车
                    location.href = '../pages/cart.html'
                }
              
            }
        });
    });


}
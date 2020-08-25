<?php
// 载入配置文件
require_once './config.php';

function add()
{
    // 1. 接收数据
    $proId = $_POST['proId'];
    $proName = $_POST['proName'];
    $nums = $_POST['nums'];
    $price = $_POST['price'];
    $image = $_POST['image'];
    $uID = $_POST['uId'];


    // 当客户端提交过来的完整的表单信息就应该开始对其进行数据校验
    $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if (!$conn) {
        $arr = array('code' => 0, 'msg' => '数据库连接失败');
        echo json_encode($arr);
        return;
    }


    // 查询数据库中是否为该商品
    $query = mysqli_query($conn, "SELECT * FROM `cart` WHERE `pro_id` = '$proId' AND `u_id` = '$uID'");
    // 获取结果
    $res = mysqli_fetch_assoc($query);

    if ($res) {
        // 数量直接加nums
        $num = $res['nums'] + $nums;
        $sql = "UPDATE `cart` SET `nums`=$num WHERE `pro_id`=$proId AND `u_id` = '$uID'";
    } else {
        $sql = "INSERT INTO `cart` (`pro_id`,`pro_name`,`nums`,`price`,`image`,`u_id`) VALUES ('$proId','$proName','$nums','$price','$image','$uID')";
    }

    $query = mysqli_query($conn, $sql);

    if (!$query) {
        $arr = array('code' => 0, 'msg' => '添加失败，请重试');
        echo json_encode($arr);
        return;
    } else {
        // 添加成功
        $arr = array('code' => 1, 'msg' => '添加成功');
        echo json_encode($arr);
    }
}
add();

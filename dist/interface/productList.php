<?php
// 载入配置文件
require_once './config.php';

function showList()
{
    // 1. 连接
    $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if (!$conn) {
        $arr = array('code' => 0, 'msg' => '数据库连接失败');
        echo json_encode($arr);
        return;
    }

    $query = mysqli_query($conn, "SELECT * FROM `product`,`category` WHERE `product`.`category_id` = `category`.`c_id`");

    // 判断客户端是否传入c_id
    if (isset($_GET['c_id'])) {
        $c_id = $_GET['c_id'];
        $query = mysqli_query($conn, "SELECT * FROM `product`,`category` WHERE `product`.`category_id` = `category`.`c_id` AND `category`.`c_id` = '$c_id'");
    }

    // 判断客户端是否传入pro_id
    if (isset($_GET['pro_id'])) {
        $pro_id = $_GET['pro_id'];
        $query = mysqli_query($conn, "SELECT * FROM `product`,`category` WHERE `product`.`category_id` = `category`.`c_id` AND `product`.`pro_id` = '$pro_id'");
    }

    if (!$query) {
        $arr = array('code' => 0, 'msg' => '查询失败，请重试');
        echo json_encode($arr);
        return;
    }

    // 获取信息
    $res = mysqli_fetch_all($query, MYSQLI_ASSOC);

    echo json_encode($res);
}
showList();

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

    $u_id = $_GET['uId'];

    $query = mysqli_query($conn, "SELECT `cart_id`,`pro_id`,`pro_name`,`nums`,`price`,`image`,`u_id` FROM `cart`,`user` WHERE `cart`.`u_id` = `user`.`id` AND `user`.`id` = '$u_id'");


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

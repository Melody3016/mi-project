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

    $id = $_GET['id'];

    $query = mysqli_query($conn, "DELETE FROM `cart` WHERE `cart_id` = '$id'");


    if (!$query) {
        $arr = array('code' => 0, 'msg' => '删除失败，请重试');
        echo json_encode($arr);
        return;
    } else {
        $arr = array('code' => 1, 'msg' => '删除成功');
        echo json_encode($arr);
    }
}

showList();

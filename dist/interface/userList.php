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

    $query = mysqli_query($conn, "SELECT * FROM `user`");

    if (!$query) {
        $arr = array('code' => 0, 'msg' => '查询失败，请重试');
        echo json_encode($arr);
        return;
    }

    // 获取用户信息
    $res = mysqli_fetch_all($query, MYSQLI_ASSOC);

    echo json_encode($res);
}
showList();

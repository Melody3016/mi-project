<?php
// 载入配置文件
require_once './config.php';

function login()
{
    // 1. 接收数据
    if (empty($_POST['username'])) {
        $arr = array('code' => 0, 'msg' => '请填写用户名');
        echo json_encode($arr);
        return;
    }
    if (empty($_POST['password'])) {
        $arr = array('code' => 0, 'msg' => '请填写密码');
        echo json_encode($arr);
        return;
    }

    $username = $_POST['username'];
    $password = $_POST['password'];

    // 当客户端提交过来的完整的表单信息就应该开始对其进行数据校验
    $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if (!$conn) {
        $arr = array('code' => 0, 'msg' => '数据库连接失败');
        echo json_encode($arr);
        return;
    }

    $query = mysqli_query($conn, "SELECT * FROM `admin` WHERE `username` = '$username' limit 1");

    if (!$query) {
        $arr = array('code' => 0, 'msg' => '登录失败，请重试');
        echo json_encode($arr);
        return;
    }

    // 获取登录用户
    $user = mysqli_fetch_assoc($query);

    if (!$user) {
        // 用户名不存在
        $arr = array('code' => 0, 'msg' => '用户名不正确');
        echo json_encode($arr);
        return;
    }

    if ($user['password'] !== $password) {
        // 密码不正确
        $arr = array('code' => 0, 'msg' => '密码不正确');
        echo json_encode($arr);
        return;
    }

    // 登录成功
    $arr = array('code' => 1, 'username' => $username);
    echo json_encode($arr);
}
login();

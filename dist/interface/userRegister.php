<?php
// 载入配置文件
require_once './config.php';

function register()
{
    // 1. 接收数据
    if (empty($_POST['username'])) {
        $arr = array('code' => 0, 'msg' => '请填写用户名');
        echo json_encode($arr);
        return;
    }
    if (!preg_match('/(\w){6,18}/', $_POST['username'])){
        $arr = array('code' => 0, 'msg' => '用户名需为6-18位非特殊字符');
        echo json_encode($arr);
        return;
    }
    if (empty($_POST['password'])) {
        $arr = array('code' => 0, 'msg' => '请填写密码');
        echo json_encode($arr);
        return;
    }
    if (!preg_match('/(\w){6,18}/', $_POST['password'])){
        $arr = array('code' => 0, 'msg' => '密码需为6-18位非特殊字符');
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

    
    // 查询数据库中是否为该用户名
    $query = mysqli_query($conn, "SELECT * FROM `user` WHERE `username` = '$username'");
    // 获取结果
    $user = mysqli_fetch_assoc($query);

    if($user){
        $arr = array('code' => 0, 'msg' => '用户名已经被注册');
        echo json_encode($arr);
        return;
    }

    $query = mysqli_query($conn, "INSERT INTO `user` (`username`,`password`) VALUES ('$username','$password')");

    if (!$query) {
        $arr = array('code' => 0, 'msg' => '注册失败，请重试');
        echo json_encode($arr);
        return;
    }else{
        // 注册成功
        $arr = array('code' => 1,'msg' => '注册成功');
        echo json_encode($arr);
    }
}
register();

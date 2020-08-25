/**
 * @description: 添加cookie
 * @param key 需要添加的cookie键
 * @param value 需要添加的cookie值
 * @param {Number} expires 在当前时间上额外添加的天数
 */
function setCookie(key, value, expires) {
    const time = new Date();
    if (expires) {
        time.setTime(time.getTime() - 8 * 60 * 60 * 1000 + expires * 24 * 60 * 60 * 1000);
        document.cookie = key + "=" + value + ";expires=" + time;
    } else {
        document.cookie = key + "=" + value;
    }
}

/**
 * @description: 删除指定cookie
 * @param key 需要删除的cookie键
 */
function removeCookie(key) {
    setCookie(key, 1, -1);
}

/**
 * @description: 查找指定cookie值
 * @param key 需要查找的cookie键
 * @return 指定cookie值
 */
function getCookie(key) {
    // 获取所有cookie信息，并分割成数组
    const cookieArr = document.cookie.split('; ');
    var result = '';
    // 遍历数组
    cookieArr.forEach(function (itme) {
        // 将每个cookie信息以‘=’分割，并与key判断
        if (itme.split('=')[0] == key) {
            result = itme.split('=')[1];
        }
    });
    return result;
}
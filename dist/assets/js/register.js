"use strict";function check(r,e){return r?($(".err_tip").css("display","none"),e?($(".err_tip").css("display","none"),r.length<6||18<r.length?($(".err_tip").css("display","block"),$(".error-con").text("用户名长度需为6-18位"),!1):($(".err_tip").css("display","none"),e.length<6||18<e.length?($(".err_tip").css("display","block"),$(".error-con").text("密码长度需为6-18位"),!1):($(".err_tip").css("display","none"),/\W/.test(r)?($(".err_tip").css("display","block"),$(".error-con").text("用户名不能包含特殊字符"),!1):($(".err_tip").css("display","none"),/\s/.test(e)?($(".err_tip").css("display","block"),$(".error-con").text("密码不能空格"),!1):($(".err_tip").css("display","none"),!0))))):($(".err_tip").css("display","block"),$(".error-con").text("请输入密码"),!1)):($(".err_tip").css("display","block"),$(".error-con").text("请输入用户名"),!1)}$(function(){$(".sub").click(function(){var r=$(".username").val(),e=$(".password").val();check(r,e)&&$.ajax({type:"post",url:"../interface/userRegister.php",data:{username:r,password:e},beforeSend:function(){$(".sub").val("正在注册..."),NProgress.configure(),NProgress.start()},complete:function(){$(".sub").val("注册"),NProgress.done()},dataType:"json",success:function(r){0==r.code?($(".err_tip").css("display","block"),$(".error-con").text(r.msg)):(alert("注册成功"),location.href="../pages/login.html")}})})});
"use strict";function calcPrice(t){var a="总计："+$("#c-price").attr("data-price")*t+"元";$(".total-price").html(a)}function render(t){$.ajax({type:"get",url:"../../interface/productList.php",data:{pro_id:t},beforeSend:function(){$(".productInfo").html('<div class="warning">数据加载中，请稍等···</div>')},dataType:"json",success:function(t){var a=template("productInfo",{data:t[0]});$(".productInfo").html(a)}})}$(function(){var t=location.href;if(t=t.split("?")[1]){getCookie("username")||($(".add-btn").find("a").attr("href","../pages/login.html"),$(".add-btn").find("a").html("请先登录"));var i=t.split("=")[1];render(i),$(".productInfo").on("click",".add-btn",function(){var t=i,a=$(".product").find("h2").html(),c=$(".nums").html(),n=$("#c-price").attr("data-price"),r=$(".img-left").find("img").attr("src"),e=getCookie("userId");$.ajax({type:"post",url:"../../interface/cartAdd.php",data:{proId:t,proName:a,nums:c,price:n,image:r,uId:e},dataType:"json",success:function(t){1==t.code&&(location.href="../pages/cart.html")}})}),$(".productInfo").on("click",".sub",function(){var t=$(".nums").html();1!=t?(t--,$(".nums").html(t),calcPrice(t)):alert("数量不能为0")}),$(".productInfo").on("click",".add",function(){var t=$(".nums").html();t++,$(".nums").html(t),calcPrice(t)})}else $(".productInfo").html('<div class="warning">请不要直接访问该页面！</div>')});
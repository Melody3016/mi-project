"use strict";function render(t){$.ajax({url:"../../interface/cartList.php",data:{uId:t},beforeSend:function(){NProgress.configure(),NProgress.start()},dataType:"json",success:function(t){if(0!=t.length){var e=template("cartInfo",{data:t});$(".list-body").html(e)}else $(".list-body").html('<div class="cart-info">购物车里面还没有东西呢，去购物吧</div>')},complete:function(){NProgress.done()}})}function del(e){$(".list-body").on("click",".del",function(){if(confirm("确认删除该商品吗？")){var t=$(this).attr("data-id");$.ajax({type:"get",url:"../../interface/cartDel.php",data:{id:t},beforeSend:function(){NProgress.configure(),NProgress.start()},dataType:"json",success:function(t){1==t.code&&render(e)}})}})}function update(n){$(".list-body").on("click",".sub",function(){var t=$(this).parent().attr("data-id"),e=$(this).siblings(".nums").html();1!=e?(e--,$(this).siblings(".nums").html(e),change(t,e,function(){render(n)})):alert("数量不能为0")}),$(".list-body").on("click",".add",function(){var t=$(this).parent().attr("data-id"),e=$(this).siblings(".nums").html();e++,$(this).siblings(".nums").html(e),change(t,e,function(){render(n)})})}function change(t,e,n){$.ajax({type:"get",url:"../../interface/cartUpdate.php",data:{id:t,num:e},beforeSend:function(){NProgress.configure(),NProgress.start()},dataType:"json",success:function(t){1==t.code&&n&&n()}})}$(function(){if(!getCookie("username"))return alert("请先登录"),void(location.href="../pages/login.html");$("#name").text(getCookie("username"));var t=getCookie("userId");render(t),del(t),update(t)});
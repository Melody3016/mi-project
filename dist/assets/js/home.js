"use strict";function showList(){$.ajax({type:"get",url:"../../interface/categoryList.php",data:{},beforeSend:function(e){NProgress.configure(),NProgress.start()},dataType:"json",success:function(i){var e=template("firstList",{data:i});$("#category-list").html(e),$.ajax({type:"get",url:"../../interface/productList.php",data:{},beforeSend:function(){NProgress.configure(),NProgress.start(),$("#list").html('<div class="no-data">数据加载中···</div>')},dataType:"json",success:function(e){var t=template("productList",{firstRes:i,secondRes:e});$("#list").html(""),$("#list").append(t);var s=template("pro_List",{secondRes:e});$(".sl-right").html(s),setWidth()},complete:function(){NProgress.done()}})}})}function setWidth(){$(".children-list").each(function(){var e=$(this).children().length,t=parseInt(e/7)+1;$(this).css("width",250*t)})}function flashSale(){var e=new Date,t=e.getHours(),s=59-e.getMinutes(),i=59-e.getSeconds();s=s<10?"0"+s:s,i=i<10?"0"+i:i;var a=(t=t<10?"0"+t:t)+":00 场";$(".round").html(a),$(".minutes").html(s),$(".seconds").html(i)}$(function(){new Swiper(".swiper-container",{speed:800,loop:!0,autoplay:{delay:5e3},pagination:{el:".swiper-pagination",clickable:!0},effect:"fade",fadeEffect:{crossFade:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}});showList(),$("#category-list").on("mouseenter",".firstList",function(){$(this).addClass("now").siblings().removeClass("now"),$("#list").children().eq($(this).index()).addClass("show").siblings().removeClass("show")}),$("#list").on("click",".second-list-item",function(){var e=$(this).attr("data-id");window.open("../pages/details.html?id="+e)}),$(".slist-item").mouseenter(function(){$(this).addClass("active").siblings().removeClass("active"),$(".sl-right").children().eq($(this).index()).addClass("active").siblings().removeClass("active")}),$(".shoplist").mouseleave(function(){$(".sl-right").children().removeClass("active"),$(".slist-item").removeClass("active")}),setInterval(flashSale,1e3)});
/**
 * Created by Administrator on 2018/9/27.
 */
$(function(){


//想要实现进度条功能, 使用 NProgress 插件
  $(document).ajaxStart(function(){
    NProgress.start();
  })
  $(document).ajaxStop(function(){
    setTimeout(function(){
      NProgress.done();
    },500);
  })


// 1. 二级菜单切换效果
  $('.lt_aside .category').click(function(){
    $('.lt_aside .child_nav').stop().slideToggle()
  })
// 2. 左侧菜单栏切换
  $('.lt_main .main_nav .pull-left').click(function(){
    $('.lt_aside').toggleClass('hiddn_menu');
    $('.lt_main').toggleClass('hiddn_menu');
    $('.lt_main .main_nav').toggleClass('hiddn_menu');
  })

// 3. 退出功能
  $('.lt_main .main_nav .pull-right').click(function(){
    $('#myModal').modal('show');
  })
  $('#loginOut').click(function(){
    $.ajax({
      type:'get',
      url:'/employee/employeeLogout',
      dataType:'json',
      success:function(info) {
        if(info.success) {
          location.href = 'login.html';
        }
      }
    })


  })


})
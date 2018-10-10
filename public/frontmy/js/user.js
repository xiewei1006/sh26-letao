$(function(){
  
  //判断是否登陆
  $.ajax({
    url:'/user/queryUserMessage',
    type:'get',
    dataType:'json',
    success:function(info){
      if(info.error){
        location.href = 'login.html';
      }
      else {
        var html = template('tpl',info);
        $('#userInfo').html(html);
      }
    }
  })


  //退出登陆
  $('#logout').click(function(){
    $.ajax({
      url:'/user/logout',
      type:'get',
      dataType:'json',
      success:function(info) {
        if(info.success) {
          location.href = 'login.html';
        }
      }
    })
  })




})
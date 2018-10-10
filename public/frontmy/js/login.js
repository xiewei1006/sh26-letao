$(function(){

  $('#loginBtn').click(function(){
    var username = $('#username').val().trim();
    var password = $('#password').val().trim();
    //用户名输入为空
    if( username.length == 0 ) {
      mui.toast('请输入用户名');
      return;
    }
    //密码输入为空
    if( password.length == 0 ) {
      mui.toast('请输入密码');
      return;
    }
    $.ajax({
      url:'/user/login',
      type:'post',
      data:{
        username:username,
        password:password
      },
      dataType:'json',
      success:function(info){
        if( info.error ) {
          mui.toast('用户名或密码错误');
        }
        if( info.success ){ 
          location.href = location.search.replace('?reUrl=','')?location.search.replace('?reUrl=',''):'user.html';
        }
      }
    })

  })


})
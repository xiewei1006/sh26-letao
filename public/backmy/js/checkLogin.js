/**
 * Created by Administrator on 2018/9/27.
 */
$.ajax({
  url:'/employee/checkRootLogin',
  type:'get',
  dataType:'json',
  success:function(info){
    //console.log(info);
    if(info.error == 400) {
      // 未登录, 拦截到登陆页
      location.href = 'login.html';
    }
    if(info.success) {
      // 已登陆, 让用户继续访问即可
      console.log( "当前用户已登陆" );
    }
  }

})

//var xhr = new XMLHttpRequest();
//
//xhr.open('GET','/employee/checkRootLogin');
//
//xhr.send(null);
//
//xhr.onreadystatechange = function(){
//  if(xhr.readyState == 4) {
//    var res = JSON.parse(xhr.responseText);
//    if(res.error == 400) {
//      // 未登录, 拦截到登陆页
//      location.href = 'login.html';
//    }
//    if(res.success) {
//      // 已登陆, 让用户继续访问即可
//      console.log( "当前用户已登陆" );
//    }
//  }
//}
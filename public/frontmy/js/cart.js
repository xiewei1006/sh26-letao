$(function(){

  //获取购物车数据
  function render(){
    $.ajax({
      url:'/cart/queryCart',
      type:'get',
      dataType:'json',
      success:function(info){
        console.log(info);
        var html = template('tpl',{list:info});
        $('.lt_main .mui-table-view').html(html);
      }
    })
  }
  
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
        render();
      }
    }
  })

  //删除

  //修改

})
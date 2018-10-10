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
  render();

  //删除

  //修改

})
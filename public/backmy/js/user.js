/**
 * Created by Administrator on 2018/9/26.
 */
$(function(){

  var currentPage = 1;
  var pageSize = 5;

  $.ajax({
    url: '/user/queryUser',
    type: 'get',
    data: {
      page: currentPage,
      pageSize: pageSize
    },
    dataType:'json',
    success:function(info){
      console.log(info);
      var html = template('tmp',{
        list:info.rows,
        page:currentPage,
        size:pageSize
      });
      $('tbody').html(html);
    }
  })

})
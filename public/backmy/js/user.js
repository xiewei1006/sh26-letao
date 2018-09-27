/**
 * Created by Administrator on 2018/9/26.
 */
$(function () {
  var currentPage = 1;
  var pageSize = 5;
  //加载数据及分页
  render(currentPage,pageSize);
  var id;
  var isDelete;

  //禁用及启用功能
  //禁用
  $('tbody').on('click','.btn-stop',function(){
    id = $(this).parent().data('id');
    isDelete = 0;
    $('#carry').modal('show');

  });
  //启用
  $('tbody').on('click','.btn-start',function(){
    id = $(this).parent().data('id');
    isDelete = 1;
    $('#carry').modal('show');
  })

  $('#true').click(function(){
    carryToggle(id,isDelete);
  })


  //加载数据及分页
  function render(page,size) {
    $.ajax({
      url: '/user/queryUser',
      type: 'get',
      data: {
        page: page,
        pageSize: size
      },
      dataType: 'json',
      success: function (info) {
        //console.log(info);
        var html = template('tmp', info);
        $('tbody').html(html);

        //分页
        $("#pagintor").bootstrapPaginator({
          //默认是2，如果是bootstrap3版本，这个参数必填
          bootstrapMajorVersion: 3,
          //当前页
          currentPage: currentPage,
          //总页数
          totalPages: info.total/info.size,
          //设置控件的大小，mini, small, normal,large
          size: "normal",
          //为按钮绑定点击事件 page:当前点击的按钮值
          onPageClicked: function (event, originalEvent, type, page) {
            //console.log(page);
            currentPage = page;
            render(currentPage,pageSize);
          }
        });


      }
    })
  }

  //状态(禁用及启用)函数
  function carryToggle(id,num){
    $.ajax({
      url:'/user/updateUser',
      type:'post',
      data:{
        id:id,
        isDelete:num
      },
      dataType:'json',
      success:function(info){
        if(info.success) {
          render(currentPage,pageSize);
        }
      },
    });
  }


})
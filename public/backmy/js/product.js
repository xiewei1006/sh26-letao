/**
 * Created by Administrator on 2018/9/29.
 */
$(function(){
  //加载商品
  var currentpage = 1;
  var pageSize = 2;

  render();

  //加载商品及分页函数
  function render(){
    $.ajax({
      url:'/product/queryProductDetailList',
      type:'get',
      data:{
        page:currentpage,
        pageSize:pageSize
      },
      dataType:'json',
      success:function(info){
        console.log(info);
        //加载列表
        var html = template('tmp',info);
        $('tbody').html(html);
        //分页
        $('#pagintor').bootstrapPaginator({
          //版本
          bootstrapMajorVersion:3,
          //当前页
          currentPage:info.page,
          //总页数
          totalPages:Math.ceil(info.total/info.size),
          //点击的回调函数
          onPageClicked:function(event, originalEvent, type, page){
            currentpage = page;
            render();
          }
        });

      }
    })

  }


  //点击打开模态框
  $('#add').click(function(){
    $('#addModal').modal('show');
  })

})

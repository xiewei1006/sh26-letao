/**
 * Created by Administrator on 2018/9/28.
 */
$(function(){
  var currentPage = 1;
  var pageSize = 5;
  render(currentPage, pageSize);

  //加载列表和分页
  function render(page, size) {
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      type: 'get',
      data: {
        page: page,
        pageSize: size
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        //动态加载列表
        var html = template('tmp', info);
        $('tbody').html(html);

        //分页
        $("#pagintor").bootstrapPaginator({
          //默认是2，如果是bootstrap3版本，这个参数必填
          bootstrapMajorVersion: 3,
          //当前页
          currentPage: currentPage,
          //总页数
          totalPages: Math.ceil(info.total / pageSize),
          //设置控件的大小，mini, small, normal,large
          size: "normal",
          //为按钮绑定点击事件 page:当前点击的按钮值
          onPageClicked: function (event, originalEvent, type, page) {
            currentPage = page;
            render(currentPage, pageSize);
          }
        });

      }
    })
  }


  //添加二级分类
  //打开模态框
  $('#add').click(function () {
    $('#addModal').modal('show');
  })
  //图片预览
  $('#pic1').on('change',function(){
    var formData = new FormData(document.querySelector('#add_form'));
    $.ajax({
      url:'/category/addSecondCategoryPic',
      type:'post',
      data:formData,
      dataType:'json',
      contentType:false,
      processData:false,
      success:function(info){
        //console.log(info);
        $('#addModal img').attr('src',info.picAddr);
      }
    })
  })
  //分类校验

  //添加

})
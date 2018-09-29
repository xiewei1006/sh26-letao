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
    //打开
    $('#addModal').modal('show');
    //下拉按钮内容填充
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      type: 'get',
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      success:function(info){
        //console.log(info);
        var html = template('dropdownMenu',info);
        $('#add_form .dropdown-menu').html(html);
      }
    })

  })

  //图片预览及地址隐藏域
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
        $('#addModal [name="brandLogo"]').val(info.picAddr);
        //手动验证图片地址
        $('#add_form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
      }
    })
  })

  //一级分类隐藏域
  $('#add_form .dropdown-menu').on('click','a',function(){
    $('#dropdownTxt').text($(this).text());
    $('#add_form [name="categoryId"]').val($(this).data('id'));
    //手动验证一级分类
    $('#add_form').data('bootstrapValidator').updateStatus('categoryId','VALID');
  })

  //分类校验
  $('#add_form').bootstrapValidator({
    //1. 指定不校验的类型
    excluded:[],

    //设置小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok', //校验成功
      invalid: 'glyphicon glyphicon-remove', //校验失败
      validating: 'glyphicon glyphicon-refresh' //校验中
    },
    fields:{
      categoryId: {
        //验证的类型
        validators: {
          //非空
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      brandName: {
        //验证的类型
        validators: {
          //非空
          notEmpty: {
            message: '请输入二级分类'
          }
        }
      },
      brandLogo: {
        //验证的类型
        validators: {
          //非空
          notEmpty: {
            message: '请上传图片'
          }
        }
      }

    }



  })

  //验证成功添加
  $("#add_form").on('success.form.bv',function(e){
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      url:'/category/addSecondCategory',
      type:'post',
      data:$("#add_form").serialize(),
      dataType:'json',
      success:function(info){
        //console.log(info);
        if(info.success) {
          //重新渲染
          currentPage = 1;
          render(currentPage, pageSize);
          //重置
          addFormReset();
          //表单隐藏
          $('#addModal').modal('hide');

        }
      }
    })

  })

  //取消添加重置
  $('#addModal [data-dismiss="modal"]').click(function(){
    addFormReset();
  })

  //整体重置
  function addFormReset(){
    //表单重置
    $('#add_form').data('bootstrapValidator').resetForm(true);
    //按钮内容和图片重置
    $('#dropdownTxt').text('请选择一级分类');
    $('#addModal img').attr('src',"images/none.png");
  }


})
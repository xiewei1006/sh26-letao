/**
 * Created by Administrator on 2018/9/28.
 */
$(function () {
  var currentPage = 1;
  var pageSize = 5;

  render(currentPage, pageSize);

  //加载列表和分页
  function render(page, size) {
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      type: 'get',
      data: {
        page: page,
        pageSize: size
      },
      dataType: 'json',
      success: function (info) {
        //console.log(info);
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


  //添加功能
  //打开添加模态框
  $('#add').click(function () {
    $('#addModal').modal('show');
  })
  //分类校验
  $('#add_form').bootstrapValidator({
    // 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      categoryName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入一级分类名称'
          }
        }
      }
    }
  });

  //添加
  $("#add_form").on('success.form.bv', function (e){
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      url:'/category/addTopCategory',
      type:'post',
      data:$('#add_form').serialize(),
      dataType:'json',
      success:function(info){
        console.log(info);
        if(info.success) {
          render(currentPage, pageSize);
          $('#addModal').modal('hide');
          $("#add_form").data('bootstrapValidator').resetForm(true);
        }
      }
    })
  })

  //重置表单
  $('#addModal [data-dismiss="modal"]').click(function(){
    $("#add_form").data('bootstrapValidator').resetForm(true);
  })








})

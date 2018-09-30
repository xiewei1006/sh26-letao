/**
 * Created by Administrator on 2018/9/29.
 */
$(function () {
  //1.加载商品
  var currentpage = 1;
  var pageSize = 2;
  var picArr = [];

  render();

  //加载商品及分页函数
  function render() {
    $.ajax({
      url: '/product/queryProductDetailList',
      type: 'get',
      data: {
        page: currentpage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        //console.log(info);
        //加载列表
        var html = template('tmp', info);
        $('tbody').html(html);
        //分页
        $('#pagintor').bootstrapPaginator({
          //版本
          bootstrapMajorVersion: 3,
          //当前页
          currentPage: info.page,
          //总页数
          totalPages: Math.ceil(info.total / info.size),
          //点击的回调函数
          onPageClicked: function (event, originalEvent, type, page) {
            currentpage = page;
            render();
          },
          itemTexts: function (type, page, current) {
            switch (type) {
              case 'page':
                return page;
              case 'next':
                return "下一页";
              case 'prev':
                return "上一页";
              case 'first':
                return "首页";
              case 'last':
                return "尾页";
            }
          },
          tooltipTitles: function(type, page, current){
            switch (type) {
              case 'page':
                return "前往第" + page + "页";
              case 'next':
                return "下一页";
              case 'prev':
                return "上一页";
              case 'first':
                return "首页";
              case 'last':
                return "尾页";
            }
          },
          useBootstrapTooltip: true
        });

      }
    })

  }


  //2.点击打开模态框
  $('#add').click(function () {
    $('#addModal').modal('show');
    //填充下拉菜单
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      type: 'get',
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      success: function (info) {
        var html = template('dropdownMenu', info);
        $('#add_form .dropdown-menu').html(html);
      }
    })
  });

  //3.下拉文本及二级分类(品牌)隐藏域值
  $('#add_form .dropdown-menu').on('click', 'a', function () {
    $('#dropdownTxt').text($(this).text());
    $('#add_form [name="brandId"]').val($(this).data('id'));
    //手动通过二级分类验证
    $('#add_form').data('bootstrapValidator').updateStatus('brandId', 'VALID');
  })

  //4.图片预览及图片地址隐藏域
  $("#pic1").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    //每一张图片上传, 都会响应一次
    done: function (e, data) {
      // console.log(data.result);
      var picObj = data.result;
      picArr.unshift(picObj);
      $('#img-box').prepend(`<img width="100" height="100" src="${picObj.picAddr}">`);
      if (picArr.length > 3) {
        $("#img-box img:last-of-type").remove();
        picArr.pop();
      }
      if (picArr.length == 3) {
        //手动通过图片验证
        $('#add_form').data('bootstrapValidator').updateStatus('picStatus', 'VALID');
      }
    }
  });



  //5.表单验证
  $('#add_form').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //3. 指定校验字段
    fields: {
      //二级分类(品牌)
      brandId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },
      //商品名称
      proName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品名称'
          }
        }
      },
      //商品描述
      proDesc: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品描述'
          }
        }
      },
      //库存
      num: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品库存'
          },
          //正则校验
          regexp: {
            //商品库存格式, 必须是非零开头的数字
            regexp: /^[1-9]\d*$/,
            message: '商品库存格式, 必须是非零开头的数字'
          }
        }
      },
      //尺码
      size: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品尺码'
          },
          //正则校验
          regexp: {
            //尺码格式, 必须是 32-40
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码格式, 必须是32-40格式'
          }
        }
      },
      //原价
      oldPrice: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品原价'
          },
          //正则校验
          regexp: {
            //必须是非零开头的数字
            regexp: /^[1-9]\d*[.]?\d*$/,
            message: '必须是非零开头的数字'
          }
        }
      },
      //价格
      price: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品价格'
          },
          //正则校验
          regexp: {
            //必须是非零开头的数字
            regexp: /^[1-9]\d*[.]?\d*$/,
            message: '必须是非零开头的数字'
          }
        }
      },
      //图片上传
      picStatus: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请上传三张图片'
          }
        }
      }
    }
  });

  //6.验证通过发送aJax请求
  $("#add_form").on('success.form.bv', function (e) {
    e.preventDefault();
    var parames = $('#add_form').serialize();
    //&picName1=XX&picAddr1=xx
    //picName2  picAddr2
    //picName3  picAddr3
    parames += `&picName1=${picArr[0].picName}&picAddr1=${picArr[0].picAddr}`;
    parames += `&picName2=${picArr[1].picName}&picAddr2=${picArr[1].picAddr}`;
    parames += `&picName3=${picArr[2].picName}&picAddr3=${picArr[2].picAddr}`;
    console.log(parames);

    //ajax逻辑
    $.ajax({
      url: '/product/addProduct',
      type: 'post',
      data: parames,
      dataType: 'json',
      success: function (info) {
        // console.log(info);
        if (info.success) {
          //重新渲染
          currentpage = 1;
          render();
          //隐藏模态框
          $('#addModal').modal('hide');
          //重置
          allReset();
        }
      }
    })

  });


  //7.取消添加重置
  $('#addModal [data-dismiss="modal"]').click(function () {
    allReset();
  })

  //整体重置函数
  function allReset() {
    //表单内容和状态重置
    $('#add_form').data('bootstrapValidator').resetForm(true);
    //按钮内容和图片重置
    $('#dropdownTxt').text('请选择二级分类');
    $("#img-box img").remove();
    picArr = [];
  }



})
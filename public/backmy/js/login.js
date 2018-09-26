$(function () {
  /*
   * 1. 进行表单校验配置
   *    校验要求:
   *        (1) 用户名不能为空, 长度为2-6位
   *        (2) 密码不能为空, 长度为6-12位
   * */
  $('#form').bootstrapValidator({
    //设置小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok', //校验成功
      invalid: 'glyphicon glyphicon-remove', //校验失败
      validating: 'glyphicon glyphicon-refresh' //校验中
    },
    //指定校验字段
    fields: {
      //要验证的name
      username: {
        //验证的类型
        validators: {
          //非空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2到6之间'
          },
          callback: {
            message: '用户名不存在'
          }
        }
      },
      password: {
        validators: {
          //非空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须在6到12之间'
          },
          callback: {
            message: '密码错误'
          }
        }
      }
    }
  });


  /*
   * 2. 通过 submit 按钮进行提交表单, 可以让表单校验插件进行校验
   *    (1) 校验通过, 默认将表单继续提交, 会跳转页面, 需要在校验通过后,
   *        阻止默认的提交, 通过 ajax 进行登录请求
   *    (2) 校验失败, 表单校验插件本身就会阻止默认的提交
   *
   *    思路: 注册表单校验成功事件, 阻止默认的表单提交, 通过 ajax 进行提交
   * */
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑

    $.ajax({
      url:'/employee/employeeLogin',
      type:'post',
      data:$('#form').serialize(),
      dataType:'json',
      success:function(info){
        if(info.success) {
          location.href = 'index.html';
          return;
        }
        if(info.error == 1001) {
          //NOT_VALIDATED未验证, VALIDATING验证中, INVALID失败 or VALID成功
          $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
          return;
        }
        if(info.error == 1000) {
          $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
        }
      }

    })

  });



  /*
   * 3. 添加重置功能
   * */

  $('[type="reset"]').click(function(){
    $('#form').data('bootstrapValidator').resetForm();
  })

})
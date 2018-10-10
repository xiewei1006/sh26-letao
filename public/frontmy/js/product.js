$(function(){

  //获取地址参数
  function getObj() {
    var str = location.href;
    var obj = {};
    var oneArr = str.split('?');
    var twoArr = oneArr[oneArr.length - 1].split('&');
    twoArr.forEach(function (item) {
      var arr = item.split('=');
      obj[arr[0]] = arr[1];
    })
    return obj;
  }

  var parmas = getObj();
  console.log(parmas);

  $.ajax({
    url:'/product/queryProductDetail',
    type:'get',
    data:{
      id:parmas.productId
    },
    dataType:'json',
    success:function(info){
      console.log(info);
      var html = template('tpl',info);
      $('.mui-scroll').html(html);

      //手动初始化轮播
      var gallery = mui('.mui-slider');
      gallery.slider({
      interval:3000 //自动轮播周期，若为0则不自动播放，默认为0；
      });
      
      //手动初始化数字输入框
      mui('.mui-numbox').numbox();


    }
  })


  //尺码选择
  $('.lt_main').on('click','.lt_size span',function(){
    $(this).addClass('current').siblings().removeClass('current');
  })

  //加入购物车

  $('#addCart').click(function(){
    var $size = $('.lt_main .lt_size span.current');
    if( $size.length==0 ) {
      //没选择尺码，提示选择尺码
      mui.toast('请选择尺码');
      return;
    }
    var data = {};
    data.productId = parmas.productId;
    data.num = $('.lt_num .mui-numbox-input').val();
    data.size = $size.text();
    
    $.ajax({
      url:'/cart/addCart',
      type:'post',
      data:data,
      dataType:'json',
      success:function(info){
        if(info.error) {
          location.href = `login.html?reUrl=${location.href}`;
        }
        if(info.success) {
          mui.confirm('添加成功','温馨提示',["去购物车","继续浏览"],function(e){
            if(e.index == 0) {
              location.href = 'cart.html';
            }
          });
        }
      }
    })

  })



})
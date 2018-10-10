$(function () {
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

  $('.search .search-text').val(parmas.key);



  //获取搜索商品
  function render() {
    $('.lt_product').html(`<div class="loading"></div>`);

    var data = {};
    data.proName = parmas.key;
    data.page = 1;
    data.pageSize = 100;

    //判断需不需要排序
    var $current = $('.lt_sort a.current');
    if ($current.length > 0) {
      //需要排序
      var sortName = $current.data('type');
      var sortValue = $current.find('i').hasClass('fa-angle-down') ? 2 : 1;
      data[sortName] = sortValue;
    }
    setTimeout(function () {
      $.ajax({
        url: '/product/queryProduct',
        type: 'get',
        data: data,
        dataType: 'json',
        success: function (info) {
          console.log(info);
          var html = template('tpl', info);
          $('.lt_product').html(html);
        }
      })
    }, 500);
  }

  render();


  //排序功能
  $('.lt_sort a[data-type]').click(function () {

    if ($(this).hasClass('current')) {
      $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
    } else {
      $(this).addClass('current').siblings().removeClass('current');
    }
    render();

  })


  //点击搜索按钮, 实现搜索功能
  $('.search .search-btn').click(function () {
    location.href = `searchList.html?key=${ $('.search .search-text').val() }`;
  });




})
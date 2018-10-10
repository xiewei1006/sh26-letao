$(function(){


  // 下面 3 行代码, 用于在控制台执行, 进行假数据初始化
  // var arr = [ "艾迪", "爱迪王", "耐克", "匡威" ];
  // var jsonStr = JSON.stringify( arr );
  // localStorage.setItem("search_list", jsonStr);

  //读取localStorage获取数据
  function getHistory(){
    var jsonStr = localStorage.getItem('search_list') || '[]';
    var arr = JSON.parse(jsonStr);
    return arr;
  }
  
  //渲染历史记录
  function render(){
    var arr = getHistory();
    var html = template('tpl',{list:arr});
    $('.search-histroy').html(html);

  }



  // 一、渲染历史记录
  render();
  
  // 二、清空历史记录
  $('.search-histroy').on('click','.clearHistory',function(){
    // 确认框 confirm
    // 参数1: 确认框内容
    // 参数2: 标题文本
    // 参数3: 按钮文本, 数组
    // 参数4: 关闭确认框后的回调函数
    mui.confirm('你确定要清空历史记录吗','温馨提示',["取消","确认"],function(e){
      if(e.index == 1) {
        //确认清空
        localStorage.removeItem('search_list');
        render();
      }
    })

  })


  // 三、删除单个历史记录
  $('.search-histroy').on('click','.icon-del',function(){

    var arr = getHistory();
    var index = $(this).data('index');
    arr.splice(index,1);
    localStorage.setItem("search_list", JSON.stringify(arr));

    render();

  })

  // 四、添加历史记录
  $('.search-btn').on('click',function(){
    var key = $('.search-text').val().trim();
    // 非空验证
    if( key.length == 0 ) {
      mui.toast('请输入搜索关键字');
      return;
    }

    var arr = getHistory();
    // 将关键字添加到数组最前面
    // 需求:
    // 1. 如果已经有重复项, 删除重复项
    if( arr.indexOf(key) != -1 ) {
      arr.splice(arr.indexOf(key),1);
    }
    // 2. 如果长度超过 10, 删除最后一项(最旧的)
    if( arr.length >= 10 ){
      arr.pop();
    }
    //将关键字添加到数组最前面
    arr.unshift(key);
    localStorage.setItem("search_list", JSON.stringify(arr));

    render();

    //清空搜索框
    $('.search-text').val('');
    location.href = 'searchList.html?key='+key;
  })




})
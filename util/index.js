
/*
 日期方面的处理
 * */
function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function wxformatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('-')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}
/**
 * 时间戳转化为年 月 日 时 分 秒
 * number: 传入时间戳
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致
 */
export function formatTime(number,format) {

  var formateArr  = ['Y','M','D','h','m','s'];
  var returnArr   = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr)
  {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}
/*
js 计算倒数天数 时分秒
*/
export function getFormData(leftTime){
  var dd = parseInt(leftTime / 60 / 60 / 24, 10);//计算剩余的天数
  var hh = parseInt(leftTime / 60 / 60 % 24, 10);//计算剩余的小时数
  var mm = parseInt(leftTime / 60 % 60, 10);//计算剩余的分钟数
  var ss = parseInt(leftTime % 60, 10);//计算剩余的秒数
  dd = checkTime(dd);
  hh = checkTime(hh);
  mm = checkTime(mm);
  ss = checkTime(ss);//小于10的话加0
  return dd + "天" + hh + "小时" + mm + "分" + ss + "秒";
}
export function checkTime(i){
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
/*
@params time string
*/
export function toTime(time){
  let date = new Date(time);
  let newTime = date.getTime() / 1000;
  return newTime;
}
/*
 @params obj array
 @params i number 索引
 @params key string key
 * */
export function forCarm(obj,i,key){
  if (obj && obj.length == 0) {
    return;
  }
  let k = '';
  obj.forEach((e,index) => {
    if(i == index){
      k = e[key];
    }
  })
  return k;
}

/*
 计算变化多少天后的日期
 * */

export function DateAddDay(d, days) {
  var d = new Date(d);
  return new Date(d.setDate(d.getDate() + days));
}
/*
 两位数以内的数字自动补零
 * */
export function addZero(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/*
 获得本周周日的日期
 * */
export function FirstDayInThisWeek(d) {
  var d = new Date(d);
  return DateAddDay(d, 0 - d.getDay());
}
/*
 获取当前页面URL
 * */
export function getCurrentPageUrl(){
  var pages = getCurrentPages()    //获取加载的页面
  var currentPage = pages[pages.length-1]    //获取当前页面的对象
  if(currentPage && currentPage.route){
    var url = currentPage.route    //当前页面url
  }else{
    var url = false;
  }

  return url;

}
/*
 获取当前页面参数对象
 * */
export function getCurrentPageUrlWithArgs(){
  var pages = getCurrentPages()    //获取加载的页面
  var currentPage = pages[pages.length-1]    //获取当前页面的对象
  var url = currentPage.route    //当前页面url
  var options = currentPage.options    //如果要获取url中所带的参数可以查看options

  //拼接url的参数
  var urlWithArgs = url + '?'
  for(var key in options){
    var value = options[key]
    urlWithArgs += key + '=' + value + '&'
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length-1)

  return urlWithArgs;

}
/*
 获取微信小程序可视窗口的高度
 * */

export function getClientHeight(){
  return new Promise(function (resolve, reject) {
    wx.getSystemInfo({
      success: function (res) {


        // 计算主体部分高度,单位为px

        let width = res.windowWidth * res.pixelRatio;
        let height = res.windowHeight * res.pixelRatio;
        let obj = {
          'status': 1000,
          'msg': '获取成功',
          'width': width,
          'height': height,
          'pixelRatio': res.pixelRatio,
          'model': res.model,
          'statusBarHeight': res.statusBarHeight,
          'platform': res.platform,
        }
        resolve(obj);
      },
      fail: function(err){
        let obj = {
          'status': -1,
          'msg': '获取失败'
        }
        reject(obj);
      }
    })
  })
}

/*
 获取节点信息
 * */
export function getElement(option){

  if(!option || !option.obj){
    console.log('没有选择对象');
    return;
  }

  return new Promise(function (resolve, reject) {
    let query = wx.createSelectorQuery();
    //选择id

    query.select(option.obj).boundingClientRect()

    query.exec((res) => {

      //res就是 所有标签为mjltest的元素的信息 的数组
      resolve(res);
    })
  })
}
/*
 获取所有的节点  selectAll
 * */
export function getElementAll(option){

  if(!option || !option.obj){
    console.log('没有选择对象');
    return;
  }

  return new Promise(function (resolve, reject) {
    let query = wx.createSelectorQuery();
    //选择id

    query.selectAll(option.obj).boundingClientRect();


    query.exec((res) => {

      //res就是 所有标签为mjltest的元素的信息 的数组
      resolve(res);
    })
  })
}
//网络请求

//网络请求加上sessionID
import {
  SESSIONID,//保存sessionID
  VERSION,
}
  from 'common/consts';

/*
 ajax请求
 * */
export function ajax(option) {
  let sessionID = wxGetStorageSync(SESSIONID);
  expiration(sessionID,option);
  return new Promise((resolve,reject) => {

    option.header = {
      'token': sessionID,
      'appVersion': VERSION
    }
    option.success = function(res){
      //拦截统一处理
      expressWait(res.data,res);
      resolve(res.data,res);
    }
    option.fail = function(err){
      reject(err.data,err);
    }
    wx.request(option);
  })
}
/*
 post请求
 * */

export function post(option) {
  let sessionID = wxGetStorageSync(SESSIONID);
  expiration(sessionID,option);
  return new Promise((resolve,reject) => {
    option.header = {
      'token': sessionID,
      'appVersion': VERSION,
      'content-type': 'application/x-www-form-urlencoded'
    }
    option.method = 'POST';
    option.success = function(res){
      //拦截统一处理
      expressWait(res.data,res);
      resolve(res.data,res);
    }
    option.fail = function(err){
      reject(err.data,err);
    }
    wx.request(option);
  })
}
/*
 get请求
 * */

export function get(option) {
  let sessionID = wxGetStorageSync(SESSIONID);
  expiration(sessionID,option);
  return new Promise((resolve,reject) => {
    option.header = {
      'token': sessionID,
      'appVersion': VERSION
    }
    option.method = 'GET';

    option.success = function(res){
      //拦截统一处理
      expressWait(res.data,res);
      resolve(res.data,res);
    }
    option.fail = function(err){
      reject(err.data,err);
    }
    wx.request(option);
  })
}
//交互
/*
 微信模态对话框
 * */
export function wxShowModal(option) {
  return new Promise((resolve,reject) => {
    option.success = function(res){
      resolve(res);
    }
    option.fail = function(err){
      reject(err);
    }
    wx.showModal(option);
  })
}
/*
 微信消息提示框
 * */
export function wxShowToast(option){
  return new Promise((resolve,reject) => {
    option.success = function(res){
      resolve(res);
    }
    option.fail = function(err){
      reject(err);
    }
    wx.showToast(option);
  })

}
/*
 微信 loading 提示框
 * */
export function wxShowLoading(option){
  return new Promise((resolve,reject) => {
    option.success = function(res){
      resolve(res);
    }
    option.fail = function(err){
      reject(err);
    }
    wx.showToast(option);
  })

}
/*
 微信 操作菜单
 * */
export function wxShowActionSheet(option){
  return new Promise((resolve,reject) => {
    option.success = function(res){
      resolve(res);
    }
    option.fail = function(err){
      reject(err);
    }
    wx.showToast(option);
  })
}
/*
 微信 隐藏消息提示框
 * */
export function wxHideToast(option){
  return new Promise((resolve,reject) => {
    option.success = function(res){
      resolve(res);
    }
    option.fail = function(err){
      reject(err);
    }
    wx.showToast(option);
  })
}
/*
 微信 隐藏 loading 提示框
 * */
export function wxHideLoading(option){
  return new Promise((resolve,reject) => {
    option.success = function(res){
      resolve(res);
    }
    option.fail = function(err){
      reject(err);
    }
    wx.showToast(option);
  })
}
/*
 网络下载
 * */
export function wxDownloadFile(option){
  return new Promise((resolve,reject) => {
    option.success = function(res){
      resolve(res);
    }
    option.fail = function(err){
      reject(err);
    }
    wx.downloadFile(option);
  })
}
/*
 网络上传
 * */
export function wxUploadFile(option){
  return new Promise((resolve,reject) => {
    option.success = function(res){
      resolve(res);
    }
    option.fail = function(err){
      reject(err);
    }
    wx.uploadFile(option);
  })
}
/*
 媒体音频播放
 * */
export function wxPlayVoice(option){
  return new Promise((resolve,reject) => {
    option.success = function(res){
      resolve(res);
    }
    option.fail = function(err){
      reject(err);
    }
    wx.playVoice(option);
  })
}
/*
图片获取
*/
export function wxChooseImage(option){
  return new Promise((resolve,reject) => {
    option.success = function(res){
      resolve(res);
    }
    option.fail = function(err){
      reject(err);
    }
    mpvue.chooseImage(option);
  })
}
/*
数据存储 get 异步
*/
export function wxGetStorage(option){
  return new Promise((resolve,reject) => {
    option.success = function(res){
      resolve(res);
    }
    option.fail = function(err){
      reject(err);
    }
    wx.getStorage(option);
  })
}
/*
数据存储 get 同步
*/
export function wxGetStorageSync(option){
  return wx.getStorageSync(option);
}

/*
数据存储 set
*/
export function wxSetStorage(option){
  return new Promise((resolve,reject) => {
    option.success = function(res){
      resolve(res);
    }
    option.fail = function(err){
      reject(err);
    }
    wx.setStorage(option);
  })
}
/*
数据存储 remove
*/
export function wxRemoveStorage(option){
  return new Promise((resolve,reject) => {
    option.success = function(res){
      resolve(res);
    }
    option.fail = function(err){
      reject(err);
    }
    wx.removeStorage(option);
  })
}
export function wxAuthCheck(op){
  return new Promise(function (resolve, reject) {
    wx.getSetting({
      success(res) {
        const option = 'scope.' + op;
        if (res.authSetting[option]){
          let options = {
            type: 'authCheck',
            state: 1000
          }
          resolve(options);
        }else{
          let options = {
            type: 'authCheck',
            state: 3000
          }
          resolve(options);
        }

      },
      fail(err){
        let options = {
          type: 'authCheck',
          state: 4000
        }
        reject(options);
      }
    })
  })
}
/*
 promise解决wechat小程序异步回调
 * */
export function wxPromisify(Fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res)
      }
      obj.fail = function (err) {
        reject(err)
      }
      Fn(obj)//执行函数，obj为传入函数的参数
    })
  }
}

/*

	深度克隆
*/

export function deepClone(obj){
  // Handle the 3 simple types, and null or undefined or function
  if (null == obj || "object" != typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
    var copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }
  // Handle Array or Object
  if (obj instanceof Array | obj instanceof Object) {
    var copy = (obj instanceof Array)?[]:{};
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr))
        copy[attr] = deepClone(obj[attr]);
    }
    return copy;
  }
  throw new Error("Unable to clone obj! Its type isn't supported.");
}
/*
校验手机号
*/
export function checkMobile(phone){
  let str = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  if(str.test(phone)){
    return true;
  }else{
    return false;
  }
}
/**
 *
 * @param {CanvasContext} ctx canvas上下文
 * @param {number} x 圆角矩形选区的左上角 x坐标
 * @param {number} y 圆角矩形选区的左上角 y坐标
 * @param {number} w 圆角矩形选区的宽度
 * @param {number} h 圆角矩形选区的高度
 * @param {number} r 圆角的半径
 / 画圆角 ctx、x起点、y起点、w宽度、y高度、r圆角半径、fillColor填充颜色、strokeColor边框颜色
 */
export function roundRect(ctx, x, y, w, h, r, fillColor, strokeColor) {

  // 开始绘制
  ctx.beginPath()

  // 绘制左上角圆弧 Math.PI = 180度
  // 圆心x起点、圆心y起点、半径、以3点钟方向顺时针旋转后确认的起始弧度、以3点钟方向顺时针旋转后确认的终止弧度
  ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)

  // 绘制border-top
  // 移动起点位置 x终点、y终点
  ctx.moveTo(x + r, y)
  // 画一条线 x终点、y终点
  ctx.lineTo(x + w - r, y)
  // self.data.ctx.lineTo(x + w, y + r)

  // 绘制右上角圆弧
  ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)

  // 绘制border-right
  ctx.lineTo(x + w, y + h - r)
  // self.data.ctx.lineTo(x + w - r, y + h)

  // 绘制右下角圆弧
  ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)

  // 绘制border-bottom
  ctx.lineTo(x + r, y + h)
  // self.data.ctx.lineTo(x, y + h - r)

  // 绘制左下角圆弧
  ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)

  // 绘制border-left
  ctx.lineTo(x, y + r)
  // self.data.ctx.lineTo(x + r, y)

  if (fillColor) {
    // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
    ctx.setFillStyle(fillColor)
    // 对绘画区域填充
    ctx.fill()
  }

  if (strokeColor) {
    // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
    ctx.setStrokeStyle(strokeColor)
    // 画出当前路径的边框
    ctx.stroke()
  }
  // 关闭一个路径
  // self.data.ctx.closePath()

  // 剪切，剪切之后的绘画绘制剪切区域内进行，需要save与restore
  ctx.clip()

}

/*
请求拦截处理
*/
export function expressWait(data,res){
  if(data.code == 2000){
    wxShowToast({
      'title': data.msg,
      'icon': 'none'
    })
  }

  if(data.code == 3000 && (getCurrentPageUrl() != 'pages/today/main')){

    wxShowToast({
      'title': '登陆过期，请重新登陆',
      'icon': 'none'
    })
    store.dispatch("setUserInfo",{});
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/today/main'
      })
    },2000)
  }
}
/*
判断是否为空
@params str
@params type
*/
export function empty(str,type){
  if(!str || str == '' || str == null || str == undefined || str == 'null'){
    return false;
  }
  return true;
}
/*
  token失效处理
*/
import store from 'common/store';
import {Login_api}from 'common/path';
export function expiration(token,options){
  if(!token || token == 'undefined' || token == 'null'){
    let index = -1;
    let urlArr = [];
    urlArr[Login_api] = 1;

    wxShowToast({
      'title': '登陆失效，请重新登陆',
      'icon': 'none'
    })
    store.dispatch("setUserInfo",{});

    if(urlArr[options['url']]){
      index = -1;
    }else{
      index = 1;
    }


    if(index == 1  && (getCurrentPageUrl() != 'pages/login/main')){
      setTimeout(() => {
        wx.redirectTo({
          url: '/pages/login/main'
        })
      },2000)
    }
    return;
  }
}
/*
判断对象是否为空
*/
export function isEmptyObject(obj){

  for(var key in obj){
    return false
  };
  return true
};
/*
去掉域名
@params obj 需要去除域名的对象
@params domin 需要去掉的域名
*/
export function replaceDomin(obj,domin){
  return obj.replace(domin,'');
}

/*
字符串中提取数字
*/
export function strToNum(e){
  return e.replace(/[^0-9]/ig,"");
}

/*判断是不是一个数字*/
export function isRealNum(val){
  // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除，

  if(val === "" || val ==null){
    return false;
  }
  if(!isNaN(val)){
    //对于空数组和只有一个数值成员的数组或全是数字组成的字符串，isNaN返回false，例如：'123'、[]、[2]、['123'],isNaN返回false,
    //所以如果不需要val包含这些特殊情况，则这个判断改写为if(!isNaN(val) && typeof val === 'number' )
    return true;
  }

  else{
    return false;
  }
}

/*
js模糊搜索
@param list    要检索的列表
@param keyWord    模糊的关键词
*/
export function fuzzyQuery(list, keyWord,name) {
  var reg =  new RegExp(keyWord);
  var arr = [];
  for (var i = 0; i < list.length; i++) {
    if (reg.test(list[i][name])) {
      arr.push(list[i]);
    }
  }
  return arr;
}
export function extend(){
  var length = arguments.length;
  var target = arguments[0] || {};
  if (typeof target!="object" && typeof target != "function") {
    target = {};
  }
  if (length == 1) {
    target = this;
    i--;
  }
  for (var i = 1; i < length; i++) {
    var source = arguments[i];
    for (var key in source) {
      // 使用for in会遍历数组所有的可枚举属性，包括原型。
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
}
export default {
  formatNumber,
  wxformatTime,
  formatTime,
  toTime,
  getFormData,
  checkTime,
  getCurrentPageUrl,
  getCurrentPageUrlWithArgs,
  DateAddDay,
  addZero,
  FirstDayInThisWeek,
  getClientHeight,
  getElement,
  getElementAll,
  ajax,
  post,
  get,
  wxShowModal,
  wxShowToast,
  wxShowLoading,
  wxShowActionSheet,
  wxHideToast,
  wxChooseImage,
  wxUploadFile,
  wxHideLoading,
  wxDownloadFile,
  wxPlayVoice,
  wxPromisify,
  wxAuthCheck,
  deepClone,
  wxGetStorage,
  wxGetStorageSync,
  wxSetStorage,
  wxRemoveStorage,
  checkMobile,
  roundRect,
  expressWait,
  forCarm,
  empty,
  isEmptyObject,
  replaceDomin,
  strToNum,
  isRealNum,
  fuzzyQuery,
  extend,
}

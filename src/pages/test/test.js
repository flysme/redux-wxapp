let app = getApp(),
    appid = 'wx6e219488e53a4991',
    appsecret = '04d9f45e67addbc27f9dc2cfe80c920d';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
    console.log('start')
    app.callback=function(res){
      console.log('res', res)
    }

  },
  init () {
    // const requestTask = wx.request({
    //   url: 'http://t.yushu.im/v2/movie/coming_soon?start=1&count=20',
    //   header: {
    //     'content-type': 'json' // 默认值
    //   },
    //   success:(res)=>{
    //     console.log(res,'res')
    //   }
    // })
    // requestTask.abort()
    // this.getAccessToken()
  },
  start(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        console.log('tempFilePaths', tempFilePaths)
      }
    })
  },
  getAccessToken (cb) {
      let host = 'https://api.weixin.qq.com/cgi-bin/token',
          url = host + `?grant_type=client_credential&appid=${appid}&secret=${appsecret}`;
      wx.request({
        url: url,
        header: {
          'content-type': 'json' // 默认值
        },
        success: (res) => {
          console.log(res.data.access_token, 'res')
          typeof cb == 'function' && cb(res.data.access_token)
        }
      })
  },
  setuniformMessage (data) {
    let tmp_id = '3z5IysGRSGcOHtv4IHVjiguMf4oTxWtOdtLRq_M43jY';
    let obj = {
      "touser": data.openid,//用户的openid
      "template_id": tmp_id,//模板id
      "page": "page/index/index",
      "form_id": data.form_id,//表单id
      "data": data.list,
      "emphasis_keyword": "keyword1.DATA" //将keyword1放大
    }
    this.getAccessToken((access_token)=>{
        wx.request({
          url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + access_token,
          header: {
            'content-type': 'json' // 默认值
          },
          data: obj,
          method:'POST',
          success: (res) => {
            console.log(res, 'setuniformMessage')
          }
        })
      })
    },
    login () {
      return new Promise((resolve,reject)=>{
        // 登录
        wx.login({
          success: res => {
            // ------ 获取凭证 ------
            var code = res.code;
            if (code) {
              this.getopenId(code).then((openid)=>{
                resolve(openid)
              })
            } else {
              console.log('获取用户登录失败：' + res.errMsg);
            }
          }
        })
      })
    },
  getopenId(code) {
      return new Promise((resolve,reject)=>{
        let host = 'https://api.weixin.qq.com/sns/jscode2session',
          url = host + '?appid='+appid +'&secret='+appsecret+'&js_code=' + code +'& grant_type=authorization_code'
        wx.request({
          url: url,
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            let openid = res.data.openid //返回openid
            if(openid){
              resolve(openid)
            }else{
              reject('err');
            }
          }
        })

      })
    },
    formSubmit (e) {
      let form_id = e.detail.formId
      console.log('e----', form_id)
      let data = {
        'form_id': form_id,
        'list': {
          "keyword1": {
            "value": "审核中"
          },
          "keyword2": {
            "value": "通行证办理"
          },
          "keyword3": {
            "value": "15656211450"
          },
          "keyword4": {
            "value": "大飞"
          }
        }
      }
     
      this.login().then(openid=>{
          data.openid = openid
        console.log(data,'data')
        this.setuniformMessage(data)
      })
    },
    tobottom () {
      console.log('xxxx')
      wx.pageScrollTo({
        scrollTop:400
      })
    },
    setting () {
      wx.authorize({
        scope:'scope.invoiceTitle',
        success(res){
          console.log(res,'res---authorize')
          wx.getSetting({
            success: (res) => {
              console.log(res, 'res')
            }
          })
        }
      })
     
    }
})
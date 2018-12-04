import { Auth } from '../../../mixins/auth';
const app = getApp();
class Aftermarketpage extends Auth {
      data = {
          aReason: [{
              value: '0',
              name: '商品质量问题',
              checked: true
          }, {
              value: '3',
              name: '地址信息填写错误',
              checked: false
          }, {
              value: '1',
              name: '扣款信息有误',
              checked: false
          }, {
              value: '2',
              name: '其他',
              checked: false
          }],
          goods_list: [],
          files: [],
          order_id: '',
          token: '',
          images: [],
          description: '',
          pay_fee: 0,
          total_fee: 0,
          after_id: ''
      }
      onLoads ({order_id, after_id} = {}) {
          this.data.order_id = order_id
          this.data.after_id = after_id
          this.getGoodsList()
          this.getToken()
      }
      getToken() {
          app.ajax('GET', '/upload/token', null, (res) => {
              if (res.data.status == 0) {
                  this.setData({
                      token: res.data.data.image_token
                  })
              } else {
                  if (res.data.msg) app.showErrorTip(this, res.data.msg);
              }
          }, (err) => {
              app.showErrorTip(this, '当前网络不可用，请检查您的网络设置！')
          })
      }
      getGoodsList () {
          app.ajax('GET', '/partner/order/aftermarkets/getOrderPayfee?order_id=' + this.data.order_id, null, (res) => {
              if (res.data.status == 0) {
                  this.setData({
                      total_fee: res.data.data
                  })
              } else {
                  if (res.data.msg) app.showErrorTip(this, res.data.msg);
              }
          }, (err) => {
              app.showErrorTip(this, '当前网络不可用，请检查您的网络设置！')
          })
      }
      checkboxChange (e) {
          var checkboxItems = this.data.aReason,
              values = e.detail.value;
          for (var i = 0, lenI = checkboxItems.length; i < lenI; i++) {
              checkboxItems[i].checked = false;
              for (var j = 0, lenJ = values.length; j < lenJ; j++) {
                  if (checkboxItems[i].value == values[values.length - 1]) {
                      checkboxItems[i].checked = true;
                      break;
                  }
              }
          }

          this.setData({
              aReason: checkboxItems
          });
      }
      chooseImage (e) {
          var that = this;
          wx.showLoading({
              title: '上传中',
              mask: true
          });
          wx.chooseImage({
              count: 3,
              sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
              success: function(res) {
                  var tempFilePaths = res.tempFilePaths;
                  for (let i = 0; i < tempFilePaths.length; i++) {
                      wx.uploadFile({
                          url: 'https://up.qbox.me',
                          filePath: tempFilePaths[i],
                          name: 'file',
                          formData: {
                              'token': that.data.token,
                              'x:source': 'smartcab / xiaochengxu'
                          },
                          success: function(res) {
                              let data = JSON.parse(res.data),
                                  images = that.data.images;
                              images.push(data.name);
                              that.setData({
                                  images: images
                              })
                              wx.hideLoading();
                          }
                      })
                  }
                  that.setData({
                      files: that.data.files.concat(res.tempFilePaths)
                  });
              },
              complete: function() {
                  wx.hideLoading();
              }
          })
      }
      previewImage (e) {
          wx.previewImage({
              current: e.currentTarget.id, // 当前显示图片的http链接
              urls: this.data.files // 需要预览的图片http链接列表
          })
      }
      setDescription (e) {
          this.setData({
              description: e.detail.value
          });
      }
      setRefundAmount (e) {
          this.setData({
              pay_fee: e.detail.value
          });
      }
      refund () {
          app.ajax('GET', '/partner/order/aftermarkets/refund?after_id=' + this.data.after_id + '&money=' + (this.data.pay_fee * 100) + '&status=1', null, (res) => {
              if (res.data.status == 0) {
                  let data = res.data.data;
                  wx.showToast({
                      title: res.data.data,
                      icon: 'success',
                      duration: 2000,
                      success: function() {
                          wx.redirectTo({
                              url: '../after_sales/index',
                          })
                      }
                  })
              } else {
                  if (res.data.msg) app.showErrorTip(this, res.data.msg);
              }
          }, (err) => {
              app.showErrorTip(this, '当前网络不可用，请检查您的网络设置！')
          })
      }
      submit () {
          let reason = this.data.aReason.filter(item => item.checked == true);
          if (!reason.length) {
              app.showErrorTip(this, '请选择原因');
              return false;
          }
          if ((this.data.pay_fee * 100) > this.data.total_fee) {
              app.showErrorTip(this, '退款金额不能大于订单金额')
              return false;
          }
          if (this.data.after_id) {
              this.refund();
              return false;
          }
          if (!this.data.description) {
              app.showErrorTip(this, '请填写问题描述')
              return false;
          }
          if (!this.data.images.length) {
              app.showErrorTip(this, '至少上传一张图片')
              return false;
          }
          let data = {
              order_id: this.data.order_id,
              content: this.data.description,
              images: this.data.images,
              refund_type: reason[0].value
          }
          app.ajax('POST', '/partner/order/aftermarkets/save', data, (res) => {
              if (res.data.status == 0) {
                  this.data.after_id = res.data.data.after_id;
                  this.refund();
              } else {
                  if (res.data.msg) app.showErrorTip(this, res.data.msg);
              }
          }, (err) => {
              app.showErrorTip(this, '当前网络不可用，请检查您的网络设置！')
          })
      }
}
let page = new Aftermarketpage()
Page(page)

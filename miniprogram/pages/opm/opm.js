// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    preip: "",
    opmresult: [],
    checkedstatus: false,
    opminfo: [],
    oprname: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   let preip=options.ip
    if (options.ip) {
      this.setData({
        preip: options.ip
      })
    }else{
      this.setData({
        
      })      
    }
    const db = wx.cloud.database({})
    //  const _ = db.command
    if (options.ip) {
      db.collection('operationManual').where({
        ip: options.ip
      }).get({
        success: res => {

          if (res.data.length > 0) {
            this.setData({
              opmresult: res.data,
            })
            console.log(res.data)
          } else {
            this.setData({
              opmresult: [],
              noResult: '阿欧,木有?快找主人添加！'
            })
          }
          console.log('[数据库] [查询记录] 成功: ', res)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        }
      })
    }
   return preip
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function(e) {
      wx.showNavigationBarLoading() //在标题栏中显示加载
      this.setData({
        checkedstatus: false,
        opminfo: []
      })
      console.log('onPullDownRefresh')
      // this.queryData(id)
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh()
  },
  radioChange: function (e) {
    this.setData({
      oprname: e.detail.value     
    })
    console.log(e.detail.value)
  },
  radio: function(e) {
    const db = wx.cloud.database({})
    //  const _ = db.command
    if (this.data.oprname) {
      db.collection('operationManual').where({
        opr: this.data.oprname,
        ip: this.data.preip
      }).get({
        success: res => {

          if (res.data.length > 0) {
            this.setData({
              opminfo: res.data,
            })
          } else {
            this.setData({
              opminfo: [],
              noResult: '阿欧,木有?快找主人添加！'
            })
          }
          console.log('[数据库] [查询记录] 成功: ', res)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        }
      })
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
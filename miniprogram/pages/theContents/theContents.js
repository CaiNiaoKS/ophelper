// pages/share/share.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleResult: [],
    navigationBarTitleText: "",
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    navigationBarTitleText: options.thetitle
    const articledb = wx.cloud.database({})
    //  const _ = db.command      
    var _this = this
    // 查询当前用户所有的 counters
    articledb.collection('Articles').where({

      //  IP: _.eq(this.data.theip)
      title: options.thetitle
    }).get({
      success: res => {

        if (res.data.length > 0) {
          this.setData({
            //       queryResult: JSON.stringify(res.data, null, 2),
            thearticleResult: res.data,

          })

        }
        else {
          this.setData({

            thearticleResult: '加载失败,请确认!',


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


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function (e) {
    
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh()

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
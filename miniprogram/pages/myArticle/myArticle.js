// pages/share/share.js

var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleResult: [],
    articlenum: 0,
    titlehead: '',
    inserttimehead: '',
    newarticlenum: 0,
    noarticle: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = util.formatTime(new Date());
    // 展示加载动作
    wx.showLoading({
      title: '加载中',
    })
    //查询文章列表及文章总数
    const articledb = wx.cloud.database({})
    var _this = this
    articledb.collection('Articles').orderBy('insertdate', 'desc').where({
      _openid: options.theopenid
    }).get({
      success: res => {

        if (res.data.length > 0) {
          this.setData({
            //       queryResult: JSON.stringify(res.data, null, 2),
            articleResult: res.data,
            articlenum: res.data.length,
            titlehead: '文章标题',
            inserttimehead: '发布日期',
            noarticle: '',
          })
        } else {
          this.setData({
            articleResult: [],
            articlenum: 0,
            titlehead: '',
            inserttimehead: '',
            noarticle: '尚无文章，请下拉刷新或添加！',


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

    //查询当日文章数量
    articledb.collection('Articles').where({
      _openid: options.theopenid,
      insertdate: date
    }).get({
      success: res => {

        if (res.data.length > 0) {
          this.setData({
            //       queryResult: JSON.stringify(res.data, null, 2),
            newarticlenum: res.data.length,
          })

        } else {
          this.setData({

            newarticlenum: 0,


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
    // 延迟0.5秒停止加载动作
    setTimeout(function () {
      wx.hideLoading()
    }, 500)
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
    var date = util.formatTime(new Date());
    // 展示加载动作
    wx.showLoading({
      title: '加载中',
    })
    // 查询文章数据
    const articledb = wx.cloud.database({})
    wx.showNavigationBarLoading() //在标题栏中显示加载
    articledb.collection('Articles').get({
      success: res => {

        if (res.data.length > 0) {
          this.setData({
            //       queryResult: JSON.stringify(res.data, null, 2),
            articleResult: res.data,
            articlenum: res.data.length,
            titlehead: '文章标题',
            inserttimehead: '发布日期',
            noarticle: '',
          })

        } else {
          this.setData({
            articleResult: [],
            articlenum: 0,
            titlehead: '',
            inserttimehead: '',
            noarticle: '未获取到文章，请再次下拉刷新或添加！',

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
    articledb.collection('Articles').where({
      //  IP: _.eq(this.data.theip)
      insertdate: date
    }).get({
      success: res => {

        if (res.data.length > 0) {
          this.setData({
            //       queryResult: JSON.stringify(res.data, null, 2),
            newarticlenum: res.data.length,
          })

        } else {
          this.setData({

            newarticlenum: 0,


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
    // 延迟0.5秒停止加载动作
    setTimeout(function () {
      wx.hideLoading()
    }, 500)
    console.log('onPullDownRefresh')
    // this.queryData(id)
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
// pages/me/me.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    animationData: {},
    myarticlenum: 0,
    flag: 'background: #4582E4;color: #4582E4;',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result)
        app.globalData.openid = res.result.openid
        this.setData({
          theopenid: res.result.openid,
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)

      }
    })  
    
  },
  getUserInfo: function (e) {
    console.log(e)
    // 展示加载动作
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    } 
    const myarticledb = wx.cloud.database({})
    myarticledb.collection('Articles').where({

      _openid: this.data.theopenid
    }).get({
      success: res => {

        if (res.data.length > 0) {
          this.setData({
            
            myarticlenum: res.data.length,
          })

        } else {
          this.setData({

            myarticlenum: 0,


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
  onShow() {

    const animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    this.animation = animation
    

    setTimeout(function () {
      // 先旋转同时放大，然后平移
      this.animation.translateY(20).step({ duration: 1000 })
      this.animation.width(100)
      this.animation.translateX(150).step({ duration: 1000 })
      this.animation.opacity(0.6).step({ duration: 1000 })
      this.animation.scale(2, 2).rotate(45).step()
      this.animation.translateY(150).step({ duration: 1000 })
      this.setData({
        animationData: this.animation.export(),
        
      })
    }.bind(this), 1000)
    // this.setData({
    //   flag: '',
    // })
    // that.animation1 = animation
    var that = this
    setTimeout(function () {
      // 先旋转同时放大，然后平移

      that.animation.rotate(-45).scale(1, 1).step()
      that.animation.translate(-15, -190).step({ duration: 1000 })
      that.animation.opacity(1).step({ delay: 1000 })
      that.setData({
        animationData1: that.animation.export(),
        flag: '',
      })
    }.bind(that), 5000)
  },
  rotateAndScale() {
    // 旋转同时放大
    this.animation.rotate(45).scale(2, 2).step()
    this.setData({
      animationData: this.animation.export()
    })
  },
  rotateThenScale() {
    // 先旋转后放大
    this.animation.rotate(45).step()
    this.animation.scale(2, 2).step()
    this.setData({
      animationData: this.animation.export()
    })
  },
  rotateAndScaleThenTranslate() {
    // 先旋转同时放大，然后平移
    this.animation.rotate(45).scale(2, 2).step()
    this.animation.translate(100, 100).step({ duration: 1000 })
    this.setData({
      animationData: this.animation.export()
    })
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
  onPullDownRefresh: function () {
    const myarticledb = wx.cloud.database({})
    myarticledb.collection('Articles').where({

      _openid: this.data.theopenid
    }).get({
      success: res => {

        if (res.data.length > 0) {
          this.setData({

            myarticlenum: res.data.length,
          })

        } else {
          this.setData({

            myarticlenum: 0,


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
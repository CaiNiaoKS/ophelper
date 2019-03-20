// pages/addArticle/addArticle.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titlevalue: '',
    contentvalue: '',
    btnstatus: '',
    cansubmit: 'true',
    contentvalue: '',
    titlevalue: '',
    date: '',

},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    // this.setData({
    //   time: time
    // });

  },
  titleInput(e) {
    var titlevalue = e.detail.value
    this.setData({
      titlevalue: e.detail.value,
      cansubmit: '',
      
    })
    if (titlevalue) {
      this.setData({
        btnstatus: 'primary',
      })
    }
  },
  contentInput(e) {
    this.setData({
      contentvalue: e.detail.value,
      cansubmit: '',
      btnstatus: 'primary',
    })
  },
  articleclear: function (e) {
    if (this.data.contentvalue != '' || this.data.titlevalue != '') {
    wx.showModal({
      title: '清空内容',
      content: '确认清除所有内容？',
      cancelText: '再想想',
      success: res => {
        if (res.confirm) {
          this.setData({
            titlevalue: '',
            contentvalue: '',
            btnstatus: '',
            cansubmit: 'true',
          })
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    }) 
    }
  },
  articlesubmit: function (e) {
    var date = util.formatTime(new Date());
    if (this.data.contentvalue != '' || this.data.titlevalue != '') {
      wx.showModal({
        title: '提交文章',
        content: '确定提交这篇文章？',
        cancelText: '再看看',
        success: res => {
          if (res.confirm) {     
    const thedb = wx.cloud.database({})
    thedb.collection('Articles').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
        title: this.data.titlevalue,
        contents: this.data.contentvalue,
        nickName: this.data.nickName,
        insertdate: date,
        insertime: Date(),
      },
      success(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res);
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000,
          success: function () {
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 2000);
            util.refresh();
          }
        });
        // wx.hideToast()
      }

    })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      }) 
    }
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
  onPullDownRefresh: function () {

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
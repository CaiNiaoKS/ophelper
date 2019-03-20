//index.js
const app = getApp()

Page({
  data: {
    scrollindex: '',
    avatarUrl: '',
    userInfo: {},
    url: "",
    logged: false,
    takeSession: false,
    requestResult: '',
    inputValue: "",
    queryResult: [],
    zbResult: [],
    ptResult: [],
    checkresult: '',
    comments1: "",
    comments2: "",
    comments3: '',
    emptResult1: '',
    emptResult2: '',
    emptResult3: '',
    scanResult: '',
    tempresult: [],
    theip: '',
    changelink: "",
    clearimg1: '',
    btn_proinfo_img: '../../images/host48.png',
    btn_disinfo_img: '../../images/zb48.png',
    btn_ophelper_img: '../../images/yw48.png',
    btn_ptinfo_img: '../../images/pt48.png',
    imgUrls: [ 
      {
      img: '../../images/logo.png',
      url: '../../images/logo.png'
    },
    {
      img: '../../images/yun.png',
      url: '../../images/yun.png'
    },
    {
      img: '../../images/pab-banner-new.png',
      url: '../../images/pab-banner-new.png'
    }
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 6000,
    duration: 500
  },
  click_swiper: function(e) {
    var url1 = e.currentTarget.dataset.url
    if (url1 != '') {
      if (url1 == "../../images/logo.png") {
        wx.navigateTo({
         url: '../test1/test1',
        }) 
      } else {
        wx.navigateTo({
          url: '../test2/test2',
        }) 
      }
         
    }
  },
  onLoad: function() {
    // 加载外部字体
    // wx.loadFontFace({
    //   family: 'webfont',
    //   source: 'url("https://at.alicdn.com/t/webfont_1f7b3qbimiv.eot")',
    //   success: function (res) {
    //     console.log(res.status) //  loaded
    //   },
    //   fail: function (res) {
    //     console.log(res) //  error
    //   },
    //   complete: function (res) {
    //     console.log(res.status)
    //   }
    // })
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           this.setData({
    //             avatarUrl: res.userInfo.avatarUrl,
    //             userInfo: res.userInfo

    //           })
    //           console.log('[云函数] [login] user openid: ', avatarUrl)
    //         }
    //       })
    //     }
    //   }
    // })
  },
onPullDownRefresh: function(e) {
  wx.showNavigationBarLoading() //在标题栏中显示加载
  this.setData({
    scrollindex: '',
    requestResult: '',
    inputValue: "",
    queryResult: [],
    zbResult: [],
    checkresult: '',
    ptResult: [],
    comments1: "",
    comments2: "",
    comments3: "",
    emptResult1: '',
    emptResult2: '',
    emptResult3: '',
    scanResult: '',
    tempresult: [],
    clearimg1: '',
    theip: '',
    changelink: "",
    noResult: '',
    proinfoclolor: '#999999',
    btn_proinfo_img: '../../images/host48.png',
    disinfoclolor: '#999999',
    btn_disinfo_img: '../../images/zb48.png',
    ophelperclolor: '#999999',
    btn_ophelper_img: '../../images/yw48.png',
    ptinfoclolor: '#999999',
    btn_ptinfo_img: '../../images/pt48.png',
  })
  console.log('onPullDownRefresh')
 // this.queryData(id)
  wx.hideNavigationBarLoading() //完成停止加载
  wx.stopPullDownRefresh()
},
  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
  bindKeyInput(e) {
    this.setData({
      scrollindex: '9999',
      inputValue: e.detail.value,
      emptResult1: '',
      emptResult2: '',
      emptResult3: '',
      noResult: '',
      clearimg1: '../../images/close-circle48.png',
    })
    if (this.data.queryResult == '' && this.data.zbResult == ''&&this.data.inputValue!=''||this.data.scanResult!='') {
    
    const db0 = wx.cloud.database({})
    db0.collection('hostinfo').where({

      //  IP: _.eq(this.data.theip)
      IP: db0.RegExp({
        regexp: e.detail.value,
        options: '',
      })
    }).get({
      success: res => {

        if (res.data.length > 0) {
          this.setData({
          
            tempresult: res.data,
            clearimg1: '../../images/close-circle48.png',
          })
        } else {
          this.setData({ 
            tempresult: [],
            clearimg1: '../../images/close-circle48.png',
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
    if (this.data.inputValue==''|| this.data.scanResult=='') {
      this.setData ({
        tempresult: [],
        clearimg1: '',
        
      })
    }
    if (this.data.inputValue == '') {
      this.setData({
        scrollindex: '',

      })
    }
  },
  clear: function (e) {
    this.setData({
      scanResult: '',
      clearimg1: '',
      tempresult: [],
      inputValue: '',
      scrollindex: '',
    })
  },
  itemtap: function (e) {
    this.setData({
      scanResult: e.target.id,
      tempresult: [],
      scrollindex: '',
    })
  },
  onQuery1: function (e) {

    
    const db1 = wx.cloud.database({})
  //  const _ = db.command
    if (this.data.inputValue == '' && this.data.scanResult == '') {
      wx.showModal({
        title: '警告',
        content: '客官，您忘记输入ip了!',
        confirmText: '好的',
        cancelText: '点错了',
        success: res => {
          if (res.confirm) {
            this.setData({
              getfocus: true
            })
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      this.setData({
        // emptResult1: '客官，您忘记',
        // queryResult: [],
        // checkresult: '',
        // zbResult: [],
        // ptResult: [],
        // emptResult2: '输入',
        // emptResult3: 'ip了！',
        proinfoclolor: '#6595e9',
        btn_proinfo_img: '../../images/hosted48.png',
        disinfoclolor: '#999999',
        btn_disinfo_img: '../../images/zb48.png',
        ophelperclolor: '#999999',
        btn_ophelper_img: '../../images/yw48.png',
        ptinfoclolor: '#999999',
        btn_ptinfo_img: '../../images/pt48.png',
      })
    } else {
      if (this.data.scanResult != '') {
        this.setData({
          theip: this.data.scanResult,
        })
        } else {
        this.setData({
          theip: this.data.inputValue,
        })
        }
       var _this=this
    // 查询当前用户所有的 counters
    db1.collection('hostinfo').where({
      
    //  IP: _.eq(this.data.theip)
      IP: this.data.theip
    }).get({
      success: res => {

        if (res.data.length > 0) {
            this.setData({
       //       queryResult: JSON.stringify(res.data, null, 2),
              queryResult: res.data,
              zbResult: [],
              ptResult: [],
              noResult: '',
              checkresult: '',
              comments1: '数据有误?请帮助',
              comments2: "",
              comments3: '',
              changelink: '修正',
              emptResult1: '',
              emptResult2: '',
              emptResult3: '',
              proinfoclolor: '#6595e9',
              btn_proinfo_img: '../../images/hosted48.png',
              disinfoclolor: '#999999',
              btn_disinfo_img: '../../images/zb48.png',
              ophelperclolor: '#999999',
              btn_ophelper_img: '../../images/yw48.png',
              ptinfoclolor: '#999999',
              btn_ptinfo_img: '../../images/pt48.png',
          })
          }
          else {
            this.setData({ 
              queryResult: [],
              zbResult: [],
              ptResult: [],
              checkresult: '',
              comments1: '',
              comments2: "", 
              comments3: '',           
              noResult: '阿欧,木有?快找主人添加！',
              proinfoclolor: '#6595e9',
              btn_proinfo_img: '../../images/hosted48.png',
              disinfoclolor: '#999999',
              btn_disinfo_img: '../../images/zb48.png',
              ophelperclolor: '#999999',
              btn_ophelper_img: '../../images/yw48.png',
              ptinfoclolor: '#999999',
              btn_ptinfo_img: '../../images/pt48.png',
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
  onQuery2: function (e) {
    const db2 = wx.cloud.database({})
    //  const _ = db.command
    var _this = this
    if (this.data.inputValue == '' && this.data.scanResult == '') {

      wx.showModal({
        title: '警告',
        content: '客官，您忘记输入ip了!',
        confirmText: '好的',
        cancelText: '点错了',
        success: res => {
          if (res.confirm) {
            this.setData({
              getfocus: true
            })
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      this.setData({
        // emptResult1: '客官，您忘记',
        // emptResult2: '输入',
        // emptResult3: 'ip了！',

        // queryResult: [],
        // ptResult: [],
        // zbResult: [],
        // checkresult: '',
        disinfoclolor: '#6595e9',
        btn_disinfo_img: '../../images/zbed48.png',
        proinfoclolor: '#999999',
        btn_proinfo_img: '../../images/host48.png',
        ophelperclolor: '#999999',
        btn_ophelper_img: '../../images/yw48.png',
        ptinfoclolor: '#999999',
        btn_ptinfo_img: '../../images/pt48.png',
      })
    } else {
      if (this.data.scanResult != '') {
        this.setData({
          theip: this.data.scanResult,
        })
      } else {
        this.setData({
          theip: this.data.inputValue,
        })
      }
      var _this = this
      // 查询当前用户所有的 counters
      db2.collection('HostsInfo_Disa').where({

        //  IP: _.eq(this.data.theip)
        IP: this.data.theip
      }).get({
        success: res => {

          if (res.data.length > 0) {
            this.setData({
              //       queryResult: JSON.stringify(res.data, null, 2),
              zbResult: res.data,
              queryResult: [],
              ptResult: [],
              checkresult: '',
              noResult: '',
              comments2: '数据有误?请帮助',
              comments1: "",
              comments3: '',
              changelink: '修正',
              emptResult1: '',
              emptResult2: '',
              emptResult3: '',
              disinfoclolor: '#6595e9',
              btn_disinfo_img: '../../images/zbed48.png',
              proinfoclolor: '#999999',
              btn_proinfo_img: '../../images/host48.png',
              ophelperclolor: '#999999',
              btn_ophelper_img: '../../images/yw48.png',
              ptinfoclolor: '#999999',
              btn_ptinfo_img: '../../images/pt48.png',
            })
          }
          else {
            this.setData({
              zbResult: [],
              queryResult: [],
              ptResult: [],
              comments1: "",
              comments2: '',
              comments3: '',
              checkresult: '',
              noResult: '阿欧,木有?快找主人添加！',
              disinfoclolor: '#6595e9',
              btn_disinfo_img: '../../images/zbed48.png',
              proinfoclolor: '#999999',
              btn_proinfo_img: '../../images/host48.png',
              ophelperclolor: '#999999',
              btn_ophelper_img: '../../images/yw48.png',
              ptinfoclolor: '#999999',
              btn_ptinfo_img: '../../images/pt48.png',

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
  onQuery3: function (e) {
    const db3 = wx.cloud.database({})
    //  const _ = db.command      
      var _this = this
      // 查询当前用户所有的 counters
    db3.collection('Platform').get({
        success: res => {

          if (res.data.length > 0) {
            this.setData({
              //       queryResult: JSON.stringify(res.data, null, 2),
              ptResult: res.data,
              queryResult: [],
              zbResult: [],
              noResult: '',
              checkresult: '[查询结果]',
              comments3: '数据有误?请帮助',
              comments1: "",
              comments2: "",
              changelink: '修正',
              emptResult1: '',
              emptResult2: '',
              emptResult3: '',
              disinfoclolor: '#999999',
              btn_disinfo_img: '../../images/zb48.png',
              proinfoclolor: '#999999',
              btn_proinfo_img: '../../images/host48.png',
              ophelperclolor: '#999999',
              btn_ophelper_img: '../../images/yw48.png',
              ptinfoclolor: '#6595e9',
              btn_ptinfo_img: '../../images/pted48.png',
            })
          }
          else {
            this.setData({
              ptResult: [],
              zbResult: [],
              queryResult: [],
              comments1: "",
              comments2: '',
              comments3: '',
              checkresult: '',
              noResult: '阿欧,木有?快找主人添加！',
              disinfoclolor: '#999999',
              btn_disinfo_img: '../../images/zb48.png',
              proinfoclolor: '#999999',
              btn_proinfo_img: '../../images/host48.png',
              ophelperclolor: '#999999',
              btn_ophelper_img: '../../images/yw48.png',
              ptinfoclolor: '#6595e9',
              btn_ptinfo_img: '../../images/pted48.png',

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
  onQuery4: function (e) {
    if (this.data.inputValue == '' && this.data.scanResult == '') {
      wx.showModal({
        title: '警告',
        content: '客官，您忘记输入ip了!',
        confirmText: '好的',
        cancelText: '点错了',
        success: res => {
          if (res.confirm) {
            this.setData({
              getfocus: true
            })
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      this.setData({
        // emptResult1: '客官，您忘记',
        // emptResult2: '输入',
        // emptResult3: 'ip了！',
        disinfoclolor: '#999999',
        btn_disinfo_img: '../../images/zb48.png',
        proinfoclolor: '#999999',
        btn_proinfo_img: '../../images/host48.png',
        ophelperclolor: '#6595e9',
        btn_ophelper_img: '../../images/ywed48.png',
        ptinfoclolor: '#999999',
        btn_ptinfo_img: '../../images/pt48.png',
      })
    } else {
      if (this.data.scanResult != '') {
        this.setData({
          theip: this.data.scanResult,
          disinfoclolor: '#999999',
          btn_disinfo_img: '../../images/zb48.png',
          proinfoclolor: '#999999',
          btn_proinfo_img: '../../images/host48.png',
          ophelperclolor: '#6595e9',
          btn_ophelper_img: '../../images/ywed48.png',
          ptinfoclolor: '#999999',
          btn_ptinfo_img: '../../images/pt48.png',
        })
      } else {
        this.setData({
          theip: this.data.inputValue,
          disinfoclolor: '#999999',
          btn_disinfo_img: '../../images/zb48.png',
          proinfoclolor: '#999999',
          btn_proinfo_img: '../../images/host48.png',
          ophelperclolor: '#6595e9',
          btn_ophelper_img: '../../images/ywed48.png',
          ptinfoclolor: '#999999',
          btn_ptinfo_img: '../../images/pt48.png',
        })
      }
    }
  },
  inputFocus: function (e) {
    this.setData({
      getfocus: true
    }
    )
  },
  scanTool: function (e) {
    var that=this
    wx.scanCode({
      onlyFromCamera: true,
      scanType: [],
      success: function (res) {
  //      var scanResult='' 
        console.log(res)
        that.setData({
          scanResult: res.result,
        })
      },
      fail: function (res) { 
        console.log(res)
      },
      complete: function (res) { },
    })
  },
  onShareAppMessage: function () {
    return {
      title: '运维助手小工具',
      desc: ' 助力运维场景,便于公司区域外信息获取,功能将不断叠加,敬请期待!',
      path: '/pages/index/index?id=123',
      imageUrl: '../../images/logo.png'
    }
  },
  onReachBottom(){
    if (!this.loading && this.data.page < this.data.pages) {
      this.fetchArticleList(this.data.page + 1)
    }
  },
  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

})

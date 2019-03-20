function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  // return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  return [year, month, day].map(formatNumber).join('/')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function onPullDownRefresh() {
  const articledb = wx.cloud.database({})
  wx.showNavigationBarLoading() //在标题栏中显示加载
  articledb.collection('Articles').get({
    success: res => {

      if (res.data.length > 0) {
        return (
        this.setData({
          //       queryResult: JSON.stringify(res.data, null, 2),
          articleResult: res.data,
          articlenum: res.data.length,
          titlehead: '标 题',
          inserttimehead: '发布日期',

        })
        )
        
      }
      else {
        this.setData({

          articleResult: '未获取到文章，请再次下拉刷新或添加！',


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
  console.log('onPullDownRefresh')
  // this.queryData(id)
  wx.hideNavigationBarLoading() //完成停止加载
  wx.stopPullDownRefresh()

}

module.exports = {
  formatTime: formatTime,
  refresh: onPullDownRefresh
}

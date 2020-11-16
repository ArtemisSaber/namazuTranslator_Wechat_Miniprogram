import { Payload,IResponse,JSONResponse, Setting } from "../../utils/class"
// index.ts

import { getAPIPath, getDataVersion, initAuxilaryData, parseEngUpper } from "../../utils/util"

// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    title: '大鲶鲶翻译噗',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    exceptionList: [],
    inputData: "",
    responseData: {},
    loading: false,
    lang: [
      { name: '中文', val: 'zh_cn' },
      { name: 'English', val: 'en_us' },
      { name: '日本語', val: 'ja_jp' }
    ],
    srcLang: [{ name: '', val: '' }],
    srcLangIndex: 0,
    tgtLang: [{ name: '', val: '' }],
    tgtLangIndex: 0,
    settings: new Setting()
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  bindInputValue(e: any) {
    this.setData({
      inputData: e.detail.value
    })
  },
  onLoad() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          })
        },
      })
    }
    wx.showShareMenu({
      withShareTicket:true
    })
    this.initLang()
    wx.getStorage({
      key: 'dataVersion',
      success(res) {
        let data = JSON.parse(res.data)
        data = data.currentVersion[0]
        let dataVersion = getDataVersion()
        dataVersion.then((res: any) => {
          if (res && res.currentVersion[0].ID !== data.ID) {
            initAuxilaryData()
          }
        })
      },
      fail(err) {
        console.log(err)
        initAuxilaryData()
      }
    })

  },
  performQuery() {
    let queryPromise = this.queryData()
    queryPromise.then((res) => {
      let data = this.querySuccess(new JSONResponse(res))
      wx.setStorageSync('responseData', JSON.stringify(data))
      this.setData({
        loading:false
      })
      wx.navigateTo({
        url: '../result/result'
      })
    }).catch(err => {
      this.queryError(err)
    })
  },
  verifyPayloadValid(payload: Payload) {
    for (let i = 0; i < payload.names.length; i++) {
      if (payload.names[i].length > 0) {
        return true
      }
    }
    return false
  },
  queryData() {
    let input = this.data.inputData
    let settings = this.data.settings
    let payloadData = new Payload(this.parseInputArea(settings.srcLang, input))
    if (this.verifyPayloadValid(payloadData)) {
      this.setData({ 'loading': true })
      return new Promise<string|Record<string,any>>((resolve, reject) => {
        wx.request({
          url: getAPIPath('item', settings.srcLang),
          method: 'POST',
          data: JSON.stringify(payloadData),
          success(res) {
            resolve(res.data)
          },
          fail(err) {
            reject(err)
          }
        })
      })
    } else {
      return new Promise<string>((resolve, reject) => {
        if (false) {
          resolve('this will never happen')
        }
        reject('invalid payload')
      })
    }
  },
  parseNotExistedItems(result: Array<any>) {
    let existArray = this.parseInputArea(this.data.settings.srcLang, this.data.inputData)
    for (let items in result) {
      let item = result[items][this.data.settings.srcLang]
      let index = existArray.indexOf(item)
      if (index !== -1) {
        existArray.splice(index, 1)
      }
    }
    return existArray
  },
  queryError(err: any) {
    if (err === 'invalid payload') {
      wx.showToast({
        title: '请输入要翻译的物品名称',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.showToast({
        title: '出错了！',
        icon: "none",
        duration: 2000
      })
    }
  },

  querySuccess(data: IResponse) {
    if (data.warnings.length > 0) {
      wx.setStorageSync('notExistItem', this.parseNotExistedItems(data.results).join(", "))
    } else {
      wx.removeStorageSync('notExistItem')
    }
    if (data.results.length > 0) {
      for (let items in data.results) {
        data.results[items]['en_us'] = parseEngUpper(data.results[items]['en_us'])
      }
    }
    return data
  },
  initLang() {
    let settingsStr = wx.getStorageSync('settings')
    let settings:Setting
    if (settingsStr) {
      settings = new Setting(JSON.parse(settingsStr))
    }
    else {
      settings = new Setting()
      settings.srcLang = 'zh_cn',
      settings.tgtLang = 'en_us'
      wx.setStorageSync('settings',settings)
    }
    this.setData({
      settings: settings
    })
    let langs = this.data.lang
    let filteredTgtLang = langs
    let filterIndex = filteredTgtLang.findIndex((ele) => {
      return ele.val === settings.srcLang
    })
    filteredTgtLang = filteredTgtLang.slice(0, filterIndex).concat(filteredTgtLang.slice(filterIndex + 1))
    this.setData({
      srcLang: langs,
      tgtLang: filteredTgtLang
    })
    let srcLang = this.data.srcLang.findIndex((ele) => {
      return ele.val === settings.srcLang
    })
    let tgtLang = this.data.tgtLang.findIndex((ele) => {
      return ele.val === settings.tgtLang
    })
    this.setData({
      tgtLangIndex: tgtLang,
      srcLangIndex: srcLang
    })
  },
  changeSrcLang(e: any) {
    let settings = this.data.settings
    settings.srcLang = this.data.srcLang[e.detail.value].val
    let srcLangIndex = this.data.lang.findIndex((ele) => {
      return ele.val === settings.srcLang
    })
    let tgtLangList = this.data.lang.slice(0, srcLangIndex).concat(this.data.lang.slice(srcLangIndex + 1))
    settings.tgtLang = tgtLangList[0].val
    this.setData({
      srcLangIndex: e.detail.value,
      settings: settings,
      tgtLang: tgtLangList,
      tgtLangIndex: 0,
      queryInProgress: false
    })
    wx.setStorageSync('settings', JSON.stringify(settings))
  },
  changeTgtLang(e: any) {
    let settings = this.data.settings
    settings.tgtLang = this.data.tgtLang[e.detail.value].val
    this.setData({
      tgtLangIndex: e.detail.value,
      settings: settings
    })
    wx.setStorageSync('settings', JSON.stringify(settings))
  },
  getUserInfo(e: any) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    })
  },
  verifyExceptionItems(inputData: string) {
    let exceptions = wx.getStorageSync('blankItems')
    exceptions = JSON.parse(exceptions)[this.data.settings.srcLang]
    let exceptionFound = new Array<string>()
    let content = inputData
    for (let item in exceptions) {
      if (inputData.indexOf(exceptions[item]) !== -1 && exceptions[item].length > 0 ) {
        exceptionFound.push(exceptions[item])
        content = content.replace(new RegExp(exceptions[item], "g"), "")
      }
    }
    return { "result": content, "exception": exceptionFound }
  },
  parseInputArea(sourceLang: string, inputData: string) {
    let seperator = [',', ".", '，', '、', '丨', '|', '\n']
    if (sourceLang !== 'en_us') {
      seperator.push(' ')
    }
    let content = ''
    content = inputData
    let resArray = new Array<string>()
    let exceptionResult = new Array<string>()
    for (let item in seperator) {
      if (seperator[item] === ' ') {
        let result = this.verifyExceptionItems(inputData)
        content = result.result
        exceptionResult = result.exception
      }
      if(resArray.length >1){
        break;
      }
      resArray = content.split(seperator[item])
    }
    exceptionResult.length > 0 ? resArray = resArray.concat(exceptionResult) : ''
    resArray = resArray.map(str => str.trim())
    return resArray
  }
})

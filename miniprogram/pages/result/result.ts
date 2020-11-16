import { JSONResponse } from "../../utils/class"

Page({
  data: {
    result: new JSONResponse(),
    settings:{
      srcLang:'',
      tgtLang:''
    },
    notExistItem:new Array<string>()
  },
  onLoad() {
    let jsonStr:string = wx.getStorageSync('responseData')
    let notExistItem:string = wx.getStorageSync("notExistItem")
    if(notExistItem){
      let parsedResult = notExistItem.split(', ')
      let trimResult = new Array<string>()
      parsedResult.forEach(e=>{
        if(e){
          trimResult.push(e)
        }
      })
      this.setData({
        "notExistItem":trimResult
      })
    }
    this.setData({
      result:new JSONResponse(JSON.parse(jsonStr))
    })
    this.initSettings()
  },
  initSettings(){
    let settings = {
      srcLang:'',
      tgtLang:''
    }
    let settingsStr = wx.getStorageSync('settings')
    if(settingsStr){
      settings = JSON.parse(settingsStr)
    }
    else {
      settings.srcLang = 'zh_cn',
      settings.tgtLang = 'en_us'
      wx.setStorageSync('settings',JSON.stringify(settings))
    }
    this.setData({
      settings:settings
    })  
  }
})

import { DataVersion } from "./class"

export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}
export const initAuxilaryData = ()=>{
  let dataVersion = getDataVersion()
  dataVersion.then((res: any) => {
    if (res) {
      let setLocalStor = setLocalStorage('dataVersion', JSON.stringify(res))
      let setEmptyData = getEmptyData()
      setLocalStor.then((res: any) => {
        console.log(res)
      }).catch((err: any) => {
        console.log(err)
      })
      setEmptyData.then((res:any)=>{
        console.log(res)
      })
      wx.showToast({
        title: '数据版本已更新',
        icon: 'success',
        duration: 1500
      })
    }
  })
}

export const getEmptyData = () =>{ //获取带空格的物品名称
  return new Promise<boolean>((resolve,reject)=>{
    let blankItems = {
      "zh_cn": [''], 
      "ja_jp": ['']
    }
    let blankItemPromise = getJSONData(getAPIPath('itemWithBlankSpace','zh-cn'))
    blankItemPromise.then((res:any)=>{
      console.log(res)
      let resData = res.data
      resData.zh_cn.forEach((e:any) => {
        blankItems.zh_cn.push(e.ItemName)
      })
      resData.ja_jp.forEach((e:any) => {
        blankItems.ja_jp.push(e.ItemName)
      })
      let storPromise = setLocalStorage('blankItems',JSON.stringify(blankItems))
      storPromise.then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      })
    }).catch(err=>{
      reject(err)
    })
  })
}

export const getDataVersion = () => {
  return new Promise<DataVersion>((resolve,reject)=>{
    let dataVersion = getJSONData(getAPIPath("dataVersion", "zh-cn"))
    dataVersion.then((res: any) => {
      console.log(res.data)
      resolve(res.data)
    }).catch(err => {
      console.log(err)
      reject(false)
    })
    })
}

export const setLocalStorage = (key: string, data: string) => {
  return new Promise<boolean>((resolve, reject) => {
    wx.setStorage({
      key: key,
      data: data,
      success(res) {
        console.log(res)
        resolve(true)
      },
      fail(err) {
        console.log(err)
        reject(false)
      }
    })
  })
}
export const getLocalStorage = (key: string) => {
  return new Promise<any>((resolve, reject) => {
    wx.getStorage({
      key: key,
      success(res) {
        console.log(res.data)
        resolve(res.data)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}
export const removeLocalStorage = (key: string) => {
  return new Promise<boolean>((resolve, reject) => {
    wx.removeStorage({
      key: key,
      success(res) {
        console.log(res)
        resolve(true)
      },
      fail(err) {
        console.log(err)
        reject(false)
      }
    })
  })
}
export const getAPIPath = (endPoint: string, sourceLang: string = 'zh-cn') => {
  let host = "https://dirusec.com/namazu/api/"
  switch (endPoint) {
    case ("item"):
      return host + "namazuTranslator/item?lang=" + sourceLang
      break;
    case ("dataVersion"):
      return host + "namazuTranslator/dataVersion"
      break;
    case ("itemWithBlankSpace"):
      return host + "namazuTranslator/itemWithBlankSpace"
      break;
    default: {
      return host
    }
  }
}
export const parseResponseResult = (data:any) => {
  Object.keys(data).forEach(key=>{
    if(data[key] === null){
      data[key] = '未找到该物品'
    }
  })
  return data
}


export const parseEngUpper = (string:string) => {
  let wordArray = string.split(' ')
  for(let i = 0;i<wordArray.length;i++){
    let word = wordArray[i]
    if (word !== 'of' && word.length>0){
      let charArray = word.split('')
      charArray[0] = charArray[0].toUpperCase()
      wordArray[i] = charArray.join('')
    }
  }
  return wordArray.join(' ')
}
export const getJSONData = (url: string) => {
  return new Promise<WechatMiniprogram.RequestSuccessCallbackResult>((resolve, reject) => {
    wx.request({
      url: url,
      method: 'GET',
      dataType: 'json',
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}
export const request = (url: string, method: any, dataType: any) => {
  return new Promise<WechatMiniprogram.RequestSuccessCallbackResult>((resolve, reject) => {
    wx.request({
      url: url,
      method: method,
      dataType: dataType,
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}
const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

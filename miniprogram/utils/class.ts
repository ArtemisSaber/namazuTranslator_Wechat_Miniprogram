export class Setting {
  srcLang:string
  tgtLang:string
  constructor()
  constructor(settings:Setting)
  constructor(settings?:Setting,srcLang?:string,tgtLang?:string){
    if(settings){
      this.srcLang=settings.srcLang
      this.tgtLang=settings.tgtLang
    } else {
      this.srcLang = srcLang?srcLang:''
      this.tgtLang = tgtLang?tgtLang:''
      }
  }
}

export interface DataVersion {
  currentVersion:[
    {
      ID:number,
      zh_cn:string,
      ja_jp:string,
      en_us:string
    }
  ]
}

export class Payload {
  names:Array<string>
  constructor(names:Array<string>){
    this.names = names
  }
}

export interface IResponse {
  notFoundResults:Array<any>
  results:Array<any>
  warnings:Array<any>
}

export class JSONResponse implements IResponse {
  notFoundResults:Array<any>
  results:Array<any>
  warnings:Array<any>
  constructor(any?:any){
    if(any){
      this.notFoundResults = any.notFoundResults
      this.results = any.results
      this.warnings = any.warnings
    } else {
      this.notFoundResults = []
      this.results = []
      this.warnings = []
    }
  }
}
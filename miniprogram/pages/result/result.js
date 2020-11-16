"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_1 = require("../../utils/class");
Page({
    data: {
        result: new class_1.JSONResponse(),
        settings: {
            srcLang: '',
            tgtLang: ''
        },
        notExistItem: new Array()
    },
    onLoad() {
        let jsonStr = wx.getStorageSync('responseData');
        let notExistItem = wx.getStorageSync("notExistItem");
        if (notExistItem) {
            let parsedResult = notExistItem.split(', ');
            let trimResult = new Array();
            parsedResult.forEach(e => {
                if (e) {
                    trimResult.push(e);
                }
            });
            this.setData({
                "notExistItem": trimResult
            });
        }
        this.setData({
            result: new class_1.JSONResponse(JSON.parse(jsonStr))
        });
        this.initSettings();
    },
    initSettings() {
        let settings = {
            srcLang: '',
            tgtLang: ''
        };
        let settingsStr = wx.getStorageSync('settings');
        if (settingsStr) {
            settings = JSON.parse(settingsStr);
        }
        else {
            settings.srcLang = 'zh_cn',
                settings.tgtLang = 'en_us';
            wx.setStorageSync('settings', JSON.stringify(settings));
        }
        this.setData({
            settings: settings
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVzdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkNBQWdEO0FBRWhELElBQUksQ0FBQztJQUNILElBQUksRUFBRTtRQUNKLE1BQU0sRUFBRSxJQUFJLG9CQUFZLEVBQUU7UUFDMUIsUUFBUSxFQUFDO1lBQ1AsT0FBTyxFQUFDLEVBQUU7WUFDVixPQUFPLEVBQUMsRUFBRTtTQUNYO1FBQ0QsWUFBWSxFQUFDLElBQUksS0FBSyxFQUFVO0tBQ2pDO0lBQ0QsTUFBTTtRQUNKLElBQUksT0FBTyxHQUFVLEVBQUUsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDdEQsSUFBSSxZQUFZLEdBQVUsRUFBRSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUMzRCxJQUFHLFlBQVksRUFBQztZQUNkLElBQUksWUFBWSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDM0MsSUFBSSxVQUFVLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQTtZQUNwQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQSxFQUFFO2dCQUN0QixJQUFHLENBQUMsRUFBQztvQkFDSCxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO2lCQUNuQjtZQUNILENBQUMsQ0FBQyxDQUFBO1lBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxjQUFjLEVBQUMsVUFBVTthQUMxQixDQUFDLENBQUE7U0FDSDtRQUNELElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxNQUFNLEVBQUMsSUFBSSxvQkFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDN0MsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFBO0lBQ3JCLENBQUM7SUFDRCxZQUFZO1FBQ1YsSUFBSSxRQUFRLEdBQUc7WUFDYixPQUFPLEVBQUMsRUFBRTtZQUNWLE9BQU8sRUFBQyxFQUFFO1NBQ1gsQ0FBQTtRQUNELElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDL0MsSUFBRyxXQUFXLEVBQUM7WUFDYixRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQTtTQUNuQzthQUNJO1lBQ0gsUUFBUSxDQUFDLE9BQU8sR0FBRyxPQUFPO2dCQUMxQixRQUFRLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtZQUMxQixFQUFFLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7U0FDdkQ7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsUUFBUSxFQUFDLFFBQVE7U0FDbEIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEpTT05SZXNwb25zZSB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc1wiXG5cblBhZ2Uoe1xuICBkYXRhOiB7XG4gICAgcmVzdWx0OiBuZXcgSlNPTlJlc3BvbnNlKCksXG4gICAgc2V0dGluZ3M6e1xuICAgICAgc3JjTGFuZzonJyxcbiAgICAgIHRndExhbmc6JydcbiAgICB9LFxuICAgIG5vdEV4aXN0SXRlbTpuZXcgQXJyYXk8c3RyaW5nPigpXG4gIH0sXG4gIG9uTG9hZCgpIHtcbiAgICBsZXQganNvblN0cjpzdHJpbmcgPSB3eC5nZXRTdG9yYWdlU3luYygncmVzcG9uc2VEYXRhJylcbiAgICBsZXQgbm90RXhpc3RJdGVtOnN0cmluZyA9IHd4LmdldFN0b3JhZ2VTeW5jKFwibm90RXhpc3RJdGVtXCIpXG4gICAgaWYobm90RXhpc3RJdGVtKXtcbiAgICAgIGxldCBwYXJzZWRSZXN1bHQgPSBub3RFeGlzdEl0ZW0uc3BsaXQoJywgJylcbiAgICAgIGxldCB0cmltUmVzdWx0ID0gbmV3IEFycmF5PHN0cmluZz4oKVxuICAgICAgcGFyc2VkUmVzdWx0LmZvckVhY2goZT0+e1xuICAgICAgICBpZihlKXtcbiAgICAgICAgICB0cmltUmVzdWx0LnB1c2goZSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIFwibm90RXhpc3RJdGVtXCI6dHJpbVJlc3VsdFxuICAgICAgfSlcbiAgICB9XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIHJlc3VsdDpuZXcgSlNPTlJlc3BvbnNlKEpTT04ucGFyc2UoanNvblN0cikpXG4gICAgfSlcbiAgICB0aGlzLmluaXRTZXR0aW5ncygpXG4gIH0sXG4gIGluaXRTZXR0aW5ncygpe1xuICAgIGxldCBzZXR0aW5ncyA9IHtcbiAgICAgIHNyY0xhbmc6JycsXG4gICAgICB0Z3RMYW5nOicnXG4gICAgfVxuICAgIGxldCBzZXR0aW5nc1N0ciA9IHd4LmdldFN0b3JhZ2VTeW5jKCdzZXR0aW5ncycpXG4gICAgaWYoc2V0dGluZ3NTdHIpe1xuICAgICAgc2V0dGluZ3MgPSBKU09OLnBhcnNlKHNldHRpbmdzU3RyKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHNldHRpbmdzLnNyY0xhbmcgPSAnemhfY24nLFxuICAgICAgc2V0dGluZ3MudGd0TGFuZyA9ICdlbl91cydcbiAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdzZXR0aW5ncycsSlNPTi5zdHJpbmdpZnkoc2V0dGluZ3MpKVxuICAgIH1cbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgc2V0dGluZ3M6c2V0dGluZ3NcbiAgICB9KSAgXG4gIH1cbn0pXG4iXX0=
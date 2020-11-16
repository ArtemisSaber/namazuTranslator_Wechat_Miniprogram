"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_1 = require("../../utils/class");
const util_1 = require("../../utils/util");
const app = getApp();
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
        settings: new class_1.Setting()
    },
    bindViewTap() {
        wx.navigateTo({
            url: '../logs/logs',
        });
    },
    bindInputValue(e) {
        this.setData({
            inputData: e.detail.value
        });
    },
    onLoad() {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true,
            });
        }
        else if (this.data.canIUse) {
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true,
                });
            };
        }
        else {
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo;
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true,
                    });
                },
            });
        }
        wx.showShareMenu({
            withShareTicket: true
        });
        this.initLang();
        wx.getStorage({
            key: 'dataVersion',
            success(res) {
                console.log(res.data);
                let data = JSON.parse(res.data);
                data = data.currentVersion[0];
                let dataVersion = util_1.getDataVersion();
                dataVersion.then((res) => {
                    if (res && res.currentVersion[0].ID !== data.ID) {
                        util_1.initAuxilaryData();
                    }
                });
            },
            fail(err) {
                console.log(err);
                util_1.initAuxilaryData();
            }
        });
    },
    performQuery() {
        let queryPromise = this.queryData();
        queryPromise.then((res) => {
            let data = this.querySuccess(new class_1.JSONResponse(res));
            wx.setStorageSync('responseData', JSON.stringify(data));
            this.setData({
                loading: false
            });
            wx.navigateTo({
                url: '../result/result'
            });
        }).catch(err => {
            this.queryError(err);
        });
    },
    verifyPayloadValid(payload) {
        for (let i = 0; i < payload.names.length; i++) {
            if (payload.names[i].length > 0) {
                return true;
            }
        }
        return false;
    },
    queryData() {
        let input = this.data.inputData;
        let settings = this.data.settings;
        let payloadData = new class_1.Payload(this.parseInputArea(settings.srcLang, input));
        if (this.verifyPayloadValid(payloadData)) {
            this.setData({ 'loading': true });
            return new Promise((resolve, reject) => {
                wx.request({
                    url: util_1.getAPIPath('item', settings.srcLang),
                    method: 'POST',
                    data: JSON.stringify(payloadData),
                    success(res) {
                        resolve(res.data);
                    },
                    fail(err) {
                        reject(err);
                    }
                });
            });
        }
        else {
            return new Promise((resolve, reject) => {
                if (false) {
                    resolve('this will never happen');
                }
                reject('invalid payload');
            });
        }
    },
    parseNotExistedItems(result) {
        let existArray = this.parseInputArea(this.data.settings.srcLang, this.data.inputData);
        for (let items in result) {
            let item = result[items][this.data.settings.srcLang];
            let index = existArray.indexOf(item);
            if (index !== -1) {
                existArray.splice(index, 1);
            }
        }
        return existArray;
    },
    queryError(err) {
        if (err === 'invalid payload') {
            wx.showToast({
                title: '请输入要翻译的物品名称',
                icon: 'none',
                duration: 2000
            });
        }
        else {
            wx.showToast({
                title: '出错了！',
                icon: "none",
                duration: 2000
            });
        }
    },
    querySuccess(data) {
        if (data.warnings.length > 0) {
            wx.setStorageSync('notExistItem', this.parseNotExistedItems(data.results).join(", "));
        }
        else {
            wx.removeStorageSync('notExistItem');
        }
        if (data.results.length > 0) {
            for (let items in data.results) {
                data.results[items]['en_us'] = util_1.parseEngUpper(data.results[items]['en_us']);
            }
        }
        return data;
    },
    initLang() {
        let settingsStr = wx.getStorageSync('settings');
        let settings;
        if (settingsStr) {
            settings = new class_1.Setting(JSON.parse(settingsStr));
        }
        else {
            settings = new class_1.Setting();
            settings.srcLang = 'zh_cn',
                settings.tgtLang = 'en_us';
            wx.setStorageSync('settings', settings);
        }
        this.setData({
            settings: settings
        });
        let langs = this.data.lang;
        let filteredTgtLang = langs;
        let filterIndex = filteredTgtLang.findIndex((ele) => {
            return ele.val === settings.srcLang;
        });
        filteredTgtLang = filteredTgtLang.slice(0, filterIndex).concat(filteredTgtLang.slice(filterIndex + 1));
        this.setData({
            srcLang: langs,
            tgtLang: filteredTgtLang
        });
        let srcLang = this.data.srcLang.findIndex((ele) => {
            return ele.val === settings.srcLang;
        });
        let tgtLang = this.data.tgtLang.findIndex((ele) => {
            return ele.val === settings.tgtLang;
        });
        this.setData({
            tgtLangIndex: tgtLang,
            srcLangIndex: srcLang
        });
    },
    changeSrcLang(e) {
        let settings = this.data.settings;
        settings.srcLang = this.data.srcLang[e.detail.value].val;
        let srcLangIndex = this.data.lang.findIndex((ele) => {
            return ele.val === settings.srcLang;
        });
        let tgtLangList = this.data.lang.slice(0, srcLangIndex).concat(this.data.lang.slice(srcLangIndex + 1));
        settings.tgtLang = tgtLangList[0].val;
        this.setData({
            srcLangIndex: e.detail.value,
            settings: settings,
            tgtLang: tgtLangList,
            tgtLangIndex: 0,
            queryInProgress: false
        });
        wx.setStorageSync('settings', JSON.stringify(settings));
    },
    changeTgtLang(e) {
        let settings = this.data.settings;
        settings.tgtLang = this.data.tgtLang[e.detail.value].val;
        this.setData({
            tgtLangIndex: e.detail.value,
            settings: settings
        });
        wx.setStorageSync('settings', JSON.stringify(settings));
    },
    getUserInfo(e) {
        console.log(e);
        app.globalData.userInfo = e.detail.userInfo;
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true,
        });
    },
    verifyExceptionItems(inputData) {
        let exceptions = wx.getStorageSync('blankItems');
        exceptions = JSON.parse(exceptions)[this.data.settings.srcLang];
        let exceptionFound = new Array();
        let content = inputData;
        for (let item in exceptions) {
            if (inputData.indexOf(exceptions[item]) !== -1 && exceptions[item].length > 0) {
                exceptionFound.push(exceptions[item]);
                content = content.replace(new RegExp(exceptions[item], "g"), "");
            }
        }
        return { "result": content, "exception": exceptionFound };
    },
    parseInputArea(sourceLang, inputData) {
        let seperator = [',', ".", '，', '、', '丨', '|', '\n'];
        if (sourceLang !== 'en_us') {
            seperator.push(' ');
        }
        let content = '';
        content = inputData;
        let resArray = new Array();
        let exceptionResult = new Array();
        for (let item in seperator) {
            if (seperator[item] === ' ') {
                let result = this.verifyExceptionItems(inputData);
                content = result.result;
                exceptionResult = result.exception;
            }
            if (resArray.length > 1) {
                break;
            }
            resArray = content.split(seperator[item]);
        }
        exceptionResult.length > 0 ? resArray = resArray.concat(exceptionResult) : '';
        resArray = resArray.map(str => str.trim());
        return resArray;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUEyRTtBQUczRSwyQ0FBOEY7QUFHOUYsTUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFjLENBQUE7QUFFaEMsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osS0FBSyxFQUFFLGFBQWE7UUFDcEIsS0FBSyxFQUFFLFFBQVE7UUFDZixRQUFRLEVBQUUsRUFBRTtRQUNaLFdBQVcsRUFBRSxLQUFLO1FBQ2xCLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLDhCQUE4QixDQUFDO1FBQ25ELGFBQWEsRUFBRSxFQUFFO1FBQ2pCLFNBQVMsRUFBRSxFQUFFO1FBQ2IsWUFBWSxFQUFFLEVBQUU7UUFDaEIsT0FBTyxFQUFFLEtBQUs7UUFDZCxJQUFJLEVBQUU7WUFDSixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRTtZQUM1QixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRTtZQUNqQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRTtTQUM5QjtRQUNELE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFDaEMsWUFBWSxFQUFFLENBQUM7UUFDZixPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQ2hDLFlBQVksRUFBRSxDQUFDO1FBQ2YsUUFBUSxFQUFFLElBQUksZUFBTyxFQUFFO0tBQ3hCO0lBRUQsV0FBVztRQUNULEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDWixHQUFHLEVBQUUsY0FBYztTQUNwQixDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsY0FBYyxDQUFDLENBQU07UUFDbkIsSUFB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QVEsQ0FBQyxNQUFNLEdBQUUsQ0FBQyxFQUFDO2dCQUNwQixNQUFNO2FBQ1A7WUFDRCxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtTQUMxQztRQUNELGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO1FBQzdFLFFBQVEsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7UUFDMUMsT0FBTyxRQUFRLENBQUE7SUFDakIsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBheWxvYWQsSVJlc3BvbnNlLEpTT05SZXNwb25zZSwgU2V0dGluZyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc1wiXG4vLyBpbmRleC50c1xuXG5pbXBvcnQgeyBnZXRBUElQYXRoLCBnZXREYXRhVmVyc2lvbiwgaW5pdEF1eGlsYXJ5RGF0YSwgcGFyc2VFbmdVcHBlciB9IGZyb20gXCIuLi8uLi91dGlscy91dGlsXCJcblxuLy8g6I635Y+W5bqU55So5a6e5L6LXG5jb25zdCBhcHAgPSBnZXRBcHA8SUFwcE9wdGlvbj4oKVxuXG5QYWdlKHtcbiAgZGF0YToge1xuICAgIG1vdHRvOiAnSGVsbG8gV29ybGQnLFxuICAgIHRpdGxlOiAn5aSn6bK26bK257+76K+R5ZmXJyxcbiAgICB1c2VySW5mbzoge30sXG4gICAgaGFzVXNlckluZm86IGZhbHNlLFxuICAgIGNhbklVc2U6IHd4LmNhbklVc2UoJ2J1dHRvbi5vcGVuLXR5cGUuZ2V0VXNlckluZm8nKSxcbiAgICBleGNlcHRpb25MaXN0OiBbXSxcbiAgICBpbnB1dERhdGE6IFwiXCIsXG4gICAgcmVzcG9uc2VEYXRhOiB7fSxcbiAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICBsYW5nOiBbXG4gICAgICB7IG5hbWU6ICfkuK3mlocnLCB2YWw6ICd6aF9jbicgfSxcbiAgICAgIHsgbmFtZTogJ0VuZ2xpc2gnLCB2YWw6ICdlbl91cycgfSxcbiAgICAgIHsgbmFtZTogJ+aXpeacrOiqnicsIHZhbDogJ2phX2pwJyB9XG4gICAgXSxcbiAgICBzcmNMYW5nOiBbeyBuYW1lOiAnJywgdmFsOiAnJyB9XSxcbiAgICBzcmNMYW5nSW5kZXg6IDAsXG4gICAgdGd0TGFuZzogW3sgbmFtZTogJycsIHZhbDogJycgfV0sXG4gICAgdGd0TGFuZ0luZGV4OiAwLFxuICAgIHNldHRpbmdzOiBuZXcgU2V0dGluZygpXG4gIH0sXG4gIC8vIOS6i+S7tuWkhOeQhuWHveaVsFxuICBiaW5kVmlld1RhcCgpIHtcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogJy4uL2xvZ3MvbG9ncycsXG4gICAgfSlcbiAgfSxcbiAgYmluZElucHV0VmFsdWUoZTogYW55KSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIGlucHV0RGF0YTogZS5kZXRhaWwudmFsdWVcbiAgICB9KVxuICB9LFxuICBvbkxvYWQoKSB7XG4gICAgaWYgKGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICB1c2VySW5mbzogYXBwLmdsb2JhbERhdGEudXNlckluZm8sXG4gICAgICAgIGhhc1VzZXJJbmZvOiB0cnVlLFxuICAgICAgfSlcbiAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YS5jYW5JVXNlKSB7XG4gICAgICAvLyDnlLHkuo4gZ2V0VXNlckluZm8g5piv572R57uc6K+35rGC77yM5Y+v6IO95Lya5ZyoIFBhZ2Uub25Mb2FkIOS5i+WQjuaJjei/lOWbnlxuICAgICAgLy8g5omA5Lul5q2k5aSE5Yqg5YWlIGNhbGxiYWNrIOS7pemYsuatoui/meenjeaDheWGtVxuICAgICAgYXBwLnVzZXJJbmZvUmVhZHlDYWxsYmFjayA9IHJlcyA9PiB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgdXNlckluZm86IHJlcy51c2VySW5mbyxcbiAgICAgICAgICBoYXNVc2VySW5mbzogdHJ1ZSxcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8g5Zyo5rKh5pyJIG9wZW4tdHlwZT1nZXRVc2VySW5mbyDniYjmnKznmoTlhbzlrrnlpITnkIZcbiAgICAgIHd4LmdldFVzZXJJbmZvKHtcbiAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICB1c2VySW5mbzogcmVzLnVzZXJJbmZvLFxuICAgICAgICAgICAgaGFzVXNlckluZm86IHRydWUsXG4gICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgfVxuICAgIHd4LnNob3dTaGFyZU1lbnUoe1xuICAgICAgd2l0aFNoYXJlVGlja2V0OnRydWVcbiAgICB9KVxuICAgIHRoaXMuaW5pdExhbmcoKVxuICAgIHd4LmdldFN0b3JhZ2Uoe1xuICAgICAga2V5OiAnZGF0YVZlcnNpb24nLFxuICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpXG4gICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSlcbiAgICAgICAgZGF0YSA9IGRhdGEuY3VycmVudFZlcnNpb25bMF1cbiAgICAgICAgbGV0IGRhdGFWZXJzaW9uID0gZ2V0RGF0YVZlcnNpb24oKVxuICAgICAgICBkYXRhVmVyc2lvbi50aGVuKChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgIGlmIChyZXMgJiYgcmVzLmN1cnJlbnRWZXJzaW9uWzBdLklEICE9PSBkYXRhLklEKSB7XG4gICAgICAgICAgICBpbml0QXV4aWxhcnlEYXRhKClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZmFpbChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICBpbml0QXV4aWxhcnlEYXRhKClcbiAgICAgIH1cbiAgICB9KVxuXG4gIH0sXG4gIHBlcmZvcm1RdWVyeSgpIHtcbiAgICBsZXQgcXVlcnlQcm9taXNlID0gdGhpcy5xdWVyeURhdGEoKVxuICAgIHF1ZXJ5UHJvbWlzZS50aGVuKChyZXMpID0+IHtcbiAgICAgIGxldCBkYXRhID0gdGhpcy5xdWVyeVN1Y2Nlc3MobmV3IEpTT05SZXNwb25zZShyZXMpKVxuICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3Jlc3BvbnNlRGF0YScsIEpTT04uc3RyaW5naWZ5KGRhdGEpKVxuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgbG9hZGluZzpmYWxzZVxuICAgICAgfSlcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6ICcuLi9yZXN1bHQvcmVzdWx0J1xuICAgICAgfSlcbiAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgdGhpcy5xdWVyeUVycm9yKGVycilcbiAgICB9KVxuICB9LFxuICB2ZXJpZnlQYXlsb2FkVmFsaWQocGF5bG9hZDogUGF5bG9hZCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGF5bG9hZC5uYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHBheWxvYWQubmFtZXNbaV0ubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfSxcbiAgcXVlcnlEYXRhKCkge1xuICAgIGxldCBpbnB1dCA9IHRoaXMuZGF0YS5pbnB1dERhdGFcbiAgICBsZXQgc2V0dGluZ3MgPSB0aGlzLmRhdGEuc2V0dGluZ3NcbiAgICBsZXQgcGF5bG9hZERhdGEgPSBuZXcgUGF5bG9hZCh0aGlzLnBhcnNlSW5wdXRBcmVhKHNldHRpbmdzLnNyY0xhbmcsIGlucHV0KSlcbiAgICBpZiAodGhpcy52ZXJpZnlQYXlsb2FkVmFsaWQocGF5bG9hZERhdGEpKSB7XG4gICAgICB0aGlzLnNldERhdGEoeyAnbG9hZGluZyc6IHRydWUgfSlcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmd8UmVjb3JkPHN0cmluZyxhbnk+PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogZ2V0QVBJUGF0aCgnaXRlbScsIHNldHRpbmdzLnNyY0xhbmcpLFxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHBheWxvYWREYXRhKSxcbiAgICAgICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWwoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKGZhbHNlKSB7XG4gICAgICAgICAgcmVzb2x2ZSgndGhpcyB3aWxsIG5ldmVyIGhhcHBlbicpXG4gICAgICAgIH1cbiAgICAgICAgcmVqZWN0KCdpbnZhbGlkIHBheWxvYWQnKVxuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIHBhcnNlTm90RXhpc3RlZEl0ZW1zKHJlc3VsdDogQXJyYXk8YW55Pikge1xuICAgIGxldCBleGlzdEFycmF5ID0gdGhpcy5wYXJzZUlucHV0QXJlYSh0aGlzLmRhdGEuc2V0dGluZ3Muc3JjTGFuZywgdGhpcy5kYXRhLmlucHV0RGF0YSlcbiAgICBmb3IgKGxldCBpdGVtcyBpbiByZXN1bHQpIHtcbiAgICAgIGxldCBpdGVtID0gcmVzdWx0W2l0ZW1zXVt0aGlzLmRhdGEuc2V0dGluZ3Muc3JjTGFuZ11cbiAgICAgIGxldCBpbmRleCA9IGV4aXN0QXJyYXkuaW5kZXhPZihpdGVtKVxuICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICBleGlzdEFycmF5LnNwbGljZShpbmRleCwgMSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGV4aXN0QXJyYXlcbiAgfSxcbiAgcXVlcnlFcnJvcihlcnI6IGFueSkge1xuICAgIGlmIChlcnIgPT09ICdpbnZhbGlkIHBheWxvYWQnKSB7XG4gICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpeimgee/u+ivkeeahOeJqeWTgeWQjeensCcsXG4gICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgIHRpdGxlOiAn5Ye66ZSZ5LqG77yBJyxcbiAgICAgICAgaWNvbjogXCJub25lXCIsXG4gICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICB9KVxuICAgIH1cbiAgfSxcblxuICBxdWVyeVN1Y2Nlc3MoZGF0YTogSVJlc3BvbnNlKSB7XG4gICAgaWYgKGRhdGEud2FybmluZ3MubGVuZ3RoID4gMCkge1xuICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ25vdEV4aXN0SXRlbScsIHRoaXMucGFyc2VOb3RFeGlzdGVkSXRlbXMoZGF0YS5yZXN1bHRzKS5qb2luKFwiLCBcIikpXG4gICAgfSBlbHNlIHtcbiAgICAgIHd4LnJlbW92ZVN0b3JhZ2VTeW5jKCdub3RFeGlzdEl0ZW0nKVxuICAgIH1cbiAgICBpZiAoZGF0YS5yZXN1bHRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAobGV0IGl0ZW1zIGluIGRhdGEucmVzdWx0cykge1xuICAgICAgICBkYXRhLnJlc3VsdHNbaXRlbXNdWydlbl91cyddID0gcGFyc2VFbmdVcHBlcihkYXRhLnJlc3VsdHNbaXRlbXNdWydlbl91cyddKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YVxuICB9LFxuICBpbml0TGFuZygpIHtcbiAgICBsZXQgc2V0dGluZ3NTdHIgPSB3eC5nZXRTdG9yYWdlU3luYygnc2V0dGluZ3MnKVxuICAgIGxldCBzZXR0aW5nczpTZXR0aW5nXG4gICAgaWYgKHNldHRpbmdzU3RyKSB7XG4gICAgICBzZXR0aW5ncyA9IG5ldyBTZXR0aW5nKEpTT04ucGFyc2Uoc2V0dGluZ3NTdHIpKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHNldHRpbmdzID0gbmV3IFNldHRpbmcoKVxuICAgICAgc2V0dGluZ3Muc3JjTGFuZyA9ICd6aF9jbicsXG4gICAgICBzZXR0aW5ncy50Z3RMYW5nID0gJ2VuX3VzJ1xuICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3NldHRpbmdzJyxzZXR0aW5ncylcbiAgICB9XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIHNldHRpbmdzOiBzZXR0aW5nc1xuICAgIH0pXG4gICAgbGV0IGxhbmdzID0gdGhpcy5kYXRhLmxhbmdcbiAgICBsZXQgZmlsdGVyZWRUZ3RMYW5nID0gbGFuZ3NcbiAgICBsZXQgZmlsdGVySW5kZXggPSBmaWx0ZXJlZFRndExhbmcuZmluZEluZGV4KChlbGUpID0+IHtcbiAgICAgIHJldHVybiBlbGUudmFsID09PSBzZXR0aW5ncy5zcmNMYW5nXG4gICAgfSlcbiAgICBmaWx0ZXJlZFRndExhbmcgPSBmaWx0ZXJlZFRndExhbmcuc2xpY2UoMCwgZmlsdGVySW5kZXgpLmNvbmNhdChmaWx0ZXJlZFRndExhbmcuc2xpY2UoZmlsdGVySW5kZXggKyAxKSlcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgc3JjTGFuZzogbGFuZ3MsXG4gICAgICB0Z3RMYW5nOiBmaWx0ZXJlZFRndExhbmdcbiAgICB9KVxuICAgIGxldCBzcmNMYW5nID0gdGhpcy5kYXRhLnNyY0xhbmcuZmluZEluZGV4KChlbGUpID0+IHtcbiAgICAgIHJldHVybiBlbGUudmFsID09PSBzZXR0aW5ncy5zcmNMYW5nXG4gICAgfSlcbiAgICBsZXQgdGd0TGFuZyA9IHRoaXMuZGF0YS50Z3RMYW5nLmZpbmRJbmRleCgoZWxlKSA9PiB7XG4gICAgICByZXR1cm4gZWxlLnZhbCA9PT0gc2V0dGluZ3MudGd0TGFuZ1xuICAgIH0pXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIHRndExhbmdJbmRleDogdGd0TGFuZyxcbiAgICAgIHNyY0xhbmdJbmRleDogc3JjTGFuZ1xuICAgIH0pXG4gIH0sXG4gIGNoYW5nZVNyY0xhbmcoZTogYW55KSB7XG4gICAgbGV0IHNldHRpbmdzID0gdGhpcy5kYXRhLnNldHRpbmdzXG4gICAgc2V0dGluZ3Muc3JjTGFuZyA9IHRoaXMuZGF0YS5zcmNMYW5nW2UuZGV0YWlsLnZhbHVlXS52YWxcbiAgICBsZXQgc3JjTGFuZ0luZGV4ID0gdGhpcy5kYXRhLmxhbmcuZmluZEluZGV4KChlbGUpID0+IHtcbiAgICAgIHJldHVybiBlbGUudmFsID09PSBzZXR0aW5ncy5zcmNMYW5nXG4gICAgfSlcbiAgICBsZXQgdGd0TGFuZ0xpc3QgPSB0aGlzLmRhdGEubGFuZy5zbGljZSgwLCBzcmNMYW5nSW5kZXgpLmNvbmNhdCh0aGlzLmRhdGEubGFuZy5zbGljZShzcmNMYW5nSW5kZXggKyAxKSlcbiAgICBzZXR0aW5ncy50Z3RMYW5nID0gdGd0TGFuZ0xpc3RbMF0udmFsXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIHNyY0xhbmdJbmRleDogZS5kZXRhaWwudmFsdWUsXG4gICAgICBzZXR0aW5nczogc2V0dGluZ3MsXG4gICAgICB0Z3RMYW5nOiB0Z3RMYW5nTGlzdCxcbiAgICAgIHRndExhbmdJbmRleDogMCxcbiAgICAgIHF1ZXJ5SW5Qcm9ncmVzczogZmFsc2VcbiAgICB9KVxuICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdzZXR0aW5ncycsIEpTT04uc3RyaW5naWZ5KHNldHRpbmdzKSlcbiAgfSxcbiAgY2hhbmdlVGd0TGFuZyhlOiBhbnkpIHtcbiAgICBsZXQgc2V0dGluZ3MgPSB0aGlzLmRhdGEuc2V0dGluZ3NcbiAgICBzZXR0aW5ncy50Z3RMYW5nID0gdGhpcy5kYXRhLnRndExhbmdbZS5kZXRhaWwudmFsdWVdLnZhbFxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICB0Z3RMYW5nSW5kZXg6IGUuZGV0YWlsLnZhbHVlLFxuICAgICAgc2V0dGluZ3M6IHNldHRpbmdzXG4gICAgfSlcbiAgICB3eC5zZXRTdG9yYWdlU3luYygnc2V0dGluZ3MnLCBKU09OLnN0cmluZ2lmeShzZXR0aW5ncykpXG4gIH0sXG4gIGdldFVzZXJJbmZvKGU6IGFueSkge1xuICAgIGNvbnNvbGUubG9nKGUpXG4gICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICB1c2VySW5mbzogZS5kZXRhaWwudXNlckluZm8sXG4gICAgICBoYXNVc2VySW5mbzogdHJ1ZSxcbiAgICB9KVxuICB9LFxuICB2ZXJpZnlFeGNlcHRpb25JdGVtcyhpbnB1dERhdGE6IHN0cmluZykge1xuICAgIGxldCBleGNlcHRpb25zID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2JsYW5rSXRlbXMnKVxuICAgIGV4Y2VwdGlvbnMgPSBKU09OLnBhcnNlKGV4Y2VwdGlvbnMpW3RoaXMuZGF0YS5zZXR0aW5ncy5zcmNMYW5nXVxuICAgIGxldCBleGNlcHRpb25Gb3VuZCA9IG5ldyBBcnJheTxzdHJpbmc+KClcbiAgICBsZXQgY29udGVudCA9IGlucHV0RGF0YVxuICAgIGZvciAobGV0IGl0ZW0gaW4gZXhjZXB0aW9ucykge1xuICAgICAgaWYgKGlucHV0RGF0YS5pbmRleE9mKGV4Y2VwdGlvbnNbaXRlbV0pICE9PSAtMSAmJiBleGNlcHRpb25zW2l0ZW1dLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgIGV4Y2VwdGlvbkZvdW5kLnB1c2goZXhjZXB0aW9uc1tpdGVtXSlcbiAgICAgICAgY29udGVudCA9IGNvbnRlbnQucmVwbGFjZShuZXcgUmVnRXhwKGV4Y2VwdGlvbnNbaXRlbV0sIFwiZ1wiKSwgXCJcIilcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgXCJyZXN1bHRcIjogY29udGVudCwgXCJleGNlcHRpb25cIjogZXhjZXB0aW9uRm91bmQgfVxuICB9LFxuICBwYXJzZUlucHV0QXJlYShzb3VyY2VMYW5nOiBzdHJpbmcsIGlucHV0RGF0YTogc3RyaW5nKSB7XG4gICAgbGV0IHNlcGVyYXRvciA9IFsnLCcsIFwiLlwiLCAn77yMJywgJ+OAgScsICfkuKgnLCAnfCcsICdcXG4nXVxuICAgIGlmIChzb3VyY2VMYW5nICE9PSAnZW5fdXMnKSB7XG4gICAgICBzZXBlcmF0b3IucHVzaCgnICcpXG4gICAgfVxuICAgIGxldCBjb250ZW50ID0gJydcbiAgICBjb250ZW50ID0gaW5wdXREYXRhXG4gICAgbGV0IHJlc0FycmF5ID0gbmV3IEFycmF5PHN0cmluZz4oKVxuICAgIGxldCBleGNlcHRpb25SZXN1bHQgPSBuZXcgQXJyYXk8c3RyaW5nPigpXG4gICAgZm9yIChsZXQgaXRlbSBpbiBzZXBlcmF0b3IpIHtcbiAgICAgIGlmIChzZXBlcmF0b3JbaXRlbV0gPT09ICcgJykge1xuICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy52ZXJpZnlFeGNlcHRpb25JdGVtcyhpbnB1dERhdGEpXG4gICAgICAgIGNvbnRlbnQgPSByZXN1bHQucmVzdWx0XG4gICAgICAgIGV4Y2VwdGlvblJlc3VsdCA9IHJlc3VsdC5leGNlcHRpb25cbiAgICAgIH1cbiAgICAgIGlmKHJlc0FycmF5Lmxlbmd0aCA+MSl7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgcmVzQXJyYXkgPSBjb250ZW50LnNwbGl0KHNlcGVyYXRvcltpdGVtXSlcbiAgICB9XG4gICAgZXhjZXB0aW9uUmVzdWx0Lmxlbmd0aCA+IDAgPyByZXNBcnJheSA9IHJlc0FycmF5LmNvbmNhdChleGNlcHRpb25SZXN1bHQpIDogJydcbiAgICByZXNBcnJheSA9IHJlc0FycmF5Lm1hcChzdHIgPT4gc3RyLnRyaW0oKSlcbiAgICByZXR1cm4gcmVzQXJyYXlcbiAgfVxufSlcbiJdfQ==
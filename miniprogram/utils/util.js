"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = exports.getJSONData = exports.parseEngUpper = exports.parseResponseResult = exports.getAPIPath = exports.removeLocalStorage = exports.getLocalStorage = exports.setLocalStorage = exports.getDataVersion = exports.getEmptyData = exports.initAuxilaryData = exports.formatTime = void 0;
exports.formatTime = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return ([year, month, day].map(formatNumber).join('/') +
        ' ' +
        [hour, minute, second].map(formatNumber).join(':'));
};
exports.initAuxilaryData = () => {
    let dataVersion = exports.getDataVersion();
    dataVersion.then((res) => {
        if (res) {
            let setLocalStor = exports.setLocalStorage('dataVersion', JSON.stringify(res));
            let setEmptyData = exports.getEmptyData();
            setLocalStor.then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            });
            setEmptyData.then((res) => {
                console.log(res);
            });
            wx.showToast({
                title: '数据版本已更新',
                icon: 'success',
                duration: 1500
            });
        }
    });
};
exports.getEmptyData = () => {
    return new Promise((resolve, reject) => {
        let blankItems = {
            "zh_cn": [''],
            "ja_jp": ['']
        };
        let blankItemPromise = exports.getJSONData(exports.getAPIPath('itemWithBlankSpace', 'zh-cn'));
        blankItemPromise.then((res) => {
            console.log(res);
            let resData = res.data;
            resData.zh_cn.forEach((e) => {
                blankItems.zh_cn.push(e.ItemName);
            });
            resData.ja_jp.forEach((e) => {
                blankItems.ja_jp.push(e.ItemName);
            });
            let storPromise = exports.setLocalStorage('blankItems', JSON.stringify(blankItems));
            storPromise.then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        }).catch(err => {
            reject(err);
        });
    });
};
exports.getDataVersion = () => {
    return new Promise((resolve, reject) => {
        let dataVersion = exports.getJSONData(exports.getAPIPath("dataVersion", "zh-cn"));
        dataVersion.then((res) => {
            console.log(res.data);
            resolve(res.data);
        }).catch(err => {
            console.log(err);
            reject(false);
        });
    });
};
exports.setLocalStorage = (key, data) => {
    return new Promise((resolve, reject) => {
        wx.setStorage({
            key: key,
            data: data,
            success(res) {
                console.log(res);
                resolve(true);
            },
            fail(err) {
                console.log(err);
                reject(false);
            }
        });
    });
};
exports.getLocalStorage = (key) => {
    return new Promise((resolve, reject) => {
        wx.getStorage({
            key: key,
            success(res) {
                resolve(res.data);
            },
            fail(err) {
                reject(err);
            }
        });
    });
};
exports.removeLocalStorage = (key) => {
    return new Promise((resolve, reject) => {
        wx.removeStorage({
            key: key,
            success(res) {
                console.log(res);
                resolve(true);
            },
            fail(err) {
                console.log(err);
                reject(false);
            }
        });
    });
};
exports.getAPIPath = (endPoint, sourceLang = 'zh-cn') => {
    let host = "https://dirusec.com/namazu/api/";
    switch (endPoint) {
        case ("item"):
            return host + "namazuTranslator/item?lang=" + sourceLang;
            break;
        case ("dataVersion"):
            return host + "namazuTranslator/dataVersion";
            break;
        case ("itemWithBlankSpace"):
            return host + "namazuTranslator/itemWithBlankSpace";
            break;
        default: {
            return host;
        }
    }
};
exports.parseResponseResult = (data) => {
    Object.keys(data).forEach(key => {
        if (data[key] === null) {
            data[key] = '未找到该物品';
        }
    });
    return data;
};
exports.parseEngUpper = (string) => {
    let wordArray = string.split(' ');
    for (let i = 0; i < wordArray.length; i++) {
        let word = wordArray[i];
        if (word !== 'of' && word.length > 0) {
            let charArray = word.split('');
            charArray[0] = charArray[0].toUpperCase();
            wordArray[i] = charArray.join('');
        }
    }
    return wordArray.join(' ');
};
exports.getJSONData = (url) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            method: 'GET',
            dataType: 'json',
            success(res) {
                resolve(res);
            },
            fail(err) {
                reject(err);
            }
        });
    });
};
exports.request = (url, method, dataType) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            method: method,
            dataType: dataType,
            success(res) {
                resolve(res);
            },
            fail(err) {
                reject(err);
            }
        });
    });
};
const formatNumber = (n) => {
    const s = n.toString();
    return s[1] ? s : '0' + s;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRWEsUUFBQSxVQUFVLEdBQUcsQ0FBQyxJQUFVLEVBQUUsRUFBRTtJQUN2QyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDL0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUNqQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDMUIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO0lBQzVCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUNoQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7SUFFaEMsT0FBTyxDQUNMLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUM5QyxHQUFHO1FBQ0gsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQ25ELENBQUE7QUFDSCxDQUFDLENBQUE7QUFDWSxRQUFBLGdCQUFnQixHQUFHLEdBQUUsRUFBRTtJQUNsQyxJQUFJLFdBQVcsR0FBRyxzQkFBYyxFQUFFLENBQUE7SUFDbEMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO1FBQzVCLElBQUksR0FBRyxFQUFFO1lBQ1AsSUFBSSxZQUFZLEdBQUcsdUJBQWUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBQ3RFLElBQUksWUFBWSxHQUFHLG9CQUFZLEVBQUUsQ0FB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O1lBQ2hCLE9BQU8sQ0FBQyxHQUFHO2dCQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNkLENBQUM7WUFDRCxJQUFJLENBQUMsR0FBRztnQkFDTixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDYixDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFDWSxRQUFBLE9BQU8sR0FBRyxDQUFDLEdBQVcsRUFBRSxNQUFXLEVBQUUsUUFBYSxFQUFFLEVBQUU7SUFDakUsT0FBTyxJQUFJLE9BQU8sQ0FBaUQsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDckYsRUFBRSxDQUFDLE9BQU8sQ0FBQztZQUNULEdBQUcsRUFBRSxHQUFHO1lBQ1IsTUFBTSxFQUFFLE1BQU07WUFDZCxRQUFRLEVBQUUsUUFBUTtZQUNsQixPQUFPLENBQUMsR0FBRztnQkFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDZCxDQUFDO1lBQ0QsSUFBSSxDQUFDLEdBQUc7Z0JBQ04sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ2IsQ0FBQztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBQ0QsTUFBTSxZQUFZLEdBQUcsQ0FBQyxDQUFTLEVBQUUsRUFBRTtJQUNqQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUE7SUFDdEIsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQTtBQUMzQixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRhVmVyc2lvbiB9IGZyb20gXCIuL2NsYXNzXCJcblxuZXhwb3J0IGNvbnN0IGZvcm1hdFRpbWUgPSAoZGF0ZTogRGF0ZSkgPT4ge1xuICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpXG4gIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMVxuICBjb25zdCBkYXkgPSBkYXRlLmdldERhdGUoKVxuICBjb25zdCBob3VyID0gZGF0ZS5nZXRIb3VycygpXG4gIGNvbnN0IG1pbnV0ZSA9IGRhdGUuZ2V0TWludXRlcygpXG4gIGNvbnN0IHNlY29uZCA9IGRhdGUuZ2V0U2Vjb25kcygpXG5cbiAgcmV0dXJuIChcbiAgICBbeWVhciwgbW9udGgsIGRheV0ubWFwKGZvcm1hdE51bWJlcikuam9pbignLycpICtcbiAgICAnICcgK1xuICAgIFtob3VyLCBtaW51dGUsIHNlY29uZF0ubWFwKGZvcm1hdE51bWJlcikuam9pbignOicpXG4gIClcbn1cbmV4cG9ydCBjb25zdCBpbml0QXV4aWxhcnlEYXRhID0gKCk9PntcbiAgbGV0IGRhdGFWZXJzaW9uID0gZ2V0RGF0YVZlcnNpb24oKVxuICBkYXRhVmVyc2lvbi50aGVuKChyZXM6IGFueSkgPT4ge1xuICAgIGlmIChyZXMpIHtcbiAgICAgIGxldCBzZXRMb2NhbFN0b3IgPSBzZXRMb2NhbFN0b3JhZ2UoJ2RhdGFWZXJzaW9uJywgSlNPTi5zdHJpbmdpZnkocmVzKSlcbiAgICAgIGxldCBzZXRFbXB0eURhdGEgPSBnZXRFbXB0eURhdGEoKVxuICAgICAgc2V0TG9jYWxTdG9yLnRoZW4oKHJlczogYW55KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIH0pLmNhdGNoKChlcnI6IGFueSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICB9KVxuICAgICAgc2V0RW1wdHlEYXRhLnRoZW4oKHJlczphbnkpPT57XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIH0pXG4gICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICB0aXRsZTogJ+aVsOaNrueJiOacrOW3suabtOaWsCcsXG4gICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgZHVyYXRpb246IDE1MDBcbiAgICAgIH0pXG4gICAgfVxuICB9KVxufVxuXG5leHBvcnQgY29uc3QgZ2V0RW1wdHlEYXRhID0gKCkgPT57IC8v6I635Y+W5bim56m65qC855qE54mp5ZOB5ZCN56ewXG4gIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSxyZWplY3QpPT57XG4gICAgbGV0IGJsYW5rSXRlbXMgPSB7XG4gICAgICBcInpoX2NuXCI6IFsnJ10sIFxuICAgICAgXCJqYV9qcFwiOiBbJyddXG4gICAgfVxuICAgIGxldCBibGFua0l0ZW1Qcm9taXNlID0gZ2V0SlNPTkRhdGEoZ2V0QVBJUGF0aCgnaXRlbVdpdGhCbGFua1NwYWNlJywnemgtY24nKSlcbiAgICBibGFua0l0ZW1Qcm9taXNlLnRoZW4oKHJlczphbnkpPT57XG4gICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICBsZXQgcmVzRGF0YSA9IHJlcy5kYXRhXG4gICAgICByZXNEYXRhLnpoX2NuLmZvckVhY2goKGU6YW55KSA9PiB7XG4gICAgICAgIGJsYW5rSXRlbXMuemhfY24ucHVzaChlLkl0ZW1OYW1lKVxuICAgICAgfSlcbiAgICAgIHJlc0RhdGEuamFfanAuZm9yRWFjaCgoZTphbnkpID0+IHtcbiAgICAgICAgYmxhbmtJdGVtcy5qYV9qcC5wdXNoKGUuSXRlbU5hbWUpXG4gICAgICB9KVxuICAgICAgbGV0IHN0b3JQcm9taXNlID0gc2V0TG9jYWxTdG9yYWdlKCdibGFua0l0ZW1zJyxKU09OLnN0cmluZ2lmeShibGFua0l0ZW1zKSlcbiAgICAgIHN0b3JQcm9taXNlLnRoZW4ocmVzPT57XG4gICAgICAgIHJlc29sdmUocmVzKVxuICAgICAgfSkuY2F0Y2goZXJyPT57XG4gICAgICAgIHJlamVjdChlcnIpXG4gICAgICB9KVxuICAgIH0pLmNhdGNoKGVycj0+e1xuICAgICAgcmVqZWN0KGVycilcbiAgICB9KVxuICB9KVxufVxuXG5leHBvcnQgY29uc3QgZ2V0RGF0YVZlcnNpb24gPSAoKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZTxEYXRhVmVyc2lvbj4oKHJlc29sdmUscmVqZWN0KT0+e1xuICAgIGxldCBkYXRhVmVyc2lvbiA9IGdldEpTT05EYXRhKGdldEFQSVBhdGgoXCJkYXRhVmVyc2lvblwiLCBcInpoLWNuXCIpKVxuICAgIGRhdGFWZXJzaW9uLnRoZW4oKHJlczogYW55KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSlcbiAgICAgIHJlc29sdmUocmVzLmRhdGEpXG4gICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgIHJlamVjdChmYWxzZSlcbiAgICB9KVxuICAgIH0pXG59XG5cbmV4cG9ydCBjb25zdCBzZXRMb2NhbFN0b3JhZ2UgPSAoa2V5OiBzdHJpbmcsIGRhdGE6IHN0cmluZykgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAga2V5OiBrZXksXG4gICAgICBkYXRhOiBkYXRhLFxuICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICByZXNvbHZlKHRydWUpXG4gICAgICB9LFxuICAgICAgZmFpbChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICByZWplY3QoZmFsc2UpXG4gICAgICB9XG4gICAgfSlcbiAgfSlcbn1cbmV4cG9ydCBjb25zdCBnZXRMb2NhbFN0b3JhZ2UgPSAoa2V5OiBzdHJpbmcpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHd4LmdldFN0b3JhZ2Uoe1xuICAgICAga2V5OiBrZXksXG4gICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICByZXNvbHZlKHJlcy5kYXRhKVxuICAgICAgfSxcbiAgICAgIGZhaWwoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpXG4gICAgICB9XG4gICAgfSlcbiAgfSlcbn1cbmV4cG9ydCBjb25zdCByZW1vdmVMb2NhbFN0b3JhZ2UgPSAoa2V5OiBzdHJpbmcpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3eC5yZW1vdmVTdG9yYWdlKHtcbiAgICAgIGtleToga2V5LFxuICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICByZXNvbHZlKHRydWUpXG4gICAgICB9LFxuICAgICAgZmFpbChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICByZWplY3QoZmFsc2UpXG4gICAgICB9XG4gICAgfSlcbiAgfSlcbn1cbmV4cG9ydCBjb25zdCBnZXRBUElQYXRoID0gKGVuZFBvaW50OiBzdHJpbmcsIHNvdXJjZUxhbmc6IHN0cmluZyA9ICd6aC1jbicpID0+IHtcbiAgbGV0IGhvc3QgPSBcImh0dHBzOi8vZGlydXNlYy5jb20vbmFtYXp1L2FwaS9cIlxuICBzd2l0Y2ggKGVuZFBvaW50KSB7XG4gICAgY2FzZSAoXCJpdGVtXCIpOlxuICAgICAgcmV0dXJuIGhvc3QgKyBcIm5hbWF6dVRyYW5zbGF0b3IvaXRlbT9sYW5nPVwiICsgc291cmNlTGFuZ1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAoXCJkYXRhVmVyc2lvblwiKTpcbiAgICAgIHJldHVybiBob3N0ICsgXCJuYW1henVUcmFuc2xhdG9yL2RhdGFWZXJzaW9uXCJcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgKFwiaXRlbVdpdGhCbGFua1NwYWNlXCIpOlxuICAgICAgcmV0dXJuIGhvc3QgKyBcIm5hbWF6dVRyYW5zbGF0b3IvaXRlbVdpdGhCbGFua1NwYWNlXCJcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHJldHVybiBob3N0XG4gICAgfVxuICB9XG59XG5leHBvcnQgY29uc3QgcGFyc2VSZXNwb25zZVJlc3VsdCA9IChkYXRhOmFueSkgPT4ge1xuICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKGtleT0+e1xuICAgIGlmKGRhdGFba2V5XSA9PT0gbnVsbCl7XG4gICAgICBkYXRhW2tleV0gPSAn5pyq5om+5Yiw6K+l54mp5ZOBJ1xuICAgIH1cbiAgfSlcbiAgcmV0dXJuIGRhdGFcbn1cblxuXG5leHBvcnQgY29uc3QgcGFyc2VFbmdVcHBlciA9IChzdHJpbmc6c3RyaW5nKSA9PiB7XG4gIGxldCB3b3JkQXJyYXkgPSBzdHJpbmcuc3BsaXQoJyAnKVxuICBmb3IobGV0IGkgPSAwO2k8d29yZEFycmF5Lmxlbmd0aDtpKyspe1xuICAgIGxldCB3b3JkID0gd29yZEFycmF5W2ldXG4gICAgaWYgKHdvcmQgIT09ICdvZicgJiYgd29yZC5sZW5ndGg+MCl7XG4gICAgICBsZXQgY2hhckFycmF5ID0gd29yZC5zcGxpdCgnJylcbiAgICAgIGNoYXJBcnJheVswXSA9IGNoYXJBcnJheVswXS50b1VwcGVyQ2FzZSgpXG4gICAgICB3b3JkQXJyYXlbaV0gPSBjaGFyQXJyYXkuam9pbignJylcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHdvcmRBcnJheS5qb2luKCcgJylcbn1cbmV4cG9ydCBjb25zdCBnZXRKU09ORGF0YSA9ICh1cmw6IHN0cmluZykgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2U8V2VjaGF0TWluaXByb2dyYW0uUmVxdWVzdFN1Y2Nlc3NDYWxsYmFja1Jlc3VsdD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgdXJsOiB1cmwsXG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgIHJlc29sdmUocmVzKVxuICAgICAgfSxcbiAgICAgIGZhaWwoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpXG4gICAgICB9XG4gICAgfSlcbiAgfSlcbn1cbmV4cG9ydCBjb25zdCByZXF1ZXN0ID0gKHVybDogc3RyaW5nLCBtZXRob2Q6IGFueSwgZGF0YVR5cGU6IGFueSkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2U8V2VjaGF0TWluaXByb2dyYW0uUmVxdWVzdFN1Y2Nlc3NDYWxsYmFja1Jlc3VsdD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgdXJsOiB1cmwsXG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIGRhdGFUeXBlOiBkYXRhVHlwZSxcbiAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgIHJlc29sdmUocmVzKVxuICAgICAgfSxcbiAgICAgIGZhaWwoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpXG4gICAgICB9XG4gICAgfSlcbiAgfSlcbn1cbmNvbnN0IGZvcm1hdE51bWJlciA9IChuOiBudW1iZXIpID0+IHtcbiAgY29uc3QgcyA9IG4udG9TdHJpbmcoKVxuICByZXR1cm4gc1sxXSA/IHMgOiAnMCcgKyBzXG59XG4iXX0=
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONResponse = exports.Payload = exports.Setting = void 0;
class Setting {
    constructor(settings, srcLang, tgtLang) {
        if (settings) {
            this.srcLang = settings.srcLang;
            this.tgtLang = settings.tgtLang;
        }
        else {
            this.srcLang = srcLang ? srcLang : '';
            this.tgtLang = tgtLang ? tgtLang : '';
        }
    }
}
exports.Setting = Setting;
class Payload {
    constructor(names) {
        this.names = names;
    }
}
exports.Payload = Payload;
class JSONResponse {
    constructor(any) {
        if (any) {
            this.notFoundResults = any.notFoundResults;
            this.results = any.results;
            this.warnings = any.warnings;
        }
        else {
            this.notFoundResults = [];
            this.results = [];
            this.warnings = [];
        }
    }
}
exports.JSONResponse = JSONResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFhLE9BQU87SUFLbEIsWUFBWSxRQUFpQixFQUFDLE9BQWUsRUFBQyxPQUFlO1FBQzNELElBQUcsUUFBUSxFQUFDO1lBQ1YsSUFBSSxDQUFDLE9BQU8sR0FBQyxRQUFRLENBQUMsT0FBTyxDQUFBO1lBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQTtTQUM5QjthQUFNO1lBQ0wsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUEsQ0FBQyxDQUFBLE9BQU8sQ0FBQSxDQUFDLENBQUEsRUFBRSxDQUFBO1lBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBLENBQUMsQ0FBQSxPQUFPLENBQUEsQ0FBQyxDQUFBLEVBQUUsQ0FBQTtTQUNoQztJQUNMLENBQUM7Q0FDRjtBQWRELDBCQWNDO0FBYUQsTUFBYSxPQUFPO0lBRWxCLFlBQVksS0FBbUI7UUFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7SUFDcEIsQ0FBQztDQUNGO0FBTEQsMEJBS0M7QUFRRCxNQUFhLFlBQVk7SUFJdkIsWUFBWSxHQUFRO1FBQ2xCLElBQUcsR0FBRyxFQUFDO1lBQ0wsSUFBSSxDQUFDLGVBQWUsR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFBO1lBQzFDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQTtZQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUE7U0FDN0I7YUFBTTtZQUNMLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFBO1lBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFBO1lBQ2pCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFBO1NBQ25CO0lBQ0gsQ0FBQztDQUNGO0FBZkQsb0NBZUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgU2V0dGluZyB7XG4gIHNyY0xhbmc6c3RyaW5nXG4gIHRndExhbmc6c3RyaW5nXG4gIGNvbnN0cnVjdG9yKClcbiAgY29uc3RydWN0b3Ioc2V0dGluZ3M6U2V0dGluZylcbiAgY29uc3RydWN0b3Ioc2V0dGluZ3M/OlNldHRpbmcsc3JjTGFuZz86c3RyaW5nLHRndExhbmc/OnN0cmluZyl7XG4gICAgaWYoc2V0dGluZ3Mpe1xuICAgICAgdGhpcy5zcmNMYW5nPXNldHRpbmdzLnNyY0xhbmdcbiAgICAgIHRoaXMudGd0TGFuZz1zZXR0aW5ncy50Z3RMYW5nXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3JjTGFuZyA9IHNyY0xhbmc/c3JjTGFuZzonJ1xuICAgICAgdGhpcy50Z3RMYW5nID0gdGd0TGFuZz90Z3RMYW5nOicnXG4gICAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBEYXRhVmVyc2lvbiB7XG4gIGN1cnJlbnRWZXJzaW9uOltcbiAgICB7XG4gICAgICBJRDpudW1iZXIsXG4gICAgICB6aF9jbjpzdHJpbmcsXG4gICAgICBqYV9qcDpzdHJpbmcsXG4gICAgICBlbl91czpzdHJpbmdcbiAgICB9XG4gIF1cbn1cblxuZXhwb3J0IGNsYXNzIFBheWxvYWQge1xuICBuYW1lczpBcnJheTxzdHJpbmc+XG4gIGNvbnN0cnVjdG9yKG5hbWVzOkFycmF5PHN0cmluZz4pe1xuICAgIHRoaXMubmFtZXMgPSBuYW1lc1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVJlc3BvbnNlIHtcbiAgbm90Rm91bmRSZXN1bHRzOkFycmF5PGFueT5cbiAgcmVzdWx0czpBcnJheTxhbnk+XG4gIHdhcm5pbmdzOkFycmF5PGFueT5cbn1cblxuZXhwb3J0IGNsYXNzIEpTT05SZXNwb25zZSBpbXBsZW1lbnRzIElSZXNwb25zZSB7XG4gIG5vdEZvdW5kUmVzdWx0czpBcnJheTxhbnk+XG4gIHJlc3VsdHM6QXJyYXk8YW55PlxuICB3YXJuaW5nczpBcnJheTxhbnk+XG4gIGNvbnN0cnVjdG9yKGFueT86YW55KXtcbiAgICBpZihhbnkpe1xuICAgICAgdGhpcy5ub3RGb3VuZFJlc3VsdHMgPSBhbnkubm90Rm91bmRSZXN1bHRzXG4gICAgICB0aGlzLnJlc3VsdHMgPSBhbnkucmVzdWx0c1xuICAgICAgdGhpcy53YXJuaW5ncyA9IGFueS53YXJuaW5nc1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm5vdEZvdW5kUmVzdWx0cyA9IFtdXG4gICAgICB0aGlzLnJlc3VsdHMgPSBbXVxuICAgICAgdGhpcy53YXJuaW5ncyA9IFtdXG4gICAgfVxuICB9XG59Il19
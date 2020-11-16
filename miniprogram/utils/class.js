"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQWEsT0FBTztJQUtsQixZQUFZLFFBQWlCLEVBQUMsT0FBZSxFQUFDLE9BQWU7UUFDM0QsSUFBRyxRQUFRLEVBQUM7WUFDVixJQUFJLENBQUMsT0FBTyxHQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUE7WUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBQyxRQUFRLENBQUMsT0FBTyxDQUFBO1NBQzlCO2FBQU07WUFDTCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQSxDQUFDLENBQUEsT0FBTyxDQUFBLENBQUMsQ0FBQSxFQUFFLENBQUE7WUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUEsQ0FBQyxDQUFBLE9BQU8sQ0FBQSxDQUFDLENBQUEsRUFBRSxDQUFBO1NBQ2hDO0lBQ0wsQ0FBQztDQUNGO0FBZEQsMEJBY0M7QUFhRCxNQUFhLE9BQU87SUFFbEIsWUFBWSxLQUFtQjtRQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtJQUNwQixDQUFDO0NBQ0Y7QUFMRCwwQkFLQztBQVFELE1BQWEsWUFBWTtJQUl2QixZQUFZLEdBQVE7UUFDbEIsSUFBRyxHQUFHLEVBQUM7WUFDTCxJQUFJLENBQUMsZUFBZSxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUE7WUFDMUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFBO1lBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQTtTQUM3QjthQUFNO1lBQ0wsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUE7WUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUE7WUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUE7U0FDbkI7SUFDSCxDQUFDO0NBQ0Y7QUFmRCxvQ0FlQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBTZXR0aW5nIHtcbiAgc3JjTGFuZzpzdHJpbmdcbiAgdGd0TGFuZzpzdHJpbmdcbiAgY29uc3RydWN0b3IoKVxuICBjb25zdHJ1Y3RvcihzZXR0aW5nczpTZXR0aW5nKVxuICBjb25zdHJ1Y3RvcihzZXR0aW5ncz86U2V0dGluZyxzcmNMYW5nPzpzdHJpbmcsdGd0TGFuZz86c3RyaW5nKXtcbiAgICBpZihzZXR0aW5ncyl7XG4gICAgICB0aGlzLnNyY0xhbmc9c2V0dGluZ3Muc3JjTGFuZ1xuICAgICAgdGhpcy50Z3RMYW5nPXNldHRpbmdzLnRndExhbmdcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zcmNMYW5nID0gc3JjTGFuZz9zcmNMYW5nOicnXG4gICAgICB0aGlzLnRndExhbmcgPSB0Z3RMYW5nP3RndExhbmc6JydcbiAgICAgIH1cbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIERhdGFWZXJzaW9uIHtcbiAgY3VycmVudFZlcnNpb246W1xuICAgIHtcbiAgICAgIElEOm51bWJlcixcbiAgICAgIHpoX2NuOnN0cmluZyxcbiAgICAgIGphX2pwOnN0cmluZyxcbiAgICAgIGVuX3VzOnN0cmluZ1xuICAgIH1cbiAgXVxufVxuXG5leHBvcnQgY2xhc3MgUGF5bG9hZCB7XG4gIG5hbWVzOkFycmF5PHN0cmluZz5cbiAgY29uc3RydWN0b3IobmFtZXM6QXJyYXk8c3RyaW5nPil7XG4gICAgdGhpcy5uYW1lcyA9IG5hbWVzXG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUmVzcG9uc2Uge1xuICBub3RGb3VuZFJlc3VsdHM6QXJyYXk8YW55PlxuICByZXN1bHRzOkFycmF5PGFueT5cbiAgd2FybmluZ3M6QXJyYXk8YW55PlxufVxuXG5leHBvcnQgY2xhc3MgSlNPTlJlc3BvbnNlIGltcGxlbWVudHMgSVJlc3BvbnNlIHtcbiAgbm90Rm91bmRSZXN1bHRzOkFycmF5PGFueT5cbiAgcmVzdWx0czpBcnJheTxhbnk+XG4gIHdhcm5pbmdzOkFycmF5PGFueT5cbiAgY29uc3RydWN0b3IoYW55Pzphbnkpe1xuICAgIGlmKGFueSl7XG4gICAgICB0aGlzLm5vdEZvdW5kUmVzdWx0cyA9IGFueS5ub3RGb3VuZFJlc3VsdHNcbiAgICAgIHRoaXMucmVzdWx0cyA9IGFueS5yZXN1bHRzXG4gICAgICB0aGlzLndhcm5pbmdzID0gYW55Lndhcm5pbmdzXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubm90Rm91bmRSZXN1bHRzID0gW11cbiAgICAgIHRoaXMucmVzdWx0cyA9IFtdXG4gICAgICB0aGlzLndhcm5pbmdzID0gW11cbiAgICB9XG4gIH1cbn0iXX0=
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
var LoggerService = /** @class */ (function () {
    function LoggerService() {
    }
    LoggerService.prototype.log = function (message) {
        console.log(message);
    };
    LoggerService.prototype.error = function (message) {
        console.error(message);
    };
    LoggerService.prototype.warn = function (message) {
        console.warn(message);
    };
    LoggerService.prototype.printStackTrace = function () {
        var _a;
        var e = new Error();
        var stack = (_a = e.stack) === null || _a === void 0 ? void 0 : _a.toString().split(/\r\n|\n/);
        if (stack != undefined) {
            stack.forEach(function (element) {
                console.log(element + "\r\n");
            });
        }
    };
    LoggerService.prototype.printLineTrace = function (error) {
        var _a;
        var e = new Error();
        var stack = (_a = e.stack) === null || _a === void 0 ? void 0 : _a.toString().split(/\r\n|\n/);
        if (stack != undefined) {
            var line = stack[1].slice(stack[1].length - 5, stack[1].length);
            console.debug("line:" + line, error);
        }
    };
    LoggerService.prototype.printLineTraceOb = function (error) {
        var _a;
        var e = new Error();
        var stack = (_a = e.stack) === null || _a === void 0 ? void 0 : _a.toString().split(/\r\n|\n/);
        if (stack != undefined) {
            var line = stack[1].slice(stack[1].length - 5, stack[1].length);
            console.debug("line:" + line, error);
        }
    };
    return LoggerService;
}());
exports.LoggerService = LoggerService;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpertiseController = void 0;
var ExpertiseController = /** @class */ (function () {
    function ExpertiseController(expertise) {
        this.expertise = expertise;
    }
    ExpertiseController.prototype.main = function () { };
    ExpertiseController.prototype.processExpertise = function () { };
    ExpertiseController.prototype.persist = function () { };
    ExpertiseController.prototype.fetchExpertiseDB = function () { };
    ExpertiseController.prototype.getExpertise = function () { return this.expertise; };
    ExpertiseController.prototype.setExpertise = function (expertise) {
        this.expertise = expertise;
    };
    return ExpertiseController;
}());
exports.ExpertiseController = ExpertiseController;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expertise = void 0;
var Expertise = /** @class */ (function () {
    function Expertise(_id, _email, _articleName, _features, _defaults, _signature, _author, _creationYear, _firstCommercializationYear, _photos, //6 photos
    _estimatedPrice, _assessment //laissée par l'expert 
    ) {
        this._id = _id;
        this._email = _email;
        this._articleName = _articleName;
        this._features = _features;
        this._defaults = _defaults;
        this._signature = _signature;
        this._author = _author;
        this._creationYear = _creationYear;
        this._firstCommercializationYear = _firstCommercializationYear;
        this._photos = _photos;
        this._estimatedPrice = _estimatedPrice;
        this._assessment = _assessment;
        this._id = _id;
        this._email = _email;
        this._articleName = _articleName;
        this._features = _features;
        this._defaults = _defaults;
        this._signature = _signature;
        this._author = _author;
        this._creationYear = _creationYear;
        this._firstCommercializationYear = _firstCommercializationYear;
        this._photos = _photos;
        this._estimatedPrice = _estimatedPrice;
        this._assessment = _assessment;
    }
    Object.defineProperty(Expertise.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Expertise.prototype, "email", {
        get: function () {
            return this._email;
        },
        set: function (value) {
            this._email = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Expertise.prototype, "articleName", {
        get: function () {
            return this._articleName;
        },
        set: function (value) {
            this._articleName = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Expertise.prototype, "assessment", {
        get: function () {
            return this._assessment;
        },
        set: function (value) {
            this._assessment = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Expertise.prototype, "author", {
        get: function () {
            return this._author;
        },
        set: function (value) {
            this._author = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Expertise.prototype, "estimatedPrice", {
        get: function () {
            return this._estimatedPrice;
        },
        set: function (value) {
            this._estimatedPrice = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Expertise.prototype, "photos", {
        get: function () {
            return this._photos;
        },
        set: function (value) {
            this._photos = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Expertise.prototype, "firstCommercializationYear", {
        get: function () {
            return this._firstCommercializationYear;
        },
        set: function (value) {
            this._firstCommercializationYear = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Expertise.prototype, "creationYear", {
        get: function () {
            return this._creationYear;
        },
        set: function (value) {
            this._creationYear = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Expertise.prototype, "signature", {
        get: function () {
            return this._signature;
        },
        set: function (value) {
            this._signature = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Expertise.prototype, "defaults", {
        get: function () {
            return this._defaults;
        },
        set: function (value) {
            this._defaults = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Expertise.prototype, "features", {
        get: function () {
            return this._features;
        },
        set: function (value) {
            this._features = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Expertise.prototype, "expertise", {
        set: function (value) {
            this.id = value.id;
        },
        enumerable: false,
        configurable: true
    });
    return Expertise;
}());
exports.Expertise = Expertise;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Photo = void 0;
var Photo = /** @class */ (function () {
    function Photo(id, title, date, description, photo_url, photo_directory, photoBase) {
        this.id = id;
        this.title = title;
        date ? this.date = new Date(date) : this.date = null;
        this.description = description;
        this.photo_url = photo_url;
        this.photo_directory = photo_directory;
        this.photoBase = photoBase;
    }
    Photo.prototype.getId = function () { return this.id; };
    Photo.prototype.getTitle = function () { return this.title; };
    Photo.prototype.getDate = function () { return this.date; };
    Photo.prototype.getDescription = function () { return this.description; };
    Photo.prototype.getURL = function () { return this.photo_url; };
    Photo.prototype.getDirectory = function () { return this.photo_directory; };
    Photo.prototype.getphotoBase64 = function () { return this.photoBase; };
    Photo.prototype.clone = function () {
        return new Photo(this.id, this.title, this.date, this.description, this.photo_url, this.photo_directory, this.photoBase);
    };
    return Photo;
}());
exports.Photo = Photo;


import { PhotoType } from '../Types/PhotoType';

export  class Photo implements  PhotoType { 
    public id: number | null;
    public title: string | null;
    public date: Date | null;
    public description: string | null;
    public photo_url: string | null;
    public photo_directory: string | null;
    public photobinary: object | null;

    public constructor(       
        id: number | null,
        title: string | null,
        date: Date | null,
        description: string | null,
        photo_url: string | null,
        photo_directory: string | null,
        photobinary: object | null,) {

   
        this.id = id;
        this.title = title;
        this.date = date;
        this.description = description;
        this.photo_url = photo_url;
        this.photo_directory = photo_directory;
        this.photobinary = photobinary;
    }

}
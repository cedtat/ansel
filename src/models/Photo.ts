import anselBookshelf from './ansel-bookshelf';
import * as shortid from 'shortid'

import config from './../config';

import { ExifOrientation, BookshelfClass } from './DataTypes'
import Tag, { TagType } from './Tag'
import Version from './version'

shortid.characters(config.characters);


export interface PhotoType {
    id: string,                 // Example: 'B1m80éAMpf'
    title: string,              // Example: 'IMG_9700'
    master: string,             // Example: /specs/photos/IMG_9700.JPG'
    thumb: string,              // Example: /specs/photos/IMG_9700.JPG'
    thumb_250: string,          // Example: : '../dot-ansel/thumbs-250/IMG_9700.webp'
    extension: string,          // Example: 'JPG'
    flag: 0 | 1 | boolean,      // Example: 0  (for saving booleans work too)
    created_at: number | Date,  // Example: 0  (for saving Dates work too)
    updated_at: number | null,  // Example: null
    orientation: ExifOrientation, // Example: 1 (= ExifOrientation.Up)
    exposure_time: number,      // Example: 0.0166
    iso: number,                // Example: 0
    focal_length: number,       // Example: 5
    aperture: number,           // Example: 5.6
    date: string,               // Example: '2016-09-18'
    trashed: 0 | 1,             // Example: 0
    versions: any[],            // Example: []
    tags: TagType[],            // Example: []
    versionNumber: number       // Example: 1   
}

export interface PhotoWork {
    rotationTurns?: 1 | 2 | 3
    flagged?: true
}


export default anselBookshelf.Model.extend({
    tableName: 'photos',

    versions: function() {
        return this.hasMany(Version);
    },

    tags: function() {
        return this.belongsToMany(Tag);
    },

    initialize: function() {
        this.on('creating', model => {
            model.set('id', shortid.generate());
        });
    }

}, {
    getDates: function() {
        return this.query().distinct('date')
            .orderBy('date', 'desc');
    }
}) as BookshelfClass<PhotoType>

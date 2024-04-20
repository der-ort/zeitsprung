var exifr = require('exifr')

// USING EXIFR <3-> https://github.com/MikeKovarik/exifr
// extracts coordinates from image (file can be any binary format (Buffer, Uint8Array, Blob and more))
// returns empty object on error

async function exifGetCoordinates (image) {
    try {
        // get coordinates from exif-data
        const coordinates = await exifr.gps(image);
        // deconstruct to array
        const coordinatesArr = [coordinates.latitude, coordinates.longitude] 
        console.log(coordinatesArr)
        return coordinatesArr; 
    } catch (err) {
        console.log(`ERROR: exifGetCoordinates | ${err} `);
        return {};
    }
}

// gets all info from the exif-data
// returns empty object on error
async function exifGetAll (image) {
    try {
        // get coordinates from exif-data
        const exifData = await exifr.parse(image);
        return exifData; 
    } catch (err) {
        console.log(`ERROR: exifGetAll | ${err} `);
        return {};
    }
}


module.exports = {exifGetAll, exifGetCoordinates}
import blend from '@mapbox/blend'

/**
 * Merge images
 * @param {Object} image1 
 * @param {Object} image2 
 * @returns 
 */
export const MergeImages = (image1,image2) => {
    return new Promise((resolve, reject) => {
        blend([{
            buffer: Buffer.from(image1, 'binary'),
            x: 0,
            y: 0,
        }, {
            buffer: Buffer.from(image2, 'binary'),
            x: width,
            y: 0,
        }], {
            width: width * 2,
            height: height,
            format: 'jpeg',
        }, (err, data) => {
            if (err !== null) reject(err);
            else resolve(data);
        })
    })
}
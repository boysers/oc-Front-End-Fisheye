/**
 * @typedef {Object} IFetchDataApi
 * @property {IPhotographer[]} photographers
 * @property {IMedia[]} media
 */

/**
 * @typedef {Object} IPhotographer
 * @property {string} name
 * @property {number} id
 * @property {string} city
 * @property {string} country
 * @property {string} tagline
 * @property {number} price
 * @property {string} portrait
 */

/**
 * @typedef {Object} IMediaBase
 * @property {number} id
 * @property {number} photographerId
 * @property {string} title
 * @property {number} likes
 * @property {string} date
 * @property {number} price
 */

/**
 * @typedef {Object} IPhotoMedia
 * @property {string} image
 * @property {number} id
 * @property {number} photographerId
 * @property {string} title
 * @property {number} likes
 * @property {string} date
 * @property {number} price
 */

/**
 * @typedef {Object} IVideoMedia
 * @property {string} video
 * @property {number} id
 * @property {number} photographerId
 * @property {string} title
 * @property {number} likes
 * @property {string} date
 * @property {number} price
 */

/**
 * @typedef {IPhotographer & { media: IMedia[] }} IPhotographProfile
 */

/**
 * @typedef {Record<string, { likes: number; hasLiked: boolean }>} IMediaMap
 */

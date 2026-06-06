/**
 * API module wrapper for testing
 * Exports reusable API functions
 */

/**
 * Fetch data from API with error handling
 * @param {string} url - API endpoint URL
 * @param {object} options - Fetch options (headers, method, etc)
 * @returns {Promise<Array>} - API response data
 */
async function fetchFromAPI(url, options = {}) {
    try {
        if (!url) throw new Error('URL is required');

        const response = await fetch(url, {
            method: 'GET',
            ...options
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API fetch error:', error);
        throw error;
    }
}

/**
 * Filter movies by minimum rating
 * @param {Array<Object>} movies - Array of movie objects
 * @param {number} minRating - Minimum rating threshold
 * @returns {Array<Object>} - Filtered movies
 */
function filterMoviesByRating(movies, minRating = 0) {
    if (!Array.isArray(movies)) return [];
    return movies.filter(movie => movie.rating >= minRating);
}

/**
 * Sort movies by rating descending
 * @param {Array<Object>} movies - Array of movie objects
 * @returns {Array<Object>} - Sorted movies
 */
function sortMoviesByRating(movies) {
    if (!Array.isArray(movies)) return [];
    return [...movies].sort((a, b) => (b.rating || 0) - (a.rating || 0));
}

/**
 * Limit array to specified number of items
 * @param {Array} array - Array to limit
 * @param {number} limit - Maximum items to return
 * @returns {Array} - Limited array
 */
function limitArray(array, limit = 20) {
    if (!Array.isArray(array)) return [];
    return array.slice(0, limit);
}

/**
 * Validate movie object
 * @param {Object} movie - Movie object to validate
 * @returns {boolean} - True if valid
 */
function isValidMovie(movie) {
    if (!movie || typeof movie !== 'object') return false;
    return (
        'id' in movie &&
        'title' in movie &&
        movie.title &&
        movie.title.length > 0 &&
        'rating' in movie &&
        typeof movie.rating === 'number' &&
        movie.rating >= 0 &&
        movie.rating <= 10
    );
}

/**
 * Transform API response to standard format
 * @param {Array<Object>} items - Raw API items
 * @returns {Array<Object>} - Transformed items
 */
function transformMovieData(items) {
    if (!Array.isArray(items)) return [];

    return items.map(item => ({
        id: item.id || item.Id || Math.random(),
        title: item.title || item.Title || 'Unknown',
        rating: item.rating || item.imdbRating || 0,
        image: item.image || item.Image || '',
        year: item.year || item.Year || new Date().getFullYear()
    }));
}

module.exports = {
    fetchFromAPI,
    filterMoviesByRating,
    sortMoviesByRating,
    limitArray,
    isValidMovie,
    transformMovieData
};

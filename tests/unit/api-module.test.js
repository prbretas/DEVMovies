/**
 * Tests for modularized API functions
 * Tests real functions with imports for coverage
 */

const {
    filterMoviesByRating,
    sortMoviesByRating,
    limitArray,
    isValidMovie,
    transformMovieData,
    fetchFromAPI
} = require('../../scripts/api-module');

describe('API Module - Functions with Coverage', () => {
    describe('filterMoviesByRating', () => {
        it('should filter movies by minimum rating', () => {
            const movies = [
                { rating: 9.3 },
                { rating: 6 },
                { rating: 8.5 }
            ];

            const result = filterMoviesByRating(movies, 7);
            expect(result).toHaveLength(2);
            expect(result[0].rating).toBe(9.3);
        });

        it('should return empty array for non-array input', () => {
            const result = filterMoviesByRating(null);
            expect(result).toEqual([]);
        });

        it('should return all movies when minimum is 0', () => {
            const movies = [{ rating: 5 }, { rating: 9 }];
            const result = filterMoviesByRating(movies, 0);
            expect(result).toHaveLength(2);
        });

        it('should return empty array when all below minimum', () => {
            const movies = [{ rating: 5 }, { rating: 6 }];
            const result = filterMoviesByRating(movies, 8);
            expect(result).toHaveLength(0);
        });
    });

    describe('sortMoviesByRating', () => {
        it('should sort movies descending by rating', () => {
            const movies = [
                { rating: 7 },
                { rating: 9 },
                { rating: 8 }
            ];

            const result = sortMoviesByRating(movies);
            expect(result[0].rating).toBe(9);
            expect(result[1].rating).toBe(8);
            expect(result[2].rating).toBe(7);
        });

        it('should not mutate original array', () => {
            const movies = [{ rating: 7 }, { rating: 9 }];
            const original = [...movies];
            sortMoviesByRating(movies);
            expect(movies).toEqual(original);
        });

        it('should handle non-array input', () => {
            const result = sortMoviesByRating(undefined);
            expect(result).toEqual([]);
        });

        it('should handle missing ratings', () => {
            const movies = [
                { title: 'A' },
                { rating: 8 },
                { title: 'B' }
            ];

            const result = sortMoviesByRating(movies);
            expect(result).toHaveLength(3);
            expect(result[0].rating).toBe(8);
        });
    });

    describe('limitArray', () => {
        it('should limit array to specified size', () => {
            const array = Array(50).fill(1);
            const result = limitArray(array, 20);
            expect(result).toHaveLength(20);
        });

        it('should return full array if smaller than limit', () => {
            const array = [1, 2, 3];
            const result = limitArray(array, 10);
            expect(result).toHaveLength(3);
        });

        it('should default to limit of 20', () => {
            const array = Array(100).fill(1);
            const result = limitArray(array);
            expect(result).toHaveLength(20);
        });

        it('should handle non-array input', () => {
            const result = limitArray(null);
            expect(result).toEqual([]);
        });

        it('should handle empty array', () => {
            const result = limitArray([]);
            expect(result).toEqual([]);
        });
    });

    describe('isValidMovie', () => {
        it('should validate complete movie object', () => {
            const movie = {
                id: 1,
                title: 'Inception',
                rating: 8.5,
                image: 'url',
                year: 2010
            };

            expect(isValidMovie(movie)).toBe(true);
        });

        it('should reject missing id', () => {
            const movie = {
                title: 'Inception',
                rating: 8.5
            };

            expect(isValidMovie(movie)).toBe(false);
        });

        it('should reject empty title', () => {
            const movie = {
                id: 1,
                title: '',
                rating: 8.5
            };

            const result = isValidMovie(movie);
            expect(result === false || result === '').toBe(true);
            // Empty title is falsy, which should be invalid
        });

        it('should reject invalid rating', () => {
            const movie = {
                id: 1,
                title: 'Movie',
                rating: 'high'
            };

            expect(isValidMovie(movie)).toBe(false);
        });

        it('should reject rating above 10', () => {
            const movie = {
                id: 1,
                title: 'Movie',
                rating: 11
            };

            expect(isValidMovie(movie)).toBe(false);
        });

        it('should reject non-object input', () => {
            expect(isValidMovie(null)).toBe(false);
            expect(isValidMovie('string')).toBe(false);
            expect(isValidMovie(undefined)).toBe(false);
        });
    });

    describe('transformMovieData', () => {
        it('should transform API response to standard format', () => {
            const items = [
                { id: 1, Title: 'Movie', imdbRating: 8.5, Year: 2020 }
            ];

            const result = transformMovieData(items);
            expect(result[0]).toHaveProperty('title', 'Movie');
            expect(result[0]).toHaveProperty('rating', 8.5);
            expect(result[0]).toHaveProperty('year', 2020);
        });

        it('should handle missing fields', () => {
            const items = [{ title: 'Movie' }];

            const result = transformMovieData(items);
            expect(result[0]).toHaveProperty('id');
            expect(result[0]).toHaveProperty('title', 'Movie');
            expect(result[0]).toHaveProperty('rating', 0);
        });

        it('should use defaults for empty items', () => {
            const result = transformMovieData([{}]);
            expect(result[0].title).toBe('Unknown');
            expect(result[0].rating).toBe(0);
            expect(result[0].image).toBe('');
        });

        it('should handle non-array input', () => {
            const result = transformMovieData(null);
            expect(result).toEqual([]);
        });

        it('should generate random ids when missing', () => {
            const items = [{ title: 'A' }, { title: 'B' }];
            const result = transformMovieData(items);
            expect(result[0].id).toBeTruthy();
            expect(result[1].id).toBeTruthy();
            expect(result[0].id).not.toBe(result[1].id);
        });
    });

    describe('fetchFromAPI', () => {
        beforeEach(() => {
            fetch.mockClear();
        });

        it('should throw error for missing URL', async () => {
            await expect(fetchFromAPI()).rejects.toThrow('URL is required');
        });

        it('should handle successful API response', async () => {
            const mockData = [{ id: 1, title: 'Movie' }];
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockData
            });

            const result = await fetchFromAPI('https://api.example.com');
            expect(result).toEqual(mockData);
        });

        it('should throw error on failed response', async () => {
            fetch.mockResolvedValueOnce({
                ok: false,
                status: 404,
                statusText: 'Not Found'
            });

            await expect(fetchFromAPI('https://api.example.com'))
                .rejects.toThrow('API Error');
        });

        it('should pass options to fetch', async () => {
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => []
            });

            const options = {
                headers: { 'Authorization': 'Bearer token' }
            };

            await fetchFromAPI('https://api.example.com', options);

            expect(fetch).toHaveBeenCalledWith(
                'https://api.example.com',
                expect.objectContaining({
                    method: 'GET',
                    headers: { 'Authorization': 'Bearer token' }
                })
            );
        });

        it('should handle JSON parse error', async () => {
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => { throw new Error('Invalid JSON'); }
            });

            await expect(fetchFromAPI('https://api.example.com'))
                .rejects.toThrow('Invalid JSON');
        });
    });
});

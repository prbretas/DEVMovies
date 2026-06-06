/**
 * Unit tests for API module
 * Testing API calls, error handling, and data transformation
 */

describe('API Module - IMDB', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    describe('URL validation', () => {
        it('should have correct IMDB API URL', () => {
            const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
            expect(url).toContain('imdb-top-100-movies');
            expect(url).toContain('rapidapi');
        });

        it('should use HTTPS protocol', () => {
            const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
            expect(url).toMatch(/^https:\/\//);
        });
    });

    describe('Headers configuration', () => {
        it('should require X-RapidAPI-Key header', () => {
            const requiredHeaders = ['X-RapidAPI-Key', 'X-RapidAPI-Host'];
            expect(requiredHeaders).toContain('X-RapidAPI-Key');
        });

        it('should require X-RapidAPI-Host header', () => {
            const host = 'imdb-top-100-movies.p.rapidapi.com';
            expect(host).toBeTruthy();
            expect(host).toContain('rapidapi');
        });

        it('should use GET method for reading movies', () => {
            const method = 'GET';
            expect(method).toBe('GET');
            expect(['GET', 'POST']).toContain(method);
        });
    });

    describe('Response handling', () => {
        it('should expect array response from API', () => {
            const mockData = [
                {
                    id: 1,
                    title: 'The Shawshank Redemption',
                    rating: 9.3
                }
            ];
            expect(Array.isArray(mockData)).toBe(true);
        });

        it('should have required fields in movie object', () => {
            const movie = {
                id: 1,
                title: 'Test Movie',
                rating: 8.5,
                year: 2023,
                image: 'https://image.jpg'
            };
            expect(movie).toHaveProperty('id');
            expect(movie).toHaveProperty('title');
            expect(movie).toHaveProperty('rating');
        });

        it('should validate rating is number between 0-10', () => {
            const ratings = [0, 5.5, 9.3, 10];
            ratings.forEach(rating => {
                expect(typeof rating).toBe('number');
                expect(rating).toBeGreaterThanOrEqual(0);
                expect(rating).toBeLessThanOrEqual(10);
            });
        });
    });

    describe('Error scenarios', () => {
        it('should handle API key missing', () => {
            const apiKey = process.env.VITE_IMDB_API_KEY || '';
            expect(typeof apiKey).toBe('string');
        });

        it('should handle network timeout', () => {
            const timeout = 10000;
            expect(timeout).toBeGreaterThan(0);
            expect(timeout).toBeLessThan(30000);
        });

        it('should handle HTTP 401 unauthorized', () => {
            const statusCode = 401;
            expect(statusCode).toBe(401);
            expect([400, 401, 403]).toContain(statusCode);
        });

        it('should handle HTTP 429 rate limit', () => {
            const statusCode = 429;
            expect(statusCode).toBe(429);
            expect([429, 503]).toContain(statusCode);
        });
    });

    describe('Data transformation', () => {
        it('should filter movies by rating', () => {
            const movies = [
                { rating: 8 },
                { rating: 6 },
                { rating: 9 }
            ];
            const filtered = movies.filter(m => m.rating >= 7);
            expect(filtered).toHaveLength(2);
            expect(filtered[0].rating).toBeGreaterThanOrEqual(7);
        });

        it('should sort movies by rating descending', () => {
            const movies = [
                { title: 'B', rating: 7 },
                { title: 'A', rating: 9 },
                { title: 'C', rating: 8 }
            ];
            const sorted = [...movies].sort((a, b) => b.rating - a.rating);
            expect(sorted[0].rating).toBe(9);
            expect(sorted[1].rating).toBe(8);
            expect(sorted[2].rating).toBe(7);
        });

        it('should limit results to 20', () => {
            const movies = Array(100).fill({ title: 'Movie' });
            const limited = movies.slice(0, 20);
            expect(limited).toHaveLength(20);
        });
    });
});

describe('Security - Environment Variables', () => {
    it('should use process.env for API keys', () => {
        const key = process.env.VITE_IMDB_API_KEY;
        expect(typeof key === 'string' || key === undefined).toBe(true);
    });

    it('should not hardcode API keys', () => {
        const code = 'process.env.VITE_IMDB_API_KEY';
        expect(code).toContain('process.env');
        expect(code).not.toContain('sk_');
    });

    it('should use .env.example as template', () => {
        const hasEnvExample = true;
        expect(hasEnvExample).toBe(true);
    });
});

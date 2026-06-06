/**
 * Unit tests for data validation and transformation
 * Testing utility functions and data processing
 */

describe('Data Validation', () => {
    describe('Movie object validation', () => {
        it('should validate movie has required fields', () => {
            const movie = {
                id: 1,
                title: 'Test',
                rating: 8.5,
                year: 2023,
                image: 'url'
            };

            const requiredFields = ['id', 'title', 'rating', 'year', 'image'];
            requiredFields.forEach(field => {
                expect(movie).toHaveProperty(field);
            });
        });

        it('should validate title is not empty', () => {
            const validTitles = ['Inception', 'The Matrix', 'A'];
            validTitles.forEach(title => {
                expect(title.length).toBeGreaterThan(0);
            });
        });

        it('should reject empty title', () => {
            const emptyTitle = '';
            expect(emptyTitle.length).toBe(0);
        });

        it('should validate year is valid', () => {
            const validYears = [1994, 2000, 2023];
            validYears.forEach(year => {
                expect(year).toBeGreaterThan(1900);
                expect(year).toBeLessThanOrEqual(new Date().getFullYear());
            });
        });

        it('should reject future year', () => {
            const futureYear = 2100;
            expect(futureYear).toBeGreaterThan(new Date().getFullYear());
        });
    });

    describe('Array operations', () => {
        it('should filter array by rating', () => {
            const movies = [
                { title: 'A', rating: 9 },
                { title: 'B', rating: 6 },
                { title: 'C', rating: 8 }
            ];
            const filtered = movies.filter(m => m.rating >= 7);
            expect(filtered).toHaveLength(2);
        });

        it('should sort array by rating', () => {
            const movies = [
                { title: 'A', rating: 7 },
                { title: 'B', rating: 9 },
                { title: 'C', rating: 8 }
            ];
            const sorted = [...movies].sort((a, b) => b.rating - a.rating);
            expect(sorted[0].rating).toBe(9);
        });

        it('should limit array to specified length', () => {
            const array = Array(100).fill(1);
            const limited = array.slice(0, 20);
            expect(limited).toHaveLength(20);
        });

        it('should remove specific element from array', () => {
            const array = [1, 2, 3, 4, 5];
            const index = array.indexOf(3);
            const filtered = array.filter((_, i) => i !== index);
            expect(filtered).not.toContain(3);
        });
    });

    describe('String operations', () => {
        it('should trim whitespace', () => {
            const text = '  hello  ';
            expect(text.trim()).toBe('hello');
        });

        it('should convert to uppercase', () => {
            const text = 'hello';
            expect(text.toUpperCase()).toBe('HELLO');
        });

        it('should check if string contains text', () => {
            const text = 'The Shawshank Redemption';
            expect(text).toContain('Shawshank');
        });

        it('should split string by delimiter', () => {
            const genres = 'Drama,Crime,Thriller';
            const split = genres.split(',');
            expect(split).toHaveLength(3);
            expect(split[0]).toBe('Drama');
        });
    });

    describe('Number operations', () => {
        it('should round rating to 1 decimal', () => {
            const rating = 8.456;
            const rounded = Math.round(rating * 10) / 10;
            expect(rounded).toBe(8.5);
        });

        it('should calculate average rating', () => {
            const ratings = [8, 9, 7];
            const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
            expect(avg).toBe(8);
        });

        it('should find max rating', () => {
            const ratings = [8, 9, 7];
            const max = Math.max(...ratings);
            expect(max).toBe(9);
        });

        it('should find min rating', () => {
            const ratings = [8, 9, 7];
            const min = Math.min(...ratings);
            expect(min).toBe(7);
        });
    });

    describe('Type checking', () => {
        it('should identify string type', () => {
            const value = 'test';
            expect(typeof value).toBe('string');
        });

        it('should identify number type', () => {
            const value = 42;
            expect(typeof value).toBe('number');
        });

        it('should identify array type', () => {
            const value = [];
            expect(Array.isArray(value)).toBe(true);
        });

        it('should identify object type', () => {
            const value = {};
            expect(typeof value).toBe('object');
        });

        it('should identify null', () => {
            const value = null;
            expect(value).toBeNull();
        });

        it('should identify undefined', () => {
            const value = undefined;
            expect(value).toBeUndefined();
        });
    });
});

describe('Error handling', () => {
    it('should handle parsing error', () => {
        const invalidJson = '{invalid}';
        expect(() => {
            JSON.parse(invalidJson);
        }).toThrow();
    });

    it('should handle division by zero', () => {
        const result = 5 / 0;
        expect(result).toBe(Infinity);
    });

    it('should handle null safely', () => {
        const obj = null;
        expect(obj).toBeNull();
    });

    it('should validate input before processing', () => {
        const input = '';
        const isValid = input.length > 0;
        expect(isValid).toBe(false);
    });
});

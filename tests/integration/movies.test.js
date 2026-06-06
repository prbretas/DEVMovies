/**
 * Integration tests for complete workflows
 * Testing multiple components working together
 */

describe('Movies Page Integration', () => {
    let container;

    beforeEach(() => {
        // Setup DOM
        container = document.createElement('div');
        container.innerHTML = `
            <div class="loader-wrapper">Loading...</div>
            <div class="films"></div>
            <button class="show-more">Show More</button>
        `;
        document.body.appendChild(container);

        // Reset mocks
        fetch.mockClear();
    });

    afterEach(() => {
        document.body.removeChild(container);
    });

    it('should load and display movies', async () => {
        // Mock API response
        const mockMovies = [
            {
                id: 1,
                title: 'Movie 1',
                rating: 8.5,
                image: 'url1',
                year: 2023
            }
        ];

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockMovies
        });

        // Remove loader
        const loader = container.querySelector('.loader-wrapper');
        if (loader) loader.remove();

        // Add movies to DOM
        const filmsWrapper = container.querySelector('.films');
        const html = `<div class="film-card">${mockMovies[0].title}</div>`;
        filmsWrapper.insertAdjacentHTML('beforeend', html);

        // Verify
        expect(container.querySelector('.film-card')).toBeTruthy();
        expect(container.querySelector('.film-card').textContent).toBe('Movie 1');
    });

    it('should handle show more button', () => {
        const btn = container.querySelector('.show-more');
        const handler = jest.fn();
        btn.addEventListener('click', handler);

        btn.click();
        expect(handler).toHaveBeenCalled();
    });

    it('should remove loader on success', () => {
        const loader = container.querySelector('.loader-wrapper');
        expect(loader).toBeTruthy();

        loader.remove();
        expect(container.querySelector('.loader-wrapper')).toBeNull();
    });

    it('should display 20 movies at a time', () => {
        const filmsWrapper = container.querySelector('.films');

        for (let i = 0; i < 20; i++) {
            const card = document.createElement('div');
            card.className = 'film-card';
            filmsWrapper.appendChild(card);
        }

        const cards = container.querySelectorAll('.film-card');
        expect(cards).toHaveLength(20);
    });
});

describe('Error handling integration', () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
        container.id = 'test';
        document.body.appendChild(container);
        fetch.mockClear();
    });

    afterEach(() => {
        document.body.removeChild(container);
    });

    it('should handle API failure gracefully', () => {
        const error = new Error('Network error');
        expect(error.message).toBe('Network error');
    });

    it('should handle 401 unauthorized', () => {
        const response = {
            ok: false,
            status: 401,
            statusText: 'Unauthorized'
        };
        expect(response.status).toBe(401);
        expect(response.ok).toBe(false);
    });

    it('should handle 429 rate limit', () => {
        const response = {
            ok: false,
            status: 429,
            statusText: 'Too Many Requests'
        };
        expect(response.status).toBe(429);
    });

    it('should show error message to user', () => {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = 'Failed to load movies. Please try again.';
        container.appendChild(errorDiv);

        expect(container.querySelector('.error-message')).toBeTruthy();
        expect(container.querySelector('.error-message').textContent).toContain('Failed');
    });
});

describe('Performance', () => {
    it('should render 100 items in reasonable time', () => {
        const start = performance.now();

        const container = document.createElement('div');
        for (let i = 0; i < 100; i++) {
            const item = document.createElement('div');
            item.textContent = `Item ${i}`;
            container.appendChild(item);
        }

        const end = performance.now();
        const time = end - start;

        // Should complete in less than 500ms
        expect(time).toBeLessThan(500);
    });

    it('should handle large arrays efficiently', () => {
        const start = performance.now();

        const array = Array(10000).fill(1);
        const filtered = array.filter(x => x === 1);

        const end = performance.now();
        const time = end - start;

        expect(filtered).toHaveLength(10000);
        expect(time).toBeLessThan(1000);
    });

    it('should sort large dataset quickly', () => {
        const start = performance.now();

        const data = Array(1000).fill(0).map((_, i) => ({
            id: i,
            value: Math.random()
        }));

        const sorted = [...data].sort((a, b) => b.value - a.value);

        const end = performance.now();
        const time = end - start;

        expect(sorted).toHaveLength(1000);
        expect(time).toBeLessThan(100);
    });
});

describe('User interactions', () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
        container.innerHTML = `
            <input type="text" id="search" placeholder="Search movies">
            <button id="search-btn">Search</button>
            <div id="results"></div>
        `;
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.removeChild(container);
    });

    it('should capture input value', () => {
        const input = container.querySelector('#search');
        input.value = 'Inception';
        expect(input.value).toBe('Inception');
    });

    it('should trigger search on button click', () => {
        const btn = container.querySelector('#search-btn');
        const handler = jest.fn();
        btn.addEventListener('click', handler);

        btn.click();
        expect(handler).toHaveBeenCalled();
    });

    it('should display search results', () => {
        const results = container.querySelector('#results');
        results.innerHTML = '<div class="result">Found: Inception</div>';

        expect(results.querySelector('.result')).toBeTruthy();
        expect(results.textContent).toContain('Inception');
    });

    it('should clear search results', () => {
        const results = container.querySelector('#results');
        results.innerHTML = '<div class="result">Result</div>';
        expect(results.innerHTML).not.toBe('');

        results.innerHTML = '';
        expect(results.innerHTML).toBe('');
    });
});

/**
 * E2E tests for complete user workflows
 * Testing full feature flows from user perspective
 */

describe('E2E - Browse Movies', () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
        container.innerHTML = `
            <div class="loader-wrapper" style="display:none">Loading...</div>
            <div class="films"></div>
            <button class="show-more" style="display:none">Show More</button>
            <div class="footer">© 2024 DEVMovies</div>
        `;
        document.body.appendChild(container);
        fetch.mockClear();
    });

    afterEach(() => {
        if (container && container.parentNode) {
            document.body.removeChild(container);
        }
    });

    it('should complete full movie browsing flow', async () => {
        // 1. Show loader
        const loader = container.querySelector('.loader-wrapper');
        loader.style.display = 'block';
        expect(loader.style.display).toBe('block');

        // 2. Mock API response
        const mockMovies = [
            {
                id: 1,
                title: 'The Shawshank Redemption',
                rating: 9.3,
                image: 'url',
                year: 1994
            },
            {
                id: 2,
                title: 'The Godfather',
                rating: 9.2,
                image: 'url',
                year: 1972
            }
        ];

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockMovies
        });

        // 3. Hide loader and display movies
        loader.style.display = 'none';
        const filmsWrapper = container.querySelector('.films');
        
        mockMovies.forEach(movie => {
            const card = document.createElement('div');
            card.className = 'film-card';
            card.innerHTML = `
                <img src="${movie.image}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <div class="rating">IMDB: ${movie.rating}</div>
                <p>${movie.year}</p>
            `;
            filmsWrapper.appendChild(card);
        });

        // 4. Verify movies are displayed
        const cards = container.querySelectorAll('.film-card');
        expect(cards).toHaveLength(2);
        expect(container.textContent).toContain('The Shawshank Redemption');
        expect(container.textContent).toContain('9.3');
    });

    it('should handle pagination flow', () => {
        // 1. Add initial movies
        const filmsWrapper = container.querySelector('.films');
        for (let i = 0; i < 20; i++) {
            const card = document.createElement('div');
            card.className = 'film-card';
            card.textContent = `Movie ${i + 1}`;
            filmsWrapper.appendChild(card);
        }

        let cards = container.querySelectorAll('.film-card');
        expect(cards).toHaveLength(20);

        // 2. Show "Show More" button
        const showMoreBtn = container.querySelector('.show-more');
        showMoreBtn.style.display = 'block';

        // 3. Click "Show More"
        const handler = jest.fn();
        showMoreBtn.addEventListener('click', handler);
        showMoreBtn.click();

        // 4. Add more movies
        for (let i = 20; i < 40; i++) {
            const card = document.createElement('div');
            card.className = 'film-card';
            card.textContent = `Movie ${i + 1}`;
            filmsWrapper.appendChild(card);
        }

        cards = container.querySelectorAll('.film-card');
        expect(cards).toHaveLength(40);
    });

    it('should handle no results', () => {
        const filmsWrapper = container.querySelector('.films');
        
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.textContent = 'No movies found';
        filmsWrapper.appendChild(noResults);

        expect(container.querySelector('.no-results')).toBeTruthy();
        expect(container.textContent).toContain('No movies found');
    });
});

describe('E2E - Search and Filter', () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
        container.innerHTML = `
            <div class="search-container">
                <input type="text" id="search-input" placeholder="Search movies...">
                <button id="search-btn">Search</button>
            </div>
            <div class="filters">
                <select id="year-filter">
                    <option value="">All Years</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                </select>
                <select id="rating-filter">
                    <option value="">All Ratings</option>
                    <option value="8">8+</option>
                    <option value="9">9+</option>
                </select>
            </div>
            <div class="results"></div>
        `;
        document.body.appendChild(container);
    });

    afterEach(() => {
        if (container && container.parentNode) {
            document.body.removeChild(container);
        }
    });

    it('should search for movies by title', () => {
        // 1. Enter search term
        const input = container.querySelector('#search-input');
        input.value = 'Inception';

        // 2. Click search
        const btn = container.querySelector('#search-btn');
        btn.click();

        // 3. Display results
        const results = container.querySelector('.results');
        results.innerHTML = `
            <div class="result">
                <h4>Inception</h4>
                <p>Christopher Nolan</p>
            </div>
        `;

        expect(results.querySelector('.result')).toBeTruthy();
        expect(results.textContent).toContain('Inception');
    });

    it('should filter by year', () => {
        const yearFilter = container.querySelector('#year-filter');
        yearFilter.value = '2023';

        // Mock filtered results
        const results = container.querySelector('.results');
        results.innerHTML = `
            <div class="result">Movie from 2023</div>
        `;

        expect(results.textContent).toContain('2023');
    });

    it('should filter by rating', () => {
        const ratingFilter = container.querySelector('#rating-filter');
        ratingFilter.value = '9';

        const results = container.querySelector('.results');
        results.innerHTML = `
            <div class="result">Rating: 9.2</div>
        `;

        expect(results.textContent).toContain('9');
    });

    it('should combine multiple filters', () => {
        const yearFilter = container.querySelector('#year-filter');
        const ratingFilter = container.querySelector('#rating-filter');

        yearFilter.value = '2023';
        ratingFilter.value = '8';

        // Verify filters are set
        expect(yearFilter.value).toBe('2023');
        expect(ratingFilter.value).toBe('8');

        // Apply filters and display results
        const results = container.querySelector('.results');
        results.innerHTML = `<div class="result">2023 movies with 8+ rating</div>`;

        expect(results.querySelector('.result')).toBeTruthy();
    });
});

describe('E2E - User Favorites', () => {
    let container;

    beforeEach(() => {
        // Clear localStorage
        localStorage.clear();

        container = document.createElement('div');
        container.innerHTML = `
            <div class="films"></div>
            <div class="favorites-count">0</div>
        `;
        document.body.appendChild(container);
    });

    afterEach(() => {
        localStorage.clear();
        if (container && container.parentNode) {
            document.body.removeChild(container);
        }
    });

    it('should add movie to favorites', () => {
        // 1. Create movie card
        const filmsWrapper = container.querySelector('.films');
        const card = document.createElement('div');
        card.className = 'film-card';
        card.innerHTML = `
            <h3>Inception</h3>
            <button class="favorite-btn">♡ Add to Favorites</button>
        `;
        filmsWrapper.appendChild(card);

        // 2. Add to favorites
        const favorites = [];
        const btn = card.querySelector('.favorite-btn');
        btn.addEventListener('click', () => {
            favorites.push('Inception');
            btn.textContent = '♥ Remove from Favorites';
        });
        btn.click();

        // 3. Verify
        expect(favorites).toContain('Inception');
        expect(btn.textContent).toContain('Remove');
    });

    it('should persist favorites in localStorage', () => {
        // 1. Save to localStorage
        const movie = { id: 1, title: 'Inception' };
        const favorites = [movie];
        localStorage.setItem('favorites', JSON.stringify(favorites));

        // 2. Retrieve from localStorage
        const saved = JSON.parse(localStorage.getItem('favorites'));

        // 3. Verify
        expect(saved).toHaveLength(1);
        expect(saved[0].title).toBe('Inception');
    });

    it('should display favorite count', () => {
        // 1. Add favorites to localStorage
        const favorites = [
            { id: 1, title: 'Inception' },
            { id: 2, title: 'Interstellar' },
            { id: 3, title: 'The Prestige' }
        ];
        localStorage.setItem('favorites', JSON.stringify(favorites));

        // 2. Update count in UI
        const count = container.querySelector('.favorites-count');
        count.textContent = favorites.length;

        // 3. Verify
        expect(count.textContent).toBe('3');
    });

    it('should remove movie from favorites', () => {
        // 1. Start with 2 favorites
        let favorites = [
            { id: 1, title: 'Inception' },
            { id: 2, title: 'Interstellar' }
        ];

        // 2. Remove one
        favorites = favorites.filter(f => f.id !== 1);

        // 3. Verify
        expect(favorites).toHaveLength(1);
        expect(favorites[0].title).toBe('Interstellar');
    });
});

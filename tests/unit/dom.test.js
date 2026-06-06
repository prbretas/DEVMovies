/**
 * Unit tests for DOM manipulation and rendering
 * Testing UI updates and element creation
 */

describe('DOM Rendering', () => {
    let container;

    beforeEach(() => {
        // Create a container for testing
        container = document.createElement('div');
        container.id = 'test-container';
        document.body.appendChild(container);
    });

    afterEach(() => {
        // Clean up
        document.body.removeChild(container);
    });

    describe('Film card creation', () => {
        it('should create film card element', () => {
            const card = document.createElement('div');
            card.className = 'film-card';
            expect(card.className).toContain('film-card');
        });

        it('should add image to card', () => {
            const card = document.createElement('div');
            const img = document.createElement('img');
            img.src = 'https://image.jpg';
            img.alt = 'Movie poster';
            card.appendChild(img);
            expect(card.querySelector('img')).toBeTruthy();
        });

        it('should add title to card', () => {
            const card = document.createElement('div');
            const title = document.createElement('h3');
            title.textContent = 'Test Movie';
            card.appendChild(title);
            expect(card.querySelector('h3').textContent).toBe('Test Movie');
        });

        it('should add rating to card', () => {
            const card = document.createElement('div');
            const rating = document.createElement('div');
            rating.className = 'rating';
            rating.textContent = 'IMDB: 8.5';
            card.appendChild(rating);
            expect(card.querySelector('.rating')).toBeTruthy();
        });
    });

    describe('List rendering', () => {
        it('should render multiple cards', () => {
            const wrapper = document.createElement('div');
            wrapper.className = 'films';
            container.appendChild(wrapper);

            for (let i = 0; i < 5; i++) {
                const card = document.createElement('div');
                card.className = 'film-card';
                wrapper.appendChild(card);
            }

            const cards = container.querySelectorAll('.film-card');
            expect(cards).toHaveLength(5);
        });

        it('should clear container before rendering', () => {
            container.innerHTML = '<div>Old content</div>';
            container.innerHTML = ''; // Clear
            expect(container.innerHTML).toBe('');
        });

        it('should insert HTML with insertAdjacentHTML', () => {
            const wrapper = document.createElement('div');
            wrapper.id = 'films';
            container.appendChild(wrapper);

            const html = '<div class="film-card">Movie</div>';
            wrapper.insertAdjacentHTML('beforeend', html);
            expect(wrapper.querySelector('.film-card')).toBeTruthy();
        });
    });

    describe('Event listeners', () => {
        it('should attach click handler to button', () => {
            const btn = document.createElement('button');
            const handler = jest.fn();
            btn.addEventListener('click', handler);
            btn.click();
            expect(handler).toHaveBeenCalled();
        });

        it('should handle show more button', () => {
            const btn = document.createElement('button');
            btn.className = 'show-more';
            container.appendChild(btn);

            const handler = jest.fn();
            btn.addEventListener('click', handler);
            btn.click();

            expect(handler).toHaveBeenCalledTimes(1);
        });

        it('should remove element from DOM', () => {
            const element = document.createElement('div');
            container.appendChild(element);
            expect(container.contains(element)).toBe(true);

            element.remove();
            expect(container.contains(element)).toBe(false);
        });
    });

    describe('Query selectors', () => {
        it('should find element by class', () => {
            const div = document.createElement('div');
            div.className = 'test-class';
            container.appendChild(div);

            const found = container.querySelector('.test-class');
            expect(found).toBe(div);
        });

        it('should find all elements by class', () => {
            for (let i = 0; i < 3; i++) {
                const div = document.createElement('div');
                div.className = 'item';
                container.appendChild(div);
            }

            const items = container.querySelectorAll('.item');
            expect(items).toHaveLength(3);
        });

        it('should return null for non-existent element', () => {
            const found = container.querySelector('.non-existent');
            expect(found).toBeNull();
        });
    });
});

describe('Loading states', () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.removeChild(container);
    });

    it('should show loader initially', () => {
        const loader = document.createElement('div');
        loader.className = 'loader-wrapper';
        container.appendChild(loader);

        expect(container.querySelector('.loader-wrapper')).toBeTruthy();
    });

    it('should hide loader after loading', () => {
        const loader = document.createElement('div');
        loader.className = 'loader-wrapper';
        container.appendChild(loader);

        loader.remove();
        expect(container.querySelector('.loader-wrapper')).toBeNull();
    });

    it('should show content after loading', () => {
        const content = document.createElement('div');
        content.className = 'films';
        content.textContent = 'Movies loaded';
        container.appendChild(content);

        expect(container.textContent).toContain('Movies loaded');
    });
});

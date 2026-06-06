/**
 * Source file coverage tests
 * Import real frontend scripts to execute top-level code and improve coverage.
 */

describe('Frontend source coverage', () => {
    beforeEach(() => {
        jest.resetModules();
        fetch.mockClear();
        document.body.innerHTML = `
            <div class="films"></div>
            <div class="loader-wrapper"></div>
            <button class="show-more"></button>
            <iframe id="iframeFilme"></iframe>
            <iframe id="iframePlutoTV"></iframe>
            <iframe id="iframeCanal"></iframe>
        `;
    });

    it('should import scripts/api.js without throwing', async () => {
        fetch.mockResolvedValueOnce({
            json: async () => ({ success: true })
        });

        await expect(import('../../scripts/api.js')).resolves.toBeTruthy();
        expect(fetch).toHaveBeenCalled();
    });

    it('should import scripts/index.js and render films', async () => {
        fetch.mockResolvedValueOnce({
            json: async () => [
                {
                    title: 'Test Movie',
                    image: 'https://image.jpg',
                    year: 2024,
                    genre: 'Drama',
                    description: 'Test',
                    rating: 9
                }
            ]
        });

        const module = await import('../../scripts/index.js');
        expect(module.renderFilms).toBeDefined();
        module.renderFilms([
            {
                title: 'Test Movie',
                image: 'https://image.jpg',
                year: 2024,
                genre: 'Drama',
                description: 'Test',
                rating: 9
            }
        ]);

        expect(document.querySelectorAll('.film-card')).toHaveLength(1);
    });

    it('should import scripts/games.js and call game functions', () => {
        const games = require('../../scripts/games.js');
        expect(games.altGameLink).toBeDefined();
        expect(games.alterarLinkGame).toBeDefined();

        games.altGameLink();
        expect(document.getElementById('iframeFilme').getAttribute('src')).toBe(games.srcLinks[0]);

        games.alterarLinkGame(1);
        expect(document.getElementById('iframeFilme').getAttribute('src')).toBe(games.srcLinks[1]);
    });

    it('should import scripts/movies.js and call movie link function', () => {
        const movies = require('../../scripts/movies.js');
        expect(movies.alterarLinkFilme).toBeDefined();

        movies.alterarLinkFilme(1);
        expect(document.getElementById('iframeFilme').getAttribute('src')).toBe(movies.sourceVideos[1]);
    });

    it('should import scripts/series.js and call series link function', () => {
        const series = require('../../scripts/series.js');
        expect(series.alterarLinkFilme).toBeDefined();

        series.alterarLinkFilme(1);
        expect(document.getElementById('iframeFilme').getAttribute('src')).toBe(series.sourceVideos[1]);
    });

    it('should import scripts/animes.js and call anime link function', () => {
        const animes = require('../../scripts/animes.js');
        expect(animes.alterarLinkFilme).toBeDefined();

        animes.alterarLinkFilme(1);
        expect(document.getElementById('iframeFilme').getAttribute('src')).toBe(animes.sourceVideos[1]);
    });

    it('should import scripts/tvonline.js and call channel selectors', () => {
        const tvonline = require('../../scripts/tvonline.js');
        expect(tvonline.abrirPlutoTv).toBeDefined();
        expect(tvonline.selecionarCanal).toBeDefined();

        tvonline.abrirPlutoTv();
        expect(document.getElementById('iframePlutoTV').getAttribute('src')).toBe(tvonline.sourceVideos[0]);

        const iframeCanal = document.getElementById('iframeCanal');
        Object.defineProperty(iframeCanal, 'contentWindow', {
            value: { document: { readyState: 'complete' } },
            configurable: true
        });
        tvonline.selecionarCanal();
        expect(iframeCanal.getAttribute('src')).toBe(tvonline.sourceVideos[1]);
    });
});


module.exports = {
    testEnvironment: 'jsdom',
    collectCoverageFrom: [
        'scripts/**/*.js',
        '!scripts/**/*.test.js',
        '!node_modules/**'
    ],
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70
        }
    },
    testMatch: [
        '**/tests/**/*.test.js',
        '**/?(*.)+(spec|test).js'
    ],
    moduleFileExtensions: ['js'],
    transform: {
        '^.+\\.js$': 'babel-jest'
    },
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js']
};

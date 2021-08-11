const fs = require('fs');

const colors = JSON.parse(fs.readFileSync('./theme.json'));
module.exports = {
    purge: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
    mode: 'jit',
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors,
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};

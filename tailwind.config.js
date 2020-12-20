const elevation_umbra = 'rgba(0, 0, 0, 0.2)';
const elevation_penumbra = 'rgba(0, 0, 0, 0.14)';
const elevation_ambient = 'rgba(0, 0, 0, 0.12)';

module.exports = {
    purge: [],
    darkMode: 'media',
    theme: {
        fontFamily: {
            sans: ['Roboto']
        },
        extend: {
            colors: {
                main: {
                    dark: '#0e0e0e',
                    light: '#f5f5f5'
                },
                accent: {
                    dark: '#181818',
                    light: '#ffffff'
                },
                'primary': 'orange'
            },
            width: {
                '1/8': '12.5%',
                '2/8': '25%',
                '3/8': '37.5%',
                '4/8': '50%',
                '5/8': '62.5%',
                '6/8': '75%',
                '7/8': '87.5%'
            },
            boxShadow: {
                DEFAULT: `0 1px 5px ${elevation_umbra}, 0 2px 2px ${elevation_penumbra}, 0 3px 1px -2px ${elevation_ambient}`,
                md: `0 2px 4px -1px ${elevation_umbra}, 0 4px 5px ${elevation_penumbra}, 0 1px 10px ${elevation_ambient}`,
                lg: `0 3px 5px -1px ${elevation_umbra}, 0 6px 10px ${elevation_penumbra}, 0 1px 18px ${elevation_ambient}`,
                xl: `0 5px 5px -3px ${elevation_umbra}, 0 8px 10px 1px ${elevation_penumbra}, 0 3px 14px 2px ${elevation_ambient}`
            },
            zIndex: {
                '100': 100
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: [],
    purge: false
}
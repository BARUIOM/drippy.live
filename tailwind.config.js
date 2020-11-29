module.exports = {
    purge: [],
    darkMode: 'media',
    theme: {
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
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: [],
    purge: false
}
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#e7f7fe',
            main: '#e1f5fe',
            dark: '#9dabb1',
            contrastText: '#333',
        },
        secondary: {
            main: '#f4ff81',
            dark: '#aab25a',
            light: '#f6ff9a',
        },

        type: 'dark',
    },
    fontFamily: [
        '"Segoe UI"',
        '"Helvetica Neue"',
        '-apple-system',
        'BlinkMacSystemFont',
        'Roboto',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    typography: {
        // 中文字符和日文字符通常比较大，
        // 所以选用一个略小的 fontsize 会比较合适。
        fontSize: 16,
    },
    // spacing: [0, 4, 8, 16, 32, 64],
});

export default theme;

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#6B8E7B',
        },
        secondary: {
            main: '#D4A5A5',
        },
        background: {
            default: '#FDFBF7',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#2C3E2D',
            secondary: '#6B7B6E',
        },
    },
    typography: {
        fontFamily: '"Manrope", "Inter", "Roboto", sans-serif',
        h1: {
            fontWeight: 700,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                },
            },
        },
    },
});

export default theme;
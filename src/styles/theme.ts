import { cyan, grey, orange } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: cyan,
        error: orange,
        background: {
            default: grey[900],
        },
    },
    typography: {
        fontSize: 12,
    },
    overrides: {
        MuiFormHelperText: {
            marginDense: {
                marginTop: 2,
            },
        },
        MuiButton: {
            label: {
                textTransform: 'capitalize',
            },
        },
    },
});

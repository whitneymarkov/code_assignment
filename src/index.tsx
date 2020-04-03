import DateFnsUtils from '@date-io/date-fns';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'src/pages/app';
import { theme } from 'src/styles/theme';

const init = (
    <>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <App />
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    </>
);

ReactDOM.render(init, document.getElementById('root'));

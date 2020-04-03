import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useAppStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: {
            padding: theme.spacing(2),
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100vh',
            position: 'relative',
        },
        paper: {
            marginTop: theme.spacing(1),
            padding: theme.spacing(2),
        },
        content: {
            width: '100%',
            maxWidth: 500,
            display: 'flex',
            flexDirection: 'column',
        },
        buttons: {
            marginTop: theme.spacing(2),
            display: 'flex',
            justifyContent: 'flex-end',
            '& > *:not(last-child)': {
                marginRight: theme.spacing(1),
            },
        },
    }),
);

export { useAppStyles };

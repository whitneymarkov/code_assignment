import { Button, Grid, Paper, Typography } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { format, isFuture } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { NumberInput } from 'src/components/number-input/NumberInput';
import { cardTypes } from 'src/components/select-input/cards/cardTypes';
import { SelectInput } from 'src/components/select-input/SelectInput';
import { TextInput } from 'src/components/text-input/TextInput';
import { useAppStyles } from 'src/pages/appStyles';
import { validationUtils } from 'src/utils/validation-utils/ValidationUtils';

interface IField<T> {
    value: T;
    valid: boolean;
}

interface IExpiryDate {
    date: Date | null;
    hasBeenBlurred: boolean;
    valid: boolean;
    helperText: string | undefined;
}

const App = React.memo(function App() {
    const classes = useAppStyles();
    const [cardType, setCardType] = useState<string>('');
    const [cardHolder, setCardholder] = useState<IField<string>>({
        value: '',
        valid: false,
    });
    const [cardNumber, setCardNumber] = useState<IField<number>>({
        value: -1,
        valid: false,
    });
    const [cvc, setCvc] = useState<IField<number>>({
        value: -1,
        valid: false,
    });
    const [expiryDate, setExpiryDate] = useState<IExpiryDate>({
        date: null,
        hasBeenBlurred: false,
        valid: false,
        helperText: undefined,
    });

    const onSubmit = (e: React.FormEvent<HTMLDivElement>) => {
        e.preventDefault();
        console.log(`Card type: ${cardType}`);
        console.log(`Cardholder: ${cardHolder.value}`);
        console.log(`Card number: ${cardNumber.value}`);
        console.log(`CVC: ${cvc.value}`);
        console.log(
            `Expiry date: ${format(expiryDate.date as Date, 'MM/yyyy')}`,
        );
    };

    const onChangeCardType = (value: string) => {
        setCardType(value);
    };

    const onChangeCardHolderName = (value: string, valid: boolean) => {
        setCardholder({ value, valid });
    };

    const onChangeCardNumber = (value: number, valid: boolean) => {
        setCardNumber({ value, valid });
    };

    const onChangeCvc = (value: number, valid: boolean) => {
        setCvc({ value, valid });
    };

    const onChangeExpiryDate = (date: Date | null) => {
        setExpiryDate({
            ...expiryDate,
            date,
        });
    };

    /**
     * Set hasBeenChanged on expiry date onBlur
     */
    const onBlurExpiryDate = () => {
        if (!expiryDate.hasBeenBlurred) {
            setExpiryDate({
                ...expiryDate,
                hasBeenBlurred: true,
            });
        }
    };

    /**
     * Validate the expiry date when hasBeenBlurred or the date changes
     */
    useEffect(() => {
        let helperText = ' ';
        let valid = true;

        if (!!expiryDate.date && !isFuture(expiryDate.date)) {
            helperText = 'Invalid expiry date';
            valid = false;
        } else if (!expiryDate.date && expiryDate.hasBeenBlurred) {
            helperText = 'Expiry date is required';
            valid = false;
        }
        setExpiryDate({
            ...expiryDate,
            hasBeenBlurred: !valid,
            valid,
            helperText,
        });
    }, [expiryDate.date, expiryDate.hasBeenBlurred]);

    const formValid =
        cardType !== '' &&
        !!cardHolder.value &&
        cardHolder.valid &&
        !!cardNumber.value &&
        cardNumber.valid &&
        !!cvc.value &&
        cvc.valid &&
        !!expiryDate.date &&
        expiryDate.valid;

    return (
        <div className={classes.wrapper}>
            <div className={classes.content}>
                <Typography variant="h5" variantMapping={{ h5: 'h1' }}>
                    Payment Details
                </Typography>
                <Paper
                    className={classes.paper}
                    component="form"
                    onSubmit={onSubmit}
                    id="paymentForm"
                    role="form"
                >
                    <Grid container={true} spacing={2}>
                        <Grid item={true} xs={12}>
                            <SelectInput
                                value={cardType}
                                onChange={onChangeCardType}
                                options={cardTypes}
                                id="cardType"
                                label="Card type"
                                placeholder="Visa"
                            />
                        </Grid>
                        <Grid item={true} xs={12}>
                            <TextInput
                                value={cardHolder.value}
                                onChange={onChangeCardHolderName}
                                validation={
                                    validationUtils.validateCardholderName
                                }
                                id="cardholder"
                                label="Cardholder name"
                                placeholder="John Smith"
                            />
                        </Grid>
                        <Grid item={true} xs={12}>
                            <NumberInput
                                value={cardNumber.value}
                                onChange={onChangeCardNumber}
                                validation={validationUtils.validateCard}
                                limit={16}
                                id="cardNumber"
                                label="Card number"
                                placeholder="1029098726783910"
                            />
                        </Grid>
                        <Grid item={true} xs={6}>
                            <NumberInput
                                value={cvc.value}
                                onChange={onChangeCvc}
                                validation={validationUtils.validateCard}
                                limit={3}
                                id="cvc"
                                label="CVC"
                                placeholder="123"
                            />
                        </Grid>
                        <Grid item={true} xs={6}>
                            <KeyboardDatePicker
                                id="expiryDate"
                                openTo="month"
                                views={['month', 'year']}
                                label="Expiry date"
                                format="MM/yyyy"
                                placeholder="MM/YYYY"
                                minDateMessage="Invalid expiry date"
                                value={expiryDate.date}
                                onChange={onChangeExpiryDate}
                                fullWidth={true}
                                inputVariant="filled"
                                disablePast={true}
                                required={true}
                                clearable={true}
                                onBlur={onBlurExpiryDate}
                                error={!expiryDate.valid}
                                helperText={expiryDate.helperText}
                                InputLabelProps={{ shrink: true }}
                                margin="none"
                            />
                        </Grid>
                    </Grid>
                </Paper>
                <div className={classes.buttons}>
                    <Button
                        type="submit"
                        form="paymentForm"
                        disabled={!formValid}
                        role="button"
                        variant="contained"
                        color="primary"
                    >
                        Confirm
                    </Button>
                </div>
            </div>
        </div>
    );
});

export { App };

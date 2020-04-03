import { TextField } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import {
    IValidateCardholderParams,
    IValidation,
} from 'src/utils/validation-utils/ValidationUtils';

interface IProps {
    id: string;
    placeholder?: string;
    autoFocus?: boolean;
    value: string;
    label: string;
    onChange: (value: string, valid: boolean) => void;
    validation: (params: IValidateCardholderParams) => IValidation;
}

const TextInput = React.memo(function TextInput(props: IProps) {
    const { label, onChange, validation, autoFocus, placeholder, id } = props;

    const [value, setValue] = useState<string>(
        typeof props.value === 'string' ? props.value : '',
    );
    const [hasBeenChanged, setHasBeenChanged] = useState<boolean>(false);
    const [hasBeenBlurred, setHasBeenBlurred] = useState<boolean>(false);

    const { valid, helperText } = useMemo(
        () => validation({ value, hasBeenBlurred, hasBeenChanged }),
        [value, hasBeenBlurred, hasBeenChanged],
    );

    useEffect(() => {
        setValue(typeof props.value === 'string' ? props.value : '');
    }, [props.value]);

    useEffect(() => {
        if (valid && hasBeenChanged) {
            onChange(value, valid);
            setHasBeenChanged(false);
        }
    }, [value, valid, hasBeenChanged]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setHasBeenChanged(newValue.trim() !== props.value);
        setValue(newValue);
    };

    const handleBlur = () => {
        if (valid && hasBeenChanged) {
            onChange(value.trim(), valid);
            setHasBeenChanged(false);
        } else {
            setHasBeenBlurred(true);
        }
    };

    return (
        <TextField
            autoFocus={autoFocus}
            label={label}
            placeholder={placeholder}
            InputLabelProps={{ shrink: true }}
            value={value}
            error={!valid}
            variant="filled"
            type="text"
            fullWidth={true}
            id={id}
            required={true}
            helperText={helperText}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="none"
            role="textInput"
            aria-autocomplete="none"
            autoComplete="none"
        />
    );
});

export { TextInput };

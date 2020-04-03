import { TextField } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import {
    IValidateCardParams,
    IValidation,
} from 'src/utils/validation-utils/ValidationUtils';

interface IProps {
    id: string;
    placeholder?: string;
    autoFocus?: boolean;
    value: number;
    label: string;
    limit: number;
    onChange: (value: number, valid: boolean) => void;
    validation: (params: IValidateCardParams) => IValidation;
}

/**
 * Component to handle number values
 */
const NumberInput = React.memo(function TextInput(props: IProps) {
    const {
        label,
        onChange,
        validation,
        autoFocus,
        placeholder,
        id,
        limit,
    } = props;

    const [value, setValue] = useState<number>(
        typeof props.value === 'number' ? props.value : -1,
    );
    const [hasBeenChanged, setHasBeenChanged] = useState<boolean>(false);
    const [hasBeenBlurred, setHasBeenBlurred] = useState<boolean>(false);

    const { valid, helperText } = useMemo(
        () =>
            validation({ value, hasBeenBlurred, hasBeenChanged, limit, label }),
        [value, hasBeenBlurred, hasBeenChanged, limit, label],
    );

    useEffect(() => {
        setValue(typeof props.value === 'number' ? props.value : -1);
    }, [props.value]);

    useEffect(() => {
        if (valid && hasBeenChanged && value) {
            onChange(value, valid);
            setHasBeenChanged(false);
            setHasBeenBlurred(false);
        }
    }, [value, valid, hasBeenChanged, hasBeenBlurred]);

    /**
     * Update the value onChange
     * @param e
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numberVal = e.target.value;
        const newValue = numberVal.length > 0 ? parseInt(numberVal, 10) : -1;
        if (typeof newValue === 'number') {
            setHasBeenChanged(newValue !== props.value);
            setValue(newValue);
        }
    };

    /**
     * Updated hasBeenBlurred and hasBeenChanged onBlur
     */
    const handleBlur = () => {
        setHasBeenBlurred(true);
    };

    /**
     * Prevent the letter e, hyphens, ., and + from triggering onChange
     * @param e
     */
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (
            e.keyCode === 189 ||
            e.keyCode === 69 ||
            e.keyCode === 187 ||
            e.keyCode === 190
        ) {
            e.preventDefault();
        }
    };

    return (
        <TextField
            autoFocus={autoFocus}
            label={label}
            InputLabelProps={{ shrink: true }}
            placeholder={placeholder}
            value={value > -1 ? value : ''}
            error={!valid}
            variant="filled"
            type="number"
            margin="none"
            fullWidth={true}
            id={id}
            required={true}
            helperText={helperText}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            onBlur={handleBlur}
            role="textInput"
            aria-autocomplete="none"
            autoComplete="none"
        />
    );
});

export { NumberInput };

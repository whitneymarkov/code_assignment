import { MenuItem, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

export interface IOption {
    value: string;
    label: string;
}

interface IProps {
    id: string;
    placeholder?: string;
    autoFocus?: boolean;
    value: string;
    options: IOption[];
    label: string;
    onChange: (value: string) => void;
}

const SelectInput = React.memo(function SelectInput(props: IProps) {
    const { label, onChange, autoFocus, placeholder, id, options } = props;

    const [value, setValue] = useState<string>(
        typeof props.value === 'string' ? props.value : '',
    );
    const [hasBeenFocused, setHasBeenFocused] = useState<boolean>(false);

    useEffect(() => {
        setValue(typeof props.value === 'string' ? props.value : '');
    }, [props.value]);

    useEffect(() => {
        if (value !== '') {
            onChange(value);
            setHasBeenFocused(false);
        }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
    };

    const handleFocus = () => {
        setHasBeenFocused(true);
    };

    const showRequiredError = value === '' && hasBeenFocused;
    return (
        <TextField
            autoFocus={autoFocus}
            label={label}
            placeholder={placeholder}
            InputLabelProps={{ shrink: true }}
            value={value}
            error={showRequiredError}
            variant="filled"
            type="select"
            select={true}
            fullWidth={true}
            id={id}
            required={true}
            helperText={showRequiredError ? `${label} is required` : ' '}
            onChange={handleChange}
            onFocus={handleFocus}
            margin="none"
            role="SelectInput"
            aria-autocomplete="none"
            autoComplete="none"
        >
            {options.map((option, index) => {
                return (
                    <MenuItem key={index} value={option.value}>
                        {option.label}
                    </MenuItem>
                );
            })}
        </TextField>
    );
});

export { SelectInput };

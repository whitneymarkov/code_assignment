export interface IValidation {
    valid: boolean;
    helperText: string;
}

export interface IValidateCardholderParams {
    value: string;
    hasBeenChanged: boolean;
    hasBeenBlurred: boolean;
}

export interface IValidateCardParams {
    value: number;
    hasBeenChanged: boolean;
    hasBeenBlurred: boolean;
    limit: number;
    label: string;
}

/**
 * Tests if cardholder name exists and contains special characters or digits.
 * Returns validity and appropriate help text
 *
 * @param {IValidateCardholderParams} props
 * @returns {IValidation}
 */
function validateCardholderName(props: IValidateCardholderParams): IValidation {
    const { value, hasBeenBlurred, hasBeenChanged } = props;
    const re = /[^a-zA-Z ]/g;
    let valid = !re.test(value);

    let helperText = valid ? ' ' : 'Contains numbers or special characters';

    if (value.length === 0 && (hasBeenChanged || hasBeenBlurred)) {
        valid = false;
        helperText = 'Cardholder name is required';
    } else if (value.length < 5 && hasBeenChanged) {
        valid = false;
        helperText = 'Minimum 5 characters';
    }
    return {
        valid,
        helperText,
    };
}

/**
 * Tests if card number contains exactly 16 digits
 *
 * @param {IValidateCardParams} props
 * @returns {IValidation}
 */
function validateCard(props: IValidateCardParams): IValidation {
    const { value, hasBeenBlurred, hasBeenChanged, limit, label } = props;
    let helperText = ' ';
    let valid = true;
    if (value === -1 && (hasBeenChanged || hasBeenBlurred)) {
        valid = false;
        helperText = `${label} is required`;
    } else if (value > -1) {
        const length = value.toString().length;

        if (length !== limit) {
            valid = false;
            helperText = `Requires ${limit} digits`;
        }
    }
    return {
        valid,
        helperText,
    };
}

const validationUtils = {
    validateCardholderName,
    validateCard,
};

export { validationUtils };

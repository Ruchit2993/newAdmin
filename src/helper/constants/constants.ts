export const CONSTANTS = {
    VALIDATION: {
        FIELD_REQUIRED: (field: string) => `${field} is required`,
        INVALID_FIELD_VALUE: (field: string) => `Invalid value for ${field}`,
        INVALID_EMAIL: 'Invalid email format',
        PASSWORD_MIN_LENGTH: (min: number) => `Password must be at least ${min} characters long`,
        PASSWORD_MISMATCH: 'Passwords do not match',
    }
};

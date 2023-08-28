"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (item, schema) => {
    let valid = true;
    const { error } = schema.validate(item);
    if (error) {
        const errors = error.details.map(({ message }) => message);
        valid = false;
        throw new Error(JSON.stringify({
            errors
        }));
    }
    return valid;
};
exports.validate = validate;

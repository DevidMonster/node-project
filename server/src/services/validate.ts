import { Schema } from "joi";

export const validate = (item: Record<string, any>, schema: Schema): boolean => {
    let valid = true;
    const { error } = schema.validate(item)

    if(error) {
        const errors = error.details.map(({message}) => message)
        valid = false; 
        throw new Error(JSON.stringify({ 
            errors
        }))
    }

    return valid
}
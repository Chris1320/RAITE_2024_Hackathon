
const emptyRegex = /^\s*$/;

export const isEmpty = (value) => {
    return emptyRegex.test(value);
}
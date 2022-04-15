export const validationNumber = (number) => {
    const validation = isNaN(parseFloat(number)) ? false : true;

    return validation;
}
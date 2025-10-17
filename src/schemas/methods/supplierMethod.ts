import * as yup from 'yup';

yup.addMethod(yup.string, 'isValidTaxId', function (this: yup.StringSchema) {
  return this.test(
    'isValidTaxId',
    'Invalid tax identification number',
    (value) => {
      if (!value || value.length !== 13 || !/^\d{13}$/.test(value))
        return false;
      const digits = value.split('').map((v) => parseInt(v, 10));
      let sum = 0;
      for (let i = 0; i < 12; i++) {
        sum += digits[i] * (13 - i);
      }
      const checkDigit = (11 - (sum % 11)) % 10;
      return digits[12] === checkDigit;
    },
  );
});

declare module 'yup' {
  interface StringSchema {
    isValidTaxId(message: string): StringSchema;
  }
}

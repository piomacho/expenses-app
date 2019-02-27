export const validateFloatNumber = (inputNumber: string) => {
  return inputNumber.match(/^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/g);
};

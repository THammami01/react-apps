export const getFirstNChars = (str, nbChars) => {
  return str.length <= nbChars ? str : str.substring(0, nbChars) + "..";
};

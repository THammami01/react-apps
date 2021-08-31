export const getFirstNChars = (str, nbChars) => {
  return str.length <= nbChars ? str : str.substring(0, nbChars) + "..";
};

export const getStatusColor = (status) => {
  switch (status) {
    case "Acceptée":
      return "green";
    case "Réfusée":
      return "red";
    case "En cours de traitement":
    default:
      return "cyan";
  }
};

export const noFieldIsEmpty = (obj) => {
  return Object.values(obj).every((value) => value !== "");
};

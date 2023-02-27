export enum Convertion {
  DECIMAL = "DECIMAL",
  BINARY = "BINARY",
  OCTAL = "OCTAL",
  HEX = "HEX",
}

const baseMap = {
  DECIMAL: 10,
  BINARY: 2,
  OCTAL: 8,
  HEX: 16,
};

const hexMap: any = {
  10: "A",
  11: "B",
  12: "C",
  13: "D",
  14: "E",
  15: "F",
};

const revHexMap: any = {
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15,
};

export const decimalConverter = (value: number, convertTo: Convertion) => {
  const base = baseMap[convertTo];

  let divident: number = value;
  let converted = "";
  let rem = 1;

  while (divident > 1) {
    rem = Math.floor(divident % base);
    divident = Math.floor(divident / base);

    if (base === 16) {
      converted = (rem >= 10 ? hexMap[rem] : rem) + converted;
    } else {
      converted = rem + converted;
    }
  }

  if (divident > 0) {
    if (base === 16) {
      converted = (divident >= 10 ? hexMap[divident] : divident) + converted;
    } else {
      converted = divident + converted;
    }
  }

  return base === 16 ? converted : parseInt(converted);
};

export const convert = (
  value: number | string,
  from: Convertion,
  convertTo: Convertion
) => {
  const base = baseMap[from];
  let converted = 0;
  let safeVal = value.toString();

  const length = safeVal.length - 1;
  for (let i = length; i >= 0; i--) {
    const currVal = safeVal.split("")[length - i];
    converted +=
      parseInt(
        base === 16 && currVal in revHexMap ? revHexMap[currVal] : currVal
      ) * Math.pow(base, i);
  }
  if (convertTo === Convertion.DECIMAL) {
    if (base === 16 && value in revHexMap) {
      return revHexMap[value];
    } else {
      return converted;
    }
  } else {
    return decimalConverter(converted, convertTo);
  }
};

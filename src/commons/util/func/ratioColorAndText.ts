export const ratioColor = (number: any) => {
  return Number(number) >= 0 ? "#ff1d40" : "#0080ff";
};

export const ratioText = (number: any) => {
  if (String(number) === "NaN") {
    return "0%";
  }
  return Number(number) >= 0
    ? `+${number.toFixed(2)}%`
    : `${number.toFixed(2)}%`;
};

export const ratioBgColor = (number: any) => {
  return Number(number) >= 0 ? "#FFE8EB" : "#E4F2FF";
};

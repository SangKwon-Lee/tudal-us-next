export function dividendChangeKr(string: any) {
  if (string === "quarterly") {
    return "분기";
  } else if (string === "semi-annual") {
    return "반기";
  } else if (string === "annual") {
    return "연간";
  } else if (string === "irregular") {
    return "불규칙";
  } else if (string === "unspecified") {
    return "불특정";
  } else if (string === "blank") {
    return "불특정";
  } else if (string === "monthly") {
    return "매월";
  } else if (string === "final") {
    return "최종배당";
  } else if (string === "interim") {
    return "중간배당";
  } else {
    return "불특정";
  }
}

// * 회원가입시 유저의 핸드폰 통신사를 number로 변경
export const isPhone = (phone: string) => {
  if (phone === "") {
    return "알뜰폰";
  } else if (phone === "04") {
    return "SKT알뜰폰";
  } else if (phone === "05") {
    return "KT알뜰폰";
  } else if (phone === "06") {
    return "LG U+알뜰폰";
  } else {
    return "알뜰폰";
  }
};

export const isFrugalPhone = (phone: string) => {
  if (phone === "04" || phone === "05" || phone === "06") {
    return true;
  } else {
    return false;
  }
};

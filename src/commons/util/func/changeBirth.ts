// * 주민번호 앞자리를 94, 02으로 입력할 경우 1994, 2002로 바꿔주는 함수
export const changeBirth = (birth: string) => {
  if (birth.slice(0, 1) !== "0") {
    return "19" + birth;
  } else {
    return "20" + birth;
  }
};

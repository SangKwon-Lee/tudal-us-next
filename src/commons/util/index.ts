export const StartPoint = (stoploss: number, target_second: number) => {
  return Number(stoploss) - (Number(target_second) - Number(stoploss)) / 3 / 2;
};
export const EndPoint = (target_second: number, stoploss: number) => {
  return (
    Number(target_second) + (Number(target_second) - Number(stoploss)) / 3 / 2
  );
};
export const GradienWidthFunc = (
  price: number,
  stoploss: number,
  target_first: number,
  target_second: number,
  recommend_price: number
) => {
  let GradientWidth = 0;
  const startPoint =
    Number(stoploss) - (Number(target_second) - Number(stoploss)) / 3 / 2;
  const endPoint =
    Number(target_second) + (Number(target_second) - Number(stoploss)) / 3 / 2;
  if (Number(price) < Number(stoploss)) {
    let b =
      ((Number(price) - Number(stoploss)) /
        (Number(stoploss) - Number(startPoint))) *
      100;
    GradientWidth = b / 4 - 25;
  } else if (Number(price) > Number(target_second)) {
    let b =
      ((Number(price) - Number(target_second)) /
        (Number(endPoint) - Number(target_second))) *
      100;
    GradientWidth = b / 4 + 50;
  } else if (
    Number(price) < Number(recommend_price) &&
    Number(price) > Number(stoploss)
  ) {
    // *손절가 ~ 매수가
    let b =
      ((Number(price) - Number(recommend_price)) /
        (Number(recommend_price) - Number(stoploss))) *
      100;
    GradientWidth = b / 4;
  } else if (
    Number(price) > Number(recommend_price) &&
    Number(price) < Number(target_first)
  ) {
    // *매수가 ~ 1차목표
    let b =
      ((Number(price) - Number(recommend_price)) /
        (Number(target_first) - Number(recommend_price))) *
      100;
    GradientWidth = b / 4;
  } else if (
    Number(price) > Number(target_first) &&
    Number(price) < Number(target_second)
  ) {
    // *1차목표 ~ 2차목표
    let b =
      ((Number(price) - Number(target_first)) /
        (Number(target_second) - Number(target_first))) *
      100;
    GradientWidth = b / 4 + 25;
  }

  if (GradientWidth > 61) {
    GradientWidth = 62;
  } else if (GradientWidth < -25) {
    GradientWidth = -25;
  }
  return GradientWidth;
};

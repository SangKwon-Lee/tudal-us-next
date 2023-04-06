export function indexText(string: any) {
  if (string === "S&P500") {
    return "미국 주식시장에 상장된 500개 대형기업의 주가지수입니다";
  } else if (string === "나스닥종합") {
    return "나스닥 증권거래소에 상장된 3,000개 가량 기업의 주가지수입니다";
  } else if (string === "다우존스") {
    return "산업평균지수 : 미국의 증권거래소에 상장된 30개의 우량기업의 주가지수입니다";
  } else {
    return "미국 주식시장에 상장된 기업들 중 시가총액 기준 1,001위 ~ 3,000위인 기업의 주가지수입니다";
  }
}

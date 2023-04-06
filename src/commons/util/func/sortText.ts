export const SortText = (sort: string | undefined, isFavorite?: any) => {
  if (isFavorite && sort === "최근 변화율") {
    return "그때 샀더라면";
  } else if (isFavorite && sort === "AI 추천") {
    return "5일 내 목표 수익률";
  }
  if (sort === "AI 추천") {
    return "5일 내 목표 수익률";
  } else if (sort === "성장성") {
    return "매출액 증가율";
  } else if (sort === "안정성") {
    return "자기자본비율";
  } else if (sort === "영업이익") {
    return "영업이익률";
  } else if (sort === "최근 변화율") {
    return "최근 변화율";
  }
};

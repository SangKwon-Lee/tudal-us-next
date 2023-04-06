export interface StockData {
  after_max2: never[];
  after_mean: never[];
  after_min2: never[];
  symbol: string;
  balance_Q: {
    fiscalQuarter: number;
    fiscalYear: number;
    총부채: number;
    총자기자본: number;
    총자산: number;
  }[];
  balance_Y: {
    fiscalYear: number;
    총부채: number;
    총자기자본: number;
    총자산: number;
  }[];
  company: string;
  company_kor: string;
  dividend: {
    amount: number;
    dividendYield: number;
    frequency: number;
  }[];
  nextdividend: string;
  income_Q: {
    fiscalQuarter: number;
    fiscalYear: number;
    영업이익: number;
    총매출: number;
  }[];
  income_Y: { fiscalYear: number; 영업이익: number; 총매출: number }[];
  logo: string;
  peer: {
    companyName_kor: string;
    symbol: string;
    url: string;
    changePerecent: number;
    price: number;
    close: number;
  }[];
  tag_kor: string;
  price: { date: string; close: number }[];
  stats: {
    marketcap: number;
    peRatio: number;
    sharesOutstanding: number;
    ttmDividendRate: number;
    ttmEPS: number;
  }[];
  pricenow: string;
  week52high: number;
  week52low: number;
  change: number;
  changePercent: number;
  description: string;
  after_weight_mean: number;
}

export interface IndexData {
  stockindex: string;
  close: [
    {
      ChangePercent: number;
      Close: number;
      Data: string;
    }
  ];
}

export interface CosData {
  cos: {
    afterrate: string;
    cos: number;
    end_date: string;
    start_date: string;
  }[];
  stockIndex: string;
}

export interface StockRec {
  date: string;
  three_picks: {
    companyName_kor: string;
    url: string;
    recommend_price: number;
    stoploss: number;
    symbol: string;
    tag_kor: string;
    target_first: number;
    target_second: number;
    changePercent: number;
    price: number;
    weight_mean: number;
    companyName: string;
  }[];
}

export interface StockTheme {
  month3AvgChangePercent: number;
  name: string;
  theme: string;
  theme_code: string;
  viewCount: number;
  tags: string;
  description: string;
  weightmax_avg: number;
  url: string;
  isMain?: number;
  day5ChangePercent: number;
}

export interface DetailData {
  holdings: {
    symbol: string;
    marketcap: number;
    month3ChangePercent: number;
    weight_max: number;
    url: string;
    tag_kor: string;
    companyName_kor: string;
    day5ChangePercent: number;
    stability_rate: number;
    operating_margin: number;
    growth_rate: number;
    price: number;
    changePercent: number;
    recommend_price: number;
    stoploss: number;
    target_first: number;
    target_second: number;
    weight_mean: number;
    companyName: string;
  }[];
  theme_info: {
    holdings: string;
    name: string;
    theme: string;
    month3AvgChangePercent: number;
    viewcount: number;
    theme_code: string;
    description: string;
    tags: string;
    url: string;
    long_description?: string;
  }[];
}

export interface PastData {
  close: {
    date: string;
    close: number;
  }[];
  day5changepercent: number;
  day20changepercent: number;
}

export interface StockBest {
  companyName: string;
  companyName_kor: string;
  max_changepercent: number;
  max_price: number;
  recommendDate: string;
  recommend_price: number;
  symbol: string;
  tag_kor: string;
  url: string;
}

export interface PredictionData {
  minPrice: number;
  maxPrice: number;
  graphMax: number;
  graphMin: number;
  lastPrice: number;
  weightAverage: number;
}

export interface PastStockBest {
  date: string;
  picks: {
    companyName: string;
    companyName_kor: string;
    high_changerate: number;
    high_price: number;
    recommendDate: string;
    recommend_price: number;
    symbol: string;
    tag_kor: string;
    url: string;
    weight_max: number;
    highest_price: number;
    highest_changerate: number;
    target_first: number;
    target_second: number;
    stoploss: number;
    price: number;
    changePercent: number;
  }[];
}

export interface PastStockBestPicks {
  companyName: string;
  companyName_kor: string;
  high_changerate: number;
  high_price: number;
  recommendDate: string;
  recommend_price: number;
  symbol: string;
  tag_kor: string;
  url: string;
  highest_changerate: number;
  highest_price: number;
  weight_max: number;
  target_first: number;
  target_second: number;
  stoploss: number;
  price: number;
  changePercent: number;
}

export interface ThemeSearch {
  month3AvgChangePercent: number;
  name: string;
  theme: string;
  theme_code: string;
  viewCount: number;
  tags: string;
  url: string;
  description: string;
  weightmax_avg: number;
}

export interface StockSearchResult {
  changePercent: number;
  companyName: string;
  companyName_kor: string;
  description: number;
  month3AvgChangePercent: number;
  name: number;
  symbol: string;
  tag_kor: string;
  tags: number;
  theme_code: number;
  theme_url: number;
  url: string;
  price: number;
}

export interface ThemeSearchResult {
  changePercent: number;
  companyName: number;
  companyName_kor: number;
  description: string;
  month3AvgChangePercent: number;
  name: string;
  symbol: number;
  tag_kor: number;
  tags: string;
  theme_code: string;
  theme_url: string;
  url: number;
}

export interface TopData {
  companyName: string;
  companyName_kor: string;
  day5ChangePercent: number;
  symbol: string;
  url: string;
  price: number;
  changePercent: number;
}

export interface MyFavorites {
  created_at: string;
  id: number;
  symbol: string;
  updated_at: string;
  userId: number;
  price: number;
}

export interface MyFavoriteStocks {
  companyName_kor: string;
  url: string;
  recommend_price: number;
  stoploss: number;
  symbol: string;
  tag_kor: string;
  target_first: number;
  target_second: number;
  changePercent: number;
  price: number;
  weight_mean: number;
  companyName: string;
  weight_max: number;
}

export interface StockDetail {
  after_max2: [];
  after_mean: [];
  after_min2: [];
  symbol: string;
  balance_Q: [
    {
      fiscalQuarter: number;
      fiscalYear: number;
      총부채: number;
      총자기자본: number;
      총자산: number;
    }
  ];
  balance_Y: [
    { fiscalYear: number; 총부채: number; 총자기자본: number; 총자산: number }
  ];
  company: string;
  company_kor: string;
  description: string;
  nextdividend: string;
  dividend: {
    amount: number;
    dividendYield: number;
    frequency: number;
  }[];
  income_Q: [
    {
      fiscalQuarter: number;
      fiscalYear: number;
      영업이익: number;
      총매출: number;
    }
  ];
  income_Y: [
    {
      fiscalYear: number;
      영업이익: number;
      총매출: number;
    }
  ];
  logo: string;
  peer: [
    {
      companyName_kor: string;
      symbol: string;
      url: string;
      changePerecent: number;
      price: number;
      close: number;
    }
  ];
  tag_kor: string;
  price: [
    {
      date: string;
      close: number;
    }
  ];
  pricenow: string;
  stats: [
    {
      marketcap: number;
      peRatio: number;
      sharesOutstanding: number;
      ttmDividendRate: number;
      ttmEPS: number;
    }
  ];
  week52high: number;
  week52low: number;
  changePercent: number;
  change: number;
  after_weight_mean: number;
}

export interface StockPastData {
  close: {
    date: string;
    close: number;
  }[];
  day5changepercent: number;
  day20changepercent: number;
}

export interface Alerts {
  change_percent: number;
  contents: string;
  msg_type: string;
  price: number;
  recommend_date: string;
  short_contents: string | number;
  symbol: string;
  title: string;
  updated_at: string;
  companyName_kor: string | number;
  tags: any;
  link: string;
}

export interface IStockRecommend {
  data: {
    bestPick: StockBest[];
  };
}

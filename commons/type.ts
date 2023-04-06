import {
  Alerts,
  CosData,
  DetailData,
  PastStockBest,
  StockBest,
  StockDetail,
  StockRec,
  StockSearchResult,
  ThemeSearch,
  ThemeSearchResult,
  TopData,
} from "../src/commons/util/type/type";

export interface USAQuotesSProps {
  stockData: StockDetail;
  pastDate: {
    start_date: string;
    end_date: string;
    index: number;
  };
  cosData: CosData;
  indexTimeLabel: string[];
  indexChartData: number[];
  indexWeightChart: number[];
  indexMaxChartData: number[];
  indexMinChartData: number[];
  predictionData: {
    minPrice: 0;
    maxPrice: 0;
    graphMax: 0;
    graphMin: 0;
    lastPrice: 0;
    weightAverage: 0;
  };
  BarYLabel: string[];
  BarIncomeY: {
    순이익: never[];
    영업이익: never[];
    총매출: never[];
  };
  BarBalanceY: {
    총자산: never[];
    총부채: never[];
    총자기자본: never[];
  };
  BarQLabel: string[];
  BarIncomeQ: {
    순이익: never[];
    영업이익: never[];
    총매출: never[];
  };
  BarBalanceQ: {
    총자산: never[];
    총부채: never[];
    총자기자본: never[];
  };
}

export interface ThemePageProps {
  detailData: DetailData;
  mapData: [];
}

export interface StockBestPageProps {
  stockBest: StockBest[];
}

export interface SearchPageProps {
  topData: TopData[];
  themeData: ThemeSearch[];
  themeResult: ThemeSearchResult[];
  stockResult: StockSearchResult[];
  searchResult: SearchResult;
}

export interface HomePageProps {
  stockRec: StockRec;
  stockBest: StockBest[];
}

export interface SearchResult {
  count: number;
  list: {
    compName: string;
    compNameKR: string;
    jnilClose: number;
    price: number;
    ratio: number;
    symbol: string;
    tagKR: string;
    url: string;
  }[];
}

import { StockData } from "../type/type";

export const MakeBarIncomeQData = (stock: StockData) => {
  let incomeQ = stock.income_Q;
  let newIncomeQ = incomeQ.map((data) => {
    let graqh = { date: "", 순수익: 0, 매출액: 0 };
    graqh.date = String(data.fiscalYear) + "-" + String(data.fiscalQuarter);
    graqh.순수익 = data.영업이익;
    graqh.매출액 = data.총매출;
    return graqh;
  });
  return newIncomeQ;
};

export const MakeBarIncomeYData = (stock: StockData) => {
  let incomeY = stock.income_Y;
  let newIncomoY = incomeY.map((data) => {
    let graqh = { date: "", 순수익: 0, 매출액: 0 };
    graqh.date = String(data.fiscalYear);
    graqh.순수익 = data.영업이익;
    graqh.매출액 = data.총매출;
    return graqh;
  });
  return newIncomoY;
};

export const MakeBarBalanceQData = (stock: StockData) => {
  let banlacnceQ = stock.balance_Q;
  let newBalanceQ = banlacnceQ.map((data) => {
    let graph = { date: "", 자본: 0, 부채: 0, 자산: 0 };
    graph.date = String(data.fiscalYear) + "-" + String(data.fiscalQuarter);
    graph.자본 = data.총자기자본;
    graph.부채 = data.총부채;
    graph.자산 = data.총자산;
    return graph;
  });
  return newBalanceQ;
};

export const MakeBarBalanceYData = (stock: StockData) => {
  let banlacnceY = stock.balance_Y;
  let newBalanceY = banlacnceY.map((data) => {
    let graph = { date: "", 자본: 0, 부채: 0, 자산: 0 };
    graph.date = String(data.fiscalYear);
    graph.자본 = data.총자기자본;
    graph.부채 = data.총부채;
    graph.자산 = data.총자산;
    return graph;
  });
  return newBalanceY;
};

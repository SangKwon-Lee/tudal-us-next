import { useState } from "react";
import { useEffect } from "react";
import StockIndexPresenter from "./StockIndexPresenter";
import { CosData, IndexData } from "../../commons/util/type/type";
import _ from "lodash";
import { apiServer } from "../../commons/axios/axios";

const StockIndexContainer = () => {
  // * 지수 데이터
  const [indexData, setIndexData] = useState<IndexData>({
    stockindex: "",
    close: [
      {
        ChangePercent: 0,
        Close: 0,
        Data: "",
      },
    ],
  });

  // * 과거 데이터
  const [pastData, setPastData] = useState({
    close: [
      {
        date: "",
        close: 0,
      },
    ],
    day5changepercent: 0,
    day20changepercent: 0,
  });

  // * 지수 과거 데이터 날짜
  const [cosData, setCosData] = useState<CosData>({
    cos: [
      {
        afterrate: "",
        cos: 0,
        end_date: "20200101",
        start_date: "20200101",
      },
    ],
    stockIndex: "",
  });

  // * 예측 최저, 최대, 평균값
  const [predictionData, setPredictionData] = useState({
    minPrice: 0,
    maxPrice: 0,
    graphMax: 0,
    graphMin: 0,
    lastPrice: 0,
    weightAverage: 0,
  });

  // * Sort
  const [sort, setSort] = useState({ value: "sp500", name: "S&P500" });

  // * 과거 데이터 번호
  const [pastNum, setPastNum] = useState("01");

  // * 과거 데이터 날짜 저장
  const [pastDate, setPastDate] = useState({
    start_date: "",
    end_date: "",
    index: 0,
  });

  // * 지수 그래프 모음
  const [indexTimeLabel, setIndexTimeLabel] = useState<string[]>([]);
  const [indexChartData, setIndexChartData] = useState<number[]>([]);
  const [indexWeightChart, setIndexWeightChart] = useState<number[]>([]);
  const [indexMaxChartData, setIndexMaxChartData] = useState<number[]>([]);
  const [indexMinChartData, setIndexMinChartData] = useState<number[]>([]);

  //* 과거 지수 그래프 모음
  const [pastTimeLabel, setPastTimeLabel] = useState<string[]>([]);
  const [pastChartData, setPastChartData] = useState<number[]>([]);
  const [pastChartAfter, setPastChartAfter] = useState<number[]>([]);

  // * 지수 데이터 가져오는 함수
  const getIndexData = async () => {
    try {
      const { data, status } = await apiServer.get(
        `/tudalus/stock/index/${sort.value}`
      );
      const { data: cosData, status: cosStatus } = await apiServer.get(
        `/tudalus/stock/index/similarity/cos/${sort.value}`
      );
      if (status === 200 && data.data) {
        const timeLabel = [
          ...data.data.close.map((data: any) => data.Date),
          ...data.data.after_min2.map((data: any) => data.date),
        ];
        setIndexTimeLabel(timeLabel);
        const ChartDatasets = [
          ...data.data.close.map((data: any) => data.Close),
        ];
        setIndexChartData([...ChartDatasets, null, null, null, null, null]);
        setIndexWeightChart([
          ...new Array(59).fill(null),
          ChartDatasets[ChartDatasets.length - 1],
          ...data.data.after_weight_mean.map(
            (data: any) => data.after_weight_mean
          ),
        ]);
        setIndexMaxChartData([
          ...new Array(59).fill(null),
          ChartDatasets[ChartDatasets.length - 1],
          ...data.data.after_max2.map((data: any) => data.after_max2),
        ]);
        setIndexMinChartData([
          ...new Array(59).fill(null),
          ChartDatasets[ChartDatasets.length - 1],
          ...data.data.after_min2.map((data: any) => data.after_min2),
        ]);
        setIndexData(data.data);
        setPredictionData({
          ...predictionData,
          maxPrice: Number(
            _.max(data.data.after_max2.map((data: any) => data.after_max2))
          ),
          minPrice: Number(
            _.min(data.data.after_min2.map((data: any) => data.after_min2))
          ),
          graphMax: _.max([
            ...data.data.after_max2.map((data: any) => data.after_max2),
            ...ChartDatasets,
          ]),
          graphMin: _.min([
            ...data.data.after_min2.map((data: any) => data.after_min2),
            ...ChartDatasets,
          ]),
          lastPrice: ChartDatasets[ChartDatasets.length - 1],
          weightAverage: Number(
            _.mean([
              ...data.data.after_weight_mean.map(
                (data: any) => data.after_weight_mean
              ),
            ]).toFixed(2)
          ),
        });
      }
      if (cosStatus === 200 && cosData.data) {
        setPastDate({
          ...pastDate,
          start_date: cosData.data.cos[0].start_date,
          end_date: cosData.data.cos[0].end_date,
        });
        setCosData(cosData.data);
      }
    } catch (e) {}
  };

  // * 지수 과거 데이터 가져오는 함수
  const getPastIndexData = async () => {
    try {
      const { data, status } = await apiServer.get(
        `/tudalus/chart/index?indexName=${
          sort.value
        }&startDate=${pastDate.start_date.replaceAll("-", "")}`
      );
      if (status === 200 && data.data) {
        setPastData(data.data);
        setPastTimeLabel([...data.data.close.map((data: any) => data.Date)]);
        setPastChartData([
          ...data.data.close.slice(0, 60).map((data: any) => data.Close),
        ]);
        setPastChartAfter([
          ...new Array(59).fill(null),
          ...data.data.close.slice(59, 65).map((data: any) => data.Close),
        ]);
      }
    } catch (e) {}
  };

  // * 정렬
  const handleSortBtn = (e: any) => {
    setSort({ ...sort, name: e.target.id, value: e.target.value });
  };

  // * 과거 데이터 번호
  const handlePastNum = (e: any) => {
    setPastNum(e.target.value);
  };
  //  * 과거 데이터 날짜 설정
  const handlePastDate = (start: string, end: string, index: number) => {
    setPastDate({
      ...pastDate,
      start_date: start,
      end_date: end,
      index,
    });
  };

  useEffect(() => {
    getIndexData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  useEffect(() => {
    if (pastDate.start_date) {
      getPastIndexData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pastDate]);

  return (
    <StockIndexPresenter
      sort={sort}
      cosData={cosData}
      pastNum={pastNum}
      pastData={pastData}
      pastDate={pastDate}
      indexData={indexData}
      pastChartData={pastChartData}
      pastTimeLabel={pastTimeLabel}
      handleSortBtn={handleSortBtn}
      handlePastNum={handlePastNum}
      pastChartAfter={pastChartAfter}
      predictionData={predictionData}
      handlePastDate={handlePastDate}
      indexTimeLabel={indexTimeLabel}
      indexChartData={indexChartData}
      indexWeightChart={indexWeightChart}
      indexMaxChartData={indexMaxChartData}
      indexMinChartData={indexMinChartData}
    />
  );
};
export default StockIndexContainer;

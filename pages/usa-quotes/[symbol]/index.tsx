import { GetServerSideProps, GetServerSidePropsContext } from "next";
import _ from "lodash";
import { USAQuotesSProps } from "../../../commons/type";
import useScrollReset from "../../../src/commons/util/func/useScrollReset";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { decrypt } from "../../../src/commons/util/func/hash";
import { getCookie } from "../../../src/commons/util/cookie/cookie";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { PastData } from "../../../src/commons/util/type/type";
import {
  apiServer,
  cmsServer,
  CMS_TOKEN,
} from "../../../src/commons/axios/axios";
import dayjs from "dayjs";
import {
  setUserPremium,
  setIsSub,
  setIsLoading,
} from "../../../src/redux/userInfo";
import StockDetailPresenter from "../../../src/components/stockDetail/StockDetailPresenter";
import SubLayout from "../../../src/components/layout/sub";
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const symbol = String(query.symbol).replaceAll("-stock", "");

  let stockData;
  let cosData;
  let indexTimeLabel;
  let indexChartData;
  let indexWeightChart;
  let indexMaxChartData;
  let indexMinChartData;
  let predictionData;

  // *연간 분기 데이터
  let BarYLabel;
  let BarIncomeY;
  let BarBalanceY;
  let BarQLabel;
  let BarIncomeQ;
  let BarBalanceQ;
  let pastDate;

  try {
    const { data, status } = await apiServer.get(
      `/tudalus/stock/info/${symbol}`
    );
    const { data: cos, status: cosStatus } = await apiServer.get(
      `/tudalus/stock/similarity/cos/${symbol}`
    );
    if (status === 200 && data.data && data.data.symbol) {
      stockData = data.data;
      indexTimeLabel = [
        ...data.data.price.map((data: any) => data.date),
        ...data.data.after_min2.map((data: any) => data.date),
      ];
      const ChartDatasets = [...data.data.price.map((data: any) => data.close)];
      indexChartData = [...ChartDatasets, null, null, null, null, null];
      indexWeightChart = [
        ...new Array(59).fill(null),
        ChartDatasets[ChartDatasets.length - 1],
        ...data.data.after_weight_mean.map(
          (data: any) => data.after_weight_mean
        ),
      ];
      indexMaxChartData = [
        ...new Array(59).fill(null),
        ChartDatasets[ChartDatasets.length - 1],
        ...data.data.after_max2.map((data: any) => data.after_max2),
      ];
      indexMinChartData = [
        ...new Array(59).fill(null),
        ChartDatasets[ChartDatasets.length - 1],
        ...data.data.after_min2.map((data: any) => data.after_min2),
      ];
      predictionData = {
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
      };

      //* 연간 분기 데이터
      if (
        data.data.balance_Q &&
        data.data.balance_Y &&
        data.data.income_Y &&
        data.data.income_Q
      ) {
        BarQLabel = data.data.balance_Q
          .map((data: any) => `${data.fiscalYear}-${data.fiscalQuarter}`)
          .reverse();
        BarYLabel = data.data.balance_Y
          .map((data: any) => `${data.fiscalYear}`)
          .reverse();
        BarIncomeY = {
          순이익: data.data.income_Y.map((data: any) => data.순이익),
          영업이익: data.data.income_Y.map((data: any) => data.영업이익),
          총매출: data.data.income_Y.map((data: any) => data.총매출),
        };
        BarIncomeQ = {
          순이익: data.data.income_Q.map((data: any) => data.순이익),
          영업이익: data.data.income_Q.map((data: any) => data.영업이익),
          총매출: data.data.income_Q.map((data: any) => data.총매출),
        };
        BarBalanceY = {
          총자산: data.data.balance_Y.map((data: any) => data.총자산),
          총부채: data.data.balance_Y.map((data: any) => data.총부채),
          총자기자본: data.data.balance_Y.map((data: any) => data.총자기자본),
        };
        BarBalanceQ = {
          총자산: data.data.balance_Q.map((data: any) => data.총자산),
          총부채: data.data.balance_Q.map((data: any) => data.총부채),
          총자기자본: data.data.balance_Q.map((data: any) => data.총자기자본),
        };
      }

      if (cosStatus === 200 && cos.data) {
        if (cos?.data?.cos.length > 0) {
          cosData = cos.data;
          pastDate = {
            start_date: cos.data.cos[0]?.start_date,
            end_date: cos.data.cos[0]?.end_date,
          };
        }
      }
    } else {
      return {
        notFound: true,
      };
    }
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      stockData,
      pastDate,
      cosData,
      indexTimeLabel,
      indexChartData,
      indexWeightChart,
      indexMaxChartData,
      indexMinChartData,
      predictionData,
      BarYLabel,
      BarIncomeY,
      BarBalanceY,
      BarQLabel,
      BarIncomeQ,
      BarBalanceQ,
    },
  };
};

export default function USAQuotesStock(props: USAQuotesSProps) {
  const {
    cosData,
    BarQLabel,
    stockData,
    BarYLabel,
    BarIncomeQ,
    BarIncomeY,
    BarBalanceY,
    BarBalanceQ,
    indexChartData,
    indexTimeLabel,
    predictionData,
    indexWeightChart,
    indexMaxChartData,
    indexMinChartData,
  } = props;

  useScrollReset();
  const dispatch = useDispatch();
  const router = useRouter();
  const { symbol } = router.query;
  const userId = decrypt(getCookie("tudalUser"));

  // * 과거 데이터
  const [pastData, setPastData] = useState<PastData | any>({});
  // * 과거 데이터 번호
  const [pastNum, setPastNum] = useState("01");

  // * 과거 데이터 날짜 저장
  const [pastDate, setPastDate] = useState({
    start_date: "",
    end_date: "",
    index: 0,
  });

  // * 연간 분기 선택
  const [selectBar, setSelectBar] = useState({
    growth: "연간",
    safe: "연간",
  });

  // * 원화 / 달러 변경
  const [isExchange, setIsExchange] = useState(false);

  //* 과거 종목 그래프 모음
  const [pastTimeLabel, setPastTimeLabel] = useState<string[]>([]);
  const [pastChartData, setPastChartData] = useState<number[]>([]);
  const [pastChartAfter, setPastChartAfter] = useState<number[]>([]);
  // * 종목 과거 데이터 가져오는 함수
  const getPastStockData = async () => {
    try {
      const { data, status } = await apiServer.get(
        //@ts-ignore
        `/tudalus/chart/stock/price?symbol=${symbol.replaceAll(
          "-stock",
          ""
        )}&startDate=${pastDate.start_date.replaceAll("-", "")}`
      );

      if (status === 200 && data.data) {
        setPastData(data.data);
        if (data.data.close) {
          setPastTimeLabel([...data.data.close.map((data: any) => data.date)]);
          setPastChartData([
            ...data.data.close.slice(0, 60).map((data: any) => data.close),
          ]);
          setPastChartAfter([
            ...new Array(59).fill(null),
            ...data.data.close.slice(59, 65).map((data: any) => data.close),
          ]);
        }
      }
    } catch (e) {}
  };

  //* 구독 중인 유저인지 아닌지 체크
  const handleGetUserPremium = useCallback(async () => {
    dispatch(setIsLoading(true));
    try {
      const { data } = await cmsServer.get(
        `/tudalus-premium-users?userId=${userId}&token=${CMS_TOKEN}`
      );

      dispatch(setIsSub(dayjs(data[0].endDate).isAfter(dayjs().format())));
      dispatch(setUserPremium(data[0]));
      dispatch(setIsLoading(false));
    } catch (e) {
      dispatch(setIsSub(false));
      dispatch(setIsLoading(false));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, userId]);

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

  //* 과거 날짜 변경될 때마다 과거 지수 불러오기
  useEffect(() => {
    if (pastDate.start_date) {
      getPastStockData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pastDate, symbol]);

  // *연간 분기 선택 함수
  const handleSelectBar = (e: any) => {
    setSelectBar({
      ...selectBar,
      [e.target.id]: e.target.value,
    });
  };

  // * 환율로 보기 버튼
  const handleIsExchange = () => {
    setIsExchange(() => !isExchange);
  };

  useEffect(() => {
    if (Array.isArray(cosData.cos) && cosData.cos.length > 0) {
      setPastDate({
        ...pastDate,
        start_date: cosData.cos[0]?.start_date,
        end_date: cosData.cos[0]?.end_date,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cosData]);

  useEffect(() => {
    if (userId) {
      handleGetUserPremium();
    } else {
      dispatch(setIsLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);
  return (
    <StockDetailPresenter
      cosData={cosData}
      pastNum={pastNum}
      pastDate={pastDate}
      pastData={pastData}
      selectBar={selectBar}
      stockData={stockData}
      BarQLabel={BarQLabel}
      BarYLabel={BarYLabel}
      isExchange={isExchange}
      BarIncomeQ={BarIncomeQ}
      BarIncomeY={BarIncomeY}
      BarBalanceY={BarBalanceY}
      BarBalanceQ={BarBalanceQ}
      pastChartData={pastChartData}
      pastTimeLabel={pastTimeLabel}
      handlePastNum={handlePastNum}
      pastChartAfter={pastChartAfter}
      predictionData={predictionData}
      indexTimeLabel={indexTimeLabel}
      indexChartData={indexChartData}
      handlePastDate={handlePastDate}
      handleSelectBar={handleSelectBar}
      handleIsExchange={handleIsExchange}
      indexWeightChart={indexWeightChart}
      indexMaxChartData={indexMaxChartData}
      indexMinChartData={indexMinChartData}
    />
  );
}
USAQuotesStock.getLayout = function getLayout(page: ReactElement) {
  return (
    <SubLayout isStock={true} title={"투달유에스 | 종목"}>
      {page}
    </SubLayout>
  );
};

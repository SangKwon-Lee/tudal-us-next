import React from "react";
import MainTitle from "../layout/MainTitle";
import SortBtn from "../nav/sort";
import {
  IndexData,
  CosData,
  PastData,
  PredictionData,
} from "../../commons/util/type/type";
import PastChart, {
  PastSimilarityContentsWrapper,
  PastSimilarityLine,
  PastSimilarityNum,
  PastSimilarityText,
  PastSimilarityWrapper,
} from "../chart/PastChart";
import { indexText } from "../../commons/util/func/indexText";
import {
  ratioBgColor,
  ratioColor,
  ratioText,
} from "../../commons/util/func/ratioColorAndText";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import FadeIn from "react-fade-in";
import { Line } from "react-chartjs-2";
import { BackGround } from "../commons/ui/commonStyle";
import { optionsLine } from "../chart/options";
import { priceToString } from "../../commons/util/func/priceToString";
import styled from "@emotion/styled";
import theme from "../../commons/theme";
interface IStockIndexProps {
  sort: {
    value: string;
    name: string;
  };
  pastNum: string;
  cosData: CosData;
  pastDate: {
    index: number;
    end_date: string;
    start_date: string;
  };
  pastData: PastData;
  indexData: IndexData;
  pastTimeLabel: string[];
  indexTimeLabel: string[];
  pastChartData: number[];
  pastChartAfter: number[];
  indexChartData: number[];
  indexWeightChart: number[];
  indexMaxChartData: number[];
  indexMinChartData: number[];
  predictionData: PredictionData;
  handleSortBtn: (e: any) => void;
  handlePastNum: (e: any) => void;
  handlePastDate: (start: string, end: string, index: number) => void;
}

const BtnArr = [
  { value: "sp500", name: "S&P500" },
  { value: "Nasdaq", name: "나스닥종합" },
  { value: "DowJones", name: "다우존스" },
  { value: "russell2000", name: "러셀2000" },
];

const StockIndexPresenter: React.FC<IStockIndexProps> = ({
  sort,
  pastNum,
  cosData,
  pastData,
  indexData,
  pastDate,
  handleSortBtn,
  handlePastNum,
  handlePastDate,
  predictionData,
  pastChartAfter,
  pastChartData,
  pastTimeLabel,
  indexTimeLabel,
  indexChartData,
  indexWeightChart,
  indexMaxChartData,
  indexMinChartData,
}) => {
  const datasets = {
    labels: indexTimeLabel,
    datasets: [
      {
        label: "현재가",
        data: indexChartData,
        borderColor: "#000",
        pointRadius: 2,
      },
      {
        label: "예측최고",
        data: indexMaxChartData,
        borderColor: "#D62727",
        backgroundColor: "#D62727",
        pointRadius: 2,
      },
      {
        label: "예측평균",
        data: indexWeightChart,
        fill: {
          target: "-1",
          below: "#E2E2E2", // And blue below the origin
        },
        borderColor: "#2BA02B",
        backgroundColor: "#2BA02B",
        pointRadius: 2,
      },
      {
        label: "예측최저",
        data: indexMinChartData,
        fill: {
          target: "-1",
          below: "#E2E2E2", // And blue below the origin
        },
        borderColor: "#1F77B4",
        backgroundColor: "#1F77B4",
        pointRadius: 2,
      },
    ],
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );

  return (
    <>
      <BackGround>
        <StockIndexWrapper>
          <FadeIn>
            <MainTitle title={"미국 시장"} subTitle={"예측"} />
            <SortBtn
              text={BtnArr}
              sort={sort.name}
              handleSortBtn={handleSortBtn}
            />
            <StockIndexWhiteWrapper>
              <StockIndexMin>15분 지연</StockIndexMin>
              <StockIndexTitleWrapper>
                <StockIndexTitle>{sort.name}</StockIndexTitle>
                <StockRatioWrapper>
                  <StockIndexNum
                    style={{
                      color: ratioColor(
                        indexData?.close[indexData?.close.length - 1]
                          .ChangePercent
                      ),
                    }}
                  >
                    {priceToString(
                      indexData?.close[indexData?.close.length - 1].Close
                    )}
                  </StockIndexNum>
                  <StockIndexRatio
                    style={{
                      backgroundColor: ratioBgColor(
                        indexData?.close[indexData?.close.length - 1]
                          .ChangePercent
                      ),

                      color: ratioColor(
                        indexData?.close[indexData?.close.length - 1]
                          .ChangePercent
                      ),
                    }}
                  >
                    {ratioText(
                      indexData?.close[indexData?.close.length - 1]
                        .ChangePercent
                    )}
                  </StockIndexRatio>
                </StockRatioWrapper>
              </StockIndexTitleWrapper>
              <StockIndexLine />
              <StockIndexContents>{indexText(sort.name)}</StockIndexContents>

              {indexTimeLabel.length > 0 && (
                // @ts-ignore
                <Line data={datasets} options={optionsLine} />
              )}

              <PastSimilarityWrapper>
                <PastSimilarityContentsWrapper>
                  <PastSimilarityText>예측최저</PastSimilarityText>
                  <PastSimilarityNum>
                    ${priceToString(predictionData.minPrice)}
                  </PastSimilarityNum>
                  <PastSimilarityNum
                    style={{
                      color: ratioColor(
                        (100 *
                          (predictionData.minPrice -
                            predictionData.lastPrice)) /
                          predictionData.lastPrice
                      ),
                    }}
                  >
                    {ratioText(
                      (100 *
                        (predictionData.minPrice - predictionData.lastPrice)) /
                        predictionData.lastPrice
                    )}
                  </PastSimilarityNum>
                </PastSimilarityContentsWrapper>
                <PastSimilarityLine />
                <PastSimilarityContentsWrapper>
                  <PastSimilarityText>예측치</PastSimilarityText>
                  <PastSimilarityNum>
                    ${priceToString(predictionData.weightAverage.toFixed(2))}
                  </PastSimilarityNum>
                  <PastSimilarityNum
                    style={{
                      color: ratioColor(
                        (100 *
                          (predictionData.weightAverage -
                            predictionData.lastPrice)) /
                          predictionData.lastPrice
                      ),
                    }}
                  >
                    {ratioText(
                      (100 *
                        (predictionData.weightAverage -
                          predictionData.lastPrice)) /
                        predictionData.lastPrice
                    )}
                  </PastSimilarityNum>
                </PastSimilarityContentsWrapper>
                <PastSimilarityLine />
                <PastSimilarityContentsWrapper>
                  <PastSimilarityText>예측최고</PastSimilarityText>

                  <PastSimilarityNum>
                    ${priceToString(predictionData.maxPrice)}
                  </PastSimilarityNum>
                  <PastSimilarityNum
                    style={{
                      color: ratioColor(
                        (100 *
                          (predictionData.maxPrice -
                            predictionData.lastPrice)) /
                          predictionData.lastPrice
                      ),
                    }}
                  >
                    {ratioText(
                      (100 *
                        (predictionData.maxPrice - predictionData.lastPrice)) /
                        predictionData.lastPrice
                    )}
                  </PastSimilarityNum>
                </PastSimilarityContentsWrapper>
              </PastSimilarityWrapper>
            </StockIndexWhiteWrapper>
            <PastChart
              cosData={cosData}
              pastNum={pastNum}
              pastData={pastData}
              pastDate={pastDate}
              pastTimeLabel={pastTimeLabel}
              pastChartData={pastChartData}
              handlePastNum={handlePastNum}
              handlePastDate={handlePastDate}
              pastChartAfter={pastChartAfter}
            />
          </FadeIn>
        </StockIndexWrapper>
      </BackGround>
    </>
  );
};
export default StockIndexPresenter;

const StockIndexWrapper = styled.div`
  max-width: 1100px;
  /* min-width: 428px; */
  width: 100%;
  padding-top: 46px;
  padding-bottom: 20px;
  background-color: var(--light-gray);
`;

const StockIndexWhiteWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 8px;
  background-color: white;
`;

const StockIndexMin = styled.div`
  ${theme.fonts.s12_w400};
  color: #707070;
`;

const StockIndexTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StockIndexTitle = styled.div`
  ${theme.fonts.s20_w700};
`;

const StockRatioWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StockIndexNum = styled.div`
  ${theme.fonts.s20_w700};
  color: var(--blue);
  margin-right: ${theme.metrics.m3};
`;

const StockIndexRatio = styled.div`
  padding: ${theme.metrics.m1} ${theme.metrics.m2};
  background-color: #e4f2ff;
  border-radius: 8px;
  ${theme.fonts.s16_w700};
`;

const StockIndexLine = styled.div`
  border-top: 1px solid var(--gray);
  margin: 18px 0px;
  ${theme.fonts.s14_w400};
`;

const StockIndexContents = styled.div`
  color: var(--text-gray);
  margin-bottom: 20px;
  ${theme.fonts.s14_w400};
`;

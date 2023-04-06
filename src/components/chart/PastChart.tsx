import React from "react";
import styled from "@emotion/styled";
import { CosData, PastData } from "../../commons/util/type/type";
import { ratioColor } from "../../commons/util/func/ratioColorAndText";
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
import { Line } from "react-chartjs-2";
import { optionsLine } from "./options";
import theme from "../../commons/theme";
import { Button } from "@mui/material";
import { css } from "@emotion/react";

interface IPastNumProps {
  cosData: CosData;
  pastNum?: string;
  pastDate: {
    start_date: string;
    end_date: string;
    index: number;
  };
  pastData?: PastData;
  pastChartData: number[];
  pastTimeLabel: string[];
  pastChartAfter: number[];
  handlePastNum: (e: any) => void;
  handlePastDate: (start: string, end: string, index: number) => void;
}

const PastNumArr = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"];

const PastChart: React.FC<IPastNumProps> = ({
  cosData,
  pastNum,
  pastDate,
  pastData,
  pastTimeLabel,
  handlePastNum,
  pastChartData,
  handlePastDate,
  pastChartAfter,
}) => {
  const datasets = {
    labels: pastTimeLabel,
    datasets: [
      {
        label: "",
        data: pastChartData,
        borderColor: "#000",
        pointRadius: 0,
      },
      {
        label: "",
        data: pastChartAfter,
        borderColor: "#D62727",
        backgroundColor: "#D62727",
        pointRadius: 0,
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
      <PastChartWrapper>
        <PastTitle>
          과거 차트 <PastTitleSpan>들여다 보기</PastTitleSpan>
        </PastTitle>
        <PastSubTitle>
          현재 차트와 비슷한 흐름을 보였던 과거의 차트 입니다
        </PastSubTitle>
        <PastChartNumBtnWrapper>
          {PastNumArr.map((data, index) => (
            <Button
              css={css`
                padding: ${theme.metrics.m1} ${theme.metrics.m2};
                border: 1px solid #c9c6c6;
                background-color: white;
                outline: none;
                cursor: pointer;
                border-radius: 18px;
                margin-right: ${theme.metrics.m2};
              `}
              key={index}
              onClick={(e: any) => {
                handlePastNum(e);
                handlePastDate(
                  cosData.cos[index].start_date,
                  cosData.cos[index].end_date,
                  index
                );
              }}
              value={data}
              style={{
                fontWeight: 700,
                border: data === pastNum ? "1px solid #c9c6c6" : "none",
                color: data === pastNum ? "#2b2b2b" : "#c9c6c6",
              }}
            >
              {data}
            </Button>
          ))}
        </PastChartNumBtnWrapper>
      </PastChartWrapper>
      <PastChartWhiteWrapper>
        <PastChartTitle>
          {`${pastDate.start_date} ~ ${pastDate.end_date}`}
          <PastChartTitleSpan>의 차트</PastChartTitleSpan>
        </PastChartTitle>
        {pastTimeLabel.length > 0 && (
          //@ts-ignore
          <Line data={datasets} options={optionsLine} />
        )}
        <PastSimilarityWrapper>
          <PastSimilarityContentsWrapper>
            <PastSimilarityText>차트유사도</PastSimilarityText>
            <PastSimilarityNum>
              {`${(cosData.cos[pastDate.index].cos * 100).toFixed(2)}%`}
            </PastSimilarityNum>
          </PastSimilarityContentsWrapper>
          <PastSimilarityLine />
          <PastSimilarityContentsWrapper>
            <PastSimilarityText>5일 뒤</PastSimilarityText>
            <PastSimilarityNum
              style={{ color: ratioColor(pastData?.day5changepercent) }}
            >
              {pastData?.day5changepercent}%
            </PastSimilarityNum>
          </PastSimilarityContentsWrapper>
          <PastSimilarityLine />
          <PastSimilarityContentsWrapper>
            <PastSimilarityText>한 달 뒤</PastSimilarityText>
            <PastSimilarityNum
              style={{ color: ratioColor(pastData?.day20changepercent) }}
            >
              {pastData?.day20changepercent}%
            </PastSimilarityNum>
          </PastSimilarityContentsWrapper>
        </PastSimilarityWrapper>
      </PastChartWhiteWrapper>
    </>
  );
};

export default React.memo(PastChart);

const PastChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-top: 15px;
`;

const PastTitle = styled.div`
  ${theme.fonts.s16_w700};
`;

const PastTitleSpan = styled.span`
  ${theme.fonts.s16_w400};
`;

const PastSubTitle = styled.div`
  ${theme.fonts.s14_w400};
  color: var(--text-gray);
`;

const PastChartNumBtnWrapper = styled.div`
  display: flex;
  overflow: auto;
  flex-wrap: nowrap;
  margin: 20px 0px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const PastChartWhiteWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: ${theme.metrics.m5};
  border-radius: 8px;
  background-color: white;
`;

const PastChartTitle = styled.div`
  margin-bottom: ${theme.metrics.m5};
  ${theme.fonts.s14_w700};
`;

const PastChartTitleSpan = styled.span`
  color: #999999;
  ${theme.fonts.s14_w400};
`;

export const PastSimilarityWrapper = styled.div`
  padding: 20px 0px;
  background-color: var(--light-gray);
  display: flex;
  justify-content: space-between;
  border-radius: 18px;
  margin-top: 20px;
`;

export const PastSimilarityContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: center;
`;

export const PastSimilarityText = styled.div`
  margin-bottom: 5px;
  ${theme.fonts.s14_w400};
`;

export const PastSimilarityNum = styled.div`
  ${theme.fonts.s16_w700};
`;

export const PastSimilarityLine = styled.div`
  border-left: 1px solid #cbcbcb;
`;

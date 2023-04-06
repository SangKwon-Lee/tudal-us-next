import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  ratioColor,
  ratioText,
} from "../../commons/util/func/ratioColorAndText";
import { priceToString } from "../../commons/util/func/priceToString";
import { tag } from "../../commons/util/func/tag";
import { useRouter } from "next/router";
import MainTitle from "../layout/MainTitle";
import { StockBest } from "../../commons/util/type/type";
import SortBtn from "../nav/sort";
import { css } from "@emotion/react";
import { Button } from "@mui/material";
import theme from "../../commons/theme";
import axios from "axios";

interface Props {
  stockBest: StockBest[];
}

const BtnArr = [
  { value: "max_changepercent", name: "수익률 순" },
  { value: "recommendDate", name: "최신순" },
];

const StockBestList = (props: Props) => {
  const { stockBest } = props;
  const router = useRouter();
  // * Sort
  const [sort, setSort] = useState({
    value: "max_changepercent",
    name: "수익률 순",
  });

  // * 정렬
  const handleSortBtn = (e: any) => {
    setSort({ ...sort, name: e.target.id, value: e.target.value });
  };

  return (
    <>
      <SearchPageWrapper>
        <Button sx={{ width: "30px" }}>
          <Arrow
            src="./assets/images/iconBack.svg"
            onClick={() => {
              router.push("/");
            }}
          />
        </Button>
      </SearchPageWrapper>
      <StockBestWrapper>
        <MainTitle
          title={"Tudal US"}
          subTitle={"Best Pick.50"}
          isButton={false}
        />
        <SortBtn text={BtnArr} sort={sort.name} handleSortBtn={handleSortBtn} />
        {Array.isArray(stockBest) &&
          stockBest.length > 0 &&
          stockBest
            .sort((a: any, b: any) =>
              sort.value === "recommendDate"
                ? // @ts-ignore
                  new Date(b.recommendDate) - new Date(a.recommendDate)
                : // @ts-ignore
                  b.max_changepercent - a.max_changepercent
            )
            .map((data, index) => (
              <Button
                css={css`
                  width: 100%;
                  display: flex;
                  flex-direction: column;
                  padding: ${theme.metrics.m4} ${theme.metrics.m5};
                  background-color: white;
                  border-radius: 12px;
                  margin-bottom: ${theme.metrics.m4};
                  cursor: pointer;
                `}
                key={index}
                onClick={() => {
                  router.push(`/usa-quotes/${data.symbol}-stock`);
                }}
              >
                <StockBestContentsTopWrapper>
                  <StockBestContentsLogoWrapper>
                    <StockBestContentsLogo src={data.url} alt="logo" />
                    <StockBestContentsTitleWrapper>
                      <StockBestContentsSymbol>
                        {data.companyName_kor}
                      </StockBestContentsSymbol>
                      <StockBestContentsTitle
                        onClick={() => {
                          router.push(`/usa-quotes/${data.symbol}-stock`);
                        }}
                      >
                        {data.symbol}
                      </StockBestContentsTitle>
                      <StockBestContentsTag>
                        {tag(data.tag_kor)}
                      </StockBestContentsTag>
                    </StockBestContentsTitleWrapper>
                  </StockBestContentsLogoWrapper>
                  <StockBestContentsRatioWrapper>
                    <StockBestContentsRatioText>
                      5일내 최고수익률
                    </StockBestContentsRatioText>
                    <StockBestContentsRatio
                      style={{ color: ratioColor(data.max_changepercent) }}
                    >
                      {ratioText(data.max_changepercent)}
                    </StockBestContentsRatio>
                  </StockBestContentsRatioWrapper>
                </StockBestContentsTopWrapper>
                <StockBestContentsBottomWrapper>
                  <StockBestPriceWrapper>
                    <StockBestDateWrapper>
                      <StockBestDateText>매수가</StockBestDateText>
                      <StockBestDate>{data.recommendDate}</StockBestDate>
                    </StockBestDateWrapper>
                    <StockBestPrice>
                      ${priceToString(data.recommend_price)}
                    </StockBestPrice>
                  </StockBestPriceWrapper>
                  <StockBestPriceWrapper>
                    <StockBestDateWrapper>
                      <StockBestDateText>5일내 최고가</StockBestDateText>
                    </StockBestDateWrapper>
                    <StockBestPrice>
                      ${priceToString(data.max_price)}
                    </StockBestPrice>
                  </StockBestPriceWrapper>
                </StockBestContentsBottomWrapper>
              </Button>
            ))}
      </StockBestWrapper>
    </>
  );
};

export default React.memo(StockBestList);

const SearchPageWrapper = styled.div`
  max-width: 1100px;
  width: 100%;
  padding: ${theme.metrics.m5} 0;
  display: flex;
  flex-direction: column;
`;

const StockBestWrapper = styled.div`
  max-width: 1100px;
  width: 100%;
  padding-top: 46px;
  padding-bottom: 20px;
  background-color: var(--light-gray);
`;

const StockBestContentsTopWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StockBestContentsBottomWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: ${theme.metrics.m4};
  justify-content: space-between;
`;

const StockBestContentsLogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StockBestContentsLogo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: ${theme.metrics.m3};
  border: 1px solid var(--gray);
`;

const StockBestContentsTitleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

const StockBestContentsSymbol = styled.div`
  @media (max-width: 640px) {
    max-width: 120px;
  }
  ${theme.fonts.s12_w400};
  color: #999999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StockBestContentsTitle = styled.div`
  ${theme.fonts.s16_w700};
  cursor: pointer;
  color: #212121;
  margin: ${theme.metrics.m1} 0;
`;

const StockBestContentsTag = styled.div`
  color: var(--tag-blue);
  ${theme.fonts.s12_w400};
`;

const StockBestContentsRatioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const StockBestContentsRatioText = styled.div`
  color: #999999;
  ${theme.fonts.s12_w400};
  min-width: 88px;
`;

const StockBestContentsRatio = styled.div`
  ${theme.fonts.s20_w700};
`;

const StockBestDateWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const StockBestDateText = styled.div`
  color: #999999;
  ${theme.fonts.s12_w400};
`;
const StockBestDate = styled.div`
  color: #707070;
  margin-top: ${theme.metrics.m1};
  ${theme.fonts.s12_w400};
`;

const StockBestPrice = styled.div`
  margin-left: ${theme.metrics.m4};
  ${theme.fonts.s14_w700};
  color: #2b2b2b;
`;

const StockBestPriceWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Arrow = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  z-index: 1;
`;

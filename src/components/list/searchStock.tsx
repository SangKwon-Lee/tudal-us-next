import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import {
  ratioBgColor,
  ratioColor,
  ratioText,
} from "../../commons/util/func/ratioColorAndText";
import {
  TopData,
  MyFavoriteStocks,
  StockSearchResult,
} from "../../commons/util/type/type";
import theme from "../../commons/theme";
import { Button } from "@mui/material";
interface Props {
  topData: TopData[];
  myFavoriteStocks: MyFavoriteStocks[];
  stockResult: StockSearchResult[];
  PostMyFavorites: (symbol: string, price: number) => Promise<void>;
}
export default function SearchStockList(props: Props) {
  const { topData, myFavoriteStocks, stockResult, PostMyFavorites } = props;
  const router = useRouter();
  const searchWord = router.query.search;
  return (
    <>
      {!searchWord && (
        <RecommendThemeWrapper>
          <Title>최근 5일 상승률 상위목록</Title>
          {Array.isArray(topData) &&
            topData.length > 1 &&
            topData.map((data, index) => (
              <Button
                css={css`
                  display: flex;
                  background-color: var(--white);
                  padding: 10px 0px;
                  flex-direction: column;
                  margin-bottom: 20px;
                  width: 100%;
                `}
                onClick={() => {
                  router.push(`/usa-quotes/${data.symbol}-stock`);
                }}
                key={index}
              >
                <StockBoxTopWrapper>
                  <StockBoxTextImgWrapper>
                    <StockImg src={data.url} alt="logo" />
                    <StockBoxTopTextWrapper>
                      <StockSubName>{data.companyName_kor}</StockSubName>
                      <StockName>{data.symbol}</StockName>
                    </StockBoxTopTextWrapper>
                  </StockBoxTextImgWrapper>
                  <StockRatioWrapper>
                    <StockRatio
                      style={{
                        color: ratioColor(data.day5ChangePercent),
                        backgroundColor: ratioBgColor(data.day5ChangePercent),
                      }}
                    >
                      {ratioText(data.day5ChangePercent)}
                    </StockRatio>
                    <HeartIcon
                      onClick={(event) => {
                        event.stopPropagation();
                        PostMyFavorites(data.symbol, data.price);
                      }}
                      alt="heart"
                      src={
                        myFavoriteStocks.length > 0
                          ? myFavoriteStocks.filter(
                              (favo) => favo.symbol === data.symbol
                            ).length > 0
                            ? "/assets/images/heart.svg"
                            : "/assets/images/heartGray.svg"
                          : "/assets/images/heartGray.svg"
                      }
                    />
                  </StockRatioWrapper>
                </StockBoxTopWrapper>
              </Button>
            ))}
        </RecommendThemeWrapper>
      )}
      {Array.isArray(stockResult) && stockResult.length !== 0 && searchWord && (
        <RecommendThemeWrapper>
          <Title>종목</Title>
          <SubTitle>전일 대비 상승률 기준입니다</SubTitle>
          {Array.isArray(stockResult) &&
            stockResult.length > 0 &&
            stockResult.map((data: any, index: any) => (
              <Button
                css={css`
                  display: flex;
                  background-color: var(--white);
                  padding: 10px 0px;
                  flex-direction: column;
                  margin-bottom: 20px;
                  width: 100%;
                `}
                onClick={() => {
                  router.push(`/usa-quotes/${data.symbol}-stock`);
                }}
                key={data.url + String(index)}
              >
                <StockBoxTopWrapper>
                  <StockBoxTextImgWrapper>
                    <StockImg src={data.url} alt="logo" />
                    <StockBoxTopTextWrapper>
                      <StockSubName>{data.companyName_kor}</StockSubName>
                      <StockName>{data.symbol}</StockName>
                    </StockBoxTopTextWrapper>
                  </StockBoxTextImgWrapper>
                  <StockRatioWrapper>
                    <StockRatio
                      style={{
                        color: ratioColor(data.changePercent),
                        backgroundColor: ratioBgColor(data.changePercent),
                      }}
                    >
                      {ratioText(Number(data.changePercent))}
                    </StockRatio>
                    <HeartIcon
                      onClick={(event) => {
                        event.stopPropagation();
                        PostMyFavorites(data.symbol, data.price);
                      }}
                      src={
                        myFavoriteStocks.length > 0
                          ? myFavoriteStocks.filter(
                              (favo) => favo.symbol === data.symbol
                            ).length > 0
                            ? "/assets/images/heart.svg"
                            : "/assets/images/heartGray.svg"
                          : "/assets/images/heartGray.svg"
                      }
                      alt="heart"
                    />
                  </StockRatioWrapper>
                </StockBoxTopWrapper>
              </Button>
            ))}
        </RecommendThemeWrapper>
      )}
      {searchWord && stockResult.length === 0 && (
        <RecommendThemeWrapper>
          <Title>종목</Title>
          <div>검색 결과가 없습니다</div>
        </RecommendThemeWrapper>
      )}
    </>
  );
}

const Title = styled.h1`
  ${theme.fonts.s16_w700};
  color: #707070;
  margin-bottom: 24px;
`;

const SubTitle = styled.h1`
  ${theme.fonts.s12_w400};
  color: #707070;
  margin-bottom: 24px;
`;
const RecommendThemeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  margin-bottom: 32px;
`;

const StockBoxTopWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const StockBoxTopTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
`;

const StockBoxTextImgWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StockImg = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 12px;
  border-radius: 50%;
  cursor: pointer;
`;

const StockSubName = styled.div`
  color: #999999;
  ${theme.fonts.s12_w400};
  cursor: pointer;
  margin-bottom: ${theme.metrics.m1};
`;

const StockName = styled.h1`
  cursor: pointer;
  ${theme.fonts.s18_w400};
  text-align: left;
`;

const StockRatioWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StockRatio = styled.div`
  padding: 4px 8px;
  background-color: var(--light-red);
  text-align: center;
  ${theme.fonts.s16_w700};
  color: var(--red);
  border-radius: 8px;
  height: 29px;
`;

const HeartIcon = styled.img`
  cursor: pointer;
`;

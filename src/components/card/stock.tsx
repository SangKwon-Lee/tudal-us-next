import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ArrowDropDown } from "@mui/icons-material";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import theme from "../../commons/theme";
import Icon from "../../commons/theme/icon";
import { GradienWidthFunc } from "../../commons/util";
import { priceToString } from "../../commons/util/func/priceToString";
import {
  ratioBgColor,
  ratioColor,
  ratioText,
} from "../../commons/util/func/ratioColorAndText";
import { SortText } from "../../commons/util/func/sortText";
import { tag } from "../../commons/util/func/tag";
import { RootState } from "../../store";

export const StockIsSubImg = styled.img`
  @media (max-width: 640px) {
    width: 35%;
  }
  width: 20%;
`;
export const HeartIcon = styled.img`
  cursor: pointer;
  z-index: 3;
`;
interface Props {
  data: {
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
  };
  isExchange: boolean;
  isRec: boolean;
  isTheme?: boolean;
  isFavorite?: boolean;
  PostMyFavorites?: any;
  myFavorites?: any;
  favoritePrice?: any;
  sort?: string;
  isFavoriteSub?: boolean;
  day5ChangePercent?: any;
  growth_rate?: number;
  stability_rate?: number;
  operating_margin?: number;
}

export default function StockCard(props: Props) {
  const {
    data,
    isExchange,
    isRec,
    isFavorite,
    PostMyFavorites,
    myFavorites,
    favoritePrice,
    sort,
    isFavoriteSub,
    day5ChangePercent,
    growth_rate,
    operating_margin,
    stability_rate,
    isTheme,
  } = props;
  const {
    changePercent,
    companyName_kor,
    price,
    recommend_price,
    stoploss,
    symbol,
    tag_kor,
    target_first,
    target_second,
    url,
    weight_max,
  } = data;
  const router = useRouter();
  const newTag: any = tag(tag_kor);
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const { isSub } = userInfo;
  // const isSub = true;
  const [sortData, setSortData] = useState<any>(weight_max);
  // * 환율 정보 데이터
  const { exchangeData } = useSelector(
    (state: RootState) => state.exchangeData
  );
  useEffect(() => {
    if (sort === "AI 추천") {
      if (isTheme) {
        setSortData(weight_max / 100);
      } else {
        setSortData(weight_max);
      }
    } else if (sort === "최근 변화율") {
      if (isFavorite) {
        setSortData(
          `${((Number(price) / favoritePrice.price - 1) * 100).toFixed(2)}%`
        );
      } else {
        setSortData(`${changePercent}%`);
      }
    } else if (sort === "성장성") {
      setSortData(`${growth_rate}%`);
    } else if (sort === "안정성") {
      setSortData(`${stability_rate}%`);
    } else if (sort === "영업이익") {
      setSortData(`${operating_margin}%`);
    } else {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, weight_max]);
  return (
    <>
      <Button
        disabled={!isSub}
        sx={{ backgroundColor: "white" }}
        css={css`
          display: flex;
          margin: ${theme.metrics.m2} 0 !important;
          width: 100%;
          flex-direction: column;
          border-radius: 12px;
          margin-bottom: ${theme.metrics.m5};
          cursor: pointer;
        `}
        key={symbol}
        style={{ marginTop: "10px", marginBottom: "5px" }}
        onClick={() => {
          router.push(`/usa-quotes/${symbol}-stock`);
        }}
      >
        <StockBoxWrapper>
          {isSub && (
            <StockSubName
              onClick={() => {
                router.push(`/usa-quotes/${symbol}-stock`);
              }}
            >
              {companyName_kor}
            </StockSubName>
          )}
          <StockBoxTopWrapper>
            {isSub ? (
              <StockBoxTextImgWrapper>
                <Icon
                  width={43}
                  height={43}
                  style={{ marginRight: theme.metrics.m3, borderRadius: "50%" }}
                  src={url ? url : "./images/stockImg.webp"}
                />
                <StockName>{symbol}</StockName>
              </StockBoxTextImgWrapper>
            ) : (
              <Icon
                width={191}
                style={{
                  backgroundSize: "cover",
                  minWidth: "80px",
                  width: "100%",
                  maxWidth: "191px",
                }}
                height={76}
                src={"/assets/images/blur_stock.png"}
              ></Icon>
            )}
            <StockRatioWrapper>
              <StockPrice>
                {isExchange
                  ? `${priceToString(
                      (Number(price) * Number(exchangeData.currency)).toFixed(2)
                    )}원`
                  : `$${price}`}
              </StockPrice>
              {changePercent || changePercent === 0 ? (
                <StockRatio
                  onClick={() => {
                    router.push(`/usa-quotes/${symbol}-stock`);
                  }}
                  style={{
                    color: ratioColor(changePercent),
                    backgroundColor: ratioBgColor(changePercent),
                  }}
                >
                  {ratioText(changePercent)}
                </StockRatio>
              ) : (
                <></>
              )}
              {/* 관심종목페이지일 경우 하트 아이콘 추가 */}
              {isFavorite && (
                <HeartIcon
                  onClick={(event) => {
                    event.stopPropagation();
                    PostMyFavorites(symbol, price);
                  }}
                  src={
                    myFavorites.symbol === symbol
                      ? "/assets/images/heart.svg"
                      : "/assets/images/heartGray.svg"
                  }
                  alt="heart"
                />
              )}
            </StockRatioWrapper>
          </StockBoxTopWrapper>
          {isSub && (
            <StockTagWrapper
              style={{
                marginTop: "-8px",
              }}
              onClick={() => {
                router.push(`/usa-quotes/${symbol}-stock`);
              }}
            >
              {newTag?.map((data: string, index: any) => (
                <StockTag key={index}>{data}</StockTag>
              ))}
            </StockTagWrapper>
          )}
          {isFavorite && (
            <>
              <StockFavoriteWrapper
                style={{ marginTop: "12px" }}
                onClick={() => {
                  router.push(`/usa-quotes/${symbol}-stock`);
                }}
              >
                등록일 : {dayjs(favoritePrice?.created_at).format("YYYY.MM.DD")}
              </StockFavoriteWrapper>
              <StockFavoriteWrapper>
                등록가 : ${favoritePrice?.price}
              </StockFavoriteWrapper>
            </>
          )}
          {weight_max ? (
            <StockGrayWrapper>
              {SortText(sort, isFavorite)} &nbsp;
              {isFavorite ? (
                !isFavoriteSub && sort === "AI 추천" ? (
                  <StockGrayTextRatio>---</StockGrayTextRatio>
                ) : (
                  <StockGrayTextRatio>
                    {typeof sortData === "string"
                      ? sortData
                      : Number(sortData).toFixed(2) + "%"}
                  </StockGrayTextRatio>
                )
              ) : !isSub && sort === "AI 추천" ? (
                <StockGrayTextRatio>---</StockGrayTextRatio>
              ) : (
                <StockGrayTextRatio>
                  {typeof sortData === "string"
                    ? sortData
                    : Number(sortData * 100).toFixed(2) + "%"}
                </StockGrayTextRatio>
              )}
            </StockGrayWrapper>
          ) : weight_max === 0 ? (
            <></>
          ) : (
            <></>
          )}
          {isRec && (
            <StockGraphWrapper>
              <StockGraphBarWrapper>
                <StockGraphBar>
                  <StockGraphBlueCircle></StockGraphBlueCircle>
                  <StockGraphGrayCircle></StockGraphGrayCircle>
                  <StockGraphRedCircle></StockGraphRedCircle>
                  <StockGraphRedCircle></StockGraphRedCircle>
                  <StockDetailBarTextWrapper
                    style={{
                      left: `${
                        37 +
                        GradienWidthFunc(
                          price,
                          stoploss,
                          target_first,
                          target_second,
                          recommend_price
                        )
                      }%`,
                    }}
                  >
                    <StockDetailBarText>현재가</StockDetailBarText>
                    <ArrowDropDown />
                  </StockDetailBarTextWrapper>
                  {GradienWidthFunc(
                    price,
                    stoploss,
                    target_first,
                    target_second,
                    recommend_price
                  ) > 0 ? (
                    <StockGradient
                      style={{
                        width: `${GradienWidthFunc(
                          price,
                          stoploss,
                          target_first,
                          target_second,
                          recommend_price
                        )}%`,
                      }}
                    ></StockGradient>
                  ) : (
                    <StockGradientBlue
                      style={{
                        width: `${Math.abs(
                          GradienWidthFunc(
                            price,
                            stoploss,
                            target_first,
                            target_second,
                            recommend_price
                          )
                        )}%`,
                      }}
                    ></StockGradientBlue>
                  )}
                </StockGraphBar>
              </StockGraphBarWrapper>
              <StockGraphBottomWrapper>
                <StockGraphTextWrapper>
                  <StockGraphText>손절가</StockGraphText>
                  <StockGraphPrice>{`$${stoploss?.toFixed(
                    2
                  )}`}</StockGraphPrice>
                </StockGraphTextWrapper>
                <StockGraphTextWrapper>
                  <StockGraphText>매수가</StockGraphText>
                  <StockGraphPrice>
                    {`$${recommend_price?.toFixed(2)}`}
                  </StockGraphPrice>
                </StockGraphTextWrapper>
                <StockGraphTextWrapper>
                  <StockGraphText>1차 목표</StockGraphText>
                  <StockGraphPrice>
                    {`$${target_first?.toFixed(2)}`}
                  </StockGraphPrice>
                </StockGraphTextWrapper>
                <StockGraphTextWrapper>
                  <StockGraphText>2차 목표</StockGraphText>
                  <StockGraphPrice>
                    {`$${target_second?.toFixed(2)}`}
                  </StockGraphPrice>
                </StockGraphTextWrapper>
              </StockGraphBottomWrapper>
            </StockGraphWrapper>
          )}
        </StockBoxWrapper>
      </Button>
    </>
  );
}

const StockBoxWrapper = styled.div`
  display: flex;
  padding: ${theme.metrics.m4};
  border-radius: 16px;
  flex-direction: column;
  width: 100%;
`;

const StockBoxTopWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const StockBoxTextImgWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StockSubName = styled.div`
  color: #999999;
  ${theme.fonts.s12_w400};
  cursor: pointer;
  width: 100%;
  text-align: left;
  margin-left: 53px;
  margin-bottom: -${theme.metrics.m2};
`;

const StockName = styled.h1`
  cursor: pointer;
  ${theme.fonts.s18_w700};
`;

const StockTagWrapper = styled.div`
  margin-left: 53px;
  display: flex;
`;

const StockTag = styled.div`
  color: var(--tag-blue);
  font-size: ${theme.fonts.s12_w400};
  margin-right: ${theme.metrics.m2};
`;

const StockRatioWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StockPrice = styled.div`
  color: #444444;
  ${theme.fonts.s14_w400};
  margin-right: ${theme.metrics.m2};
  min-width: 100px;
  text-align: right;
`;

const StockRatio = styled.div`
  padding: ${theme.metrics.m1} ${theme.metrics.m2};
  background-color: var(--light-red);
  text-align: center;
  ${theme.fonts.s16_w700}
  color: var(--red);
  border-radius: 8px;
  height: 29px;
`;

const StockGrayWrapper = styled.div`
  width: 100%;
  background-color: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 18px;
  padding: ${theme.metrics.m2} 0px;
  margin-top: ${theme.metrics.m2};
  ${theme.fonts.s14_w400};
`;

const StockGrayTextRatio = styled.span`
  ${theme.fonts.s14_w700};
`;

const StockGraphWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${theme.metrics.m10};
`;

const StockGraphBarWrapper = styled.div``;

const StockGraphBar = styled.div`
  position: relative;
  width: 100%;
  background-color: var(--light-gray);
  height: 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const StockGraphBlueCircle = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid #0080ff;
  border-radius: 50%;
  background-color: white;
  z-index: 1;
`;
const StockGraphGrayCircle = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid #c9c6c6;
  border-radius: 50%;
  background-color: white;
  z-index: 1;
`;
const StockGraphRedCircle = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid #ff1d40;
  border-radius: 50%;
  background-color: white;
  z-index: 1;
`;

const StockGradient = styled.div`
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) -10%,
    rgba(255, 29, 64, 1) 100%
  );
  height: 12px;
  left: 38%;
  position: absolute;
  border-radius: 8px;
`;
const StockGradientBlue = styled.div`
  background: linear-gradient(
    270deg,
    rgba(0, 128, 255, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  height: 12px;
  left: 38%;
  position: absolute;
  border-radius: 8px;
  transform: rotate(-180deg);
  transform-origin: left top;
  top: 12px;
`;

const StockGraphBottomWrapper = styled.div`
  margin-top: ${theme.metrics.m2};
  display: flex;
  justify-content: space-around;
`;

const StockGraphTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 60px;
`;

const StockGraphText = styled.div`
  color: #707070;
  ${theme.fonts.s12_w400};
`;

const StockGraphPrice = styled.div`
  color: #707070;
  ${theme.fonts.s12_w400};
  margin-top: ${theme.metrics.m1};
`;

const StockFavoriteWrapper = styled.div`
  margin-left: 53px;
  ${theme.fonts.s12_w400};
  margin-bottom: ${theme.metrics.m1};
  display: flex;
`;

const StockDetailBarTextWrapper = styled.div`
  position: absolute;
  top: -30px;
  margin-left: -18px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const StockDetailBarText = styled.div`
  margin-bottom: -${theme.metrics.m2};
  min-width: 40px;
  ${theme.fonts.s14_w400};
`;

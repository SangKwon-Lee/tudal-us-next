import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { ArrowDropDown } from "@mui/icons-material";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/router";
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
import { tag } from "../../commons/util/func/tag";
import {
  Alerts,
  PastStockBest,
  PastStockBestPicks,
} from "../../commons/util/type/type";
import { RootState } from "../../store";

interface Props {
  isExchange: boolean;
  alerts: Alerts[];
  data: PastStockBest;
}
export default function PastStockCard(props: Props) {
  const { isExchange, alerts, data } = props;
  const router = useRouter();
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const { isSub } = userInfo;

  // * 환율 정보 데이터
  const { exchangeData } = useSelector(
    (state: RootState) => state.exchangeData
  );
  return (
    <>
      <PastPickWrapper>
        {!isSub && (
          <IsSubWrapper>
            <IsSubText>
              투달유에스 서비스 구독 후 이용하실 수 있습니다
            </IsSubText>
            <IsSubBtn onClick={() => router.push("/paymentcash")}>
              구독하기
            </IsSubBtn>
          </IsSubWrapper>
        )}
        {Array.isArray(data.picks) &&
          data.picks.length > 0 &&
          data.picks.map((item: PastStockBestPicks, index: any) => (
            <Button
              disabled={!isSub}
              sx={{ backgroundColor: "white" }}
              css={css`
                display: flex;
                margin: ${theme.metrics.m2} 0 !important;
                width: 100%;
                flex-direction: column;
                padding: ${theme.metrics.m4} ${theme.metrics.m5};
                border-radius: 12px;
                margin-bottom: ${theme.metrics.m5};
                cursor: pointer;
              `}
              key={index}
              style={{ marginTop: "10px", marginBottom: "5px" }}
              onClick={() => {
                router.push(`/usa-quotes/${item?.symbol}-stock`);
              }}
            >
              {isSub && <StockSubName>{item?.companyName_kor}</StockSubName>}
              <PastPickTopWrapper>
                {isSub ? (
                  <StockBoxTextImgWrapper>
                    <Icon
                      width={43}
                      height={43}
                      style={{
                        marginRight: theme.metrics.m3,
                        borderRadius: "50%",
                      }}
                      src={item?.url ? item?.url : "./images/stockImg.webp"}
                    />
                    <StockName>{item?.symbol}</StockName>
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
                <StockBestContentsRatioWrapper>
                  <StockRatioWrapper>
                    <StockPrice>
                      {isExchange
                        ? `${priceToString(
                            (
                              Number(item?.price) *
                              Number(exchangeData.currency)
                            ).toFixed(0)
                          )}원`
                        : `$${item?.price}`}
                    </StockPrice>
                    {item?.changePercent || item?.changePercent === 0 ? (
                      <StockRatio
                        style={{
                          color: ratioColor(item?.changePercent),
                          backgroundColor: ratioBgColor(item?.changePercent),
                        }}
                      >
                        {ratioText(item?.changePercent)}
                      </StockRatio>
                    ) : (
                      <></>
                    )}
                  </StockRatioWrapper>
                </StockBestContentsRatioWrapper>
              </PastPickTopWrapper>
              {isSub && (
                <StockBestContentsTag
                  style={{
                    marginLeft: "110px",
                    marginTop: "-8px",
                  }}
                >
                  {tag(item?.tag_kor)}
                </StockBestContentsTag>
              )}
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
                          35 +
                          GradienWidthFunc(
                            item?.price,
                            item?.stoploss,
                            item?.target_first,
                            item?.target_second,
                            item?.recommend_price
                          )
                        }%`,
                      }}
                    >
                      <StockDetailBarText>현재가</StockDetailBarText>
                      <ArrowDropDown />
                    </StockDetailBarTextWrapper>
                    {GradienWidthFunc(
                      item?.price,
                      item?.stoploss,
                      item?.target_first,
                      item?.target_second,
                      item?.recommend_price
                    ) > 0 ? (
                      <StockGradient
                        style={{
                          width: `${GradienWidthFunc(
                            item?.price,
                            item?.stoploss,
                            item?.target_first,
                            item?.target_second,
                            item?.recommend_price
                          )}%`,
                        }}
                      ></StockGradient>
                    ) : (
                      <StockGradientBlue
                        style={{
                          width: `${Math.abs(
                            GradienWidthFunc(
                              item?.price,
                              item?.stoploss,
                              item?.target_first,
                              item?.target_second,
                              item?.recommend_price
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
                    <StockGraphPrice>{`$${item?.stoploss?.toFixed(
                      2
                    )}`}</StockGraphPrice>
                  </StockGraphTextWrapper>
                  <StockGraphTextWrapper>
                    <StockGraphText>매수가</StockGraphText>
                    <StockGraphPrice>
                      {`$${item?.recommend_price?.toFixed(2)}`}
                    </StockGraphPrice>
                  </StockGraphTextWrapper>
                  <StockGraphTextWrapper>
                    <StockGraphText>1차 목표</StockGraphText>
                    <StockGraphPrice>
                      {`$${item?.target_first?.toFixed(2)}`}
                    </StockGraphPrice>
                  </StockGraphTextWrapper>
                  <StockGraphTextWrapper>
                    <StockGraphText>2차 목표</StockGraphText>
                    <StockGraphPrice>
                      {`$${item?.target_second?.toFixed(2)}`}
                    </StockGraphPrice>
                  </StockGraphTextWrapper>
                </StockGraphBottomWrapper>
              </StockGraphWrapper>
              {alerts.length > 0 &&
              alerts
                .filter((alerts) => alerts.symbol === item.symbol)
                .filter((alert) => alert.recommend_date === data.date)
                .filter((alert) => alert.short_contents !== 0).length > 0 ? (
                <StockAlertWrapper>
                  {alerts
                    .filter((alerts) => alerts.symbol === item.symbol)
                    .filter((alert) => alert.short_contents !== 0)
                    .map((alert, index) => (
                      <StockAlertContentsWrapper key={index}>
                        <StockAlertDate>
                          {dayjs(alert.updated_at).format("YY.MM.DD")}
                        </StockAlertDate>
                        <StockAlertContents>
                          {alert.short_contents}
                        </StockAlertContents>
                        <StockAlertChangePercent
                          style={{
                            color: ratioColor(alert.change_percent),
                          }}
                        >
                          {(alert.change_percent * 100).toFixed(2)}%
                        </StockAlertChangePercent>
                      </StockAlertContentsWrapper>
                    ))}
                </StockAlertWrapper>
              ) : (
                <StockAlertWrapper>
                  <StockAlertDate>알림이 없습니다</StockAlertDate>
                </StockAlertWrapper>
              )}
            </Button>
          ))}
      </PastPickWrapper>
    </>
  );
}

const PastPickWrapper = styled.div`
  height: 100%;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  z-index: 0;
`;

const StockPrice = styled.div`
  color: #444444;
  ${theme.fonts.s14_w400};
  margin-right: ${theme.metrics.m2};
  min-width: 100px;
  text-align: right;
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

const IsSubWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const IsSubText = styled.div``;

const IsSubBtn = styled.button`
  margin-top: 8px;
  background-color: #ff1d40;
  color: white;
  padding: 8px 30px;
  border-radius: 16px;
`;

const StockBestContentsTag = styled.div`
  color: var(--tag-blue);
  font-size: ${theme.fonts.s12_w400};
  width: 100%;
  display: flex;
`;

const StockBestContentsRatioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
// * 알림 부분
const StockAlertWrapper = styled.div`
  width: 100%;
  padding: ${theme.metrics.m2} ${theme.metrics.m4};
  background-color: #f2f2f2;
  border-radius: 10px;
  margin: ${theme.metrics.m2} 0px;
`;

const StockAlertContentsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${theme.metrics.m3} 0px;
`;

const StockAlertDate = styled.div`
  ${theme.fonts.s12_w400};
`;

const StockAlertContents = styled.div`
  ${theme.fonts.s12_w700};
  flex: 2;
`;

const StockAlertChangePercent = styled.div`
  ${theme.fonts.s12_w700};
  flex: 0.6;
  text-align: end;
`;

const PastPickTopWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  margin-left: 110px;
  margin-bottom: -${theme.metrics.m2};
`;

const StockName = styled.h1`
  cursor: pointer;
  ${theme.fonts.s18_w700};
`;

const StockRatioWrapper = styled.div`
  display: flex;
  align-items: center;
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

const StockGraphWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: ${theme.metrics.m12};
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
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 29, 64, 1) 100%
  );
  width: 10%;
  height: 12px;
  left: 38%;
  position: absolute;
  border-radius: 8px;
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
  text-align: center;
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

const StockDetailBarTextWrapper = styled.div`
  position: absolute;
  top: -30px;
  margin-left: 0px;
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

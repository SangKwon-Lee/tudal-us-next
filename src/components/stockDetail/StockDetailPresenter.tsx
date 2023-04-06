import React, { useState } from "react";
import {
  CircleIcon,
  ModalLine,
  ModalLogo,
  ModalSubTitle,
  ModalTitle,
  ModalTitleWrapper,
  NoDividendText,
  NoDividendWrapper,
  StckDetailPriceBlue,
  StckDetailPriceGray,
  StckDetailPriceRed,
  StockArrowIcon,
  StockDatailWrapper,
  StockDataLoading,
  StockDetailArrow,
  StockDetailArrowWrapper,
  StockDetailBar,
  StockDetailBarColor,
  StockDetailBarText,
  StockDetailBarTextWrapper,
  StockDetailBodySpan,
  StockDetailBodySub,
  StockDetailBodyTitle,
  StockDetailBodyTitleWrapper,
  StockDetailBodyWrapper,
  StockDetailChange,
  StockDetailContentsWrapper,
  StockDetailDivision,
  StockDetailFinanceBtn,
  StockDetailFinanceBtnWrapper,
  StockDetailFinanceColorBlue,
  StockDetailFinanceColorRed,
  StockDetailFinanceColorYellow,
  StockDetailFinanceRightWrapper,
  StockDetailFinanceText,
  StockDetailFinanceTitle,
  StockDetailFinanceWrapper,
  StockDetailHeader,
  StockDetailHeaderContentsWrapper,
  StockDetailHeaderLeftWrapper,
  StockDetailHeart,
  StockDetailLogo,
  StockDetailLogoWrapper,
  StockDetailMaxMinTextLeftWrapper,
  StockDetailMaxMinTextRightWrapper,
  StockDetailMinMaxPriceWrapper,
  StockDetailNowPriceWrapper,
  StockDetailPrice,
  StockDetailPriceWrapper,
  StockDetailRatio,
  StockDetailSubTitle,
  StockDetailTag,
  StockDetailText,
  StockDetailTextWrapper,
  StockDetailTitle,
  StockDetailTitleWrapper,
  StockDetailWhiteBox,
  StockDivideLine,
  StockDividendLine,
  StockDividendSpan,
  StockDividendText,
  StockDividendWrapper,
  StockPeerContents,
  StockPeerContentsWrapper,
  StockPeerLogo,
  StockPeerName,
  StockPeerRatio,
  StockPeerTitle,
  StockPeerWrapper,
} from "./StockDetailStyle";
import PastChart, {
  PastSimilarityContentsWrapper,
  PastSimilarityLine,
  PastSimilarityNum,
  PastSimilarityText,
  PastSimilarityWrapper,
} from "../chart/PastChart";
import {
  CosData,
  PastData,
  PredictionData,
  StockData,
} from "../../commons/util/type/type";
import { useRouter } from "next/router";
import Exchange from "../layout/Exchange";
import { tag } from "../../commons/util/func/tag";
import { ArrowDropDown } from "@mui/icons-material";
import { Box, Typography, Modal, Button } from "@mui/material";
import Image from "next/image";
import {
  ratioColor,
  ratioText,
} from "../../commons/util/func/ratioColorAndText";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { priceToString } from "../../commons/util/func/priceToString";
import usePostMyFavorite from "../../commons/util/func/usePostMyFavorite";
import { dividendChangeKr } from "../../commons/util/func/dividendChangeKr";
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
  BarElement,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { Baroptions, optionsLine } from "../chart/options";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
interface IStockDetailProps {
  cosData: CosData;
  pastNum: string;
  pastDate: {
    index: number;
    end_date: string;
    start_date: string;
  };

  selectBar: {
    safe: string;
    growth: string;
  };
  BarQLabel: string[];
  BarYLabel: string[];
  BarIncomeQ: {
    순이익: never[];
    영업이익: never[];
    총매출: never[];
  };
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
  BarBalanceQ: {
    총자산: never[];
    총부채: never[];
    총자기자본: never[];
  };
  pastData: PastData;
  isExchange: boolean;
  stockData: StockData;
  stockLoading?: boolean;
  pastChartData: number[];
  pastTimeLabel: string[];
  indexChartData: number[];
  pastChartAfter: number[];
  indexTimeLabel: string[];
  indexWeightChart: number[];
  indexMaxChartData: number[];
  indexMinChartData: number[];
  handleIsExchange: () => void;
  predictionData: PredictionData;
  handlePastNum: (e: any) => void;
  handleSelectBar: (e: any) => void;
  handlePastDate: (start: string, end: string, index: number) => void;
}
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "400px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  border: "none",
  borderRadius: "16px",
  outline: "none",
};

const StockDetailPresenter: React.FC<IStockDetailProps> = ({
  cosData,
  pastNum,
  pastDate,
  pastData,
  stockData,
  selectBar,
  isExchange,
  BarQLabel,
  BarYLabel,
  BarIncomeQ,
  BarIncomeY,
  BarBalanceQ,
  BarBalanceY,
  stockLoading,
  handlePastNum,
  pastChartData,
  pastTimeLabel,
  handlePastDate,
  predictionData,
  indexChartData,
  indexTimeLabel,
  pastChartAfter,
  handleSelectBar,
  handleIsExchange,
  indexWeightChart,
  indexMaxChartData,
  indexMinChartData,
}) => {
  const router = useRouter();
  const { isSub, isLoading } = useSelector(
    (state: RootState) => state.userInfo
  );
  const { PostMyFavorites, myFavorites } = usePostMyFavorite();
  // * 환율 정보 데이터
  const { exchangeData } = useSelector(
    (state: RootState) => state.exchangeData
  );
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // * 현재가 그래프 데이터
  let GradientWidth =
    (100 * (Number(stockData.pricenow) - stockData.week52low)) /
    (stockData.week52high - stockData.week52low);

  if (GradientWidth < 0) {
    GradientWidth = 0;
  } else if (GradientWidth > 96) {
    GradientWidth = 97;
  }

  const newTag = tag(stockData.tag_kor || "");
  const datasets = {
    labels: indexTimeLabel,
    datasets: [
      {
        label: "현재가",
        data: indexChartData,
        borderColor: "#000",
        pointRadius: 0,
      },
      {
        label: "예측최고",
        data: indexMaxChartData,
        borderColor: "#D62727",
        backgroundColor: "#D62727",
        pointRadius: 0,
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
        pointRadius: 0,
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
        pointRadius: 0,
      },
    ],
  };

  const BardatasetsIncome = {
    labels: selectBar.growth === "연간" ? BarYLabel : BarQLabel,
    datasets:
      selectBar.growth === "연간"
        ? [
            {
              label: "순이익",
              data: BarIncomeY.순이익,
              backgroundColor: "#85f3e8",
            },
            {
              label: "매출액",
              data: BarIncomeY.총매출,
              backgroundColor: "#f8e495",
            },
          ]
        : [
            {
              label: "순이익",
              data: BarIncomeQ.순이익,
              backgroundColor: "#85f3e8",
            },
            {
              label: "매출액",
              data: BarIncomeQ.총매출,
              backgroundColor: "#f8e495",
            },
          ],
  };

  const BardatasetsBalance = {
    labels: selectBar.safe === "연간" ? BarYLabel : BarQLabel,
    datasets:
      selectBar.safe === "연간"
        ? [
            {
              label: "자본",
              data: BarBalanceY.총자기자본,
              backgroundColor: "#f8b995",
            },
            {
              label: "부채",
              data: BarBalanceY.총부채,
              backgroundColor: "#85f3e8",
            },
            {
              label: "자산",
              data: BarBalanceY.총자산,
              backgroundColor: "#f8e495",
            },
          ]
        : [
            {
              label: "자본",
              data: BarBalanceQ.총자기자본,
              backgroundColor: "#f8b995",
            },
            {
              label: "부채",
              data: BarBalanceQ.총부채,
              backgroundColor: "#85f3e8",
            },
            {
              label: "자산",
              data: BarBalanceQ.총자산,
              backgroundColor: "#f8e495",
            },
          ],
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );

  return (
    <>
      <StockDatailWrapper>
        <>
          <StockDetailHeader>
            <StockDetailArrowWrapper>
              <StockDetailArrow
                src="/assets/images/iconBack.svg"
                onClick={() => {
                  router.push(`/`);
                }}
              />
              <StockDetailHeart
                onClick={() =>
                  PostMyFavorites(stockData?.symbol, Number(stockData.pricenow))
                }
                alt="heart"
                src={
                  myFavorites.filter((favo) => favo.symbol === stockData.symbol)
                    .length > 0
                    ? "/assets/images/heart.svg"
                    : "/assets/images/heartGray.svg"
                }
              />
            </StockDetailArrowWrapper>
            <StockDetailHeaderContentsWrapper>
              {!isLoading && (
                <>
                  {!isSub ? (
                    <>
                      <MapIsSubWrapper>
                        <BigStockIsSubImg
                          alt="blur"
                          src={"/assets/images/blur_detail.png"}
                        />
                        <MapSubText style={{ top: 0 }}>
                          투달유에스 서비스 구독 후 이용하실 수 있습니다
                        </MapSubText>
                        <MapSubBtn
                          style={{ top: "0", marginTop: "30px" }}
                          onClick={() => router.push("/paymentcash")}
                        >
                          구독하기
                        </MapSubBtn>
                      </MapIsSubWrapper>
                    </>
                  ) : (
                    <>
                      <StockDetailHeaderLeftWrapper>
                        <StockDetailLogoWrapper onClick={handleOpen}>
                          <StockDetailLogo
                            src={stockData.logo}
                            alt="logo"
                          ></StockDetailLogo>
                          <StockDetailText>회사 소개</StockDetailText>
                        </StockDetailLogoWrapper>
                        <StockDetailContentsWrapper>
                          <StockDetailTitleWrapper>
                            <StockDetailTitle>
                              {stockData.symbol}
                            </StockDetailTitle>
                            <StockDetailSubTitle>
                              {stockData.company_kor}
                            </StockDetailSubTitle>
                          </StockDetailTitleWrapper>
                          <StockDetailPriceWrapper>
                            <StockDetailPrice>
                              {isExchange
                                ? priceToString(
                                    (
                                      Number(stockData.pricenow) *
                                      Number(exchangeData.currency)
                                    ).toFixed(2)
                                  ) + "원"
                                : `$${stockData.pricenow}`}
                            </StockDetailPrice>
                            <div style={{ display: "flex" }}>
                              <StockDetailRatio
                                style={{
                                  color: ratioColor(stockData.changePercent),
                                }}
                              >
                                {ratioText(stockData.changePercent)}
                              </StockDetailRatio>
                              <StockDetailChange
                                style={{
                                  color: ratioColor(stockData.change),
                                }}
                              >
                                (
                                {stockData.change >= 0 ? (
                                  <StockArrowIcon
                                    src={"/assets/images/smallRed.svg"}
                                    alt="red"
                                  ></StockArrowIcon>
                                ) : (
                                  <StockArrowIcon
                                    alt="blue"
                                    src={"/assets/images/smallBlue.svg"}
                                  ></StockArrowIcon>
                                )}
                                {stockData.change})
                              </StockDetailChange>
                            </div>
                          </StockDetailPriceWrapper>
                          <StockDetailTag>{newTag}</StockDetailTag>
                        </StockDetailContentsWrapper>
                      </StockDetailHeaderLeftWrapper>
                      <Button
                        onClick={handleIsExchange}
                        css={css`
                          border-radius: 30px;
                          color: #212121;
                        `}
                        sx={{ backgroundColor: "#f2f2f2" }}
                      >
                        <CircleIcon
                          src={"/assets/images/wonCircle.svg"}
                          alt="won"
                        />
                        {!isExchange ? "원화" : "달러"}
                      </Button>
                    </>
                  )}
                </>
              )}
            </StockDetailHeaderContentsWrapper>
            <StockDetailNowPriceWrapper>
              <StockDetailBar>
                <StockDetailBarTextWrapper
                  style={{ left: `${GradientWidth}%` }}
                >
                  <StockDetailBarText>현재가</StockDetailBarText>
                  <ArrowDropDown />
                </StockDetailBarTextWrapper>
                <StockDetailBarColor
                  style={{ width: `${GradientWidth}%` }}
                ></StockDetailBarColor>
                {[
                  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                  18, 19, 20,
                ].map((data) => (
                  <StockDetailDivision
                    key={data}
                    left={data}
                  ></StockDetailDivision>
                ))}
              </StockDetailBar>
            </StockDetailNowPriceWrapper>
            <StockDetailMinMaxPriceWrapper>
              <StockDetailMaxMinTextLeftWrapper>
                <StckDetailPriceBlue>
                  {isExchange
                    ? priceToString(
                        (
                          Number(stockData.week52low) *
                          Number(exchangeData.currency)
                        ).toFixed(2)
                      ) + "원"
                    : `$${stockData.week52low}`}
                </StckDetailPriceBlue>
                <StckDetailPriceGray>52주 최저가</StckDetailPriceGray>
              </StockDetailMaxMinTextLeftWrapper>
              <StockDetailMaxMinTextRightWrapper>
                <StckDetailPriceRed>
                  {isExchange
                    ? priceToString(
                        (
                          Number(stockData.week52high) *
                          Number(exchangeData.currency)
                        ).toFixed(2)
                      ) + "원"
                    : `$${stockData.week52high}`}
                </StckDetailPriceRed>
                <StckDetailPriceGray>52주 최고가</StckDetailPriceGray>
              </StockDetailMaxMinTextRightWrapper>
            </StockDetailMinMaxPriceWrapper>
          </StockDetailHeader>
          <StockDetailBodyWrapper>
            <StockDetailBodyTitleWrapper>
              <StockDetailTextWrapper>
                <div>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <CloseIcon
                          sx={{ cursor: "pointer" }}
                          onClick={handleClose}
                        />
                      </div>
                      <ModalLogo alt="logo" src={stockData.logo}></ModalLogo>
                      <ModalTitleWrapper>
                        <ModalTitle>{stockData.company_kor}</ModalTitle>
                        <ModalSubTitle>{stockData.symbol}</ModalSubTitle>
                        <ModalLine></ModalLine>
                      </ModalTitleWrapper>
                      <Typography
                        id="modal-modal-description"
                        sx={{ mt: 2, overflow: "scroll", height: "400px" }}
                      >
                        {stockData.description}
                      </Typography>
                    </Box>
                  </Modal>
                </div>
                <StockDetailBodyTitle>
                  주가<StockDetailBodySpan> 예측해볼까?</StockDetailBodySpan>
                </StockDetailBodyTitle>
              </StockDetailTextWrapper>
              <StockDetailBodySub>
                최근 3개월 수익률 기준이에요
              </StockDetailBodySub>
            </StockDetailBodyTitleWrapper>
            <StockDetailWhiteBox>
              {!isLoading && (
                <>
                  {isSub ? (
                    <>
                      {indexTimeLabel.length > 0 && (
                        //@ts-ignore
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
                                (predictionData.minPrice -
                                  predictionData.lastPrice)) /
                                predictionData.lastPrice
                            )}
                          </PastSimilarityNum>
                        </PastSimilarityContentsWrapper>
                        <PastSimilarityLine />
                        <PastSimilarityContentsWrapper>
                          <PastSimilarityText>예측치</PastSimilarityText>
                          <PastSimilarityNum>
                            $
                            {priceToString(
                              predictionData.weightAverage.toFixed(2)
                            )}
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
                                (predictionData.maxPrice -
                                  predictionData.lastPrice)) /
                                predictionData.lastPrice
                            )}
                          </PastSimilarityNum>
                        </PastSimilarityContentsWrapper>
                      </PastSimilarityWrapper>
                    </>
                  ) : (
                    <MapIsSubWrapper>
                      <IndexIsSubImg
                        src={"/assets/images/blur_chart.png"}
                        alt="blurchart"
                      />
                      <MapSubText>
                        투달유에스 서비스 구독 후 이용하실 수 있습니다
                      </MapSubText>
                      <MapSubBtn onClick={() => router.push("/paymentcash")}>
                        구독하기
                      </MapSubBtn>
                    </MapIsSubWrapper>
                  )}
                </>
              )}
            </StockDetailWhiteBox>
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
            <StockDetailWhiteBox style={{ paddingTop: "10px" }}>
              <StockDivideLine style={{ marginTop: "5px" }} />
              <StockDetailFinanceTitle>
                성장하고 있는 기업일까?
              </StockDetailFinanceTitle>
              <StockDetailFinanceWrapper>
                <StockDetailFinanceBtnWrapper>
                  <StockDetailFinanceBtn
                    id="growth"
                    value="연간"
                    onClick={handleSelectBar}
                    selectBar={selectBar.growth === "연간"}
                  >
                    연간
                  </StockDetailFinanceBtn>
                  <StockDetailFinanceBtn
                    id="growth"
                    value="분기"
                    onClick={handleSelectBar}
                    selectBar={selectBar.growth === "분기"}
                  >
                    분기
                  </StockDetailFinanceBtn>
                </StockDetailFinanceBtnWrapper>
                <StockDetailFinanceRightWrapper>
                  <StockDetailFinanceColorBlue></StockDetailFinanceColorBlue>
                  <StockDetailFinanceText>순이익</StockDetailFinanceText>
                  <StockDetailFinanceColorYellow></StockDetailFinanceColorYellow>
                  <StockDetailFinanceText>매출액</StockDetailFinanceText>
                </StockDetailFinanceRightWrapper>
              </StockDetailFinanceWrapper>
              {/* @ts-ignore */}
              <Bar options={Baroptions} data={BardatasetsIncome} />
              <StockDivideLine />
              <StockDetailFinanceTitle>
                안정적인 기업일까?
              </StockDetailFinanceTitle>
              <StockDetailFinanceWrapper>
                <StockDetailFinanceBtnWrapper>
                  <StockDetailFinanceBtn
                    id="safe"
                    value="연간"
                    onClick={handleSelectBar}
                    selectBar={selectBar.safe === "연간"}
                  >
                    연간
                  </StockDetailFinanceBtn>
                  <StockDetailFinanceBtn
                    id="safe"
                    value="분기"
                    onClick={handleSelectBar}
                    selectBar={selectBar.safe === "분기"}
                  >
                    분기
                  </StockDetailFinanceBtn>
                </StockDetailFinanceBtnWrapper>
                <StockDetailFinanceRightWrapper>
                  <StockDetailFinanceColorBlue></StockDetailFinanceColorBlue>
                  <StockDetailFinanceText>자본</StockDetailFinanceText>
                  <StockDetailFinanceColorYellow></StockDetailFinanceColorYellow>
                  <StockDetailFinanceText>부채</StockDetailFinanceText>
                  <StockDetailFinanceColorRed></StockDetailFinanceColorRed>
                  <StockDetailFinanceText>자산</StockDetailFinanceText>
                </StockDetailFinanceRightWrapper>
              </StockDetailFinanceWrapper>
              {/* @ts-ignore */}
              <Bar options={Baroptions} data={BardatasetsBalance} />
              <StockDivideLine />
              <StockDetailFinanceTitle>
                배당금은 쏠쏠하게 줄까?
              </StockDetailFinanceTitle>
              {stockData.dividend.length !== 0 ? (
                <>
                  <StockDividendWrapper>
                    <StockDividendText>
                      배당 주기 :
                      <StockDividendSpan>{`${dividendChangeKr(
                        stockData.dividend[0].frequency
                      )}`}</StockDividendSpan>
                    </StockDividendText>
                    <StockDividendLine></StockDividendLine>
                    <StockDividendText>
                      한 주당
                      <StockDividendSpan>
                        {isExchange
                          ? priceToString(
                              (
                                stockData.dividend[0].amount *
                                Number(exchangeData.currency)
                              ).toFixed(2)
                            ) + "원"
                          : `$${stockData.dividend[0].amount}`}
                      </StockDividendSpan>
                    </StockDividendText>
                  </StockDividendWrapper>
                  {stockData.nextdividend && (
                    <StockDividendText style={{ fontSize: "12px" }}>
                      <StockDividendSpan
                        style={{ paddingLeft: 0, fontSize: "12px" }}
                      >{`${stockData.nextdividend}`}</StockDividendSpan>
                      까지 사면 배당금을 받을 수 있어요!
                    </StockDividendText>
                  )}
                </>
              ) : (
                <>
                  <NoDividendWrapper>
                    <Image
                      width={100}
                      height={100}
                      src={"/assets/images/pig.svg"}
                      alt="pig"
                    ></Image>
                    <NoDividendText>이 종목은 배당금이 없어요</NoDividendText>
                  </NoDividendWrapper>
                </>
              )}
            </StockDetailWhiteBox>
            <StockPeerWrapper>
              <StockPeerTitle>비슷한 사업을 하는 기업은 ?</StockPeerTitle>
              <StockPeerContentsWrapper>
                {Array.isArray(stockData.peer) &&
                  stockData.peer.length > 1 &&
                  stockData.peer.map((data) => (
                    <StockPeerContents
                      key={data.url}
                      onClick={() =>
                        router.push(`/usa-quotes/${data.symbol}-stock`)
                      }
                    >
                      <StockPeerLogo src={data.url} alt="logo" />
                      <StockPeerName>{data.symbol}</StockPeerName>

                      <StockPeerRatio>${data.price}</StockPeerRatio>
                    </StockPeerContents>
                  ))}
              </StockPeerContentsWrapper>
            </StockPeerWrapper>
          </StockDetailBodyWrapper>
        </>
      </StockDatailWrapper>
    </>
  );
};

export default StockDetailPresenter;

const MapIsSubImg = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const MapSubText = styled.div`
  position: absolute;
  font-size: 13px;
  font-weight: 700;
`;

const MapSubBtn = styled.button`
  position: absolute;
  width: 100px;
  height: 40px;
  top: 60%;
  background-color: #ff3838;
  z-index: 999;
  border-radius: 10px;
  color: white;
  cursor: pointer;
`;

const BigStockIsSubImg = styled.img`
  @media (max-width: 640px) {
    width: 50%;
  }
  width: 30%;
`;

const IndexIsSubImg = styled.img`
  width: 100%;
  height: 400px;
  object-fit: contain;
`;

const MapIsSubWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

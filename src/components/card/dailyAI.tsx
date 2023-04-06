import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import MainTitle from "../layout/MainTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, A11y } from "swiper";
import { Alerts, PastStockBest, StockRec } from "../../commons/util/type/type";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import theme from "../../commons/theme";
import axios from "axios";
import PastStockCard from "./pastStock";
import StockCard from "./stock";
import FadeIn from "react-fade-in";
import { apiServer } from "../../commons/axios/axios";
const CustomSwiperSlide = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
`;

const CustomSwiper = styled(Swiper)`
  .swiper-button-next,
  .swiper-button-prev {
    color: black;
    outline: 0;
  }
  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 20px;
  }
`;

interface Props {
  stockRec: StockRec;
}

export default function DailyAICard(props: Props) {
  const { stockRec } = props;
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const { isSub } = userInfo;
  const swiperRef = useRef(null);

  // //* 종목 과거 베스트 데이터
  const [pastStockBest, setPastStockBest] = useState<PastStockBest[]>([]);
  //* 알림
  const [alerts, setAlerts] = useState<Alerts[]>([]);

  //* React-Swiper-Index
  const [swiperIndex, setSwiperIndex] = useState<number>(0);

  // * 환율 가격으로 보기
  const [isExchange, setIsExchange] = useState(false);

  // * 환율로 보기 버튼
  const handleIsExchange = () => {
    setIsExchange(() => !isExchange);
  };

  // * 과거 베스트픽 함수
  const getPastStock = useCallback(async () => {
    try {
      const { data, status } = await apiServer.get(
        `/tudalus/stock/3picks/history`
      );
      if (status === 200 && data.data.picks_df) {
        setPastStockBest(data.data.picks_df);
      }
    } catch (e) {}
  }, []);

  // * 알림 받아오는 함수
  const getAlerts = useCallback(async () => {
    try {
      const { data } = await apiServer.get(`/tudalus/stock/alarm`);
      if (data.data.alarm) {
        setAlerts(data.data.alarm);
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    getAlerts();
    getPastStock();
  }, [getPastStock, getAlerts]);

  return (
    <>
      <BackGround>
        <StockRecWrapper>
          <FadeIn>
            <MainTitle
              title={"데일리 A.I"}
              subTitle={"예측 Pick.3"}
              isButton={true}
              buttonText={isExchange ? "달러" : "원화"}
              handleButtonClick={handleIsExchange}
            />

            {stockRec &&
              Array.isArray(pastStockBest) &&
              pastStockBest.length > 0 && (
                <SwiperWrapper>
                  <CustomSwiper
                    loop={true}
                    spaceBetween={0}
                    navigation
                    color={String(swiperIndex)}
                    centeredSlides={true}
                    modules={[Navigation, Scrollbar, A11y]}
                    slidesPerView={1}
                    observer={true}
                    watchSlidesProgress={true}
                    observeParents={true}
                    pagination={{
                      clickable: true,
                    }}
                    onSwiper={(event) => {
                      //@ts-ignore
                      swiperRef.current = event;
                      setSwiperIndex(0);
                    }}
                    onSlideChange={(event) => {
                      setSwiperIndex(event.realIndex);
                    }}
                  >
                    <CustomSwiperSlide>{stockRec.date}</CustomSwiperSlide>
                    {Array.isArray(pastStockBest) &&
                      pastStockBest.length > 0 &&
                      pastStockBest.map((data) => (
                        <CustomSwiperSlide key={data.date}>
                          {data.date}
                        </CustomSwiperSlide>
                      ))}
                  </CustomSwiper>
                </SwiperWrapper>
              )}
            <StockBestPickBack
              style={{
                marginBottom: 0,
                paddingBottom: 0,
                paddingTop: 0,
                marginTop: theme.metrics.m1,
              }}
            >
              {swiperIndex === 0 && (
                <>
                  {Array.isArray(stockRec.three_picks) &&
                  stockRec.three_picks.length > 0 ? (
                    <>
                      {stockRec.three_picks.map((data: any, index: any) => (
                        <StockCard
                          data={data}
                          isExchange={isExchange}
                          isRec={true}
                          key={index + data?.symbol}
                          sort={"AI 추천"}
                        />
                      ))}
                    </>
                  ) : (
                    <div style={{ height: "400px", marginTop: "30px" }}>
                      <StockBestNoData>Today Pick3은</StockBestNoData>
                      <StockBestNoData>
                        <StockBestNoDataBold>
                          한국시간 기준 14:00 이후
                        </StockBestNoDataBold>
                        에 공개됩니다
                      </StockBestNoData>
                    </div>
                  )}
                </>
              )}
            </StockBestPickBack>
            <StockBestPickBack>
              {Array.isArray(pastStockBest) &&
                pastStockBest.length > 1 &&
                pastStockBest
                  .filter((___, index) => index + 1 === swiperIndex)
                  .map((data: PastStockBest, index) => (
                    <PastStockCard
                      data={data}
                      key={index}
                      alerts={alerts}
                      isExchange={isExchange}
                    />
                  ))}
            </StockBestPickBack>
          </FadeIn>
        </StockRecWrapper>
      </BackGround>
    </>
  );
}

// * Swiper

const SwiperWrapper = styled.div`
  background-color: white;
  margin: 0px ${theme.metrics.m5};
  border-radius: 26px;
  height: 42px;
  display: flex;
  align-items: center;
  padding: 0px ${theme.metrics.m5};
`;

const BackGround = styled.div`
  width: 100%;
  background-color: ${theme.color.whiteGray};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StockRecWrapper = styled.div`
  max-width: 1100px;
  width: 100%;
  padding-top: ${theme.metrics.m10};
  padding-bottom: ${theme.metrics.m5};
  background-color: ${theme.color.whiteGray};
`;

const StockBestPickBack = styled.div`
  height: 100%;
  padding: 0 ${theme.metrics.m2} ${theme.metrics.m2};
  border-bottom-left-radius: ${theme.metrics.m4};
  border-bottom-right-radius: ${theme.metrics.m4};
  z-index: 0;
  margin: ${theme.metrics.m2} ${theme.metrics.m4};
`;
const StockBestNoData = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  ${theme.fonts.s16_w400};
  margin-top: ${theme.metrics.m1};
`;

const StockBestNoDataBold = styled.span`
  ${theme.fonts.s16_w700};
`;

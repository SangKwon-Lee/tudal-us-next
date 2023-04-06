import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useCallback, useState } from "react";
import MainTitle from "../layout/MainTitle";
import { useRouter } from "next/router";
import { priceToString } from "../../commons/util/func/priceToString";
import {
  ratioColor,
  ratioText,
} from "../../commons/util/func/ratioColorAndText";
import { tag } from "../../commons/util/func/tag";
import { StockBest } from "../../commons/util/type/type";
import theme from "../../commons/theme";
import Icon from "../../commons/theme/icon";
import { Button } from "@mui/material";
import FadeIn from "react-fade-in";
interface Props {
  stockBest: StockBest[];
}

const StyledSlider = styled(Slider)`
  .slick-slide {
    outline: none; // 슬라이드 클릭시 파란선을 제거하기 위해서 작성
  }
  .slick-arrow {
    display: none;
  }
  .slick-disabled {
    display: none;
  }
  .slick-dots li {
    top: 17px;
  }
  .slick-dots li button:before {
    font-size: 12px;
    line-height: 12px;
  }
`;
export default function BestPickCard(props: Props) {
  const { stockBest } = props;
  const router = useRouter();
  const [dragging, setDragging] = useState(false);
  const handleAfterChange = useCallback(() => {
    setDragging(false);
  }, [setDragging]);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    slidesToShow: 1,
    speed: 500,
    mobileFirst: true,
    autoplay: true,
    autoplaySpeed: 3000,
    draggable: true,
    centerPadding: "75px",
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    // beforeChange: handleBeforeChange,
    afterChange: handleAfterChange,
    responsive: [
      {
        breakpoint: 5000,
        settings: {
          slidesToShow: 3,
          centerMode: false,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 360,
        settings: {
          centerPadding: "50px",
        },
      },
    ],
  };

  const onClickCard = (e: any) => {
    if (dragging) {
      return;
    } else {
      router.push(`/usa-quotes/${e}-stock`);
    }
  };
  return (
    <>
      <BackGround>
        <StockRecWrapper>
          <FadeIn>
            <MainTitle
              title={"Tudal US"}
              subTitle={"Best Pick.3"}
              isButton={true}
              buttonText={"더 보기"}
              handleButtonClick={() => router.push("/stockBest")}
            />

            <StockRecSlideWrapper>
              <StyledSlider {...settings}>
                {Array.isArray(stockBest) &&
                  stockBest.length > 1 &&
                  stockBest.map((data, index) => (
                    <div key={data.companyName_kor}>
                      <Button
                        css={css`
                          @media (max-width: 640px) {
                            max-width: 220px;
                          }
                          overflow: hidden;
                          max-width: 270px;
                          min-width: 210px;
                          width: 100%;
                          background-color: white;
                          display: flex;
                          flex-direction: column;
                          justify-content: center;
                          align-items: center;
                          border-radius: 18px;
                          padding-top: ${theme.metrics.m5};
                          padding-bottom: ${theme.metrics.m5};
                          margin: auto;
                          cursor: pointer;
                          z-index: 1;
                          :hover {
                            background-color: #eaeaea;
                          }
                        `}
                        id={String(data.symbol) + index}
                        onClick={() => onClickCard(data.symbol)}
                      >
                        <Icon
                          id={String(data.symbol)}
                          width={32.5}
                          height={22.5}
                          style={{ marginBottom: theme.metrics.m2 }}
                          src={
                            index === 0
                              ? "/assets/images/crown1.png"
                              : index === 1
                              ? "/assets/images/crwon2.png"
                              : "/assets/images/crown3.png"
                          }
                        />
                        <Icon
                          id={String(data.symbol)}
                          width={78}
                          height={78}
                          src={data.url}
                          onClick={() => onClickCard(data.symbol)}
                          style={{
                            borderRadius: "50%",
                            marginBottom: theme.metrics.m4,
                            cursor: "pointer",
                          }}
                        />
                        <StockRecBestTitle id={String(data.symbol)}>
                          {data.companyName_kor}
                        </StockRecBestTitle>
                        <StockRecBestSymbol
                          id={String(data.symbol)}
                          onClick={() => onClickCard(data.symbol)}
                        >
                          {data.symbol}
                        </StockRecBestSymbol>
                        <StockRecBestTag id={String(data.symbol)}>
                          {tag(data.tag_kor)}
                        </StockRecBestTag>
                        <StockRecBestRatio
                          id={String(data.symbol)}
                          style={{
                            color: ratioColor(data.max_changepercent),
                            marginBottom: theme.metrics.m4,
                            marginTop: theme.metrics.m4,
                          }}
                        >
                          {ratioText(data.max_changepercent)}
                        </StockRecBestRatio>
                        <StockRecBestBottomWrapper id={String(data.symbol)}>
                          <StockRecBestPriceWrapper id={String(data.symbol)}>
                            <StockRecBestPriceText id={String(data.symbol)}>
                              매수가
                            </StockRecBestPriceText>
                            <StockRecBestPrice id={String(data.symbol)}>
                              ${priceToString(data.recommend_price)}
                            </StockRecBestPrice>
                          </StockRecBestPriceWrapper>
                          <StockRecBestLine />
                          <StockRecBestPriceWrapper id={String(data.symbol)}>
                            <StockRecBestPriceText id={String(data.symbol)}>
                              5일내 최고가
                            </StockRecBestPriceText>
                            <StockRecBestPrice id={String(data.symbol)}>
                              ${priceToString(data.max_price)}
                            </StockRecBestPrice>
                          </StockRecBestPriceWrapper>
                        </StockRecBestBottomWrapper>
                        <StockBestDateBottom id={String(data.symbol)}>
                          매수일 : {data.recommendDate}
                        </StockBestDateBottom>
                      </Button>
                    </div>
                  ))}
              </StyledSlider>
            </StockRecSlideWrapper>
          </FadeIn>
        </StockRecWrapper>
      </BackGround>
    </>
  );
}
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

const StockRecSlideWrapper = styled.div`
  margin-bottom: ${theme.metrics.m10};
`;

const StockRecBestWrapper = styled.div`
  @media (max-width: 640px) {
    max-width: 220px;
  }
  overflow: hidden;
  max-width: 270px;
  min-width: 210px;
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 18px;
  padding-top: ${theme.metrics.m5};
  padding-bottom: ${theme.metrics.m5};
  margin: auto;
  cursor: pointer;
  z-index: 1;
`;

const StockRecBestTitle = styled.div`
  color: ${theme.color.darkGray};
  ${theme.fonts.s14_w400};
`;

const StockRecBestSymbol = styled.div`
  color: #212121;
  ${theme.fonts.s20_w700};
  cursor: pointer;
`;
const StockRecBestTag = styled.div`
  color: ${theme.color.tag};
  ${theme.fonts.s14_w400}
`;

const StockRecBestRatio = styled.div`
  font-size: ${theme.fonts.s24_w700};
  margin-top: ${theme.metrics.m4};
  margin-bottom: ${theme.metrics.m4};
`;

const StockRecBestBottomWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const StockRecBestPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${theme.fonts.s12_w400};
  width: 76px;
`;

const StockRecBestPriceText = styled.div`
  color: ${theme.color.darkGray};
  ${theme.fonts.s12_w400};
  margin-bottom: ${theme.metrics.m1};
`;

const StockRecBestPrice = styled.div`
  color: #2b2b2b;
  ${theme.fonts.s16_w700};
`;

const StockRecBestLine = styled.div`
  border-right: 1px solid rgb(213 213 213);
`;

const StockBestDateBottom = styled.div`
  background-color: #f6f3f3;
  max-width: 186px;
  width: 100%;
  height: 21px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${theme.metrics.m5};
  ${theme.fonts.s12_w400}
`;

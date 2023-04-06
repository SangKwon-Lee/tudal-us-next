import React from "react";
import MainTitle from "../layout/MainTitle";
import SortBtn from "../nav/sort";
import { DetailData } from "../../commons/util/type/type";
import { useRouter } from "next/router";
import { tag } from "../../commons/util/func/tag";
import { ratioColor } from "../../commons/util/func/ratioColorAndText";
import { useSelector } from "react-redux";
import Image from "next/image";
import { RootState } from "../../store";
import { TreeMapData } from "../../commons/util/func/fusionchartData";
import styled from "@emotion/styled";
import StockCard from "../card/stock";
import dynamic from "next/dynamic";
import theme from "../../commons/theme";
const DynamicComponentWithNoSSR = dynamic(
  () => import("../../../src/components/chart/themeTreeMap"),
  {
    ssr: false,
    loading: () => <div style={{ height: "230px", width: "100%" }}></div>,
  }
);

interface IThemeDetailProps {
  mapData: any;
  sort: {
    name: string;
    value: string;
  };
  isExchange: boolean;
  detailData: DetailData;
  handleIsExchange: () => void;
  handleSortBtn: (e: any) => void;
}

const BtnArr = [
  { value: "weight_max", name: "AI 추천" },
  { value: "changePercent", name: "최근 변화율" },
  { value: "growth_rate", name: "성장성" },
  { value: "stability_rate", name: "안정성" },
  { value: "operating_margin", name: "영업이익" },
];

const ThemeDetailCard: React.FC<IThemeDetailProps> = ({
  sort,
  mapData,
  isExchange,
  detailData,
  handleSortBtn,
  handleIsExchange,
}) => {
  const router = useRouter();
  const dataSource = TreeMapData(mapData);
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const { isSub } = userInfo;
  const newTag = tag(detailData.theme_info[0]?.tags || "");
  const sortValue: string = sort.value || "weight_max";

  return (
    <>
      <ThemeDatailWrapper>
        <>
          <ThemeDetailCoverWrapper>
            <ThemeDetailHeader>
              <ThemeDetailArrow
                src="/assets/images/backArrow.webp"
                alt="arrow"
                onClick={() => {
                  router.push(`/`);
                }}
              />

              <ThemeDetailHeaderTitle>
                {detailData.theme_info[0]?.name}
              </ThemeDetailHeaderTitle>
              <ThemeDetailSubTitle>
                {detailData.theme_info[0]?.description}
              </ThemeDetailSubTitle>
              {detailData && detailData.theme_info && (
                <ThemeDetailRatio
                  style={{
                    backgroundColor: ratioColor(
                      detailData.theme_info[0]?.month3AvgChangePercent
                    ),
                  }}
                >
                  {`${detailData.theme_info[0]?.month3AvgChangePercent}%`}
                </ThemeDetailRatio>
              )}

              <ThemeSubText>해당 등락률은 최근 3개월 기준입니다.</ThemeSubText>
              <ThemeDetailTagWrapper>
                <ThemeDatailEye
                  src={"/assets/images/whiteEye.svg"}
                  alt="eyes"
                />
                <ThemeDetailCount>
                  {detailData && detailData.theme_info[0]?.viewcount}
                </ThemeDetailCount>
                <ThemeDetailTag>{newTag}</ThemeDetailTag>
              </ThemeDetailTagWrapper>
            </ThemeDetailHeader>
            <ThemeDatailCoverImg
              src={
                detailData.theme_info[0]?.url
                  ? detailData.theme_info[0].url
                  : ""
              }
              alt="cover"
            ></ThemeDatailCoverImg>
          </ThemeDetailCoverWrapper>
          <ThemeDetailCenterWrapper>
            <ThemeDetailTitleWrapper>
              <ThemeDetailTitle>
                테마 종목
                <ThemeDetailTitleSpan> 한 눈에 보기</ThemeDetailTitleSpan>
              </ThemeDetailTitle>
              <ThemeDetailRightTitle>전일 기준</ThemeDetailRightTitle>
            </ThemeDetailTitleWrapper>

            {isSub ? (
              <DynamicComponentWithNoSSR dataSource={dataSource} />
            ) : (
              <MapIsSubWrapper>
                <MapIsSubImg src={"/assets/images/blur_map.png"} alt="blur" />
                <MapSubText>
                  투달유에스 서비스 구독 후 이용하실 수 있습니다
                </MapSubText>
                <MapSubBtn onClick={() => router.push("/paymentcash")}>
                  구독하기
                </MapSubBtn>
              </MapIsSubWrapper>
            )}
          </ThemeDetailCenterWrapper>
          <ThemeDetailBottomWrapper>
            <MainTitle
              isTheme={true}
              sort={sort.name}
              isButton={true}
              buttonText={"원화"}
              subTitle={"으로 보기"}
              handleButtonClick={handleIsExchange}
            />
            <SortBtn
              text={BtnArr}
              sort={sort.name}
              handleSortBtn={handleSortBtn}
            />
            {Array.isArray(detailData.holdings) &&
              detailData.holdings.length > 0 &&
              detailData.holdings
                .sort((a: any, b: any) => b[sortValue] - a[sortValue])
                .map((data, index) => (
                  <StockCard
                    data={data}
                    isExchange={isExchange}
                    isRec={false}
                    key={index + data?.symbol}
                    sort={sort.name}
                    growth_rate={data.growth_rate}
                    stability_rate={data.growth_rate}
                    isTheme={true}
                    operating_margin={data.operating_margin}
                  />
                ))}
          </ThemeDetailBottomWrapper>
        </>
      </ThemeDatailWrapper>
    </>
  );
};
export default ThemeDetailCard;

const MapIsSubImg = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const MapSubText = styled.div`
  position: absolute;
  ${theme.fonts.s12_w700};
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

const MapIsSubWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ThemeDatailWrapper = styled.div`
  max-width: 1100px;
  width: 100%;
`;
const ThemeDetailHeader = styled.div`
  padding: 20px;
`;

const ThemeDetailArrow = styled.img`
  width: 20px;
  height: 20px;
  margin-bottom: 24px;
  cursor: pointer;
  z-index: 1;
`;

const ThemeDetailHeaderTitle = styled.div`
  color: white;
  ${theme.fonts.s20_w700};
`;

const ThemeDetailSubTitle = styled.div`
  color: white;
`;

const ThemeDetailRatio = styled.button`
  padding: 6px 10px;
  color: white;
  ${theme.fonts.s12_w700};
  background-color: var(--red);
  border-radius: 8px;
  margin-top: 8px;
  margin-bottom: 16px;
  outline: none;
  border: none;
`;

const ThemeDetailTagWrapper = styled.div`
  display: flex;
  color: white;
  align-items: center;
`;

const ThemeDetailCount = styled.div`
  margin-right: 16px;
  color: white;
`;

const ThemeDetailTag = styled.div`
  margin-right: 8px;
  color: white;
`;

const ThemeDetailCenterWrapper = styled.div`
  padding: 24px 16px 24px 16px;
`;

const ThemeDetailTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;
`;

const ThemeDetailTitle = styled.div`
  ${theme.fonts.s20_w400};
`;

const ThemeDetailTitleSpan = styled.span`
  ${theme.fonts.s20_w700};
`;

const ThemeDetailRightTitle = styled.div`
  color: var(--text-gray);
`;

const ThemeDetailBottomWrapper = styled.div`
  padding-top: 20px;
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: 20px;
  background-color: var(--light-gray);
`;

const ThemeSubText = styled.span`
  color: ${theme.color.white};
  ${theme.fonts.s12_w400};
  margin-left: 10px;
`;

const ThemeDetailCoverWrapper = styled.div`
  width: 100%;
  /* height: 100%; */
  position: relative;
  max-height: 280px;
  overflow: hidden;
  margin: 0 auto;
`;

const ThemeDatailCoverImg = styled.img`
  position: absolute;
  top: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  -webkit-filter: blur(5px) brightness(50%);
  -moz-filter: blur(5px) brightness(50%);
  -o-filter: blur(5px) brightness(50%);
  -ms-filter: blur(5px) brightness(50%);
  filter: blur(5px) brightness(50%);
  object-fit: cover;
  transform: scale(1.1);
`;

const ThemeDatailEye = styled.img`
  width: 20px;
  height: 20px;
`;

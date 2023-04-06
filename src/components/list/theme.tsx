import styled from "@emotion/styled";
import { useRouter } from "next/router";
import {
  ratioColor,
  ratioText,
} from "../../commons/util/func/ratioColorAndText";
import { tag } from "../../commons/util/func/tag";
import theme from "../../commons/theme";
import Icon from "../../commons/theme/icon";
import { Button } from "@mui/material";
import { css } from "@emotion/react";
import React, { useCallback } from "react";
import { StockTheme } from "../../commons/util/type/type";
import { apiServer } from "../../commons/axios/axios";

interface Props {
  view: boolean;
  sort: string;
  themeList: StockTheme[];
}

const ThemeList = (props: Props) => {
  const { view, themeList, sort } = props;
  const router = useRouter();

  // * 테마 조회수 증가 함수
  const handleThemeView = useCallback(async (data: any) => {
    try {
      await apiServer.put(`/tudalus/theme/view/count`, {
        themecode: data,
      });
    } catch (e) {}
  }, []);

  return (
    <>
      <StockThemeCountWrapper>
        <StockThemeCountText>
          총
          <StockThemeCountNumber>
            {Array.isArray(themeList) && themeList.length}건
          </StockThemeCountNumber>
        </StockThemeCountText>
        <StockThemeDescription>
          최근 3개월 수익률 기준이에요
        </StockThemeDescription>
      </StockThemeCountWrapper>
      {Array.isArray(themeList) &&
        themeList.length > 0 &&
        themeList
          .sort((a: any, b: any) => {
            return sort === "조회순"
              ? b.viewCount - a.viewCount
              : sort === "수익률 순"
              ? b.month3AvgChangePercent - a.month3AvgChangePercent
              : b.weightmax_avg - a.weightmax_avg;
          })
          .map((data) => (
            <Button
              key={data?.theme_code}
              css={css`
                display: flex;
                background-color: var(--white);
                padding: ${theme.metrics.m5};
                border-radius: 10px;
                margin-bottom: ${theme.metrics.m5};
                justify-content: space-between;
                align-items: center;
                cursor: pointer;
                width: 100%;
              `}
              onClick={(e: any) => {
                handleThemeView(data?.theme_code);
                router.push(`/theme/${data?.theme_code}`);
              }}
            >
              <ThemeLeftWrapper>
                <ThemeTitleWrapper
                  style={{
                    flexDirection: view ? "column" : "row",
                    justifyContent: view ? "start" : "space-between",
                    alignItems: view ? "flex-start" : "center",
                  }}
                >
                  <ThemeTitle
                    onClick={(e: any) => {
                      handleThemeView(data?.theme_code);
                      router.push(`/theme/${data?.theme_code}`);
                    }}
                  >
                    {data?.name}
                  </ThemeTitle>
                  {view && <ThemeDes>{data?.description}</ThemeDes>}
                  {data?.month3AvgChangePercent && (
                    <ThemeRatioRed
                      style={{
                        color: ratioColor(data?.month3AvgChangePercent),
                      }}
                    >
                      {ratioText(data?.month3AvgChangePercent)}
                    </ThemeRatioRed>
                  )}
                </ThemeTitleWrapper>
                {view && (
                  <ThemeTagWrapper>
                    <ThemeTag>{tag(data?.tags)}</ThemeTag>
                    <ThemeViewCount>
                      <Icon
                        width={16}
                        height={16}
                        src={"/assets/images/grayEye.svg"}
                      />
                      {data?.viewCount}
                    </ThemeViewCount>
                  </ThemeTagWrapper>
                )}
              </ThemeLeftWrapper>
              {view && (
                <ThemeLogo
                  alt={data?.url + "logo"}
                  src={data?.url}
                  width={80}
                  height={80}
                  onClick={() => {
                    handleThemeView(data?.theme_code);
                    router.push(`/theme/${data?.theme_code}`);
                  }}
                />
              )}
            </Button>
          ))}
    </>
  );
};

export default React.memo(ThemeList);

const ThemeLeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const ThemeTitleWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const ThemeTitle = styled.div`
  ${theme.fonts.s20_w700};
  cursor: pointer;
  text-align: left;
  line-height: 120%;
`;

const ThemeDes = styled.div`
  text-align: left;
  padding-bottom: ${theme.metrics.m1};
  ${theme.fonts.s12_w400};
  line-height: 120%;
  margin-top: ${theme.metrics.m2};
`;

const ThemeRatioRed = styled.div`
  ${theme.fonts.s16_w700};
  color: var(--red);
`;

const ThemeTagWrapper = styled.div`
  margin-top: ${theme.metrics.m2};
  width: 100%;
  text-align: left;
`;

const ThemeTag = styled.div`
  color: var(--tag-blue);
  ${theme.fonts.s14_w400};
`;

const ThemeViewCount = styled.div`
  display: flex;
  margin-top: ${theme.metrics.m1};
  align-items: center;
  ${theme.fonts.s12_w400};
`;

const ThemeLogo = styled.img`
  border-radius: 50%;
  width: 80;
  height: 80;
`;
const StockThemeCountWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: ${theme.metrics.m2};
`;

const StockThemeCountText = styled.div`
  color: #707070;
  ${theme.fonts.s14_w400};
`;

const StockThemeCountNumber = styled.span`
  ${theme.fonts.s14_w700};
`;

const StockThemeDescription = styled.div`
  color: ${theme.color.black};
  ${theme.fonts.s14_w400};
`;

import { useRouter } from "next/router";
import { ThemeSearch, ThemeSearchResult } from "../../commons/util/type/type";
import styled from "@emotion/styled";
import {
  ratioColor,
  ratioText,
} from "../../commons/util/func/ratioColorAndText";
import theme from "../../commons/theme";
import { Button } from "@mui/material";
import { css } from "@emotion/react";
interface Props {
  themeData: ThemeSearch[];
  themeResult: ThemeSearchResult[];
}

export default function SearchThemeList(props: Props) {
  const { themeData, themeResult } = props;
  const router = useRouter();
  const searchWord = router.query.search;
  return (
    <>
      {!searchWord && (
        <RecommendThemeWrapper>
          <Title>AI 추천 테마</Title>
          <SubTitle>3개월 수익률 기준입니다.</SubTitle>
          {Array.isArray(themeData) &&
            themeData.length > 1 &&
            themeData.map((data) => (
              <Button
                css={css`
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 20px;
                  padding: 8px 0px;
                `}
                key={data.url}
                onClick={() => {
                  router.push(`/theme/${data.theme_code}`);
                }}
              >
                <RecommendThemeTitle>
                  <RecommendThemeLogo src={data.url} alt="logo" />
                  {data.name}
                </RecommendThemeTitle>
                <RecommendThemeRatio
                  style={{
                    color: ratioColor(data.month3AvgChangePercent),
                  }}
                >
                  {ratioText(data.month3AvgChangePercent)}
                </RecommendThemeRatio>
              </Button>
            ))}
        </RecommendThemeWrapper>
      )}
      {Array.isArray(themeResult) && themeResult.length !== 0 && (
        <RecommendThemeWrapper>
          <Title> 테마</Title>
          <Title style={{ fontSize: "12px" }}>3개월 수익률 기준입니다.</Title>
          {Array.isArray(themeResult) &&
            themeResult.length > 0 &&
            themeResult.map((data: any) => (
              <Button
                css={css`
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 20px;
                  padding: 8px 0px;
                `}
                key={data.name}
                onClick={() => {
                  router.push(`/theme/${data.theme_code}`);
                }}
              >
                <RecommendThemeTitle>
                  <RecommendThemeLogo src={data.theme_url} alt="logo" />
                  {data.name}
                </RecommendThemeTitle>
                <RecommendThemeRatio
                  style={{
                    color: ratioColor(data.month3AvgChangePercent),
                  }}
                >
                  {ratioText(data.month3AvgChangePercent)}
                </RecommendThemeRatio>
              </Button>
            ))}
        </RecommendThemeWrapper>
      )}
      {searchWord && themeResult.length === 0 && (
        <RecommendThemeWrapper>
          <Title> 테마</Title>
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

const RecommendThemeLogo = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 16px;
`;

const RecommendThemeTitle = styled.div`
  ${theme.fonts.s16_w700};
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const RecommendThemeRatio = styled.div`
  ${theme.fonts.s16_w400};
  color: var(--red);
`;

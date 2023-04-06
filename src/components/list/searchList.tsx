import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Box, Button, Pagination, Stack } from "@mui/material";
import theme from "../../commons/theme";
import { useRouter } from "next/router";
import { SearchResult } from "../../../commons/type";
import { MyFavoriteStocks } from "../../commons/util/type/type";
import {
  ratioBgColor,
  ratioColor,
  ratioText,
} from "../../commons/util/func/ratioColorAndText";
interface Props {
  searchList: SearchResult;
  myFavoriteStocks: MyFavoriteStocks[];
  PostMyFavorites: (symbol: string, price: number) => Promise<void>;
}

export default function SearchList(props: Props) {
  const router = useRouter();
  const { searchList, PostMyFavorites, myFavoriteStocks } = props;
  const page = Number(router.query.page) || 1;
  const search = router.query.search || "";
  return (
    <>
      <Container>
        {Array.isArray(searchList?.list) &&
          searchList.list.length > 0 &&
          searchList.list.map((data) => (
            <Button
              key={data.compName}
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
            >
              <StockBoxTopWrapper>
                <StockBoxTextImgWrapper>
                  <StockImg src={data.url} alt="logo" />
                  <StockBoxTopTextWrapper>
                    <StockSubName>{data.compNameKR}</StockSubName>
                    <StockName>{data.symbol}</StockName>
                  </StockBoxTopTextWrapper>
                </StockBoxTextImgWrapper>
                <StockRatioWrapper>
                  <StockRatio
                    style={{
                      color: ratioColor(data.jnilClose),
                      backgroundColor: ratioBgColor(data.jnilClose),
                    }}
                  >
                    {ratioText(data.jnilClose)}
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
        <Box display={"flex"} justifyContent="center" mt={2}>
          <Pagination
            count={Math.ceil(searchList.count / 10)}
            variant="outlined"
            color="primary"
            page={page}
            onChange={(e, p) => {
              if (search) {
                router.push({
                  pathname: "/usa-quotes",
                  query: {
                    search: search,
                    page: p,
                  },
                });
              } else {
                router.push({
                  pathname: "/usa-quotes",
                  query: {
                    page: p,
                  },
                });
              }
            }}
          />
        </Box>
      </Container>
    </>
  );
}

const Container = styled.div`
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

import {
  MyFavorites,
  MyFavoriteStocks,
} from "../../src/commons/util/type/type";
import FadeIn from "react-fade-in";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import theme from "../../src/commons/theme";
import { RootState } from "../../src/store";
import AddIcon from "@mui/icons-material/Add";
import SortBtn from "../../src/components/nav/sort";
import StockCard from "../../src/components/card/stock";
import { decrypt } from "../../src/commons/util/func/hash";
import MainLayout from "../../src/components/layout/mainLayout";
import { getCookie } from "../../src/commons/util/cookie/cookie";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { apiServer, cmsServer, CMS_TOKEN } from "../../src/commons/axios/axios";
const BtnArr = [
  { value: "changePercent", name: "최근 변화율" },
  { value: "weight_max", name: "AI 추천" },
];

export default function Favorite() {
  const userId = decrypt(getCookie("tudalUser"));
  const route = useRouter();
  const { isSub } = useSelector((state: RootState) => state.userInfo);
  //* 나의 관심종목 상세 정보
  const [myFavoriteStocks, setMyFavoriteStocks] = useState<MyFavoriteStocks[]>(
    []
  );
  //* 나의 관심종목
  const [myFavorites, setMyFavorites] = useState<MyFavorites[]>([]);

  // * Sort
  const [sort, setSort] = useState({
    value: "changePercent",
    name: "최근 변화율",
  });

  //* 나의 관심종목과 상세 정보 불러오기
  const getMyFavorites = useCallback(async () => {
    if (userId) {
      try {
        const { data, status } = await cmsServer.get(
          `tudalus-favorites?userId=${userId}&token=${CMS_TOKEN}`
        );
        if (status === 200 && data) {
          setMyFavorites(data);
          let myStocks = data.map((data: any) => data.symbol).join();
          const { data: stocks, status } = await apiServer.get(
            `/tudalus/stock/like?likeGroup=${myStocks}`
          );
          if (status === 200 && stocks.data.likegroup) {
            setMyFavoriteStocks(stocks.data.likegroup);
          }
        }
      } catch (e) {}
    }
  }, [userId]);

  //* 관심종목 추가 및 삭제
  const PostMyFavorites = async (symbol: string, price: number) => {
    let newData = {
      userId,
      symbol,
      price,
    };
    if (userId) {
      try {
        const { data, status } = await cmsServer.post(
          `tudalus-favorites?token=${CMS_TOKEN}`,
          newData
        );
        if (status === 200) {
          if (data === "관심종목은 최대 20개까지만 추가할 수 있습니다.") {
            alert(data);
            return;
          }
        }
        getMyFavorites();
      } catch (e) {}
    } else {
      alert("로그인 후 이용 가능합니다.");
    }
  };

  // * 관심종목 불러오기
  useEffect(() => {
    getMyFavorites();
  }, [userId, getMyFavorites]);

  // * 정렬
  const handleSortBtn = (e: any) => {
    setSort({
      ...sort,
      name: e.target.id,
      value: e.target.value,
    });
  };
  return (
    <>
      <BackGround>
        <FavoriteWrapper>
          <SortBtn
            text={BtnArr}
            sort={sort.name}
            handleSortBtn={handleSortBtn}
          />
          <FadeIn>
            <div style={{ padding: "0 20px" }}>
              {Array.isArray(myFavoriteStocks) &&
                myFavoriteStocks.length > 0 &&
                myFavoriteStocks
                  .sort((a: any, b: any) => b[sort.value] - a[sort.value])
                  .map((data: MyFavoriteStocks, index) => (
                    <StockCard
                      data={data}
                      sort={sort.name}
                      key={index}
                      isRec={false}
                      isExchange={false}
                      isFavorite={true}
                      isFavoriteSub={isSub}
                      myFavorites={data}
                      PostMyFavorites={PostMyFavorites}
                      favoritePrice={
                        myFavorites.filter(
                          (item) => item.symbol === data.symbol
                        )[0]
                      }
                    />
                  ))}
            </div>
          </FadeIn>
          <FavoriteBtnWrapper onClick={() => route.push("/search")}>
            <FavoriteCircle>
              <AddIcon />
            </FavoriteCircle>
            <FavoriteBtnText>관심종목 추가하기</FavoriteBtnText>
          </FavoriteBtnWrapper>
        </FavoriteWrapper>
      </BackGround>
    </>
  );
}

Favorite.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout title="투달유에스 | 관심종목">{page}</MainLayout>;
};

const BackGround = styled.div`
  width: 100%;
  background-color: var(--light-gray);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FavoriteWrapper = styled.div`
  max-width: 1100px;
  width: 100vw;
  min-height: 100vh;
  padding-bottom: 20px;
  background-color: var(--light-gray);
`;

const FavoriteBtnWrapper = styled.div`
  border-radius: 5px;
  border: dotted 1px #c9c6c6;
  height: 55px;
  background-color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-left: ${theme.metrics.m4};
  margin: 16px 20px 16px 20px;
`;

const FavoriteCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #f2f2f2;
  margin-right: ${theme.metrics.m4};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FavoriteBtnText = styled.div`
  ${theme.fonts.s14_w500};
`;

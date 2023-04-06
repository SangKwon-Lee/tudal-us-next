import styled from "@emotion/styled";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Router, { useRouter } from "next/router";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { SearchPageProps } from "../../commons/type";
import { apiServer, cmsServer, CMS_TOKEN } from "../../src/commons/axios/axios";
import { getCookie } from "../../src/commons/util/cookie/cookie";
import { decrypt } from "../../src/commons/util/func/hash";
import { MyFavoriteStocks } from "../../src/commons/util/type/type";
import BestStockLayout from "../../src/components/layout/bestStockLayout";
import SearchList from "../../src/components/list/searchList";
import SearchNav from "../../src/components/nav/search";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const search = query.search;
  let page = query.page || 0;
  page = Number(page) - 1;
  if (page < 0) {
    page = 0;
  }
  let searchResult = {
    count: 0,
    list: [],
  };
  if (search) {
    try {
      const result = await apiServer.get(
        `/tudalus/search/stock/${search}?page=${page}`
      );
      searchResult = result.data;
    } catch (e) {}
  } else {
    try {
      const { data, status } = await apiServer.get(
        `/tudalus/search/stock?page=${page}`
      );
      if (status === 200 && data) {
        searchResult = data;
      }
    } catch (e) {
      // console.log(e);
    }

    //? 기존에 쓰던 검색 코드
    // const { data, status } = await apiServer.get(
    //   `/tudalus/stock/search?word=${search}`
    // );
    // if (status === 200 && data.data.search) {
    //   stockResult = data.data.search.filter(
    //     (data: any) => data.url !== 0 && data.url
    //   );
    //   themeResult = data.data.search.filter(
    //     (data: any) => data.theme_url !== 0
    //   );
    // }
    // try {
    // const { data, status } = await apiServer.get(`/tudalus/stock/rank/rate`);
    // if (status === 200 && data.data) {
    //   topData = data.data.top_rtn;
    // }
    //   // * 검색어가 없을 때 초기 화면에 테마 추천 목록
    //   const { data, status } = await apiServer.get(`/tudalus/stock/theme/list`);
    //   if (status === 200 && data.data.theme) {
    //     themeData = data.data.theme
    //       .sort(
    //         (a: any, b: any) =>
    //           b.month3AvgChangePercent - a.month3AvgChangePercent
    //       )
    //       .slice(0, 4);
    //   }
    // } catch (e) {}
  }

  return {
    props: {
      searchResult,
    },
  };
};

export default function USAQuotes(props: SearchPageProps) {
  const { searchResult } = props;
  const userId = decrypt(getCookie("tudalUser"));
  const router = useRouter();
  // * 검색어
  const [search, setSearch] = useState({
    search: "",
    temp: "",
  });

  //* 나의 관심종목 상세 정보
  const [myFavoriteStocks, setMyFavoriteStocks] = useState<MyFavoriteStocks[]>(
    []
  );

  //* 관심종목 불러오기
  const getMyFavorites = useCallback(async () => {
    if (userId) {
      try {
        const { data, status } = await cmsServer.get(
          `tudalus-favorites?userId=${userId}&token=${CMS_TOKEN}`
        );
        if (status === 200 && data) {
          setMyFavoriteStocks(data);
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

  // * 단어 저장
  const handleSearch = (e: any) => {
    setSearch({
      ...search,
      temp: e.target.value,
    });
  };

  // * 클릭시 검색
  const handleSearchClick = () => {
    Router.push({
      pathname: "/usa-quotes",
      query: { search: search.temp },
    });
    setSearch({
      ...search,
      search: search.temp,
    });
  };

  // * 엔터키
  const onEnterLogin = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  useEffect(() => {
    if (userId) {
      getMyFavorites();
    }
  }, [userId, getMyFavorites]);

  return (
    <SearchPageWrapper>
      <Arrow
        src="./assets/images/iconBack.svg"
        onClick={() => {
          router.push("/");
        }}
      />
      <SearchNav
        isSearch={false}
        onEnterLogin={onEnterLogin}
        handleSearch={handleSearch}
        handleSearchClick={handleSearchClick}
      />
      <SearchList
        searchList={searchResult}
        PostMyFavorites={PostMyFavorites}
        myFavoriteStocks={myFavoriteStocks}
      />
    </SearchPageWrapper>
  );
}

USAQuotes.getLayout = function getLayout(page: ReactElement) {
  return <BestStockLayout title={"투달유에스 | 검색"}>{page}</BestStockLayout>;
};

const SearchPageWrapper = styled.div`
  max-width: 1100px;
  width: 100%;
  padding: 16px 22px 0px 22px;
  display: flex;
  flex-direction: column;
`;

const Arrow = styled.img`
  width: 20px;
  height: 20px;
  margin-bottom: 24px;
  cursor: pointer;
  z-index: 1;
`;

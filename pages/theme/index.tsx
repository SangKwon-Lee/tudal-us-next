import { ReactElement, useState } from "react";
import { StockTheme } from "../../src/commons/util/type/type";
import MainLayout from "../../src/components/layout/mainLayout";
import FadeIn from "react-fade-in";
import styled from "@emotion/styled";
import ThemeList from "../../src/components/list/theme";
import MainTitle from "../../src/components/layout/MainTitle";
import SortBtn from "../../src/components/nav/sort";
import { GetStaticProps } from "next";
import { apiServer } from "../../src/commons/axios/axios";

const BtnArr = [
  { name: "AI 추천", value: "AI 추천" },
  { name: "수익률 순", value: "수익률 순" },
  { name: "조회순", value: "조회순" },
];

interface Props {
  stockTheme: StockTheme[];
}

export const getStaticProps: GetStaticProps = async () => {
  let stockTheme = [];
  try {
    const { data, status } = await apiServer.get(`/tudalus/stock/theme/list`);
    if (status === 200 && data.data.theme) {
      stockTheme = data.data.theme.sort(
        (a: any, b: any) => b.weightmax_avg - a.weightmax_avg
      );
    }
  } catch (e) {
    stockTheme = [];
  }

  return {
    props: {
      stockTheme,
    },
    revalidate: 7200,
  };
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   let stockTheme = [];
//   try {
//     const { data, status } = await apiServer.get(`/tudalus/stock/theme/list`);
//     if (status === 200 && data.data.theme) {
//       stockTheme = data.data.theme.sort(
//         (a: any, b: any) => b.weightmax_avg - a.weightmax_avg
//       );
//     }
//   } catch (e) {
//     stockTheme = [];
//   }

//   return {
//     props: {
//       stockTheme,
//     },
//   };
// };

export default function Theme(props: Props) {
  const { stockTheme } = props;
  // * Sort
  const [sort, setSort] = useState("AI 추천");

  //* 보기 방식
  const [view, setView] = useState(true);

  // * 정렬
  const handleSortBtn = (e: any) => {
    setSort(e.target.value);
  };

  // * 보기 방식
  const handleView = () => {
    setView(() => !view);
  };

  return (
    <>
      <BackGround>
        <StockThemeWrapper>
          <FadeIn>
            <MainTitle
              isButton={true}
              title={"최신테마"}
              subTitle={"종목 발굴"}
              handleButtonClick={handleView}
              buttonText={view ? "간단히 보기" : "펼쳐 보기"}
            />
            <SortBtn text={BtnArr} sort={sort} handleSortBtn={handleSortBtn} />
            <div style={{ padding: "0 16px" }}>
              {Array.isArray(stockTheme) && stockTheme.length > 0 && (
                <ThemeList sort={sort} view={view} themeList={stockTheme} />
              )}
            </div>
          </FadeIn>
        </StockThemeWrapper>
      </BackGround>
    </>
  );
}

Theme.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout title={"투달유에스 | 테마"}>{page}</MainLayout>;
};

const BackGround = styled.div`
  width: 100%;
  background-color: var(--light-gray);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StockThemeWrapper = styled.div`
  max-width: 1100px;
  width: 100%;
  padding-top: 46px;
  padding-bottom: 20px;
  background-color: var(--light-gray);
`;

import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { GetStaticProps } from "next";
import { HomePageProps } from "../commons/type";
import { setUserId } from "../src/redux/userInfo";
import { decrypt } from "../src/commons/util/func/hash";
import DailyAICard from "../src/components/card/dailyAI";
import { ReactElement, useEffect, useState } from "react";
import BestPickCard from "../src/components/card/bestPick";
import HomeBtnModal from "../src/components/modal/HomeBtn";
import MainLayout from "../src/components/layout/mainLayout";
import { getCookie } from "../src/commons/util/cookie/cookie";
import { apiServer, cmsServer, CMS_TOKEN } from "../src/commons/axios/axios";

export const getStaticProps: GetStaticProps = async () => {
  let stockRec = {
    three_picks: [],
  };
  let stockBest = [];

  try {
    const { data, status } = await apiServer.get(`/tudalus/stock/3picks`);
    if (status === 200 && data.data) {
      stockRec = data.data;
    }
  } catch (e) {}

  try {
    const { data, status } = await apiServer.get(`/tudalus/stock/3picks/best`);
    if (status === 200 && data.data.best_picks) {
      stockBest = data.data.best_picks.slice(0, 3);
    }
  } catch (e) {}

  return {
    props: {
      stockRec,
      stockBest,
    },
    revalidate: 3600,
  };
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   let stockRec = {
//     three_picks: [],
//   };
//   let stockBest = [];

//   try {
//     const { data, status } = await apiServer.get(`/tudalus/stock/3picks`);
//     if (status === 200 && data.data) {
//       stockRec = data.data;
//     }
//   } catch (e) {}

//   try {
//     const { data, status } = await apiServer.get(`/tudalus/stock/3picks/best`);
//     if (status === 200 && data.data.best_picks) {
//       stockBest = data.data.best_picks.slice(0, 3);
//     }
//   } catch (e) {}

//   return {
//     props: {
//       stockRec,
//       stockBest,
//     },
//   };
// };

export default function Home(props: HomePageProps) {
  const { stockBest, stockRec } = props;
  const router = useRouter();
  const userId = decrypt(getCookie("tudalUser"));
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const [open, setOpen] = useState(false);
  // *모달 닫기
  const handleClose = () => setOpen(false);

  // * 홈 화면 바로가기 팝업 생성
  const handleOpenModal = async () => {
    try {
      const { data, status } = await cmsServer.get(
        `/tudalus-add-home-popups?userId=${userId}&token=${CMS_TOKEN}`
      );
      if (status === 200) {
        setIsOpen(data[0].isOpen);
        if (!data[0].isOpen) {
          setOpen(true);
        }
      }
    } catch (e) {}
  };

  useEffect(() => {
    if (userId) {
      dispatch(setUserId(userId));
      handleOpenModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userId]);

  return (
    <>
      <Head>
        <meta
          name="naver-site-verification"
          content="947cd0c6e7e1a0879d5af018aaa84daaf1c58388"
        />
        <meta charSet="utf-8" />
        {/* <meta name="application-name" content="&nbsp;" /> */}
        {/* <link rel="manifest" href="%PUBLIC_URL%/manifest.json" /> */}
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-TileImage" content="mstile-144x144.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.ico" />
        <link rel="canonical" href="https://us.tudal.co.kr"></link>
        <meta name="theme-color" content="#ffffff" />
        <title>
          TudalUS - 어려운 미국주식을 한눈에, 미국투자의 든든한 AI파트너
        </title>
        <meta
          name="subject"
          content="TudalUS - 어려운 미국주식을 한눈에, 미국투자의 든든한 AI파트너"
        />
        <meta
          name="author"
          content="TudalUS - 어려운 미국주식을 한눈에, 미국투자의 든든한 AI파트너"
        />
        <meta
          name="keywords"
          content="투달유에스,이노핀,미국주식,핀테크,빅데이터,미국주식앱,미국주식앱추천,미국주식투자앱,증권앱,미국주식어플리케이션,모바일어플리케이션,종목상담,종목상담앱,미국주식투자어플리케이션,모바일앱,인공지능,로보어드바이저,미국주식분석,미국주식종목추천,미국주식로봇,미국주식인공지능,가치투자,미국주식알고리즘"
        />
        <meta
          name="description"
          content="투달유에스는 어렵기만 했던 미국주식을 AI주가예측으로 종목을 추천, 일반투자자는 어려운 종목별 차트 유사도 분석과 테마 기반 분석 서비스 제공"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="TudalUS - 어려운 미국주식을 한눈에, 미국투자의 든든한 AI파트너"
        />
        <meta
          property="og:description"
          content="투달유에스는 어렵기만 했던 미국주식을 AI주가예측으로 종목을 추천, 일반투자자는 어려운 종목별 차트 유사도 분석과 테마 기반 분석 서비스 제공"
        />
        <meta
          property="og:site_name"
          content="TudalUS - 어려운 미국주식을 한눈에, 미국투자의 든든한 AI파트너"
        />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta name="content-language" content="kr" />
        <link rel="apple-touch-icon" href="../src/assets/tudalus_logo.svg" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </Head>
      <HomeBtnModal isOpen={isOpen} handleClose={handleClose} open={open} />
      <BestPickCard stockBest={stockBest} />
      <DailyAICard stockRec={stockRec} />
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout title="투달유에스 | 종목추천">{page}</MainLayout>;
};

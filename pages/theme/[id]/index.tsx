import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { ThemePageProps } from "../../../commons/type";
import SubLayout from "../../../src/components/layout/sub";
import { decrypt } from "../../../src/commons/util/func/hash";
import { getCookie } from "../../../src/commons/util/cookie/cookie";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { setIsSub, setUserPremium } from "../../../src/redux/userInfo";
import ThemeDetailCard from "../../../src/components/card/themeDetail";
import {
  apiServer,
  cmsServer,
  CMS_TOKEN,
} from "../../../src/commons/axios/axios";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const id = query.id;
  let detailData;
  let mapData;

  try {
    const { data, status } = await apiServer.get(
      `/tudalus/stock/theme/info/${id}`
    );
    if (data.errorMessage) {
      return {
        notFound: true,
      };
    }
    if (status === 200 && data.data) {
      detailData = data.data;
      let newData = data.data.holdings.map((data: any) => {
        let mapData = { label: "", value: 0, svalue: "" };
        mapData["label"] = data.symbol;
        mapData["value"] = data.marketcap;
        mapData["svalue"] = data.changePercent;
        return mapData;
      });

      mapData = newData;
    } else {
      return {
        notFound: true,
      };
    }
  } catch (e) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      detailData,
      mapData,
    },
  };
};

const ThemeDetailContainerPage = (props: ThemePageProps) => {
  const { detailData, mapData } = props;
  const dispatch = useDispatch();
  const userId = decrypt(getCookie("tudalUser"));

  // * 환율 가격으로 보기
  const [isExchange, setIsExchange] = useState(false);

  // * Sort
  const [sort, setSort] = useState({ value: "weight_max", name: "AI 추천" });

  //* 구독 중인 유저인지 아닌지 체크
  const handleGetUserPremium = useCallback(async () => {
    if (userId) {
      try {
        const { data } = await cmsServer.get(
          `/tudalus-premium-users?userId=${userId}&token=${CMS_TOKEN}`
        );
        dispatch(setIsSub(dayjs(data[0].endDate).isAfter(dayjs().format())));
        dispatch(setUserPremium(data[0]));
      } catch (e) {}
    }
  }, [dispatch, userId]);

  // * 정렬
  const handleSortBtn = (e: any) => {
    setSort({
      ...sort,
      name: e.target.id,
      value: e.target.value,
    });
  };

  // * 환율로 보기 버튼
  const handleIsExchange = () => {
    setIsExchange(() => !isExchange);
  };

  useEffect(() => {
    if (userId) {
      handleGetUserPremium();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, handleGetUserPremium, userId]);

  return (
    <>
      <ThemeDetailCard
        sort={sort}
        mapData={mapData}
        detailData={detailData}
        isExchange={isExchange}
        handleSortBtn={handleSortBtn}
        handleIsExchange={handleIsExchange}
      />
    </>
  );
};

export default ThemeDetailContainerPage;

ThemeDetailContainerPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <SubLayout isStock={false} title={"투달유에스 | 테마"}>
      {page}
    </SubLayout>
  );
};

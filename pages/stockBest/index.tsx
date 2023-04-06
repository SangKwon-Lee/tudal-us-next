import { ReactElement } from "react";
import { GetServerSideProps } from "next";
import { StockBestPageProps } from "../../commons/type";
import { apiServer } from "../../src/commons/axios/axios";
import BestStockLayout from "../../src/components/layout/bestStockLayout";
import StockBestList from "../../src/components/list/stockBest";
export const getServerSideProps: GetServerSideProps = async () => {
  let stockBest;

  try {
    const { data, status } = await apiServer.get(`/tudalus/stock/3picks/best`);
    if (status === 200 && data.data.best_picks) {
      stockBest = data.data.best_picks;
    }
  } catch (e) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      stockBest,
    },
  };
};

const StockBestPage = (props: StockBestPageProps) => {
  const { stockBest } = props;

  return (
    <>
      {Array.isArray(stockBest) && stockBest.length > 0 && (
        <StockBestList stockBest={stockBest} />
      )}
    </>
  );
};

export default StockBestPage;

StockBestPage.getLayout = function getLayout(page: ReactElement) {
  return <BestStockLayout title="투달유에스 | 베스트">{page}</BestStockLayout>;
};

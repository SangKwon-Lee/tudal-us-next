import { ReactElement } from "react";
import MainLayout from "../../src/components/layout/mainLayout";
import StockIndexContainer from "../../src/components/stockIndex/StockIndexContainer";

export default function IndexPage() {
  return (
    <>
      <StockIndexContainer />
    </>
  );
}

IndexPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout title="투달유에스 | 지수">{page}</MainLayout>;
};
